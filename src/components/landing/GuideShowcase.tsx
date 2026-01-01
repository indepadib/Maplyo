"use strict";
"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/components/providers/LanguageProvider";



export function GuideShowcase() {
    const { t, lang } = useTranslation();

    // Local translation helper for demo content
    const tr = (fr: string, en: string) => lang === 'fr' ? fr : en;

    const examples = [
        {
            title: "City Loft Paris",
            type: tr("Appartement", "Apartment"),
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
            stats: [tr("Code WiFi", "WiFi Code"), tr("Métro", "Subway"), tr("Cafés", "Coffee")],
            color: "from-rose-500 to-rose-600",
            review: {
                text: tr("Merci pour le guide, l'arrivée était super simple !", "Thanks for the guide, check-in was super easy!"),
                author: "Sarah",
                rating: "+5★"
            }
        },
        {
            title: "Villa Atlas",
            type: tr("Maison de Vacances", "Vacation Home"),
            image: "https://plus.unsplash.com/premium_photo-1661964014750-963a28aeddea?q=80&w=2669&auto=format&fit=crop", // Fixed image
            stats: [tr("Piscine", "Pool"), tr("Chef à dom.", "Private Chef"), tr("Excursions", "Tours")],
            color: "from-emerald-500 to-teal-600",
            review: {
                text: tr("On a adoré les recos de restos !", "We loved the restaurant recs!"),
                author: "Marc & Julie",
                rating: "+15%"
            }
        },
        {
            title: "Riad Al Jazira",
            type: tr("Maison d'Hôtes", "Guesthouse"),
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
            stats: [tr("Hammam", "Hammam"), tr("Thé", "Tea"), tr("Souks", "Souks")],
            color: "from-amber-500 to-orange-600",
            review: {
                text: tr("Le QR code WiFi a sauvé notre arrivée.", "The WiFi QR code saved our arrival."),
                author: "Thomas",
                rating: "Top !"
            }
        }
    ];

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-rose-500 font-bold uppercase tracking-widest text-sm"
                    >
                        {tr("Exemples Concrets", "Real Examples")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6"
                    >
                        {tr("Adapté à chaque propriété", "Tailored to every property")}
                    </motion.h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        {tr("Que vous gériez un studio ou un hôtel, Maplyo s'adapte à votre style.", "Whether you manage a studio or a hotel, Maplyo adapts to your style.")}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {examples.map((ex, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10"
                        >
                            {/* Image Header */}
                            <div className="h-64 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                                <Image
                                    src={ex.image}
                                    alt={ex.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${ex.color} text-white text-xs font-bold z-20 shadow-lg`}>
                                    {ex.type}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative z-20 -mt-12">
                                <h3 className="text-2xl font-bold text-white mb-2">{ex.title}</h3>
                                <div className="flex gap-2 mb-6">
                                    {ex.stats.map(s => (
                                        <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-zinc-400 uppercase tracking-wide">
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                {/* Mock Phone Interaction */}
                                <div className="bg-white rounded-2xl p-4 shadow-xl transform group-hover:translate-y-2 transition-transform">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${ex.color} flex items-center justify-center text-white border-2 border-white shadow-sm`}>
                                            <Star size={16} fill="currentColor" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">{tr("Message de", "Message from")} {ex.review.author}</p>
                                            <p className="text-sm font-bold text-gray-900">"{ex.review.text}"</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(user => (
                                                <div key={user} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />
                                            ))}
                                        </div>
                                        <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">
                                            {ex.review.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a href="/demo" className="text-white flex items-center gap-2 text-sm font-bold hover:text-rose-400 transition-colors">
                                        {tr("Voir le guide complet", "View full guide")} <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
