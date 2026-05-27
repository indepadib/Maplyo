import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
    title: "Tarifs Maplyo | Livret d'Accueil Numérique Airbnb Gratuit",
    description: "Découvrez nos offres pour créer votre livret d'accueil numérique ou guide voyageur interactif. Commencez gratuitement pour 1 logement.",
    keywords: ["tarifs maplyo", "livret d'accueil numérique airbnb gratuit", "guide voyageur tarifs", "livret d'accueil gite tarif", "pricing maplyo"],
};

export default function PricingPage() {
    return <PricingClient />;
}
