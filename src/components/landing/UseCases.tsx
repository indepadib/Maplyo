"use client";

import { motion } from "framer-motion";
import { Building2, Home, KeyRound } from "lucide-react";

const CASES = [
  {
    icon: Building2,
    title: "Pour les Conciergeries",
    subtitle: "Gérez 20 à 500 biens facilement.",
    points: [
      "Gestion multi-guides avec templates",
      "Vente additionnelle (upsells) automatisée",
      "Lien iCal pour accès serrures par réservation"
    ],
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Home,
    title: "Pour les Propriétaires (LMNP)",
    subtitle: "Professionnalisez votre accueil.",
    points: [
      "Zéro appel le soir pour trouver la clé",
      "Partage des meilleures adresses locales",
      "Un guide toujours à jour (zéro papier)"
    ],
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: KeyRound,
    title: "Pour les Hôtels & Maisons d'Hôtes",
    subtitle: "Une conciergerie digitale premium.",
    points: [
      "Tableau de bord météo et conseils",
      "Réservation spa / restaurant en 1 clic",
      "Multilingue automatique pour les étrangers"
    ],
    color: "from-rose-500 to-orange-600"
  }
];

export function UseCases() {
  return (
    <section className="py-24 bg-slate-900 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Conçu pour tous les professionnels de l'accueil
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Que vous ayez un seul appartement ou une flotte de 100 chalets, Maplyo s'adapte à votre réalité terrain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {CASES.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-slate-950/50 border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${uc.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                <uc.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{uc.title}</h3>
              <p className="text-zinc-400 font-medium mb-8">{uc.subtitle}</p>
              
              <ul className="space-y-4">
                {uc.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-zinc-300">
                    <div className="mt-1 w-4 h-4 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <span className="text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
