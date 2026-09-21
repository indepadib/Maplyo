import type { Metadata } from "next";
import { SegmentLanding } from "@/components/landing/SegmentLanding";

export const metadata: Metadata = {
  title: "Maplyo for Property Managers",
  description: "Scale guest communication, digital guidebooks, AI concierge and upsells across a short-term-rental portfolio."
};

export default function PropertyManagersPage() {
  return <SegmentLanding
    eyebrow="PROPERTY MANAGERS & CONCIERGERIES"
    title="Scale the guest experience without scaling repetitive work."
    subtitle="Manage consistent guest information, property-specific instructions and paid extras across a growing portfolio from one guest experience layer."
    outcomes={[
      "Reduce repetitive Wi-Fi, access, check-in and local-information messages.",
      "Keep each property's content editable without rebuilding the whole guest journey.",
      "Create repeatable upsell playbooks across multiple units.",
      "Build a cleaner operational layer above your PMS or channel manager."
    ]}
    useCases={[
      { title: "Portfolio onboarding", description: "Create and structure property information faster with reusable blocks and AI-assisted setup." },
      { title: "Guest self-service", description: "Give travelers one place for access, Wi-Fi, rules, amenities, maps and recommendations." },
      { title: "Ancillary revenue", description: "Offer late checkout, extra cleaning, transfers, luggage storage and other services digitally." },
      { title: "Multi-property consistency", description: "Standardize your brand and operating model while preserving property-level differences." }
    ]}
    ctaLabel="Build my portfolio experience"
  />;
}
