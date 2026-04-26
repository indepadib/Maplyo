import React from "react";
import { Language } from "@/lib/i18n/dictionary";
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

export type BlockRenderContext = { mode: "traveler" | "builder"; unlocked: boolean; lang?: Language };

export type BlockDefinition = {
  type: BlockType;
  label: string;
  category: "catEssentials" | "catTravel" | "catBusiness";
  schema?: unknown;
  defaultData: unknown;
  isSensitive?: boolean;
  Traveler: (props: { title?: string; data: any; ctx: BlockRenderContext; visibility?: VisibilityRule }) => React.ReactNode;
  Editor: (props: { title?: string; data: any; onChange: (data: any) => void; visibility?: VisibilityRule; onChangeVisibility?: (v: VisibilityRule) => void }) => React.ReactNode;
};

export const blockRegistry: Record<BlockType, BlockDefinition> = {
  hero: { type: "hero", label: "hero", category: "catEssentials", schema: HeroBlockDataSchema, defaultData: { title: "Bienvenue", subtitle: "Ton guide voyageur", coverImageUrl: "", badges: [] }, Traveler: HeroTraveler, Editor: HeroEditor },
  wifi: { type: "wifi", label: "wifi", category: "catEssentials", schema: WifiBlockDataSchema, defaultData: { networkName: "", password: "", notes: "" }, Traveler: WifiTraveler, Editor: WifiEditor },
  access_codes: { type: "access_codes", label: "access_codes", category: "catEssentials", schema: AccessCodesBlockDataSchema, defaultData: { apartmentDoorCode: "", buildingDoorCode: "", gateCode: "", notes: "" }, isSensitive: true, Traveler: AccessCodesTraveler, Editor: AccessCodesEditor },

  checkin: { type: "checkin", label: "checkin", category: "catTravel", schema: CheckinBlockDataSchema, defaultData: { time: "15:00", instruction: "" }, Traveler: CheckinTraveler, Editor: CheckinEditor },
  checkout: { type: "checkout", label: "checkout", category: "catTravel", schema: CheckinBlockDataSchema, defaultData: { time: "11:00", instruction: "" }, Traveler: CheckinTraveler, Editor: CheckinEditor },
  location: { type: "location", label: "location", category: "catTravel", schema: LocationBlockDataSchema, defaultData: { address: "", googleMapsUrl: "" }, Traveler: LocationTraveler, Editor: LocationEditor },
  contact: { type: "contact", label: "contact", category: "catEssentials", schema: ContactBlockDataSchema, defaultData: { name: "", phone: "", whatsapp: "", email: "" }, Traveler: ContactTraveler, Editor: ContactEditor },

  rules: { type: "rules", label: "rules", category: "catTravel", schema: RulesBlockDataSchema, defaultData: { items: [{ text: "Ne pas fumer" }, { text: "Pas de fêtes" }] }, Traveler: RulesTraveler, Editor: RulesEditor },

  // NEW BLOCKS
  trash: { type: "trash", label: "trash", category: "catEssentials", schema: TrashBlockDataSchema, defaultData: { instructions: "", trashDay: "", recyclingDay: "", location: "" }, Traveler: TrashTraveler, Editor: TrashEditor },
  parking: { type: "parking", label: "parking", category: "catTravel", schema: ParkingBlockDataSchema, defaultData: { instructions: "", location: "", cost: "", mapUrl: "" }, Traveler: ParkingTraveler, Editor: ParkingEditor },
  breakfast: { type: "breakfast", label: "breakfast", category: "catTravel", schema: BreakfastBlockDataSchema, defaultData: { time: "", location: "", menu: "" }, Traveler: BreakfastTraveler, Editor: BreakfastEditor },
  transport: { type: "transport", label: "transport", category: "catTravel", schema: TransportBlockDataSchema, defaultData: { options: [] }, Traveler: TransportTraveler, Editor: TransportEditor },

  welcome: { type: "welcome", label: "welcome", category: "catEssentials", schema: WelcomeBlockDataSchema, defaultData: { title: "Bienvenue !", content: "Ravis de vous accueillir.", imageUrl: "" }, Traveler: WelcomeTraveler, Editor: WelcomeEditor },

  amenities: { type: "amenities", label: "amenities", category: "catTravel", schema: AmenitiesBlockDataSchema, defaultData: { items: [{ text: "Wi-Fi" }, { text: "Machine à café" }] }, Traveler: AmenitiesTraveler, Editor: AmenitiesEditor },
  faq: { type: "faq", label: "faq", category: "catTravel", schema: FaqBlockDataSchema, defaultData: { items: [{ question: "Y a-t-il le wifi ?", answer: "Oui, voir le bloc WiFi." }] }, Traveler: FaqTraveler, Editor: FaqEditor },

  places: { type: "places", label: "places", category: "catTravel", schema: PlacesBlockDataSchema, defaultData: { items: [{ name: "Boulangerie Délicieuse", description: "Les meilleurs croissants." }] }, Traveler: PlacesTraveler, Editor: PlacesEditor },
  events: { type: "events", label: "events", category: "catTravel", schema: EventsBlockDataSchema, defaultData: { items: [{ title: "Fête de la ville", month: "JUI", day: 14 }] }, Traveler: EventsTraveler, Editor: EventsEditor },
  documents: { type: "documents", label: "documents", category: "catBusiness", schema: DocumentsBlockDataSchema, defaultData: { items: [{ title: "Manuel de la maison", url: "#" }] }, Traveler: DocumentsTraveler, Editor: DocumentsEditor },
  upsells: { type: "upsells", label: "upsells", category: "catBusiness", schema: UpsellsBlockDataSchema, defaultData: { items: [{ title: "Départ tardif", price: "30€", description: "Profitez de votre dernière matinée." }] }, Traveler: UpsellsTraveler, Editor: UpsellsEditor },
  embed: { type: "embed", label: "embed", category: "catBusiness", schema: EmbedBlockDataSchema, defaultData: { url: "" }, Traveler: EmbedTraveler, Editor: EmbedEditor },
};

function stub(type: BlockType, label: string): BlockDefinition {
  return {
    type,
    label,
    category: "catTravel",
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
