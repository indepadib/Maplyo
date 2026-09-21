import type { Metadata } from "next";
import { SegmentLanding } from "@/components/landing/SegmentLanding";

export const metadata: Metadata = {
  title: "Maplyo for Hotels & Riads",
  description: "Digital guest experience, AI concierge and upselling for independent hotels, boutique hotels and riads."
};

export default function HotelsPage() {
  return <SegmentLanding
    eyebrow="HOTELS & RIADS"
    title="Turn every room into a digital guest experience."
    subtitle="Give guests one mobile-first place for arrival information, hotel services, local recommendations, AI answers and revenue-generating extras."
    outcomes={[
      "Reduce repetitive front-desk questions without hiding the human service layer.",
      "Promote breakfast, spa, transfers, room upgrades and late checkout at the right moment.",
      "Standardize guest information while keeping each property or room experience configurable.",
      "Support international guests with a multilingual web experience."
    ]}
    useCases={[
      { title: "Pre-arrival", description: "Share check-in details, transport options, hotel policies and paid extras before the guest arrives." },
      { title: "In-stay concierge", description: "Centralize Wi-Fi, services, FAQs, recommendations and AI-assisted answers in one link." },
      { title: "Room & property services", description: "Surface breakfast, spa, restaurant, housekeeping requests and other hotel services." },
      { title: "Post-stay", description: "Guide guests toward feedback, reviews and future direct relationships after checkout." }
    ]}
    ctaLabel="Build my hotel experience"
  />;
}
