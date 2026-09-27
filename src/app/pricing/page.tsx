import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Maplyo Pricing | Free Guest Guide + 30 Days Pro",
  description: "Start with one published guest guide free forever and unlock Maplyo Pro for 30 days without a credit card. Plans for hosts, property managers, riads and hotels.",
  keywords: ["Maplyo pricing", "free digital guest guide", "AI concierge pricing", "hotel guest experience software", "property management guest guide"],
};

export default function PricingPage() {
  return <PricingClient />;
}
