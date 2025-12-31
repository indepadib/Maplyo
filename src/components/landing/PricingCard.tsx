"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/components/providers/LanguageProvider";

interface PricingCardProps {
    tier: string;
    price: string;
    features: string[];
    popular?: boolean;
    delay: number;
}

export const PricingCard = ({
    tier,
    price,
    features,
    popular = false,
    delay
}: PricingCardProps) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            className={`relative p-8 rounded-[2rem] border transition-transform duration-300 hover:-translate-y-2 ${popular
                ? "bg-gradient-to-b from-rose-950/40 to-slate-950/80 border-rose-500/30 shadow-2xl shadow-rose-900/10"
                : "bg-slate-900/30 border-white/5 hover:border-white/10"
                } flex flex-col h-full`}
        >
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-purple-500/20">
                    Most Popular
                </div>
            )}

            <div className="mb-8">
                <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${popular ? 'text-rose-400' : 'text-zinc-500'}`}>
                    {tier}
                </h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white tracking-tight">{price}</span>
                    {price !== "Sur devis" && <span className="text-zinc-500 font-medium">/mo</span>}
                </div>
                <p className="text-zinc-500 text-sm mt-4">
                    {tier === "Basic" && "Pour les hôtes débutants"}
                    {tier === "Pro" && "Pour les Superhosts ambitieux"}
                    {tier === "Business" && "Pour les conciergeries & agences"}
                </p>
            </div>

            <div className="h-px bg-white/5 mb-8" />

            <ul className="flex-1 space-y-4 mb-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm group">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${popular ? 'bg-rose-500/20' : 'bg-white/5'} group-hover:bg-green-500/20 transition-colors`}>
                            <Check className={`w-3 h-3 ${popular ? 'text-rose-400' : 'text-zinc-500'} group-hover:text-green-400`} />
                        </div>
                        <span className="group-hover:text-white transition-colors">{feature}</span>
                    </li>
                ))}
            </ul>

            <Link href="/pricing" className="w-full">
                <Button
                    className={`w-full h-12 text-sm font-semibold rounded-xl transition-all duration-300 ${popular
                        ? "bg-white text-slate-900 hover:bg-zinc-200 hover:scale-[1.02] shadow-xl"
                        : "bg-white/5 hover:bg-white/10 text-white hover:scale-[1.02]"
                        } border-0`}
                >
                    {t.common.choose} {tier}
                </Button>
            </Link>
        </motion.div>
    );
};
