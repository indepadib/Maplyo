"use client";

import { CheckCircle2, X, ShieldCheck, Lock } from "lucide-react";
import { PLANS } from "@/types/subscription";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { MaplyoLogo } from "@/components/ui/MaplyoLogo";

"use client";

import { CheckCircle2, X, ShieldCheck, Lock, Sparkles, Zap } from "lucide-react";
import { PLANS } from "@/types/subscription";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { MaplyoLogo } from "@/components/ui/MaplyoLogo";

export default function PricingPage() {
    const { user, session } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (planId: string) => {
        if (!user) {
            router.push(`/login?ref=pricing&plan=${planId}`);
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
                alert("Erreur de configuration Stripe (Mode Dev).");
            }
        } catch (e) {
            console.error(e);
            alert("Une erreur est survenue.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-rose-100 selection:text-rose-900">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50 transition-all">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push('/')}>
                        <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-rose-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <MaplyoLogo className="w-6 h-6 text-rose-600" />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-gray-900">Maplyo</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <Button onClick={() => router.push('/dashboard')} variant="ghost" className="font-medium">Dashboard</Button>
                        ) : (
                            <>
                                <Button onClick={() => router.push('/login')} variant="ghost" className="hidden md:flex font-medium text-gray-600 hover:text-gray-900">Connexion</Button>
                                <Button onClick={() => router.push('/signup')} className="bg-gray-900 text-white hover:bg-black rounded-full px-6">S'inscrire</Button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-rose-50/50 to-transparent pointer-events-none -z-10" />

                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-wider mb-6 border border-rose-100">
                        <Sparkles size={12} />
                        Plans Flexibles
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
                        Un guide pro,<br />
                        <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">au prix d'un café.</span>
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
                        Augmentez vos revenus directs et offrez une expérience 5 étoiles.
                        Rentabilisé dès la première réservation.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-stretch pt-4">
                    {/* DEMO PLAN */}
                    <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col hover:border-gray-300 transition-all duration-300 relative group">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">👋</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{PLANS.demo.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-gray-900">Gratuit</span>
                            </div>
                            <p className="text-gray-500 mt-4 text-sm font-medium">Parfait pour tester l'éditeur sans engagement.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {PLANS.demo.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                        <Button onClick={() => handleSubscribe('demo')} variant="outline" className="w-full h-14 rounded-2xl text-base font-bold border-2 hover:bg-gray-50 hover:text-gray-900 transition-all">
                            Essayer Gratuitement
                        </Button>
                    </div>

                    {/* BASIC PLAN */}
                    <div className="bg-white rounded-[2rem] p-8 border-2 border-rose-500 shadow-2xl shadow-rose-500/10 flex flex-col relative scale-[1.02] z-10 md:-mt-4">
                        <div className="absolute top-0 right-0 left-0 bg-rose-500 text-white text-xs font-bold py-2 text-center uppercase tracking-widest rounded-t-[1.8rem]">
                            Le plus populaire
                        </div>
                        <div className="mb-6 mt-6">
                            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 text-2xl text-rose-500">🏠</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{PLANS.basic.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-gray-900">{PLANS.basic.price}€</span>
                                <span className="text-gray-400 font-medium">/mois</span>
                            </div>
                            <p className="text-rose-600/80 mt-4 text-sm font-medium">L'essentiel pour digitaliser votre logement.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {PLANS.basic.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={() => handleSubscribe('basic')}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:to-rose-700 text-white text-base font-bold shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-1 transition-all"
                            disabled={loading === 'basic'}
                        >
                            {loading === 'basic' ? "Chargement..." : "Choisir Basique"}
                        </Button>
                    </div>

                    {/* PRO PLAN */}
                    <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-2xl flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                        <div className="mb-6 relative">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-2xl text-purple-400">✨</div>
                            <h3 className="text-xl font-bold text-white mb-2">{PLANS.pro.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-white">{PLANS.pro.price}€</span>
                                <span className="text-slate-400 font-medium">/mois</span>
                            </div>
                            <p className="text-slate-400 mt-4 text-sm font-medium">Pour les pros et conciergeries.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 relative">
                            {PLANS.pro.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={() => handleSubscribe('pro')}
                            className="w-full h-14 rounded-2xl bg-white text-slate-900 hover:bg-gray-100 text-base font-bold shadow-lg relative z-10 hover:-translate-y-1 transition-all border-none"
                            disabled={loading === 'pro'}
                        >
                            {loading === 'pro' ? "Chargement..." : "Passer Pro"}
                        </Button>
                    </div>
                </div>

                {/* Footer Trust Signals */}
                <div className="mt-20 flex flex-col items-center gap-6">
                    <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
                        <Lock size={14} /> Paiement chiffré SSL • Annulation en 1 clic
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder for payment icons if needed, or text */}
                        <span className="text-xs font-bold text-gray-300 tracking-widest">STRIPE • VISA • MASTERCARD</span>
                    </div>
                </div>
            </main>
        </div>
    );
}


