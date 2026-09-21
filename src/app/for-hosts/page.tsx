import type { Metadata } from "next";
import { SegmentLanding } from "@/components/landing/SegmentLanding";

export const metadata: Metadata = {
  title: "Maplyo for Hosts",
  description: "A simple digital guest experience for vacation rentals, apartments, villas and guest houses."
};

export default function HostsPage() {
  return <SegmentLanding
    eyebrow="HOSTS & VACATION RENTALS"
    title="Give guests everything they need before they need to ask."
    subtitle="Replace scattered messages and static PDFs with one mobile guest experience for arrival, Wi-Fi, access, local tips and optional extras."
    outcomes={[
      "Spend less time repeating the same arrival and property information.",
      "Keep your QR code while updating information whenever something changes.",
      "Offer useful paid extras without forcing guests into another app.",
      "Create a more professional and multilingual guest journey."
    ]}
    useCases={[
      { title: "Arrival", description: "Share directions, check-in times, access instructions and Wi-Fi in a structured mobile view." },
      { title: "During the stay", description: "Answer FAQs and share house instructions, amenities and local recommendations." },
      { title: "Upsells", description: "Offer late checkout, transfers, breakfast or other services directly in the guest experience." },
      { title: "Local guide", description: "Keep restaurants, attractions and useful places together with practical property information." }
    ]}
    ctaLabel="Create my guest experience"
  />;
}
