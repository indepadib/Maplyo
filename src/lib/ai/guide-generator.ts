import { Guide, BlockType } from "@/types/blocks";
import { guideThemes } from "@/types/themes";
import { createOpenAIClient, cleanAIJSON } from "./openai";

export interface GuidePrompt {
    city?: string;
    airbnbUrl?: string;
    type?: "airbnb" | "hotel" | "guest_house" | "other";
    targetAudience?: "families" | "couples" | "remote_workers" | "groups" | "everyone";
    language: "fr" | "en";
    mood?: "relax" | "adventure" | "romantic" | "business";
    amenities?: string[];
}

function uid() { return Math.random().toString(36).slice(2, 10); }

async function fetchAirbnbListing(url: string): Promise<string> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'fr-FR,fr;q=0.8'
            },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            return await response.text();
        }
    } catch (e) {
        console.error("Failed to fetch Airbnb page:", e);
    }
    return "";
}

interface AirbnbExtracted {
    dataText: string;        // Raw text sent to LLM
    listingName?: string;   // Listing title from JSON-LD name field
    city?: string;          // City from addressLocality
    description?: string;   // Full description
    coverImageUrl?: string; // First real listing photo
    latitude?: string;
    longitude?: string;
    amenities?: string[];   // Extracted amenities list
}

