"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, CreditCard, Settings, ChevronLeft, Upload, Package, ShoppingBag } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { FileUploader } from "@/components/ui/FileUploader";
import { getUserSubscription } from "@/lib/subscription";

export default function SettingsPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<"profile" | "plan" | "shop">("profile");
    const [loading, setLoading] = useState(false);
    const [subscription, setSubscription] = useState<any>(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        if (!user) return;
        const load = async () => {
            // Load Sub
            const sub = await getUserSubscription(user.id);
            setSubscription(sub);

            // Load Profile
            // For now, we simulate profile data if table not fully ready
            const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            if (data) {
                setAvatarUrl(data.avatar_url || "");
                setFullName(data.full_name || "");
            }
        };
        load();
    }, [user]);

    const updateProfile = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('profiles').upsert({
                id: user.id,
                avatar_url: avatarUrl,
                full_name: fullName,
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
            alert("Profil mis à jour !");
        } catch (e) {
            console.error(e);
            alert("Erreur lors de la mise à jour.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-zinc-100 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Paramètres & Compte</h1>
                </div>

                <div className="grid md:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar */}
                    <div className="space-y-2">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "profile" ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-white/5 hover:bg-white/10 text-zinc-400"
                                }`}
                        >
                            <User size={18} />
                            Profil
                        </button>
                        <button
                            onClick={() => setActiveTab("plan")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "plan" ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-white/5 hover:bg-white/10 text-zinc-400"
                                }`}
                        >
                            <CreditCard size={18} />
                            Abonnement
                        </button>
                        <button
                            onClick={() => setActiveTab("shop")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "shop" ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-white/5 hover:bg-white/10 text-zinc-400"
                                }`}
                        >
                            <ShoppingBag size={18} />
                            Boutique (Upsells)
                        </button>
                    </div>

                    {/* Content */}
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8">
                        {activeTab === "profile" && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4">Informations Personnelles</h2>

                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden relative group">
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-8 h-8 text-zinc-600" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-bold mb-2">Avatar URL</label>
                                        <FileUploader
                                            value={avatarUrl}
                                            onChange={setAvatarUrl}
                                            folder="avatars"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2">Nom Complet</label>
                                    <input
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 transition-colors"
                                        placeholder="Votre nom"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2">Email</label>
                                    <input
                                        value={user?.email}
                                        disabled
                                        className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed"
                                    />
                                </div>

                                <button
                                    onClick={updateProfile}
                                    disabled={loading}
                                    className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
                                >
                                    {loading ? "Enregistrement..." : "Sauvegarder"}
                                </button>
                            </div>
                        )}

                        {activeTab === "plan" && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4">Mon Abonnement</h2>

                                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 relative overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="text-sm text-zinc-400 mb-1">Plan Actuel</div>
                                        <div className="text-3xl font-black text-rose-400 mb-4 uppercase tracking-wider">
                                            {subscription?.planId === "pro" ? "PRO" : "GRATUIT"}
                                        </div>
                                        <div className="flex flex-col gap-2 text-sm text-zinc-300">
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                                {subscription?.planId === "pro" ? "Guides illimités" : "1 Guide maximum"}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                                {subscription?.planId === "pro" ? "Support prioritaire" : "Support standard"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute right-0 top-0 p-8 opacity-10">
                                        <CreditCard size={100} />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    {subscription?.planId !== "pro" ? (
                                        <Link href="/pricing" className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-700 transition-colors">
                                            Passer Pro
                                        </Link>
                                    ) : (
                                        <button disabled className="bg-zinc-800 text-zinc-500 px-6 py-3 rounded-xl font-bold cursor-not-allowed">
                                            Vous êtes Pro
                                        </button>
                                    )}

                                    <button className="text-zinc-400 hover:text-white px-4 font-medium">
                                        Gérer la facturation (Stripe)
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "shop" && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4">Boutique & Extras</h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-6 rounded-2xl bg-slate-800 border border-white/10 hover:border-rose-500/50 transition-colors group">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Package className="w-6 h-6 text-rose-400" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-1">QR Code Imprimé</h3>
                                        <p className="text-sm text-zinc-400 mb-4">
                                            Recevez un QR Code haute qualité imprimé sur toile, prêt à être affiché dans votre logement.
                                        </p>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-xl font-bold text-white">200 DH</span>
                                            <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors">
                                                Commander
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-slate-800 border border-white/10 opacity-50 cursor-not-allowed">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                                            <Sparkles className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-1">Pack de Thèmes</h3>
                                        <p className="text-sm text-zinc-400 mb-4">
                                            Débloquez 10 thèmes premium supplémentaires pour vos guides.
                                        </p>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-xl font-bold text-white">100 DH</span>
                                            <button disabled className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold">
                                                Bientôt
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
