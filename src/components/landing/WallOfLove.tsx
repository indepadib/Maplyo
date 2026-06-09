"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageProvider";

const TESTIMONIALS = [
  {
    name: "Jean-Philippe R.",
    role: "Superhost Airbnb (Marrakech)",
    text: "Mes voyageurs n'arrêtent pas de complimenter le guide. L'intégration avec Tuya pour ouvrir la porte a bluffé tout le monde. Je gagne facile 2h par semaine.",
    result: "-60% de messages",
    rating: 5,
  },
  {
    name: "Sofia B.",
    role: "Gérante Conciergerie (Casablanca)",
    text: "Le vrai game changer, c'est l'upsell. On propose nos services de transfert aéroport directement sur le guide. Ça booste notre CA et ça fait super pro.",
    result: "+15% revenus",
    rating: 5,
  },
  {
    name: "Karim M.",
    role: "Propriétaire Riad (Fès)",
    text: "L'aspect multilingue est incroyable. Les américains ont le guide en anglais, les espagnols en espagnol, sans que je ne touche à rien.",
    result: "5⭐ sur Booking",
    rating: 5,
  },
  {
    name: "Léa D.",
    role: "Propriétaire Chalet (Chamonix)",
    text: "Depuis que j'ai Maplyo, je n'ai plus aucune question sur le fonctionnement du jacuzzi ou de la cheminée. Les vidéos explicatives sont géniales.",
    result: "Sérénité absolue",
    rating: 5,
  },
  {
    name: "Thomas V.",
    role: "Hôte Indépendant (Paris)",
    text: "Le dashboard quotidien qui donne la météo et le petit mot de bienvenue, c'est ce qui fait la différence. Mes clients ont l'impression d'avoir un vrai concierge.",
    result: "Clients bluffés",
    rating: 5,
  },
  {
    name: "Amélie G.",
    role: "Investisseuse LMNP (Lyon)",
    text: "J'avais un livret papier toujours abîmé. Avec le QR code encadré sur le mur, c'est propre, moderne, et je le mets à jour depuis mon canapé.",
    result: "0 impression papier",
    rating: 5,
  },
  {
    name: "Omar T.",
    role: "Boutique Hôtel (Tanger)",
    text: "Nous utilisons le guide comme vitrine pour notre restaurant et notre spa. Le design s'intègre parfaitement à notre image de marque premium.",
    result: "Hausse des résas spa",
    rating: 5,
  },
  {
    name: "Céline P.",
    role: "Superhost (Bordeaux)",
    text: "La synchro Airbnb iCal m'évite de devoir générer les codes manuellement à chaque fois. Tout se fait en arrière-plan, c'est magique.",
    result: "Automatisation 100%",
    rating: 5,
  }
];

export function WallOfLove() {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Approuvé par l'Élite de la Location Courte Durée
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Rejoignez des centaines de conciergeries, propriétaires et gestionnaires qui offrent déjà une expérience 5 étoiles.
          </p>
        </div>

        {/* CSS Marquee Setup */}
        <div className="relative flex overflow-x-hidden gap-6 pb-4">
          <div className="animate-marquee flex gap-6 shrink-0 min-w-full items-start">
            {TESTIMONIALS.map((item, i) => (
              <div
                key={i}
                className="w-[350px] p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all shrink-0 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-6 text-amber-400">
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-8 leading-relaxed line-clamp-4">"{item.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">{item.name}</p>
                    <p className="text-zinc-500 text-xs">{item.role}</p>
                  </div>
                  <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="text-xs font-bold text-green-400 whitespace-nowrap">{item.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-marquee flex gap-6 shrink-0 min-w-full items-start" aria-hidden="true">
            {TESTIMONIALS.map((item, i) => (
              <div
                key={i}
                className="w-[350px] p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all shrink-0 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-6 text-amber-400">
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-8 leading-relaxed line-clamp-4">"{item.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">{item.name}</p>
                    <p className="text-zinc-500 text-xs">{item.role}</p>
                  </div>
                  <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="text-xs font-bold text-green-400 whitespace-nowrap">{item.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 1.5rem)); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
