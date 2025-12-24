"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, MapPin, Building2, Users, Globe, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { guideThemes } from "@/types/themes";

export default function OnboardingPage() {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState<"free" | "pro">("free");
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // AI/Guide State
    const [aiPrompt, setAiPrompt] = useState({
        city: "",
        type: "airbnb",
        targetAudience: "families",
        language: "fr"
    });
    const [isGenerating, setIsGenerating] = useState(false);

    // Step 1: Welcome Animation
    const WelcomeStep = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl text-center"
        >
            <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-500/30">
                    <span className="text-5xl font-bold text-white">M</span>
                </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Bienvenue sur Maplyo</h1>
            <p className="text-xl text-rose-100/80 mb-12 max-w-lg mx-auto leading-relaxed">
                Vous êtes sur le point de créer une expérience exceptionnelle pour vos voyageurs.
                Commençons par configurer votre espace.
            </p>
            <button
                onClick={() => setStep(2)}
                className="group px-8 py-4 bg-white text-rose-600 rounded-2xl font-bold text-lg hover:bg-rose-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 mx-auto"
            >
                Commencer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>
    );

    // Step 2: Plan Selection
    const PlanStep = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-4xl"
        >
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Choisissez votre formule</h2>
                <p className="text-rose-200/60">Vous pourrez changer à tout moment.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Free Plan */}
                <div
                    onClick={() => setSelectedPlan("free")}
                    className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all ${selectedPlan === "free" ? "bg-white border-white scale-105 shadow-2xl" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                >
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className={`text-xl font-bold ${selectedPlan === "free" ? "text-gray-900" : "text-white"}`}>Gratuit</h3>
                            <p className={selectedPlan === "free" ? "text-gray-500" : "text-gray-400"}>Pour démarrer</p>
                        </div>
                        <div className={`text-2xl font-bold ${selectedPlan === "free" ? "text-gray-900" : "text-white"}`}>0€<span className="text-sm font-normal opacity-60">/mois</span></div>
                    </div>
                    <ul className={`space-y-3 mb-8 ${selectedPlan === "free" ? "text-gray-600" : "text-gray-300"}`}>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> 1 Guide actif</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Blocks essentiels</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> QR Code basique</li>
                    </ul>
                    {selectedPlan === "free" && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-white">
                            <Check className="w-4 h-4" />
                        </div>
                    )}
                </div>

                {/* Pro Plan */}
                <div
                    onClick={() => setSelectedPlan("pro")}
                    className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all overflow-hidden ${selectedPlan === "pro" ? "bg-gradient-to-br from-rose-500 to-red-600 border-red-500 scale-105 shadow-2xl" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                >
                    {selectedPlan === "pro" && <div className="absolute inset-0 bg-white/10 pointer-events-none" />}
                    <div className="relative z-10 flex justify-between items-start mb-6">
                        <div>
                            <h3 className={`text-xl font-bold ${selectedPlan === "pro" ? "text-white" : "text-white"}`}>Pro</h3>
                            <p className={selectedPlan === "pro" ? "text-rose-100" : "text-gray-400"}>Pour les pros</p>
                        </div>
                        <div className={`text-2xl font-bold ${selectedPlan === "pro" ? "text-white" : "text-white"}`}>19€<span className="text-sm font-normal opacity-60">/mois</span></div>
                    </div>
                    <ul className={`space-y-3 mb-8 ${selectedPlan === "pro" ? "text-white" : "text-gray-300"}`}>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Guides illimités</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Tous les thèmes Premium</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Analytics avancés</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Support prioritaire</li>
                    </ul>
                    {selectedPlan === "pro" && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-white text-rose-600 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4" />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <button
                    onClick={async () => {
                        if (selectedPlan === "pro") {
                            setIsCheckingOut(true);
                            try {
                                // Get session
                                const session = await supabase.auth.getSession();
                                const res = await fetch("/api/stripe/checkout", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${session.data.session?.access_token}`
                                    },
                                    body: JSON.stringify({ plan: "pro" })
                                });
                                const data = await res.json();
                                if (data.url) {
                                    window.location.href = data.url;
                                } else {
                                    alert("Checkout unavailable in demo");
                                    setIsCheckingOut(false);
                                    setStep(3); // Fallback to next step for demo flow
                                }
                            } catch (e) {
                                console.error(e);
                                alert("Error starting checkout");
                                setIsCheckingOut(false);
                            }
                        } else {
                            setStep(3);
                        }
                    }}
                    disabled={isCheckingOut}
                    className="px-10 py-3 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2 disabled:opacity-70"
                >
                    {isCheckingOut ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Redirection...
                        </>
                    ) : (
                        <>
                            Continuer
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );

    // Step 3: Magic Creation
    const MagicStep = () => {
        const handleGenerate = async () => {
            setIsGenerating(true);
            try {
                // Get session for Auth header
                const session = await supabase.auth.getSession();
                const token = session.data.session?.access_token;

                // Call Generation API
                const res = await fetch("/api/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ prompt: aiPrompt })
                });
                const data = await res.json();

                if (res.status === 403 && data.isLimitReached) {
                    alert("Limite atteinte ! Passez à la version Pro pour créer plus de guides.");
                    setStep(2); // Go back to plans
                    setIsGenerating(false);
                    return;
                }

                if (data.guide && user) {
                    // Save to Supabase
                    const { data: saved, error } = await supabase
                        .from("guides")
                        .insert([{
                            ...data.guide,
                            id: undefined,
                            slug: data.guide.slug + "-" + Math.floor(Math.random() * 1000),
                            user_id: user.id
                        }])
                        .select()
                        .single();

                    if (saved) {
                        // Redirect to Builder
                        window.location.href = `/app/guides/${saved.id}/builder`;
                    } else {
                        console.error("Save error", error);
                        alert("Erreur de sauvegarde");
                        setIsGenerating(false);
                    }
                } else {
                    alert("Erreur de génération");
                    setIsGenerating(false);
                }
            } catch (e) {
                console.error(e);
                alert("Erreur système");
                setIsGenerating(false);
            }
        };

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                        <Sparkles size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Créez votre premier guide</h2>
                    <p className="text-gray-500">L'IA va générer une structure complète pour vous.</p>
                </div>

                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Ville</label>
                            <div className="relative">
                                <MapPin className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={aiPrompt.city}
                                    onChange={(e) => setAiPrompt({ ...aiPrompt, city: e.target.value })}
                                    placeholder="ex: Marrakech"
                                    className="w-full pl-10 h-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Type de bien</label>
                            <div className="relative">
                                <Building2 className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                                <select
                                    value={aiPrompt.type}
                                    onChange={(e) => setAiPrompt({ ...aiPrompt, type: e.target.value as any })}
                                    className="w-full pl-10 h-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all appearance-none"
                                >
                                    <option value="airbnb">Airbnb</option>
                                    <option value="hotel">Hôtel</option>
                                    <option value="guest_house">Maison d'hôtes</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Audience</label>
                            <div className="relative">
                                <Users className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                                <select
                                    value={aiPrompt.targetAudience}
                                    onChange={(e) => setAiPrompt({ ...aiPrompt, targetAudience: e.target.value as any })}
                                    className="w-full pl-10 h-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all appearance-none"
                                >
                                    <option value="families">Familles</option>
                                    <option value="couples">Couples</option>
                                    <option value="remote_workers">Télétravailleurs</option>
                                    <option value="everyone">Tout le monde</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Langue</label>
                            <div className="relative">
                                <Globe className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                                <select
                                    value={aiPrompt.language}
                                    onChange={(e) => setAiPrompt({ ...aiPrompt, language: e.target.value as any })}
                                    className="w-full pl-10 h-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all appearance-none"
                                >
                                    <option value="fr">Français</option>
                                    <option value="en">Anglais</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!aiPrompt.city || isGenerating}
                        className="w-full h-14 mt-8 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Génération magique en cours...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Générer mon guide magique ✨
                            </>
                        )}
                    </button>
                    {!aiPrompt.city && (
                        <p className="text-center text-sm text-gray-400">Entrez une ville pour commencer</p>
                    )}
                </div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900 flex items-center justify-center p-6 font-sans">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 w-full flex justify-center">
                <AnimatePresence mode="wait">
                    {step === 1 && <WelcomeStep key="step1" />}
                    {step === 2 && <PlanStep key="step2" />}
                    {step === 3 && <MagicStep key="step3" />}
                </AnimatePresence>
            </div>

            {/* Step Indicators */}
            <div className="fixed bottom-10 left-0 right-0 flex justify-center gap-2">
                {[1, 2, 3].map(i => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? "w-8 bg-white" : "w-2 bg-white/20"}`}
                    />
                ))}
            </div>
        </div>
    );
}
