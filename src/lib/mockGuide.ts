import type { Guide } from "@/types/blocks";

export const mockGuide: Guide = {
  id: "demo",
  slug: "demo",
  title: "Riad Atlas — Guide Voyageur",
  theme: { themeId: "minimal" },
  blocks: [
    {
      id: "b1",
      type: "hero",
      data: {
        title: "Bienvenue au Riad Atlas",
        subtitle: "Tout ce qu’il faut pour un séjour simple et smooth ✨",
        coverImageUrl:
          "https://images.unsplash.com/photo-1542317854-0d52026788b9?auto=format&fit=crop&w=1600&q=80",
        badges: ["Wi‑Fi rapide", "Check‑in autonome", "Médina"],
      },
    },
    {
      id: "b2",
      type: "wifi",
      title: "Wi‑Fi",
      data: {
        networkName: "RIAD_ATLAS_5G",
        password: "atlas2026",
        notes: "Si ça coupe : redémarre le routeur (salon) 10 secondes.",
      },
    },
    {
      id: "b3",
      type: "access_codes",
      title: "Codes d’accès",
      visibility: { mode: "with_code", unlockCode: "2580" },
      data: {
        apartmentDoorCode: "12A3",
        buildingDoorCode: "8899",
        gateCode: "77#",
        notes: "Merci de bien refermer la porte après chaque passage.",
      },
    },
  ],
};
