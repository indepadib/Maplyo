"use client";

import { CheckCircle2, X, ShieldCheck, Lock, Sparkles, Zap, Home, Hand, ChevronDown, ChevronUp, Star, HelpCircle } from "lucide-react";
import { PLANS } from "@/types/subscription";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { MaplyoLogo } from "@/components/ui/MaplyoLogo";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";

// --- Components ---

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
            >
                <span className="text-lg font-medium text-zinc-200 group-hover:text-white transition-colors">
                    {question}
                </span>
                <span className={`ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 transition-all duration-300 ${isOpen ? 'rotate-180 bg-rose-500/20 border-rose-500/50' : ''}`}>
                    <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-rose-400' : 'text-zinc-400'}`} />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-zinc-400 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function PricingPage() {
    const { user, session } = useAuth();
    const router = useRouter();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (planId: string) => {
        if (!user) {
            router.push(`/signup?ref=pricing&plan=${planId}`);
            return;
        }

        if (planId === 'demo') {
            router.push('/dashboard');
            return;
        }

        setLoading(planId);
        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ plan: planId })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Stripe Error:", data);
                alert(data.error || "Erreur de configuration Stripe (Mode Dev).");
            }
        } catch (e) {
            console.error(e);
            alert("Une erreur est survenue.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-rose-500/30">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-20 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 z-50 transition-all">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push('/')}>
                        <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-rose-500 via-purple-600 to-rose-600 rounded-xl shadow-lg shadow-rose-500/20 group-hover:shadow-rose-500/40 transition-all duration-300">
                            <MaplyoLogo className="w-6 h-6 fill-white" showText={false} />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-white">Maplyo</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <Button onClick={() => router.push('/dashboard')} variant="ghost" className="font-medium text-zinc-300 hover:text-white hover:bg-white/5">Dashboard</Button>
                        ) : (
                            <>
                                <Button onClick={() => router.push('/login')} variant="ghost" className="hidden md:flex font-medium text-zinc-300 hover:text-white hover:bg-white/5">Connexion</Button>
                                <Button onClick={() => router.push('/signup')} className="bg-white text-slate-950 hover:bg-zinc-200 rounded-full px-6 font-bold">S'inscrire</Button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="relative pt-32 pb-20 px-6">
                {/* Ambient Background */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-rose-600/10 rounded-full blur-[120px] mix-blend-screen" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Hero Text */}
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 backdrop-blur-md"
                        >
                            <Sparkles size={14} className="text-rose-400" />
                            <span className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Investissez dans l'excellence</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
                        >
                            Un guide pro,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-rose-400 animate-gradient">au prix d'un café.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
                        >
                            Augmentez vos revenus directs, réduisez les questions répétitives et offrez une expérience 5 étoiles. Rentabilisé dès la première réservation.
                        </motion.p>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid md:grid-cols-3 gap-8 items-stretch mb-32">
                        {/* DEMO PLAN */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/[0.02] backdrop-blur-sm rounded-[2rem] p-8 border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 flex flex-col group"
                        >
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-zinc-400 group-hover:scale-110 transition-transform">
                                    <Hand className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{t.pricing.plans.demo.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold text-white">0 DH</span>
                                </div>
                                <p className="text-zinc-500 text-sm">{t.pricing.plans.demo.desc}</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {t.pricing.plans.demo.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                                        <CheckCircle2 className="w-5 h-5 text-zinc-600 shrink-0" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button onClick={() => handleSubscribe('demo')} variant="secondary" className="w-full h-12 rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10">
                                {t.pricing.plans.demo.button}
                            </Button>
                        </motion.div>

                        {/* BASIC PLAN */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="relative group md:-mt-8 md:mb-8"
                        >
                            <div className="absolute -inset-[1px] bg-gradient-to-br from-rose-500 to-purple-600 rounded-[2rem] opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-[2rem] p-8 h-full flex flex-col border border-white/10">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 to-purple-600 rounded-t-[2rem]" />
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
                                    Populaire
                                </div>

                                <div className="mb-8 mt-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500/20 to-purple-500/20 border border-rose-500/30 flex items-center justify-center mb-6 text-rose-400 group-hover:scale-110 transition-transform">
                                        <Home className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{t.pricing.plans.basic.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-5xl font-bold text-white">{PLANS.basic.price} DH</span>
                                        <span className="text-zinc-500 text-sm font-medium">/mois</span>
                                    </div>
                                    <p className="text-rose-200/60 text-sm">{t.pricing.plans.basic.desc}</p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {t.pricing.plans.basic.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                                            <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    onClick={() => handleSubscribe('basic')}
                                    className="w-full h-14 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white text-base font-bold shadow-lg shadow-rose-500/25 border-0"
                                    disabled={loading === 'basic'}
                                >
                                    {loading === 'basic' ? t.common.loading : `${t.pricing.plans.basic.button}`}
                                </Button>
                            </div>
                        </motion.div>

                        {/* PRO PLAN */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] p-8 border border-white/10 hover:border-purple-500/30 hover:bg-purple-900/10 transition-all duration-300 flex flex-col group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="mb-8 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{t.pricing.plans.pro.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-5xl font-bold text-white">{PLANS.pro.price} DH</span>
                                    <span className="text-zinc-500 text-sm font-medium">/mois</span>
                                </div>
                                <div className="inline-block px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
                                    + {t.pricing.addon}
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1 relative z-10">
                                {t.pricing.plans.pro.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={() => handleSubscribe('pro')}
                                className="w-full h-14 rounded-xl bg-white text-slate-950 hover:bg-zinc-200 text-base font-bold shadow-lg shadow-white/5 border-0 relative z-10"
                                disabled={loading === 'pro'}
                            >
                                {loading === 'pro' ? t.common.loading : `${t.pricing.plans.pro.button}`}
                            </Button>
                        </motion.div>
                    </div>

                    {/* Comparison Table */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">Comparatif Détaillé</h2>
                            <p className="text-zinc-400">Tout ce dont vous avez besoin pour réussir.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-4 border-b border-white/10 w-1/3"></th>
                                        <th className="p-4 border-b border-white/10 text-center text-zinc-400 font-medium">Demo</th>
                                        <th className="p-4 border-b border-white/10 text-center text-rose-400 font-bold text-lg">Basic</th>
                                        <th className="p-4 border-b border-white/10 text-center text-purple-400 font-bold text-lg">Pro</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { feature: "Guides Illimités", demo: false, basic: true, pro: true },
                                        { feature: "Intégration Google Maps", demo: true, basic: true, pro: true },
                                        { feature: "Traduction IA (toutes langues)", demo: "1 langue", basic: "Illimité", pro: "Illimité" },
                                        { feature: "Nom de domaine personnalisé", demo: false, basic: false, pro: true },
                                        { feature: "Support Prioritaire", demo: false, basic: "Email", pro: "WhatsApp 24/7" },
                                        { feature: "Marque Blanche (No Branding)", demo: false, basic: false, pro: true },
                                        { feature: "Analytiques Avancées", demo: false, basic: true, pro: true },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-white/[0.02]">
                                            <td className="p-6 border-b border-white/5 text-zinc-300 font-medium">{row.feature}</td>
                                            <td className="p-6 border-b border-white/5 text-center">
                                                {row.demo === true ? <CheckCircle2 className="w-5 h-5 text-zinc-500 mx-auto" /> :
                                                    row.demo === false ? <X className="w-5 h-5 text-zinc-700 mx-auto" /> :
                                                        <span className="text-zinc-500">{row.demo}</span>}
                                            </td>
                                            <td className="p-6 border-b border-white/5 text-center">
                                                {row.basic === true ? <CheckCircle2 className="w-6 h-6 text-rose-500 mx-auto" /> :
                                                    row.basic === false ? <X className="w-5 h-5 text-zinc-700 mx-auto" /> :
                                                        <span className="text-white font-medium">{row.basic}</span>}
                                            </td>
                                            <td className="p-6 border-b border-white/5 text-center bg-purple-900/5">
                                                {row.pro === true ? <Star className="w-6 h-6 text-purple-400 fill-purple-400 mx-auto" /> :
                                                    row.pro === false ? <X className="w-5 h-5 text-zinc-700 mx-auto" /> :
                                                        <span className="text-purple-300 font-bold">{row.pro}</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto mb-32">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Questions Fréquentes</h2>
                            <p className="text-zinc-400">Nous sommes transparents. Voici les réponses.</p>
                        </div>

                        <div className="space-y-2">
                            <FaqItem
                                question="Puis-je changer de plan à tout moment ?"
                                answer="Oui, absolument. Vous pouvez passer du plan Basic au plan Pro (ou inversement) depuis votre dashboard. Le changement est immédiat et le prorata est calculé automatiquement."
                            />
                            <FaqItem
                                question="Y a-t-il un engagement ?"
                                answer="Non, aucune période d'engagement. Nos abonnements sont mensuels et vous pouvez annuler à tout moment en un clic. Pas de frais cachés."
                            />
                            <FaqItem
                                question="Comment fonctionne le paiement ?"
                                answer="Nous utilisons Stripe, le leader mondial du paiement en ligne sécurisé. Vos coordonnées bancaires ne sont jamais stockées sur nos serveurs. Vous recevez une facture par email chaque mois."
                            />
                            <FaqItem
                                question="Le support est-il inclus ?"
                                answer="Oui ! Le support par email est inclus dans tous les plans payants. Le plan Pro bénéficie d'une ligne prioritaire et d'un contact WhatsApp pour une assistance ultra-rapide."
                            />
                        </div>
                    </div>

                    {/* Trust/Social Proof */}
                    <div className="text-center pt-20 border-t border-white/10">
                        <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-8">Ils nous font confiance</p>
                        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            {/* Mock Logos - Replace with real ones later */}
                            {['Airbnb', 'Booking.com', 'Expedia', 'TripAdvisor'].map((brand, i) => (
                                <span key={i} className="text-2xl font-black text-white">{brand}</span>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
