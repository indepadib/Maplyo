"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { useTranslation } from "@/components/providers/LanguageProvider";

export function Testimonials() {
    const { t, lang } = useTranslation();
    const tr = (fr: string, en: string) => lang === 'fr' ? fr : en;

    const testimonials = [
        {
            name: "Jean-Philippe R.",
            role: "Superhost Airbnb (Marrakech)",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            text: tr(
                "Mes voyageurs arrêtaient pas de demander le code Wifi ou comment allumer la clim. Avec Maplyo, ils ont tout sur leur téléphone. J'ai gagné facile 2h par semaine.",
                "My guests kept asking for the Wifi code or how to turn on the AC. With Maplyo, they have everything on their phone. I easily saved 2 hours a week."
            ),
            result: tr("-60% de messages", "-60% messages"),
            logo: "Airbnb"
        },
        {
            name: "Sofia B.",
            role: tr("Gérante Conciergerie (Casablanca)", "Concierge Manager (Casablanca)"),
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            text: tr(
                "Le game changer pour nous, c'est l'upsell. On propose des services de ménage ou de transport directement dans le guide. Ça a boosté notre chiffre d'affaires.",
                "The game changer for us is the upsell. We offer cleaning or transport services directly in the guide. It boosted our revenue."
            ),
            result: tr("+15% revenus", "+15% revenue"),
            logo: "Booking.com"
        },
        {
            name: "Karim M.",
            role: tr("Propriétaire Riad (Fès)", "Riad Owner (Fes)"),
            image: "https://randomuser.me/api/portraits/men/85.jpg",
            text: tr(
                "Très pro. L'aspect multilingue est bluffant, mes clients américains et espagnols sont ravis d'avoir les infos dans leur langue sans que je fasse rien.",
                "Very professional. The multilingual aspect is stunning, my American and Spanish clients are delighted to have info in their language without me doing anything."
            ),
            result: tr("5★ Avis", "5★ Reviews"),
            logo: "Expedia"
        }
    ];

    return (
        <section className="py-24 bg-slate-900/50 border-t border-white/5 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-rose-600/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-1/2 h-full bg-purple-600/5 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {tr("Approuvé par les Pros", "Approved by Pros")}
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        {tr("Rejoignez plus de 500 hôtes qui ont automatisé leur accueil.", "Join over 500 hosts who automated their welcome.")}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-slate-950 border border-white/10 relative group hover:border-white/20 transition-colors"
                        >
                            <div className="flex gap-1 mb-6 text-amber-400">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>

                            <p className="text-zinc-300 mb-8 leading-relaxed">"{t.text}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{t.name}</p>
                                    <p className="text-zinc-500 text-xs">{t.role}</p>
                                </div>
                            </div>

                            {/* Concrete Result Badge */}
                            <div className="absolute top-8 right-8 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                <span className="text-xs font-bold text-green-400">{t.result}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
