import React from "react";
import { HeroTraveler } from "./traveler/HeroTraveler";
import { WifiTraveler } from "./traveler/WifiTraveler";
import { AccessCodesTraveler } from "./traveler/AccessCodesTraveler";
import { TrashTraveler, ParkingTraveler, BreakfastTraveler, TransportTraveler, CheckinTraveler, ContactTraveler, LocationTraveler, RulesTraveler, AmenitiesTraveler, FaqTraveler } from "./traveler/SpecializedTravelers";
import { WelcomeTraveler, PlacesTraveler, EventsTraveler, DocumentsTraveler, UpsellsTraveler, EmbedTraveler } from "./traveler/DynamicTravelers";

import { HeroEditor } from "./editor/HeroEditor";
import { WifiEditor } from "./editor/WifiEditor";
import { AccessCodesEditor } from "./editor/AccessCodesEditor";
import { TrashEditor, ParkingEditor, BreakfastEditor, TransportEditor, CheckinEditor, ContactEditor, LocationEditor, RulesEditor, AmenitiesEditor, FaqEditor } from "./editor/SpecializedEditors";
import { WelcomeEditor, PlacesEditor, EventsEditor, DocumentsEditor, UpsellsEditor, EmbedEditor } from "./editor/DynamicEditors";
import {
  HeroBlockDataSchema,
  WifiBlockDataSchema,
  AccessCodesBlockDataSchema,
  CheckinBlockDataSchema,
  ContactBlockDataSchema,
  LocationBlockDataSchema,
  RulesBlockDataSchema,
  AmenitiesBlockDataSchema,
  FaqBlockDataSchema,
  WelcomeBlockDataSchema,
  PlacesBlockDataSchema,
  EventsBlockDataSchema,
  DocumentsBlockDataSchema,
  UpsellsBlockDataSchema,
  EmbedBlockDataSchema,
  TrashBlockDataSchema,
  ParkingBlockDataSchema,
  BreakfastBlockDataSchema,
  TransportBlockDataSchema,
  BlockType,
  VisibilityRule
} from "@/types/blocks";

export type BlockRenderContext = { mode: "traveler" | "builder"; unlocked: boolean; lang?: 'fr' | 'en' };

export type BlockDefinition = {
  type: BlockType;
  label: string;
  category: "Essentiels" | "Voyage" | "Business";
  schema?: unknown;
  defaultData: unknown;
  isSensitive?: boolean;
  Traveler: (props: { title?: string; data: any; ctx: BlockRenderContext; visibility?: VisibilityRule }) => React.JSX.Element;
  Editor: (props: { title?: string; data: any; onChange: (data: any) => void; visibility?: VisibilityRule; onChangeVisibility?: (v: VisibilityRule) => void }) => React.JSX.Element;
};