function extractAirbnbMetadata(html: string): AirbnbExtracted {
    if (!html) return { dataText: "" };
    let dataText = "";
    let listingName: string | undefined;
    let city: string | undefined;
    let description: string | undefined;
    let coverImageUrl: string | undefined;
    let latitude: string | undefined;
    let longitude: string | undefined;
    let amenities: string[] = [];

    // 1. Extract <title> tag — also try to infer city from it
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
        dataText += `Title: ${titleMatch[1]}\n`;
        const cityFromTitle = titleMatch[1].match(/[àin]+\s+([A-ZÀ-Ö][a-zA-ZÀ-ÿ\-\s]+?)(?:,|\s+-\s+Airbnb)/i);
        if (cityFromTitle) city = cityFromTitle[1].trim();
    }

    // 2. Extract og:image meta (fallback photo source)
    const ogImageMatch = html.match(/<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    if (ogImageMatch) coverImageUrl = ogImageMatch[1];

    // 3. Extract meta description
    const metaDescMatch = html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    if (metaDescMatch) {
        description = metaDescMatch[1];
        dataText += `Meta description: ${description}\n`;
    }

    const metaPropertyRegex = /<meta\s+[^>]*property=["']og:(title|description)["'][^>]*content=["']([^"']+)["']/gi;
    let match;
    while ((match = metaPropertyRegex.exec(html)) !== null) {
        dataText += `Meta og:${match[1]}: ${match[2]}\n`;
    }

    // 4. Extract JSON-LD scripts — parse all useful fields
    const jsonLdRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let ldMatch;
    let count = 0;
    while ((ldMatch = jsonLdRegex.exec(html)) !== null && count < 5) {
        try {
            const parsed = JSON.parse(ldMatch[1].trim());

            // Recursive key finder for string values
            const findStr = (obj: any, key: string): string | undefined => {
                if (!obj || typeof obj !== 'object') return undefined;
                if (Array.isArray(obj)) {
                    for (const item of obj) { const v = findStr(item, key); if (v) return v; }
                    return undefined;
                }
                if (key in obj && typeof obj[key] === 'string' && obj[key].trim()) return obj[key].trim();
                for (const k of Object.keys(obj)) { const v = findStr(obj[k], key); if (v) return v; }
                return undefined;
            };

            // Extract core fields
            if (!listingName) listingName = findStr(parsed, 'name');
            if (!city) city = findStr(parsed, 'addressLocality');
            if (!description && parsed.description) description = parsed.description.slice(0, 600);
            if (!latitude) latitude = findStr(parsed, 'latitude');
            if (!longitude) longitude = findStr(parsed, 'longitude');

            // Extract real photos from JSON-LD image field
            if (!coverImageUrl && parsed.image) {
                if (typeof parsed.image === 'string' && parsed.image.startsWith('http')) {
                    coverImageUrl = parsed.image;
                } else if (Array.isArray(parsed.image)) {
                    const firstImg = parsed.image.find((img: any) =>
                        typeof img === 'string' ? img.startsWith('http') :
                        (img?.url?.startsWith('http') || img?.contentUrl?.startsWith('http'))
                    );
                    if (firstImg) {
                        coverImageUrl = typeof firstImg === 'string' ? firstImg : (firstImg.url || firstImg.contentUrl);
                    }
                }
            }

            // Extract amenities from containsPlace or amenityFeature
            const extractAmenities = (obj: any): string[] => {
                const items: string[] = [];
                if (!obj) return items;
                if (Array.isArray(obj)) {
                    for (const item of obj) items.push(...extractAmenities(item));
                } else if (typeof obj === 'object') {
                    if (obj.name && typeof obj.name === 'string') items.push(obj.name);
                    if (obj.amenityFeature) items.push(...extractAmenities(obj.amenityFeature));
                    if (obj.containsPlace) items.push(...extractAmenities(obj.containsPlace));
                }
                return items;
            };
            const foundAmenities = extractAmenities(parsed.amenityFeature || parsed.containsPlace);
            if (foundAmenities.length > 0) amenities.push(...foundAmenities);

            // Append compact summary to dataText (avoid bloat)
            const summary: Record<string, any> = {};
            if (parsed.name) summary.name = parsed.name;
            if (parsed.description) summary.description = parsed.description.slice(0, 400);
            if (parsed.address) summary.address = parsed.address;
            if (parsed.latitude) summary.latitude = parsed.latitude;
            if (parsed.longitude) summary.longitude = parsed.longitude;
            if (amenities.length > 0) summary.amenities = amenities.slice(0, 15);
            dataText += `JSON-LD Summary:\n${JSON.stringify(summary, null, 2)}\n`;

            count++;
        } catch (e) {
            // ignore parse errors
        }
    }

    return {
        dataText: dataText.slice(0, 12000),
        listingName,
        city,
        description,
        coverImageUrl,
        latitude,
        longitude,
        amenities: [...new Set(amenities)].slice(0, 15) // deduplicate
    };
}

export async function generateGuide(prompt: GuidePrompt): Promise<Guide> {
    const { city, airbnbUrl, type = "airbnb", targetAudience = "everyone", language, mood } = prompt;

    // Default values — will be overridden by scraping
    let targetLocation = city || "";
    let listingName = "";
    let scrapedInfo = "";
    let realCoverImageUrl: string | undefined;
    let realDescription: string | undefined;
    let realAmenities: string[] = [];

    if (airbnbUrl) {
        try {
            // 1. Fetch the full Airbnb listing HTML
            const html = await fetchAirbnbListing(airbnbUrl);
            if (html) {
                // 2. Extract all structured data from JSON-LD + meta tags
                const extracted = extractAirbnbMetadata(html);
                scrapedInfo = extracted.dataText;

                // Use extracted structured values (most reliable — direct from JSON-LD)
                if (extracted.listingName) listingName = extracted.listingName;
                if (extracted.city) targetLocation = extracted.city;
                if (extracted.coverImageUrl) realCoverImageUrl = extracted.coverImageUrl;
                if (extracted.description) realDescription = extracted.description;
                if (extracted.amenities?.length) realAmenities = extracted.amenities;

                console.log(`[guide-generator] Scraped: name="${listingName}" city="${targetLocation}" photo=${realCoverImageUrl ? 'YES' : 'NO'} amenities=${realAmenities.length}`);
            }

            // 3. Fallback: parse URL slug if JSON-LD didn't give us a name/city
            if (!listingName || !targetLocation) {
                const urlObj = new URL(airbnbUrl);
                const pathParts = urlObj.pathname.split('/');
                const roomPart = pathParts.find(p => p && p !== 'rooms');
                if (roomPart && !/^\d+$/.test(roomPart)) {
                    const nameWithoutId = roomPart.replace(/-\d+$/, '').replace(/-/g, ' ');
                    if (!listingName) listingName = nameWithoutId.charAt(0).toUpperCase() + nameWithoutId.slice(1);
                    if (!targetLocation) {
                        const lowerName = nameWithoutId.toLowerCase();
                        const knownCities = ['paris', 'marrakech', 'london', 'barcelona', 'rome', 'new york', 'tokyo', 'casablanca', 'rabat', 'nice', 'lyon', 'marseille', 'mohammedia', 'agadir', 'tangier', 'fes', 'essaouira', 'meknes', 'tetouan', 'safi', 'el jadida'];
                        const foundCity = knownCities.find(c => lowerName.includes(c));
                        if (foundCity) targetLocation = foundCity.charAt(0).toUpperCase() + foundCity.slice(1);
                    }
                }
            }
        } catch (e) {
            console.error("Scraping error:", e);
        }
    }

    // Final fallbacks
    if (!listingName) listingName = city ? `Mon Airbnb - ${city}` : "Mon Airbnb";
    if (!targetLocation) targetLocation = city || "Paris";

    const openai = createOpenAIClient();

    if (!openai) {
        console.warn("Missing OPENAI_API_KEY, returning mock data.");
        return generateMockGuide(prompt);
    }

    const systemPrompt = `
You are an expert travel guide creator. Create a complete, personalized JSON welcome guide for a short-term rental based on the real listing data below.

=== REAL LISTING DATA (extracted directly from Airbnb) ===
- Listing Title: ${listingName}
- Exact City / Location: ${targetLocation}
- Language to use: ${language} (ALL output text must be in this language)
- Airbnb URL: ${airbnbUrl || 'N/A'}
${realDescription ? `- Real Listing Description: ${realDescription}` : ''}
${realAmenities.length > 0 ? `- Real Amenities from listing: ${realAmenities.join(', ')}` : ''}
${scrapedInfo ? `\n=== FULL SCRAPED METADATA ===\n${scrapedInfo}` : ''}

=== CRITICAL INSTRUCTIONS ===
1. LOCATION: The guide location is "${targetLocation}". Use ONLY this city for local recommendations (places, events, transport). NEVER use Paris or any other city.
2. HERO IMAGE: Set "coverImageUrl" to "__USE_REAL_PHOTO__" — it will be replaced with the actual listing photo automatically.
3. LISTING DETAILS: Use the real listing title, description, and amenities above to fill in the blocks. Do NOT invent generic data when real data is provided.
4. PLACES: List 3 real restaurants or cafes that genuinely exist in ${targetLocation}. Use your knowledge of the city.
5. AMENITIES: Use the real amenities list above. If unavailable, infer from the description.
6. RULES: Extract from the description if available, otherwise generate plausible rules for this type of property.
7. Wi-Fi and check-in codes: Generate plausible mock values (the host will update them manually).

Required blocks (in order): hero, wifi, checkin, rules, amenities, places, events, transport

Output STRICTLY valid JSON:
{
  "title": "string",
  "location": "${targetLocation}",
  "blocks": [
    { "type": "hero", "title": "string", "data": { "title": "string", "subtitle": "string", "coverImageUrl": "__USE_REAL_PHOTO__", "badges": ["string"] } },
    { "type": "wifi", "title": "string", "data": { "networkName": "string", "password": "string" } },
    { "type": "checkin", "title": "string", "data": { "time": "15:00", "instruction": "string" } },
    { "type": "rules", "title": "string", "data": { "items": [{ "text": "string" }] } },
    { "type": "amenities", "title": "string", "data": { "items": [{ "text": "string" }] } },
    { "type": "places", "title": "string", "data": { "items": [{ "name": "string", "description": "string", "address": "string" }] } },
    { "type": "events", "title": "string", "data": { "items": [{ "title": "string", "month": "JAN", "day": 1, "description": "string" }] } },
    { "type": "transport", "title": "string", "data": { "options": [{ "type": "taxi|bus|train", "name": "string", "description": "string" }] } }
  ]
}
`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Generate a complete, personalized welcome guide using the listing details and location provided in the context above. The guide MUST be for the exact location specified (${targetLocation || "the listing's actual city"}) — do NOT invent a different city or use Paris as a default.` }
            ],
            temperature: 0.7,
        });

        const content = response.choices[0]?.message?.content || "{}";
        const json = cleanAIJSON(content);
        
        const finalLocation = json.location || targetLocation || "Paris";

        // Post-processing: Add IDs and visibility
        // Smart theme matching: try exact city name, then coastal/beach for Moroccan coastal cities
        const coastalCities = ['mohammedia', 'mohammédia', 'el jadida', 'essaouira', 'agadir', 'safi'];
        const isCoastal = coastalCities.some(c => finalLocation.toLowerCase().includes(c));
        const matchedTheme = guideThemes.find(t =>
            t.name.toLowerCase().includes(finalLocation.toLowerCase()) ||
            t.id.toLowerCase().includes(finalLocation.toLowerCase())
        ) || (isCoastal ? guideThemes.find(t => t.id === 'beach') : null) || guideThemes[0];

        const blocks = (json.blocks || []).map((b: any) => ({
            ...b,
            id: uid(),
            visibility: { mode: "always" },
            data: b.data || {}
        }));

        // Resolve hero cover image: prioritize real Airbnb photo > theme bg > nothing
        const resolvedCoverImage = realCoverImageUrl || matchedTheme.bgImage || null;

        // Ensure Hero block exists and has a real cover image
        let heroBlock = blocks.find((b: any) => b.type === "hero");
        if (!heroBlock) {
            heroBlock = {
                id: uid(),
                type: "hero",
                title: "Hero",
                visibility: { mode: "always" },
                data: {
                    title: json.title || listingName,
                    subtitle: realDescription
                        ? realDescription.slice(0, 120).trim() + (realDescription.length > 120 ? '...' : '')
                        : "Bienvenue dans votre guide personnel",
                    coverImageUrl: resolvedCoverImage,
                    badges: realAmenities.slice(0, 3).length > 0
                        ? realAmenities.slice(0, 3)
                        : ["Wi-Fi", "Piscine"]
                }
            };
            blocks.unshift(heroBlock);
        } else {
            // Replace placeholder or missing cover image with real photo
            if (!heroBlock.data.coverImageUrl ||
                heroBlock.data.coverImageUrl === '__USE_REAL_PHOTO__' ||
                heroBlock.data.coverImageUrl === '') {
                heroBlock.data.coverImageUrl = resolvedCoverImage;
            }
            // Also inject real amenities as badges if AI left them empty
            if ((!heroBlock.data.badges || heroBlock.data.badges.length === 0) && realAmenities.length > 0) {
                heroBlock.data.badges = realAmenities.slice(0, 3);
            }
        }

        const sanitizedLocation = finalLocation.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/[^a-z0-9]+/g, '-')                      // replace non-alphanumeric with hyphens
            .replace(/^-+|-+$/g, '');                         // trim hyphens

        return {
            id: uid(),
            slug: `${sanitizedLocation}-${uid()}`,
            title: json.title || listingName,
            theme: { themeId: matchedTheme.id },
            blocks: blocks,
            updatedAt: new Date().toISOString()
        };

    } catch (error) {
        console.error("OpenAI Generation failed:", error);
        return generateMockGuide(prompt);
    }
}

// Keep the old mock function as fallback
async function generateMockGuide(prompt: GuidePrompt): Promise<Guide> {
    const { city, language } = prompt;
    const lang = language;
    const theme = guideThemes[0];

    return {
        id: uid(),
        slug: `mock-${city}`,
        title: `Guide ${city} (Fallback Mode)`,
        theme: { themeId: theme.id },
        blocks: [
            {
                id: uid(),
                type: "hero",
                title: "Hero",
                visibility: { mode: "always" },
                data: {
                    title: `Bienvenue à ${city}`,
                    subtitle: "Ce guide est généré localement (Erreur IA)",
                    coverImageUrl: theme.bgImage,
                    badges: ["4G", "Central"]
                }
            },
            {
                id: uid(),
                type: "wifi",
                title: "Wi-Fi",
                visibility: { mode: "always" },
                data: { networkName: "MonWifi", password: "password123" }
            },
            {
                id: uid(),
                type: "places",
                title: "Lieux",
                visibility: { mode: "always" },
                data: {
                    items: [
                        { name: "Café de la Place", description: "Le meilleur café du coin.", address: "123 Rue Principale" },
                        { name: "Bistro le Gourmand", description: "Cuisine locale authentique.", address: "45 Avenue de la Liberté" }
                    ]
                }
            }
        ],
        updatedAt: new Date().toISOString()
    };
}
