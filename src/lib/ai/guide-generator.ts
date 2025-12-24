import { Guide, BlockType } from "@/types/blocks";
import { guideThemes } from "@/types/themes";

export interface GuidePrompt {
    city: string;
    type: "airbnb" | "hotel" | "guest_house" | "other";
    targetAudience: "families" | "couples" | "remote_workers" | "groups" | "everyone";
    language: "fr" | "en";
    mood?: "relax" | "adventure" | "romantic" | "business";
    amenities?: string[];
}

function uid() { return Math.random().toString(36).slice(2, 10); }

// MOCK DATA GENERATOR (Simulates AI)
export async function generateGuide(prompt: GuidePrompt): Promise<Guide> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const cityLower = prompt.city.toLowerCase();

    // Theme Strategy: Try to find a theme matching the city, otherwise random or default
    const matchedTheme = guideThemes.find(t =>
        t.name.toLowerCase().includes(cityLower) ||
        t.id.includes(cityLower)
    ) || guideThemes[0];

    const lang = prompt.language;

    // Content Templates by City (Simulating AI Knowledge)
    const isMarrakech = cityLower.includes("marrakech");
    const isParis = cityLower.includes("paris");

    // Mood-based welcome message
    let moodMessage = "";
    if (prompt.mood === "relax") moodMessage = lang === "fr" ? "Détendez-vous et profitez." : "Relax and enjoy.";
    if (prompt.mood === "adventure") moodMessage = lang === "fr" ? "Prêt pour l'aventure ?" : "Ready for adventure?";
    if (prompt.mood === "romantic") moodMessage = lang === "fr" ? "Un séjour inoubliable en amoureux." : "an unforgettable romantic stay.";
    if (prompt.mood === "business") moodMessage = lang === "fr" ? "Un espace calme pour travailler." : "A quiet space to work.";

    const commonBlocks = [
        {
            id: uid(),
            type: "welcome" as BlockType,
            title: lang === "fr" ? "Bienvenue !" : "Welcome!",
            visibility: { mode: "always" as const },
            data: {
                coverImage: matchedTheme.bgImage,
                message: lang === "fr"
                    ? `Nous sommes ravis de vous accueillir à ${prompt.city}. ${moodMessage} Profitez de votre séjour !`
                    : `We are delighted to welcome you to ${prompt.city}. ${moodMessage} Enjoy your stay!`,
                signature: "Votre Hôte"
            }
        },
        {
            id: uid(),
            type: "wifi" as BlockType,
            title: "Wi-Fi",
            visibility: { mode: "always" as const },
            data: {
                networkName: "Guest_Wifi",
                password: "happy_traveler",
                security: "WPA2"
            }
        },
        {
            id: uid(),
            type: "checkin" as BlockType, // Fixed type name
            title: lang === "fr" ? "Arrivée" : "Check-in",
            visibility: { mode: "always" as const },
            data: {
                time: "15:00",
                instruction: lang === "fr"
                    ? "Le code de la boîte à clés est 1234. Entrez par la porte principale."
                    : "The keybox code is 1234. Enter through the main door."
            }
        },
        {
            id: uid(),
            type: "rules" as BlockType,
            title: lang === "fr" ? "Règlement" : "House Rules",
            visibility: { mode: "always" as const },
            data: {
                items: lang === "fr"
                    ? [{ text: "Pas de fêtes" }, { text: "Non fumeur" }, { text: "Respectez le voisinage" }]
                    : [{ text: "No parties" }, { text: "No smoking" }, { text: "Respect neighbors" }]
            }
        },
        // Generated Amenities Block
        {
            id: uid(),
            type: "amenities" as BlockType,
            title: lang === "fr" ? "Équipements" : "Amenities",
            visibility: { mode: "always" as const },
            data: {
                items: (prompt.amenities && prompt.amenities.length > 0)
                    ? prompt.amenities.map(a => ({ text: a }))
                    : (lang === "fr"
                        ? [{ text: "Wi-Fi" }, { text: "Cuisine équipée" }, { text: "Lave-linge" }]
                        : [{ text: "Wi-Fi" }, { text: "Kitchen" }, { text: "Washing machine" }])
            }
        }
    ];

    // Specific Content (Simulating AI "Hallucination" based on context)
    let cityBlocks: any[] = [];

    if (isMarrakech) {
        cityBlocks = [
            {
                id: uid(),
                type: "places" as BlockType,
                title: lang === "fr" ? "Mes Restaurants Préférés" : "My Favorite Restaurants",
                visibility: { mode: "always" as const },
                data: {
                    items: [ // Fixed data structure key
                        { name: "Le Jardin", description: "Oasis de calme dans la médina.", address: "32 Souk El Jeld", googleMapsUrl: "#" },
                        { name: "Nomad", description: "Vue imprenable sur la place des épices.", address: "1 Derb Aarjan", googleMapsUrl: "#" }
                    ]
                }
            },
            {
                id: uid(),
                type: "faq" as BlockType,
                title: "FAQ",
                visibility: { mode: "always" as const },
                data: {
                    items: [
                        { question: "Taxi ?", answer: "Fixez le prix avant de monter !" },
                        { question: "Eau ?", answer: "Préférez l'eau en bouteille." }
                    ]
                }
            }
        ];
    } else if (isParis) {
        cityBlocks = [
            {
                id: uid(),
                type: "places" as BlockType,
                title: lang === "fr" ? "Boulangeries" : "Bakeries",
                visibility: { mode: "always" as const },
                data: {
                    items: [
                        { name: "Du Pain et des Idées", description: "Le meilleur pain au chocolat.", address: "34 Rue Yves Toudic", googleMapsUrl: "#" }
                    ]
                }
            }
        ];
    }

    return {
        id: uid(),
        slug: `${prompt.city.toLowerCase().replace(/\s+/g, '-')}-${uid()}`,
        title: `${lang === "fr" ? "Guide" : "Guide"} ${prompt.city} ${prompt.mood ? `(${prompt.mood})` : ""}`,
        theme: { themeId: matchedTheme.id },
        blocks: [...commonBlocks, ...cityBlocks],
        updatedAt: new Date().toISOString(), // Fixed timestamp type (string)
        // @ts-ignore
        generatedByAI: true
    };
}
