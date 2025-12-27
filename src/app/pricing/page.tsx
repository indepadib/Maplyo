"use client";

import { CheckCircle2, X } from "lucide-react";
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
            router.push('/login');
            return;
        }

        if (planId === 'free') {
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
                alert("Erreur lors de la redirection vers Stripe.");
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
                    <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <MaplyoLogo className="w-5 h-5" classNamePath="fill-white" />
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
                        Des guides simples,<br />
                        <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">expériences inoubliables.</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Choisissez le plan adapté à vos besoins. Commencez gratuitement, passez Pro pour aller plus loin.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* FREE PLAN */}
                    <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">{PLANS.free.name}</h3>
                            <div className="text-4xl font-black mt-4">{PLANS.free.price}€ <span className="text-base font-medium text-gray-400">/mois</span></div>
                            <p className="text-gray-500 mt-2">Pour découvrir Maplyo</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            {PLANS.free.features.map((f: string, i: number) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-gray-100 text-gray-600">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{f}</span>
                                </div>
                            ))}
                            <div className="flex items-center gap-3 opacity-50">
                                <div className="p-1 rounded-full bg-gray-50 text-gray-400">
                                    <X className="w-4 h-4" />
                                </div>
                                <span className="text-gray-400">Fonctionnalités IA & Vidéo</span>
                            </div>
                        </div>

                        <Button
                            onClick={() => handleSubscribe('free')}
                            variant="secondary"
                            className="w-full h-12 rounded-full text-lg"
                        >
                            Commencer Gratuitement
                        </Button>
                    </div>

                    {/* PRO PLAN */}
                    <div className="bg-gray-900 rounded-[32px] p-8 border border-gray-800 shadow-2xl relative overflow-hidden text-white transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-500 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">
                            POPULAIRE
                        </div>

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white">{PLANS.pro.name}</h3>
                            <div className="text-4xl font-black mt-4">{PLANS.pro.price}€ <span className="text-base font-medium text-gray-400">/mois</span></div>
                            <p className="text-gray-400 mt-2">Pour les hôtes ambitieux</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            {PLANS.pro.features.map((f: string, i: number) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-rose-500/20 text-rose-400">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-gray-200 font-medium">{f}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={() => handleSubscribe('pro')}
                            disabled={loading === 'pro'}
                            className="w-full h-12 rounded-full text-lg bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 border-none text-white shadow-lg shadow-rose-500/20"
                        >
                            {loading === 'pro' ? 'Chargement...' : 'Passer Pro'}
                        </Button>
                        <p className="text-center text-xs text-gray-500 mt-4">7 jours d'essai, annulez à tout moment.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
