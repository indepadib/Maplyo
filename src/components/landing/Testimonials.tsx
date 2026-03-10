"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { useTranslation } from "@/components/providers/LanguageProvider";

export function Testimonials() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-slate-900/50 border-t border-white/5 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-rose-600/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-1/2 h-full bg-purple-600/5 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {t.testimonials.title}
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        {t.testimonials.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {t.testimonials.items.map((item: any, i: number) => (
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

                            <p className="text-zinc-300 mb-8 leading-relaxed">"{item.text}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 bg-zinc-800">
                                    <img 
                                      src={i === 0 ? "https://randomuser.me/api/portraits/men/32.jpg" : i === 1 ? "https://randomuser.me/api/portraits/women/44.jpg" : "https://randomuser.me/api/portraits/men/85.jpg"} 
                                      alt={item.name} 
                                      className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{item.name}</p>
                                    <p className="text-zinc-500 text-xs">{item.role}</p>
                                </div>
                            </div>

                            {/* Concrete Result Badge */}
                            <div className="absolute top-8 right-8 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                <span className="text-xs font-bold text-green-400">{item.result}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
