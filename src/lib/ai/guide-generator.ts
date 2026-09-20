import { Guide, BlockType } from "@/types/blocks";
import { guideThemes } from "@/types/themes";
import { createOpenAIClient, cleanAIJSON } from "./openai";
import { importAirbnbListing } from "@/lib/importers/airbnb";
import { importPropertyWebsite } from "@/lib/importers/website";

export interface GuidePrompt {
    city?: string;
    airbnbUrl?: string;
    propertyUrl?: string;
    type?: "airbnb" | "hotel" | "guest_house" | "other";
    targetAudience?: "families" | "couples" | "remote_workers" | "groups" | "everyone";
    language: "fr" | "en";
    mood?: "relax" | "adventure" | "romantic" | "business";
    amenities?: string[];
    sourceOwnerConfirmed?: boolean;
}

function uid() { return Math.random().toString(36).slice(2, 10); }

export async function generateGuide(prompt: GuidePrompt): Promise<Guide> {
    const { city, airbnbUrl, propertyUrl, sourceOwnerConfirmed = false, type = "airbnb", targetAudience = "everyone", language, mood } = prompt;

    // Default values — will be overridden by scraping
    let targetLocation = city || "";
    let listingName = "";
    let scrapedInfo = "";
    let realCoverImageUrl: string | undefined;
    let realDescription: string | undefined;
    let realAmenities: string[] = [];

    if (airbnbUrl) {
        const imported = await importAirbnbListing(airbnbUrl, sourceOwnerConfirmed);
        scrapedInfo = imported.dataText;

        if (imported.listingName) listingName = imported.listingName;
        if (imported.city) targetLocation = imported.city;
        if (imported.coverImageUrl) realCoverImageUrl = imported.coverImageUrl;
        if (imported.description) realDescription = imported.description;
        if (imported.amenities?.length) realAmenities = imported.amenities;

        if (imported.warning) {
            console.warn(`[guide-generator] Airbnb import warning: ${imported.warning}`);
        }

        // Safe fallback: infer only from the URL path itself, never by bypassing platform controls.
        if (!listingName || !targetLocation) {
            try {
                const urlObj = new URL(airbnbUrl);
                const pathParts = urlObj.pathname.split('/');
                const roomPart = pathParts.find(p => p && p !== 'rooms');
                if (roomPart && !/^\d+$/.test(roomPart)) {
                    const nameWithoutId = roomPart.replace(/-\d+$/, '').replace(/-/g, ' ');
                    if (!listingName) listingName = nameWithoutId.charAt(0).toUpperCase() + nameWithoutId.slice(1);
                }
            } catch {
                // URL validation is handled by the importer.
            }
        }
    } else if (propertyUrl) {
        const imported = await importPropertyWebsite(propertyUrl, sourceOwnerConfirmed);
        scrapedInfo = imported.dataText;

        if (imported.propertyName) listingName = imported.propertyName;
        if (imported.city) targetLocation = imported.city;
        if (imported.coverImageUrl) realCoverImageUrl = imported.coverImageUrl;
        if (imported.description) realDescription = imported.description;
        if (imported.amenities?.length) realAmenities = imported.amenities;

        if (imported.warning) {
            console.warn(`[guide-generator] Website import warning: ${imported.warning}`);
        }
    }

    // Final fallbacks
    const propertyLabel = type === "hotel"
        ? "Hotel"
        : type === "guest_house"
            ? "Guest House"
            : type === "airbnb"
                ? "Vacation Rental"
                : "Property";
    if (!listingName) listingName = city ? `${propertyLabel} - ${city}` : `My ${propertyLabel}`;
    if (!targetLocation) targetLocation = city || "Destination";

    const openai = createOpenAIClient();

    if (!openai) {
        console.warn("Missing OPENAI_API_KEY, returning mock data.");
        return generateMockGuide(prompt);
    }

    const systemPrompt = `
You are an expert hospitality guest-experience designer. Create a complete, personalized JSON guest experience for the property based on the verified/imported data below.

=== REAL LISTING DATA (provided/imported from the host listing source) ===
- Listing Title: ${listingName}
- Exact City / Location: ${targetLocation}
- Property type: ${type}
- Language to use: ${language} (ALL output text must be in this language)
- Source URL: ${airbnbUrl || propertyUrl || 'N/A'}
${realDescription ? `- Real Listing Description: ${realDescription}` : ''}
${realAmenities.length > 0 ? `- Real Amenities from listing: ${realAmenities.join(', ')}` : ''}
${scrapedInfo ? `\n=== IMPORTED LISTING METADATA ===\n${scrapedInfo}` : ''}

=== CRITICAL INSTRUCTIONS ===
1. LOCATION: The guide location is "${targetLocation}". Use ONLY this city for local recommendations (places, events, transport). NEVER use Paris or any other city.
2. HERO IMAGE: Set "coverImageUrl" to "__USE_REAL_PHOTO__" — it will be replaced with the actual listing photo automatically.
3. PROPERTY DETAILS: Use the real property title, description, and amenities above to fill in the blocks. Do NOT invent generic property facts when real data is provided.
4. PLACES: List 3 real restaurants or cafes that genuinely exist in ${targetLocation}. Use your knowledge of the city.
5. AMENITIES: Use the real amenities list above. If unavailable, infer from the description.
6. RULES: Extract from the description if available; otherwise provide only clearly editable suggestions appropriate to this property type.
7. Wi-Fi and access data: Use obvious editable placeholders. Never present invented access credentials as real.
8. REVENUE SERVICES: If the source explicitly mentions services such as breakfast, spa, transfers, restaurant or experiences, add an upsells block using those real service names. Never invent a price; use an empty price when none is provided.

Required blocks (in order): hero, welcome, wifi, checkin, amenities, places, transport. Add rules and upsells only when appropriate.

Output STRICTLY valid JSON:
{
  "title": "string",
  "location": "${targetLocation}",
  "blocks": [
    { "type": "hero", "title": "string", "data": { "title": "string", "subtitle": "string", "coverImageUrl": "__USE_REAL_PHOTO__", "badges": ["string"] } },
    { "type": "wifi", "title": "string", "data": { "networkName": "string", "password": "string" } },
    { "type": "checkin", "title": "string", "data": { "time": "15:00", "instruction": "string" } },
    { "type": "welcome", "title": "string", "data": { "title": "string", "content": "string" } },
    { "type": "rules", "title": "string", "data": { "items": [{ "text": "string" }] } },
    { "type": "amenities", "title": "string", "data": { "items": [{ "text": "string" }] } },
    { "type": "places", "title": "string", "data": { "items": [{ "name": "string", "description": "string", "address": "string" }] } },
    { "type": "events", "title": "string", "data": { "items": [{ "title": "string", "month": "JAN", "day": 1, "description": "string" }] } },
    { "type": "transport", "title": "string", "data": { "options": [{ "type": "taxi|bus|train", "name": "string", "description": "string" }] } },
    { "type": "upsells", "title": "string", "data": { "items": [{ "title": "string", "category": "breakfast|spa|transfer|food_beverage|experience|other", "description": "string", "priceAmount": "", "currency": "MAD", "pricingType": "quote", "cta": "Request this service" }] } }
  ]
}
`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Generate a complete, personalized welcome guide using the listing details and location provided in the context above. The experience MUST be for the exact location specified (${targetLocation || "the property's actual city"}) — do NOT invent a different city.` }
            ],
            temperature: 0.7,
        });

        const content = response.choices[0]?.message?.content || "{}";
        const json = cleanAIJSON(content);
        
        const finalLocation = json.location || targetLocation || "Destination";

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

        // Resolve hero cover image: prioritize imported listing photo > theme bg > nothing
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
