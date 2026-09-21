import { Guide, BlockType } from "@/types/blocks";
import type { Language } from "@/lib/i18n/dictionary";
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
    language: Language;
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
4. VERIFIED-ONLY LOCAL DATA: Never invent restaurants, cafés, addresses, opening hours, phone numbers, transport providers, ratings or local recommendations. Add a places or transport block ONLY when the imported source explicitly contains that information.
5. AMENITIES: Use amenities explicitly imported from the property source or clearly supported by its description. Do not invent amenities.
6. RULES: Add rules ONLY when they are explicitly present in the imported source. Otherwise omit the rules block.
7. Wi-Fi and access data: Use obvious editable placeholders such as "EDIT_ME". Never present invented access credentials as real.
8. REVENUE SERVICES: Add an upsells block ONLY when the source explicitly mentions a service such as breakfast, spa, transfer, restaurant or experience. Never invent a price; leave price empty when unavailable.
9. UNCERTAINTY: It is better to omit a block than to fill it with unverified facts.

Required base blocks (in order): hero, welcome, wifi, checkin. Add amenities, places, transport, rules and upsells only when supported by imported information.

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
                { role: "user", content: `Generate a complete, personalized welcome guide using only the verified property details provided above. The experience MUST be for the exact location specified (${targetLocation || "the property's actual city"}). Omit any factual block that cannot be supported by the imported source instead of inventing details.` }
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

const MOCK_COPY: Record<Language, {
    guide: string;
    welcome: string;
    subtitle: string;
    fallback: string;
    places: string;
    cafe: string;
    cafeDesc: string;
    restaurant: string;
    restaurantDesc: string;
    central: string;
}> = {
    fr: { guide: "Guide", welcome: "Bienvenue à", subtitle: "Votre expérience voyageur", fallback: "Mode de secours local", places: "À proximité", cafe: "Café local", cafeDesc: "Une adresse à personnaliser.", restaurant: "Restaurant local", restaurantDesc: "Ajoutez ici une recommandation vérifiée.", central: "Central" },
    en: { guide: "Guide", welcome: "Welcome to", subtitle: "Your guest experience", fallback: "Local fallback mode", places: "Nearby", cafe: "Local café", cafeDesc: "A place to customize.", restaurant: "Local restaurant", restaurantDesc: "Add a verified recommendation here.", central: "Central" },
    es: { guide: "Guía", welcome: "Bienvenido a", subtitle: "Tu experiencia huésped", fallback: "Modo local de respaldo", places: "Cerca", cafe: "Café local", cafeDesc: "Un lugar para personalizar.", restaurant: "Restaurante local", restaurantDesc: "Añade aquí una recomendación verificada.", central: "Céntrico" },
    ar: { guide: "دليل", welcome: "مرحباً بك في", subtitle: "تجربة الضيف الخاصة بك", fallback: "وضع احتياطي محلي", places: "بالقرب منك", cafe: "مقهى محلي", cafeDesc: "مكان يمكنك تخصيصه.", restaurant: "مطعم محلي", restaurantDesc: "أضف توصية موثوقة هنا.", central: "مركزي" },
    nl: { guide: "Gids", welcome: "Welkom in", subtitle: "Je gastervaring", fallback: "Lokale fallbackmodus", places: "In de buurt", cafe: "Lokaal café", cafeDesc: "Een plek om aan te passen.", restaurant: "Lokaal restaurant", restaurantDesc: "Voeg hier een geverifieerde aanbeveling toe.", central: "Centraal" },
    zh: { guide: "指南", welcome: "欢迎来到", subtitle: "你的住客体验", fallback: "本地备用模式", places: "附近", cafe: "本地咖啡馆", cafeDesc: "可在这里自定义地点。", restaurant: "本地餐厅", restaurantDesc: "在这里添加经过确认的推荐。", central: "市中心" },
    pt: { guide: "Guia", welcome: "Bem-vindo a", subtitle: "A sua experiência do hóspede", fallback: "Modo local de contingência", places: "Perto", cafe: "Café local", cafeDesc: "Um local para personalizar.", restaurant: "Restaurante local", restaurantDesc: "Adicione aqui uma recomendação verificada.", central: "Central" },
};

// Keep a localized mock function as fallback.
async function generateMockGuide(prompt: GuidePrompt): Promise<Guide> {
    const { city, language } = prompt;
    const lang = language;
    const copy = MOCK_COPY[lang] || MOCK_COPY.en;
    const theme = guideThemes[0];
    const place = city || "Destination";

    return {
        id: uid(),
        slug: `mock-${String(place).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        title: `${copy.guide} ${place} (${copy.fallback})`,
        theme: { themeId: theme.id },
        blocks: [
            {
                id: uid(),
                type: "hero",
                title: "Hero",
                visibility: { mode: "always" },
                data: {
                    title: `${copy.welcome} ${place}`,
                    subtitle: copy.subtitle,
                    coverImageUrl: theme.bgImage,
                    badges: ["Wi-Fi", copy.central]
                }
            },
            {
                id: uid(),
                type: "wifi",
                title: "Wi-Fi",
                visibility: { mode: "always" },
                data: { networkName: "Guest_WiFi", password: "EDIT_ME" }
            },
            {
                id: uid(),
                type: "places",
                title: copy.places,
                visibility: { mode: "always" },
                data: {
                    items: [
                        { name: copy.cafe, description: copy.cafeDesc, address: "" },
                        { name: copy.restaurant, description: copy.restaurantDesc, address: "" }
                    ]
                }
            }
        ],
        updatedAt: new Date().toISOString()
    };
}
