export interface GuideTheme {
    id: string;
    name: string;
    description: string;

    // Couleurs épurées
    primary: string;        // Couleur principale (pour pictos, boutons)
    background: string;     // Fond - couleur unie OU image
    cardBg: string;        // Fond des cartes/sections
    text: string;          // Texte principal
    textLight: string;     // Texte secondaire
    border: string;        // Bordures

    // Type de fond
    bgType: "color" | "image";
    bgImage?: string;      // URL de l'image de fond (optionnel)
}

export const guideThemes: GuideTheme[] = [
    {
        id: "minimal-white",
        name: "Blanc Minimaliste",
        description: "Épuré et simple",
        primary: "#2563EB",
        background: "#FFFFFF",
        cardBg: "#FFFFFF",
        text: "#111827",
        textLight: "#6B7280",
        border: "#E5E7EB",
        bgType: "color",
    },
    {
        id: "soft-gray",
        name: "Gris Doux",
        description: "Élégant et neutre",
        primary: "#059669",
        background: "#F9FAFB",
        cardBg: "#FFFFFF",
        text: "#111827",
        textLight: "#6B7280",
        border: "#E5E7EB",
        bgType: "color",
    },
    {
        id: "ocean",
        name: "Océan",
        description: "Apaisant et frais",
        primary: "#0EA5E9",
        background: "#F0F9FF",
        cardBg: "#FFFFFF",
        text: "#0C4A6E",
        textLight: "#0369A1",
        border: "#BAE6FD",
        bgType: "color",
    },
    {
        id: "nature",
        name: "Nature",
        description: "Calme et naturel",
        primary: "#10B981",
        background: "#F0FDF4",
        cardBg: "#FFFFFF",
        text: "#064E3B",
        textLight: "#065F46",
        border: "#A7F3D0",
        bgType: "color",
    },
    {
        id: "sunset",
        name: "Sunset",
        description: "Chaleureux et accueillant",
        primary: "#F59E0B",
        background: "#FFFBEB",
        cardBg: "#FFFFFF",
        text: "#78350F",
        textLight: "#92400E",
        border: "#FDE68A",
        bgType: "color",
    },
    {
        id: "paris",
        name: "Paris",
        description: "Tour Eiffel en fond",
        primary: "#1F2937",
        background: "#F3F4F6",
        cardBg: "rgba(255, 255, 255, 0.95)",
        text: "#111827",
        textLight: "#6B7280",
        border: "#D1D5DB",
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80",
    },
    {
        id: "beach",
        name: "Plage",
        description: "Mer et sable",
        primary: "#0EA5E9",
        background: "#F0F9FF",
        cardBg: "rgba(255, 255, 255, 0.95)",
        text: "#0C4A6E",
        textLight: "#0369A1",
        border: "#BAE6FD",
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    },
    {
        id: "mountains",
        name: "Montagnes",
        description: "Paysage alpin",
        primary: "#475569",
        background: "#F8FAFC",
        cardBg: "rgba(255, 255, 255, 0.95)",
        text: "#1E293B",
        textLight: "#475569",
        border: "#CBD5E1",
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    },
    {
        id: "luxury",
        name: "Luxe Doré",
        description: "Élégance ultime",
        primary: "#B45309",
        background: "#FEF3C7",
        cardBg: "rgba(255, 255, 255, 0.98)",
        text: "#451A03",
        textLight: "#92400E",
        border: "#FDE68A",
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1631631480669-535cc43f2327?w=1920&q=80", // Marble background
    },
    {
        id: "zen",
        name: "Zen & Bambou",
        description: "Calme et sérénité",
        primary: "#3F6212",
        background: "#ECFCCB",
        cardBg: "rgba(255, 255, 255, 0.95)",
        text: "#1A2E05",
        textLight: "#365314",
        border: "#D9F99D",
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1621262332616-92842aa15252?w=1920&q=80", // Soft stone/nature
    },
    {
        id: "abstract",
        name: "Art Moderne",
        description: "Créatif et audacieux",
        primary: "#7C3AED",
        background: "#F5F3FF",
        cardBg: "rgba(255, 255, 255, 0.95)",
        text: "#4C1D95",
        textLight: "#6D28D9",
        border: "#DDD6FE",
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1920&q=80", // Abstract geometry
    },
    {
        id: "industrial",
        name: "Loft Industriel",
        description: "Béton et caractère",
        primary: "#ea580c", // Orange brûlé
        background: "#1c1917",
        cardBg: "rgba(28, 25, 23, 0.95)", // Stone 900
        text: "#fafaf9", // Stone 50
        textLight: "#a8a29e", // Stone 400
        border: "#44403c", // Stone 700
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1920&q=80", // Raw concrete/loft
    },
    {
        id: "coastal",
        name: "Villa Côtière",
        description: "Lumière et horizon",
        primary: "#0284c7", // Sky 600
        background: "#f0f9ff",
        cardBg: "rgba(255, 255, 255, 0.9)",
        text: "#0c4a6e", // Sky 900
        textLight: "#0369a1", // Sky 700
        border: "#bae6fd", // Sky 200
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1920&q=80", // Bright coastal interior
    },
    {
        id: "mountain-chalet",
        name: "Chalet Alpin",
        description: "Bois et chaleur",
        primary: "#b45309", // Amber 700
        background: "#fffbeb",
        cardBg: "rgba(255, 255, 255, 0.95)",
        text: "#451a03", // Amber 950
        textLight: "#92400e", // Amber 800
        border: "#fde68a", // Amber 200
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1920&q=80", // Cozy cabin wood
    },
    {
        id: "urban-night",
        name: "Nuit Urbaine",
        description: "Lumières de la ville",
        primary: "#8b5cf6", // Violet 500
        background: "#0f172a", // Slate 900
        cardBg: "rgba(15, 23, 42, 0.9)",
        text: "#f8fafc", // Slate 50
        textLight: "#94a3b8", // Slate 400
        border: "#334155", // Slate 700
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80", // City bokeh
    },
    {
        id: "kyoto",
        name: "Jardin Kyoto",
        description: "Harmonie et nature",
        primary: "#15803d", // Green 700
        background: "#f0fdf4",
        cardBg: "rgba(255, 255, 255, 0.95)",
        text: "#14532d", // Green 900
        textLight: "#166534", // Green 800
        border: "#bbf7d0", // Green 200
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1624823183492-16c841cb8c1e?w=1920&q=80", // Japanese garden
    },
    // Moroccan Themes
    {
        id: "marrakech",
        name: "Marrakech",
        description: "Ocre et chaleur",
        primary: "#c2410c", // Orange 700 (Terracotta)
        background: "#fff7ed", // Orange 50
        cardBg: "rgba(255, 255, 255, 0.95)",
        text: "#7c2d12", // Orange 900
        textLight: "#9a3412", // Orange 800
        border: "#fed7aa", // Orange 200
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1597211684694-8f2382286548?w=1920&q=80", // Marrakech Riad/Arch
    },
    {
        id: "chefchaouen",
        name: "Chefchaouen",
        description: "La Perle Bleue",
        primary: "#0284c7", // Sky 600
        background: "#eff6ff", // Blue 50
        cardBg: "rgba(255, 255, 255, 0.92)",
        text: "#0c4a6e", // Sky 900
        textLight: "#0369a1", // Sky 700
        border: "#bae6fd", // Sky 200
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920&q=80", // Blue streets
    },
    {
        id: "casablanca",
        name: "Casablanca",
        description: "Moderne et blanc",
        primary: "#0f172a", // Slate 900
        background: "#f8fafc", // Slate 50
        cardBg: "rgba(255, 255, 255, 0.98)",
        text: "#1e293b", // Slate 800
        textLight: "#64748b", // Slate 500
        border: "#e2e8f0", // Slate 200
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1577147443647-81856d5151af?w=1920&q=80", // Hassan II Mosque detail
    },
    {
        id: "tanger",
        name: "Tanger",
        description: "Méditerranée",
        primary: "#0d9488", // Teal 600
        background: "#f0fdfa", // Teal 50
        cardBg: "rgba(255, 255, 255, 0.95)",
        text: "#134e4a", // Teal 900
        textLight: "#0f766e", // Teal 700
        border: "#99f6e4", // Teal 200
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1552596850-25e219fb9166?w=1920&q=80", // Tangier coast
    },
    {
        id: "fes",
        name: "Fès",
        description: "Histoire et authenticité",
        primary: "#854d0e", // Yellow 800 (Leather/Gold)
        background: "#fefce8", // Yellow 50
        cardBg: "rgba(255, 255, 255, 0.95)",
        text: "#422006", // Yellow 950
        textLight: "#a16207", // Yellow 700
        border: "#fde047", // Yellow 300
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=80", // Fes tannery/architecture
    },
    {
        id: "agadir",
        name: "Agadir",
        description: "Soleil et Océan",
        primary: "#f59e0b", // Amber 500
        background: "#fffbeb", // Amber 50
        cardBg: "rgba(255, 255, 255, 0.92)",
        text: "#78350f", // Amber 900
        textLight: "#b45309", // Amber 700
        border: "#fcd34d", // Amber 300
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1580649721798-75ce479269d0?w=1920&q=80", // Agadir beach/palm
    },
];
