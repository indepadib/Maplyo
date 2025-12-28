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
                                <span className="text-5xl font-black text-gray-900">{PLANS.basic.price} DH</span>
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
                            {loading === 'basic' ? "Chargement..." : "Commencer (99 DH)"}
                        </Button>
                    </div>

                    {/* PRO PLAN */}
                    <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-2xl flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                        <div className="mb-6 relative">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-2xl text-purple-400">✨</div>
                            <h3 className="text-xl font-bold text-white mb-2">{PLANS.pro.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-white">{PLANS.pro.price} DH</span>
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
                            {loading === 'pro' ? "Chargement..." : "Devenir Pro (299 DH)"}
                        </Button>
                    </div>
                </div>

                {/* Footer Trust Signals */}
                <div className="mt-20 flex flex-col items-center gap-6">
                    <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
                        <Lock size={14} /> Paiement chiffré SSL • Annulation en 1 clic
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <svg className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="fill-[#1A1F70]" d="M13.623 0L9.049 23.594H3.012L7.586 0h6.037z" /><path className="fill-[#1A1F70]" d="M37.98 0l-3.003 14.739c-.198.857-1.127 1.401-1.896 1.401h-4.664l2.87-16.14h6.693z" /><path className="fill-[#F79E1B]" d="M26.262 18.068C26.96 17.07 27.696 15.65 28.16 13.91l2.05-10.02a18.257 18.257 0 00-6.732-1.076c-3.13 0-5.32 1.636-5.32 3.996 0 2.228 2.016 3.447 3.535 4.192 1.57.771 2.096 1.258 2.096 1.944 0 1.054-1.267 1.536-2.44 1.536-1.63 0-3.32-.821-4.28-1.78l-2.618 3.326c1.64 1.492 4.675 2.14 6.84 2.14 3.73 0 6.07-1.868 6.07-4.57 0-1.874-1.04-3.21-3.664-4.498-1.46-.73-2.396-1.503-2.396-2.636 0-1.18 1.15-1.995 2.502-1.995 1.43 0 2.89.542 3.82 1.156L26.26 18.068z" /><path className="fill-[#1A1F70]" d="M9.162 0L6.72 15.66s-.31.877-1.428 1.11C3.33 17.152.013 15.86.013 15.86L.002 16c1.86.417 5.068 2.126 6.574 2.126 3.02 0 4.65-1.528 4.88-3.053L14.735 0H9.162z" /></svg>
                        <svg className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#EB001B" d="M14.2 17.6c-1.6 1-3.6 1.6-5.6 1.6-2 0-3.9-.5-5.6-1.5-1.7-1-2.9-2.5-2.9-4.2 0-3.2 4.1-5.7 8.5-5.7 4.5 0 8.5 2.5 8.5 5.7 0 1.7-1.2 3.2-2.9 4.1z" />
                            <path fill="#F79E1B" d="M9.8 17.6c1.6 1 3.6 1.6 5.6 1.6 2 0 3.9-.5 5.6-1.5 1.7-1 2.9-2.5 2.9-4.2 0-3.2-4.1-5.7-8.5-5.7-4.5 0-8.5 2.5-8.5 5.7 0 1.7 1.2 3.2 2.9 4.1z" />
                            <path fill="#FF5F00" d="M14.2 13.5c0 3.2-2.5 5.7-5.7 5.7-3.2 0-5.7-2.5-5.7-5.7 0-3.2 2.5-5.7 5.7-5.7 3.2 0 5.7 2.5 5.7 5.7z" transform="matrix(0.7 0 0 1 4.3 0)" />
                        </svg>
                    </div>
                </div>
            </main>
        </div>
    );
}