export const blockRegistry: Record<BlockType, BlockDefinition> = {
  hero: { type: "hero", label: "Hero", category: "Essentiels", schema: HeroBlockDataSchema, defaultData: { title: "Bienvenue", subtitle: "Ton guide voyageur", coverImageUrl: "", badges: [] }, Traveler: HeroTraveler, Editor: HeroEditor },
  wifi: { type: "wifi", label: "Wi‑Fi", category: "Essentiels", schema: WifiBlockDataSchema, defaultData: { networkName: "", password: "", notes: "" }, Traveler: WifiTraveler, Editor: WifiEditor },
  access_codes: { type: "access_codes", label: "Codes d’accès", category: "Essentiels", schema: AccessCodesBlockDataSchema, defaultData: { apartmentDoorCode: "", buildingDoorCode: "", gateCode: "", notes: "" }, isSensitive: true, Traveler: AccessCodesTraveler, Editor: AccessCodesEditor },

  checkin: { type: "checkin", label: "Arrivée", category: "Voyage", schema: CheckinBlockDataSchema, defaultData: { time: "15:00", instruction: "" }, Traveler: CheckinTraveler, Editor: CheckinEditor },
  checkout: { type: "checkout", label: "Départ", category: "Voyage", schema: CheckinBlockDataSchema, defaultData: { time: "11:00", instruction: "" }, Traveler: CheckinTraveler, Editor: CheckinEditor },
  location: { type: "location", label: "Localisation", category: "Voyage", schema: LocationBlockDataSchema, defaultData: { address: "", googleMapsUrl: "" }, Traveler: LocationTraveler, Editor: LocationEditor },
  contact: { type: "contact", label: "Contact", category: "Essentiels", schema: ContactBlockDataSchema, defaultData: { name: "", phone: "", whatsapp: "", email: "" }, Traveler: ContactTraveler, Editor: ContactEditor },

  rules: { type: "rules", label: "Règles", category: "Voyage", schema: RulesBlockDataSchema, defaultData: { items: [{ text: "Ne pas fumer" }, { text: "Pas de fêtes" }] }, Traveler: RulesTraveler, Editor: RulesEditor },

  // NEW BLOCKS
  trash: { type: "trash", label: "Déchets & Tri", category: "Essentiels", schema: TrashBlockDataSchema, defaultData: { instructions: "", trashDay: "", recyclingDay: "", location: "" }, Traveler: TrashTraveler, Editor: TrashEditor },
  parking: { type: "parking", label: "Parking", category: "Voyage", schema: ParkingBlockDataSchema, defaultData: { instructions: "", location: "", cost: "", mapUrl: "" }, Traveler: ParkingTraveler, Editor: ParkingEditor },
  breakfast: { type: "breakfast", label: "Petit Déjeuner", category: "Voyage", schema: BreakfastBlockDataSchema, defaultData: { time: "", location: "", menu: "" }, Traveler: BreakfastTraveler, Editor: BreakfastEditor },
  transport: { type: "transport", label: "Transports", category: "Voyage", schema: TransportBlockDataSchema, defaultData: { options: [] }, Traveler: TransportTraveler, Editor: TransportEditor },

  welcome: { type: "welcome", label: "Bienvenue", category: "Essentiels", schema: WelcomeBlockDataSchema, defaultData: { title: "Bienvenue !", content: "Ravis de vous accueillir.", imageUrl: "" }, Traveler: WelcomeTraveler, Editor: WelcomeEditor },

  amenities: { type: "amenities", label: "Équipements", category: "Voyage", schema: AmenitiesBlockDataSchema, defaultData: { items: [{ text: "Wi-Fi" }, { text: "Machine à café" }] }, Traveler: AmenitiesTraveler, Editor: AmenitiesEditor },
  faq: { type: "faq", label: "FAQ", category: "Voyage", schema: FaqBlockDataSchema, defaultData: { items: [{ question: "Y a-t-il le wifi ?", answer: "Oui, voir le bloc WiFi." }] }, Traveler: FaqTraveler, Editor: FaqEditor },

  places: { type: "places", label: "Lieux recommandés", category: "Voyage", schema: PlacesBlockDataSchema, defaultData: { items: [{ name: "Boulangerie Délicieuse", description: "Les meilleurs croissants." }] }, Traveler: PlacesTraveler, Editor: PlacesEditor },
  events: { type: "events", label: "Événements", category: "Voyage", schema: EventsBlockDataSchema, defaultData: { items: [{ title: "Fête de la ville", month: "JUI", day: 14 }] }, Traveler: EventsTraveler, Editor: EventsEditor },
  documents: { type: "documents", label: "Documents", category: "Business", schema: DocumentsBlockDataSchema, defaultData: { items: [{ title: "Manuel de la maison", url: "#" }] }, Traveler: DocumentsTraveler, Editor: DocumentsEditor },
  upsells: { type: "upsells", label: "Upsells & extras", category: "Business", schema: UpsellsBlockDataSchema, defaultData: { items: [{ title: "Départ tardif", price: "30€", description: "Profitez de votre dernière matinée." }] }, Traveler: UpsellsTraveler, Editor: UpsellsEditor },
  embed: { type: "embed", label: "Intégration Web", category: "Business", schema: EmbedBlockDataSchema, defaultData: { url: "" }, Traveler: EmbedTraveler, Editor: EmbedEditor },
};

function stub(type: BlockType, label: string): BlockDefinition {
  return {
    type,
    label,
    category: "Voyage",
    defaultData: {},
    Traveler: ({ title }) => (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-5">
        <div className="text-sm font-medium text-zinc-900">{title ?? label}</div>
        <div className="mt-1 text-sm text-zinc-500">Bloc non implémenté (starter).</div>
      </div>
    ),
    Editor: () => (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-5 text-sm text-zinc-600">
        Éditeur non implémenté.
      </div>
    ),
  };
}

export const blockLibrary = Object.values(blockRegistry)
  .map((b) => ({ type: b.type, label: b.label, category: b.category, isSensitive: !!b.isSensitive }))
  .sort((a, b) => a.category.localeCompare(b.category) || a.label.localeCompare(b.label));
