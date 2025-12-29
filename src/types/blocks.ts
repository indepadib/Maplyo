import { z } from "zod";

export const BlockTypeSchema = z.enum([
  "hero", "welcome", "contact", "checkin", "access_codes", "wifi", "location", "rules", "amenities",
  "checkout", "faq", "places", "events", "documents", "upsells", "embed",
  "trash", "parking", "breakfast", "transport", // New blocks
]);
export type BlockType = z.infer<typeof BlockTypeSchema>;

export const VisibilityRuleSchema = z.object({
  mode: z.enum(["always", "with_code", "date_based"]).default("always"),
  unlockCode: z.string().min(3).max(12).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
}).default({ mode: "always" });
export type VisibilityRule = z.infer<typeof VisibilityRuleSchema>;

export const HeroBlockDataSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
  badges: z.array(z.string()).default([]),
});
export type HeroBlockData = z.infer<typeof HeroBlockDataSchema>;

export const WifiBlockDataSchema = z.object({
  networkName: z.string().min(1),
  password: z.string().min(1),
  notes: z.string().optional(),
});
export type WifiBlockData = z.infer<typeof WifiBlockDataSchema>;

export const AccessCodesBlockDataSchema = z.object({
  apartmentDoorCode: z.string().optional(),
  buildingDoorCode: z.string().optional(),
  gateCode: z.string().optional(),
  notes: z.string().optional(),
});
export type AccessCodesBlockData = z.infer<typeof AccessCodesBlockDataSchema>;

export const CheckinBlockDataSchema = z.object({
  time: z.string().default("15:00"),
  instruction: z.string().optional(),
  videoUrl: z.string().optional(),
  images: z.array(z.string()).default([]),
});
export type CheckinBlockData = z.infer<typeof CheckinBlockDataSchema>;

export const LocationBlockDataSchema = z.object({
  address: z.string().optional(),
  googleMapsUrl: z.string().optional(),
});
export type LocationBlockData = z.infer<typeof LocationBlockDataSchema>;

export const ContactBlockDataSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().optional(),
});
export type ContactBlockData = z.infer<typeof ContactBlockDataSchema>;

export const RulesBlockDataSchema = z.object({
  items: z.array(z.object({ text: z.string() })).default([]),
});
export type RulesBlockData = z.infer<typeof RulesBlockDataSchema>;

export const AmenitiesBlockDataSchema = z.object({
  items: z.array(z.object({ text: z.string() })).default([]),
});
export type AmenitiesBlockData = z.infer<typeof AmenitiesBlockDataSchema>;

export const FaqBlockDataSchema = z.object({
  items: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
});
export type FaqBlockData = z.infer<typeof FaqBlockDataSchema>;

export const WelcomeBlockDataSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type WelcomeBlockData = z.infer<typeof WelcomeBlockDataSchema>;

export const PlacesBlockDataSchema = z.object({
  items: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    address: z.string().optional(),
    url: z.string().optional(),
    imageUrl: z.string().optional(),
    photos: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    priceLevel: z.enum(['cheap', 'moderate', 'expensive']).optional(),
    rating: z.number().min(0).max(5).optional(),
  })).default([]),
});
export type PlacesBlockData = z.infer<typeof PlacesBlockDataSchema>;

export const EventsBlockDataSchema = z.object({
  items: z.array(z.object({
    title: z.string(),
    month: z.string().optional(),
    day: z.union([z.string(), z.number()]).optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
  })).default([]),
});
export type EventsBlockData = z.infer<typeof EventsBlockDataSchema>;

export const DocumentsBlockDataSchema = z.object({
  items: z.array(z.object({
    title: z.string(),
    url: z.string(),
    description: z.string().optional(),
  })).default([]),
});
export type DocumentsBlockData = z.infer<typeof DocumentsBlockDataSchema>;

export const UpsellsBlockDataSchema = z.object({
  items: z.array(z.object({
    title: z.string(),
    price: z.string().optional(),
    description: z.string().optional(),
    cta: z.string().optional(),
    url: z.string().optional(),
    imageUrl: z.string().optional(),
  })).default([]),
});
export type UpsellsBlockData = z.infer<typeof UpsellsBlockDataSchema>;

export const EmbedBlockDataSchema = z.object({
  url: z.string().url(),
});
export type EmbedBlockData = z.infer<typeof EmbedBlockDataSchema>;

export const TrashBlockDataSchema = z.object({
  instructions: z.string().optional(),
  trashDay: z.string().optional(),
  recyclingDay: z.string().optional(),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type TrashBlockData = z.infer<typeof TrashBlockDataSchema>;

export const ParkingBlockDataSchema = z.object({
  instructions: z.string().optional(),
  location: z.string().optional(),
  cost: z.string().optional(),
  mapUrl: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type ParkingBlockData = z.infer<typeof ParkingBlockDataSchema>;

export const BreakfastBlockDataSchema = z.object({
  time: z.string().optional(), // e.g. "07:00 - 10:00"
  location: z.string().optional(),
  menu: z.string().optional(),
});
export type BreakfastBlockData = z.infer<typeof BreakfastBlockDataSchema>;

export const TransportBlockDataSchema = z.object({
  options: z.array(z.object({
    type: z.enum(["bus", "train", "taxi", "uber", "bike", "other"]).default("other"),
    name: z.string(),
    description: z.string().optional(),
    url: z.string().optional(),
    phone: z.string().optional(),
  })).default([]),
});
export type TransportBlockData = z.infer<typeof TransportBlockDataSchema>;

export type GuideTheme = { themeId: string; customImage?: string; };

export type GuideBlock = {
  id: string;
  type: BlockType;
  title?: string;
  visibility?: VisibilityRule;
  data: unknown;
};

export type Guide = {
  id: string;
  slug: string;
  title: string;
  theme: GuideTheme;
  blocks: GuideBlock[];
  updatedAt?: string;
  isPublished?: boolean;
};

export function isSensitiveBlock(type: BlockType) {
  return type === "access_codes";
}
