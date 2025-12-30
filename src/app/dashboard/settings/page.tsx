"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, CreditCard, Settings, ChevronLeft, Upload, Package, ShoppingBag, Sparkles, Check, ShieldCheck } from "lucide-react";
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
                                            onUpload={setAvatarUrl}
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
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-sm text-zinc-400 mb-1">Plan Actuel</div>
                                                <div className="text-3xl font-black text-rose-400 mb-4 uppercase tracking-wider">
                                                    {subscription?.planId === "pro" ? "PRO" : subscription?.planId === "basic" ? "BASIQUE" : "DÉMO"}
                                                </div>
                                            </div>
                                            {subscription?.status === 'active' && (
                                                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                                                    ACTIF
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2 text-sm text-zinc-300">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full ${subscription?.planId === "demo" ? "bg-yellow-400" : "bg-green-400"}`} />
                                                {subscription?.planId === "pro" ? "Guides illimités" : subscription?.planId === "basic" ? "1 Guide inclus" : "1 Guide (Brouillon)"}
                                            </div>

                                            {/* Addons Display */}
                                            {subscription?.addons?.themes && (
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                                    Pack Thèmes Débloqué
                                                </div>
                                            )}
                                            {subscription?.addons?.extra_guides > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                    +{subscription.addons.extra_guides} Guide(s) Supplémentaire(s)
                                                </div>
                                            )}
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

                                    <button
                                        onClick={async () => {
                                            if (!user) return;
                                            setLoading(true);
                                            try {
                                                const res = await fetch('/api/stripe/portal', {
                                                    method: 'POST',
                                                    headers: { Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` }
                                                });
                                                const data = await res.json();
                                                if (data.url) window.location.href = data.url;
                                                else alert("Pas de compte de facturation trouvé.");
                                            } catch (e) { console.error(e); }
                                            setLoading(false);
                                        }}
                                        disabled={loading}
                                        className="text-zinc-400 hover:text-white px-4 font-medium"
                                    >
                                        {loading ? "Chargement..." : "Gérer la facturation (Stripe)"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "shop" && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">Boutique & Extras</h2>
                                    <div className="flex items-center gap-2 text-xs text-zinc-400 bg-white/5 px-3 py-1 rounded-full">
                                        <ShieldCheck className="w-4 h-4 text-green-400" />
                                        Paiement Sécurisé Stripe
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-6">
                                    {/* Physical QR Code Product */}
                                    <div className="relative group p-1 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-rose-500/50 transition-all hover:shadow-2xl hover:shadow-rose-500/10">
                                        <div className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                                            BEST SELLER
                                        </div>
                                        <div className="bg-slate-900 rounded-[22px] p-6 h-full flex flex-col">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300">
                                                <Package className="w-8 h-8 text-white" />
                                            </div>

                                            <h3 className="font-bold text-xl mb-2 text-white">QR Code sur Toile</h3>
                                            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                                Offrez une expérience premium dès l'arrivée. Recevez un QR code unique imprimé sur une toile de qualité musée (20x20cm), prêt à être accroché.
                                            </p>

                                            <ul className="space-y-2 mb-8 flex-1">
                                                <li className="flex items-center gap-2 text-sm text-zinc-300">
                                                    <Check className="w-4 h-4 text-rose-500" />
                                                    Impression Haute Définition
                                                </li>
                                                <li className="flex items-center gap-2 text-sm text-zinc-300">
                                                    <Check className="w-4 h-4 text-rose-500" />
                                                    Cadre en bois inclus
                                                </li>
                                                <li className="flex items-center gap-2 text-sm text-zinc-300">
                                                    <Check className="w-4 h-4 text-rose-500" />
                                                    Livraison Suivie (Monde)
                                                </li>
                                            </ul>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex flex-col">
                                                    <span className="text-2xl font-bold text-white">200 DH</span>
                                                    <span className="text-[10px] text-zinc-500">TTC + Livraison</span>
                                                </div>
                                                <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg active:scale-95">
                                                    Commander
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Extra Guides Add-on */}
                                    <div className="relative group p-1 rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-white/10 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
                                        <div className="absolute top-4 right-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                            REQUIS: PRO
                                        </div>
                                        <div className="bg-slate-900 rounded-[22px] p-6 h-full flex flex-col">
                                            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                                <Settings className="w-8 h-8 text-blue-400" />
                                            </div>

                                            <h3 className="font-bold text-xl mb-2 text-white">Guide Supplémentaire</h3>
                                            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                                Besoin de plus de 2 guides ? Ajoutez un emplacement supplémentaire à votre abonnement Pro.
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                                <div className="flex flex-col">
                                                    <span className="text-2xl font-bold text-white">20 DH</span>
                                                    <span className="text-[10px] text-zinc-500">/mois par guide</span>
                                                </div>
                                                <button
                                                    onClick={async () => {
                                                        if (subscription?.planId !== 'pro') {
                                                            alert("Vous devez être Pro pour ajouter des guides.");
                                                            return;
                                                        }
                                                        if (!confirm("Ajouter 1 guide supplémentaire pour 20dh/mois ?")) return;

                                                        setLoading(true);
                                                        try {
                                                            const res = await fetch('/api/stripe/addon', {
                                                                method: 'POST',
                                                                headers: { Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` }
                                                            });
                                                            const data = await res.json();
                                                            if (data.success) {
                                                                alert("Guide ajouté ! Votre limite a été augmentée.");
                                                                window.location.reload();
                                                            } else {
                                                                alert(data.error || "Erreur");
                                                            }
                                                        } catch (e) { console.error(e); alert("Erreur serveur"); }
                                                        setLoading(false);
                                                    }}
                                                    disabled={loading || subscription?.planId !== 'pro'}
                                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {loading ? "..." : "Ajouter (+1)"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Themes Pack */}
                                    <div className="relative p-6 rounded-3xl bg-slate-900 border border-white/5 flex flex-col transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10">
                                        {subscription?.addons?.themes && (
                                            <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                                <Check size={10} /> POSSÉDÉ
                                            </div>
                                        )}
                                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
                                            <Sparkles className="w-8 h-8" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-2 text-white">Pack Ultimate Themes</h3>
                                        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                            Débloquez instantanément 20 thèmes premium créés par des designers pour sublimer vos guides.
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-2xl font-bold text-white">10 DH <span className="text-xs text-zinc-500 font-normal">/mois</span></span>

                                            {subscription?.planId === 'pro' || subscription?.addons?.themes ? (
                                                <button disabled className="bg-green-500/20 text-green-400 px-6 py-3 rounded-xl text-sm font-bold cursor-not-allowed">
                                                    Déjà Inclus
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={async () => {
                                                        if (!confirm("Débloquer les thèmes pour 10dh/mois ?")) return;
                                                        setLoading(true);
                                                        try {
                                                            const res = await fetch('/api/stripe/themes', {
                                                                method: 'POST',
                                                                headers: { Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` }
                                                            });
                                                            const data = await res.json();
                                                            if (data.success) {
                                                                alert("Thèmes débloqués ! 🎨");
                                                                window.location.reload();
                                                            } else {
                                                                alert(data.error || "Erreur");
                                                            }
                                                        } catch (e) { console.error(e); alert("Erreur serveur"); }
                                                        setLoading(false);
                                                    }}
                                                    disabled={loading}
                                                    className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg active:scale-95"
                                                >
                                                    {loading ? "..." : "Acheter"}
                                                </button>
                                            )}
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
