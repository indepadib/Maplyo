import { Guide, BlockType } from "@/types/blocks";
import { guideThemes } from "@/types/themes";
import { createOpenAIClient, cleanAIJSON } from "./openai";

export interface GuidePrompt {
    city: string;
    type: "airbnb" | "hotel" | "guest_house" | "other";
    targetAudience: "families" | "couples" | "remote_workers" | "groups" | "everyone";
    language: "fr" | "en";
    mood?: "relax" | "adventure" | "romantic" | "business";
    amenities?: string[];
}

function uid() { return Math.random().toString(36).slice(2, 10); }

export async function generateGuide(prompt: GuidePrompt): Promise<Guide> {
    const { city, type, targetAudience, language, mood } = prompt;

    // Fallbck if no API key
    const openai = createOpenAIClient();

    // Fallbck if no API key
    if (!openai) {
        console.warn("Missing OPENAI_API_KEY, returning mock data.");
        return generateMockGuide(prompt);
    }

    const systemPrompt = `
    You are an expert travel guide creator. 
    Create a complete JSON guide for a short-term rental in "${city}".
    
    Context:
    - Type: ${type}
    - Audience: ${targetAudience}
    - Language: ${language} (Strictly output content in this language)
    - Mood: ${mood || "welcoming"}

    Required Blocks (in order):
    1. hero (Essential! Title of the guide, subtitle, and an appealing cover image URL)
    2. wifi (Suggest a secure password, mock credentials)
    3. checkin (Standard 3PM, mock code)
    4. rules (Appropriate for audience)
    5. amenities (Mention 5 key amenities)
    6. places (3 best LOCAL restaurants/cafes with real names & approximate addresses if known)
    7. events (2 fictional or seasonal events typcial for the city)
    8. transport (How to get around)
    
    Output strictly valid JSON matching this TypeScript structure:
    {
      "title": "string",
      "blocks": [
        { "type": "hero", "title": "string", "data": { "title": "string", "subtitle": "string", "coverImageUrl": "url_string", "badges": ["string"] } },
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
                { role: "user", content: `Generate a guide for ${city}.` }
            ],
            temperature: 0.7,
        });

        const content = response.choices[0]?.message?.content || "{}";
        const json = cleanAIJSON(content);

        // Post-processing: Add IDs and visibility
        const matchedTheme = guideThemes.find(t =>
            t.name.toLowerCase().includes(city.toLowerCase()) ||
            t.id.includes(city.toLowerCase())
        ) || guideThemes[0];

        const blocks = (json.blocks || []).map((b: any) => ({
            ...b,
            id: uid(),
            visibility: { mode: "always" },
            // Ensure data integrity
            data: b.data || {}
        }));

        // Fallback: Ensure Hero exists if AI forgot it
        let heroBlock = blocks.find((b: any) => b.type === "hero");
        if (!heroBlock) {
            // Create default Hero from Welcome or scratch
            heroBlock = {
                id: uid(),
                type: "hero",
                title: "Hero",
                visibility: { mode: "always" },
                data: {
                    title: json.title || `Guide ${city}`,
                    subtitle: "Bienvenue dans votre guide personnel",
                    coverImageUrl: matchedTheme.bgImage,
                    badges: ["Wi-Fi", "Piscine"]
                }
            };
            blocks.unshift(heroBlock);
        } else if (!heroBlock.data.coverImageUrl) {
            heroBlock.data.coverImageUrl = matchedTheme.bgImage;
        }

        return {
            id: uid(),
            slug: `${city.toLowerCase().replace(/\s+/g, '-')}-${uid()}`,
            title: json.title || `Guide ${city}`,
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
