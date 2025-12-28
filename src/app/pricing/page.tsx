"use client";

import { CheckCircle2, X, ShieldCheck, Lock } from "lucide-react";
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
            // For Demo, maybe go to dashboard directly if we allow guest demo, 
            // but for now let's enforce login for all
            if (planId === 'demo') {
                // router.push('/onboarding?ref=demo'); 
                router.push('/dashboard');
                return;
            }
            router.push('/login');
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
                // Mock fallback for dev
                alert(`Redirection vers Stripe (Plan ${planId})... (Mock)`);
                // In a real app we'd stop here, but for dev we might want to simulate success?
                // For now just alert.
            }
        } catch (e) {
            console.error(e);
            alert("Une erreur est survenue.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                    <div className="w-8 h-8 flex items-center justify-center">
                        <MaplyoLogo className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-gray-900 text-lg">Maplyo</span>
                </div>
                {user ? (
                    <Button onClick={() => router.push('/dashboard')} variant="ghost">Retour au Dashboard</Button>
                ) : (
                    <Button onClick={() => router.push('/login')}>Connexion</Button>
                )}
            </header>

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 drop-shadow-sm">
                        Des offres claires,<br />
                        <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">sans engagement.</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Essayez gratuitement, puis choisissez l'offre adaptée à votre activité.
                    </p>

                    <div className="flex items-center justify-center gap-4 mt-8 text-sm text-green-600 font-medium">
                        <div className="flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4" />
                            Paiement 100% Sécurisé
                        </div>
                        <div className="flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            Données Cryptées
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    {/* DEMO PLAN */}
                    <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">{PLANS.demo.name}</h3>
                            <div className="text-4xl font-black mt-4">Gratuit</div>
                            <p className="text-gray-500 mt-2">Pour tester l'éditeur</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {PLANS.demo.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-gray-400" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                        <Button onClick={() => handleSubscribe('demo')} variant="outline" className="w-full h-12 rounded-full border-2">
                            Essayer la Démo
                        </Button>
                    </div>

                    {/* BASIC PLAN */}
                    <div className="bg-white rounded-[32px] p-8 border-2 border-rose-100 shadow-xl relative overflow-hidden order-first md:order-none md:scale-105 z-10">
                        <div className="absolute top-0 right-0 bg-rose-100 text-rose-600 text-xs font-bold px-3 py-1 rounded-bl-xl">
                            DÉMARRAGE
                        </div>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">{PLANS.basic.name}</h3>
                            <div className="text-4xl font-black mt-4">{PLANS.basic.price}€ <span className="text-base font-medium text-gray-400">/mois</span></div>
                            <p className="text-gray-500 mt-2">L'essentiel pour 1 logement</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {PLANS.basic.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-rose-500" />
                                    <span className="font-medium text-gray-700">{f}</span>
                                </li>
                            ))}
                        </ul>
                        <Button onClick={() => handleSubscribe('basic')} className="w-full h-12 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20">
                            Choisir Basique
                        </Button>
                    </div>

                    {/* PRO PLAN */}
                    <div className="bg-slate-900 rounded-[32px] p-8 border border-slate-800 shadow-2xl relative overflow-hidden text-white">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500 to-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">
                            RECOMMANDÉ
                        </div>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white">{PLANS.pro.name}</h3>
                            <div className="text-4xl font-black mt-4">{PLANS.pro.price}€ <span className="text-base font-medium text-gray-400">/mois</span></div>
                            <p className="text-gray-400 mt-2">Pour les conciergeries</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {PLANS.pro.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-purple-500/20 text-purple-400">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-gray-200">{f}</span>
                                </li>
                            ))}
                        </ul>
                        <Button onClick={() => handleSubscribe('pro')} className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white shadow-lg shadow-purple-500/20 border-none">
                            Passer Pro
                        </Button>
                    </div>
                </div>

                <div className="mt-16 text-center border-t border-gray-200 pt-8">
                    <p className="text-gray-400 text-sm">
                        Paiements sécurisés par Stripe. Annulation possible à tout moment. TVA incluse.
                    </p>
                </div>
            </div>
        </div>
    );
}

