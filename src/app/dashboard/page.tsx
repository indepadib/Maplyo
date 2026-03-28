"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, ExternalLink, Moon, Sun, LayoutGrid, List, Map as MapIcon, LogOut, Sparkles, Settings, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { guideThemes } from "@/types/themes";
import { Modal } from "@/components/ui/Modal";
import type { Guide, BlockType } from "@/types/blocks";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";
import { MaplyoLogo } from "@/components/ui/MaplyoLogo";
import { getUserSubscription, checkLimit } from "@/lib/subscription";
import { UserSubscription } from "@/types/subscription";
import { slugify } from "@/lib/utils/slugify";

type GuideSummary = {
    id: string;
    title: string;
    slug: string;
    themeId: string;
    updatedAt: number;
    blockCount: number;
    is_published: boolean;
};

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}

function DashboardContent() {
    const { user, signOut } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [guides, setGuides] = useState<GuideSummary[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<"recent" | "name">("recent");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isProModalOpen, setIsProModalOpen] = useState(false);
    const [newGuideTitle, setNewGuideTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState<UserSubscription | null>(null);
    // AI State
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiPrompt, setAiPrompt] = useState<{
        city: string;
        type: "airbnb" | "hotel" | "guest_house";
        targetAudience: "families" | "couples" | "remote_workers" | "groups";
        language: "fr" | "en";
        mood?: "relax" | "adventure" | "romantic" | "business";
        amenities: string[];
    }>({
        city: "",
        type: "airbnb",
        targetAudience: "families",
        language: "fr",
        mood: "relax",
        amenities: []
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [isAddonSuccessOpen, setIsAddonSuccessOpen] = useState(false);

    const handleAiGenerate = async () => {
        setIsGenerating(true);
        try {
            // Get session for Auth header
            const session = await supabase.auth.getSession();
            const token = session.data.session?.access_token;

            const res = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ prompt: aiPrompt }),
            });
            const data = await res.json();

            if (res.status === 403 && data.isLimitReached) {
                setIsLimitModalOpen(true);
                return;
            }

            if (data.guide && user) {
                // Save to Supabase
                const { data: saved, error } = await supabase
                    .from("guides")
                    .insert([{
                        title: data.guide.title,
                        slug: slugify(data.guide.title) + "-" + Math.floor(Math.random() * 1000),
                        theme_id: data.guide.theme.themeId,
                        user_id: user.id,
                        content: { blocks: data.guide.blocks },
                        is_published: true // Auto-publish AI guides for instant gratification
                    }])
                    .select()
                    .single();

                if (saved) {
                    window.location.href = `/app/guides/${saved.id}/builder`;
                } else {
                    console.error("Save error", error);
                    alert("Erreur lors de la sauvegarde du guide généré.");
                }
            } else {
                alert("Erreur de génération : " + (data.error || "Inconnue"));
            }
        } catch (e) {
            console.error(e);
            alert("Erreur serveur.");
        }
        setIsGenerating(false);
    };

    useEffect(() => {
        if (!user) return;

        // Check for success param (Stripe Return)
        if (searchParams.get('success')) {
            setIsProModalOpen(true);
            router.replace('/dashboard'); // Clean URL
        }

        if (searchParams.get('success_addon')) {
            setIsAddonSuccessOpen(true);
            router.replace('/dashboard');
        }

        let retryCount = 0;
        const maxRetries = 2;

        const load = async () => {
            try {
                // 1. Load Guides
                const { data, error } = await supabase
                    .from('guides')
                    .select('id, title, slug, theme_id, updated_at, content, is_published')
                    .eq('user_id', user.id)
                    .order('updated_at', { ascending: false });

                // SELF-HEALING: If any guide has is_published = NULL, it's likely a legacy guide
                // We should fix them automatically so RLS doesn't block them
                const legacyGuides = data?.filter((g: any) => g.is_published === null) || [];
                if (legacyGuides.length > 0) {
                    console.log("Repairing legacy guides visibility...");
                    await Promise.all(legacyGuides.map(g => 
                        supabase.from('guides')
                            .update({ is_published: true })
                            .eq('id', g.id)
                    ));
                    // Re-fetch or update local state
                }

                if (error) {
                    console.error("Error loading guides (Attempt " + (retryCount+1) + "):", error);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(load, 500 * Math.pow(2, retryCount)); // Exponential backoff
                        return;
                    }
                } else if (data) {
                    const items: GuideSummary[] = data.map((g: any) => ({
                        id: g.id,
                        title: g.title,
                        slug: g.slug,
                        themeId: g.theme_id || "minimal-white",
                        updatedAt: new Date(g.updated_at).getTime(),
                        blockCount: g.content?.blocks?.length || 0,
                        is_published: g.is_published ?? false
                    }));
                    setGuides(items);
                }

                // 2. Load Subscription
                const sub = await getUserSubscription(user.id, supabase);
                setSubscription(sub);

                setLoading(false);
            } catch (e) {
                console.error("Dashboard massive load error:", e);
                setLoading(false);
            }
        };
        load();
    }, [user, searchParams, router]);

    const forceRefresh = async () => {
        setLoading(true);
        try {
            // Confirm we have a session
            const { data: { session: freshSession } } = await supabase.auth.getSession();
            const sid = freshSession?.user?.id || user?.id;

            if (!sid) {
                console.error("Refresh failed: No user ID");
                setLoading(false);
                return;
            }

            const sub = await getUserSubscription(sid, supabase);
            setSubscription(sub);
            
            const { data } = await supabase
                .from('guides')
                .select('id, title, slug, theme_id, updated_at, content, is_published')
                .eq('user_id', sid)
                .order('updated_at', { ascending: false });
            
            if (data) {
                setGuides(data.map((g: any) => ({
                    id: g.id,
                    title: g.title,
                    slug: g.slug,
                    themeId: g.theme_id || "minimal-white",
                    updatedAt: new Date(g.updated_at).getTime(),
                    blockCount: g.content?.blocks?.length || 0,
                    is_published: g.is_published ?? false
                })));
            }
        } catch (e) {
            console.error("Force refresh error:", e);
        }
        setLoading(false);
    };

    const filteredGuides = [...guides].sort((a, b) => {
        if (sortBy === "name") return a.title.localeCompare(b.title);
        return b.updatedAt - a.updatedAt;
    });

    const deleteGuide = async (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce guide ? Ce sera définitif.")) {
            const { error } = await supabase.from("guides").delete().eq("id", id);
            if (!error) {
                setGuides(guides.filter(g => g.id !== id));
            } else {
                alert("Erreur lors de la suppression.");
            }
        }
    };

    const handleCreateGuide = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !subscription) return;

        // CHECK LIMITS
        const canCreate = checkLimit(subscription, 'guides', guides.length);
        if (!canCreate) {
            setIsCreateModalOpen(false); 
            setIsLimitModalOpen(true);
            return;
        }

        const newGuideData = {
            title: newGuideTitle || "Mon Nouveau Guide",
            slug: `${slugify(newGuideTitle || "Mon Nouveau Guide")}-${Math.floor(Math.random() * 10000)}`, // Ensure uniqueness
            theme_id: "minimal-white",
            user_id: user.id,
            is_published: true,
            content: {
                blocks: [
                    {
                        id: "hero-1",
                        type: "hero",
                        title: "Hero",
                        visibility: { mode: "always" },
                        data: {
                            title: newGuideTitle || "Bienvenue",
                            subtitle: "Votre guide personnel",
                            coverImageUrl: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1200&q=80",
                            badges: ["Wi-Fi", "Piscine"]
                        }
                    },
                    {
                        id: "wifi-1",
                        type: "wifi",
                        title: "Wi-Fi",
                        visibility: { mode: "always" },
                        data: { networkName: "MonWifi", password: "password123" }
                    }
                ]
            }
        };

        const { data, error } = await supabase
            .from("guides")
            .insert([newGuideData])
            .select()
            .single();

        if (error) {
            console.error("Error creating guide:", error);
            alert(`Erreur lors de la création : ${error.message || "Problème de base de données"}`);
        } else if (data) {
            window.location.href = `/app/guides/${data.id}/builder`;
        }
    };

    const handleBuyAddon = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch('/api/stripe/addon-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ currency: 'MAD' }) // Default to MAD for now, could detect
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-rose-500/30 text-zinc-100">
            {/* Ambient Background Gradient */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-900/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02]" />
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
                            <MaplyoLogo className="w-6 h-6" classNamePath="fill-white" showText={false} />
                        </div>
                        <h1 className="font-bold text-xl tracking-tight text-white">Maplyo</h1>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="bg-transparent border-none text-sm font-medium px-3 py-1.5 cursor-pointer outline-none focus:ring-0 text-zinc-400 hover:text-white"
                            >
                                <option value="recent">Récents</option>
                                <option value="name">Nom</option>
                            </select>
                        </div>
                        <div className="h-6 w-px bg-white/10 hidden md:block" />
                        <button
                            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                            className="p-2.5 text-zinc-400 hover:bg-white/5 rounded-xl transition-all hover:text-white"
                        >
                            {viewMode === "grid" ? <List size={20} /> : <LayoutGrid size={20} />}
                        </button>
                        <button
                            onClick={signOut}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-700 border border-white/10 shadow-sm flex items-center justify-center font-bold text-zinc-400 text-sm hover:ring-2 hover:ring-offset-2 hover:ring-rose-500/50 transition-all hover:text-white"
                            title="Se déconnecter"
                        >
                            <LogOut className="w-4 h-4 ml-0.5" />
                        </button>
                        <button
                            onClick={forceRefresh}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-rose-400 transition-all hover:scale-105"
                            title="Actualiser mes droits"
                        >
                            <Sparkles className="w-4 h-4" />
                        </button>
                        <Link
                            href="/dashboard/settings"
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-all hover:scale-105"
                            title="Paramètres"
                        >
                            <Settings className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold mb-2 tracking-tight text-white">Mes Guides</h2>
                        <p className="text-zinc-500 text-lg">Gérez vos expériences voyageurs.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsAiModalOpen(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-purple-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:shadow-lg hover:shadow-rose-600/30 transition-all active:scale-95 group border border-white/10"
                        >
                            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                            <span className="hidden sm:inline">Magic Create (AI)</span>
                        </button>
                        <button
                            onClick={() => {
                                setNewGuideTitle("");
                                setIsCreateModalOpen(true);
                            }}
                            className="flex items-center gap-2 bg-white text-slate-950 px-6 py-3.5 rounded-2xl font-bold hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 active:scale-95 group"
                        >
                            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span className="hidden sm:inline">Nouveau Guide</span>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {guides.length === 0 && !loading ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-32 bg-white/[0.02] rounded-[2.5rem] border border-dashed border-white/10 shadow-sm"
                        >
                            <div className="w-20 h-20 bg-white/5 text-rose-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/5">
                                <Sparkles className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Aucun guide pour le moment</h3>
                            <p className="text-zinc-500 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                                Créez votre premier guide pour offrir une expérience exceptionnelle à vos voyageurs.
                                <br />
                                <span className="text-[10px] opacity-20 block mt-4 select-all">ID Diagnostic: {user?.id}</span>
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setIsAiModalOpen(true)}
                                    className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-8 py-4 rounded-2xl font-bold hover:bg-rose-500/20 transition-all"
                                >
                                    ✨ Essayer l'IA
                                </button>
                                <button
                                    onClick={() => {
                                        setNewGuideTitle("");
                                        setIsCreateModalOpen(true);
                                    }}
                                    className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all shadow-lg"
                                >
                                    Créer manuellement
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                            {filteredGuides.map((guide, idx) => {
                                const theme = guideThemes.find(t => t.id === guide.themeId) || guideThemes[0];
                                return (
                                    <motion.div
                                        key={guide.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group bg-slate-900/50 backdrop-blur-sm rounded-[2rem] border border-white/5 overflow-hidden hover:border-rose-500/30 transition-all duration-500 hover:-translate-y-1 flex flex-col shadow-2xl shadow-black/20"
                                    >
                                        {/* Preview Banner */}
                                        <div className="h-48 bg-slate-800 relative overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                                                style={{ backgroundColor: theme.primary, backgroundImage: theme.bgType === 'image' ? `url(${theme.bgImage})` : undefined }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />

                                            <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                                {subscription?.planId !== 'demo' ? (
                                                    <Link href={`/g/${guide.slug}`} target="_blank" className="p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white hover:text-black transition-colors shadow-lg" title="Voir le guide public">
                                                        <ExternalLink size={18} />
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={() => setIsProModalOpen(true)}
                                                        className="p-3 bg-rose-500/80 backdrop-blur-md border border-rose-400/20 rounded-xl text-white hover:bg-rose-500 transition-colors shadow-lg"
                                                        title="Passer Pro pour partager"
                                                    >
                                                        <span className="text-xs font-bold">PRO</span>
                                                    </button>
                                                )}
                                            </div>

                                            <div className="absolute bottom-4 left-5 right-5">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-zinc-300 uppercase tracking-wider">
                                                        {guide.blockCount} blocs
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-white mb-0 leading-tight drop-shadow-md">
                                                    {guide.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex-1 mb-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-2 h-2 rounded-full ${guide.is_published ? 'bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-amber-500'}`}></span>
                                                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                                            {guide.is_published ? 'En ligne' : 'Brouillon'}
                                                        </span>
                                                    </div>
 streams                                                    <p className="text-xs font-medium text-zinc-600">
                                                        {new Date(guide.updatedAt).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long' })}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-zinc-500 font-mono bg-white/[0.02] p-2 rounded-lg border border-white/5">
                                                    <span className="text-zinc-600 select-none">maplyo.com/g/</span>
                                                    <span className="text-rose-400 select-all">{guide.slug}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                <Link href={`/app/guides/${guide.id}/builder`} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-slate-950 font-bold hover:bg-zinc-200 transition-colors shadow-lg">
                                                    <Edit2 size={18} />
                                                    Éditer
                                                </Link>
                                                <button
                                                    onClick={() => deleteGuide(guide.id)}
                                                    className="p-3.5 rounded-xl border border-white/10 text-zinc-500 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </AnimatePresence>
            </main>

            {/* AI Wizard Modal */}
            <Modal
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
                title="Création Magique ✨"
                icon="🤖"
            >
                {!isGenerating ? (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-zinc-700 mb-2">Ville ou Lieu</label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all"
                                    placeholder="Ex: Marrakech, Quartier Guéliz"
                                    value={aiPrompt.city}
                                    onChange={e => setAiPrompt({ ...aiPrompt, city: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 mb-2">Type</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
                                        value={aiPrompt.type}
                                        onChange={e => setAiPrompt({ ...aiPrompt, type: e.target.value as any })}
                                    >
                                        <option value="airbnb">Airbnb / Appartement</option>
                                        <option value="hotel">Hôtel / Riad</option>
                                        <option value="guest_house">Maison d'hôtes</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 mb-2">Voyageurs</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
                                        value={aiPrompt.targetAudience}
                                        onChange={e => setAiPrompt({ ...aiPrompt, targetAudience: e.target.value as any })}
                                    >
                                        <option value="families">Familles</option>
                                        <option value="couples">Couples</option>
                                        <option value="remote_workers">Télétravailleurs</option>
                                        <option value="groups">Groupes</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleAiGenerate}
                            disabled={!aiPrompt.city}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Générer mon guide
                        </button>
                    </div>
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 mb-6 relative">
                            <div className="absolute inset-0 rounded-full border-4 border-purple-100"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">✨</div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">L'IA rédige votre guide...</h3>
                        <p className="text-gray-500">Création des recommandations pour {aiPrompt.city}</p>
                    </div>
                )}
            </Modal>


            {/* Create Guide Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Nouveau Voyage"
                icon="✨"
            >
                <form onSubmit={handleCreateGuide} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                            Nom du guide
                        </label>
                        <input
                            type="text"
                            value={newGuideTitle}
                            onChange={(e) => setNewGuideTitle(e.target.value)}
                            placeholder="Ex: Riad des Lumières"
                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-lg font-medium placeholder:text-gray-400"
                            autoFocus
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(false)}
                            className="px-6 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-black shadow-xl shadow-black/10 active:scale-95 transition-all"
                        >
                            Créer le guide
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Limit Modal */}
            <Modal
                isOpen={isLimitModalOpen}
                onClose={() => setIsLimitModalOpen(false)}
                title="Limite de guides atteinte 🏠"
                icon="⚠️"
            >
                <div className="text-center py-6">
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Vous avez atteint la limite de guides autorisés par votre abonnement actuel.
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={() => window.location.href = '/pricing'}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg transition-all"
                        >
                            🚀 Passer à l'illimité (Pro)
                        </button>
                        
                        <div className="relative py-2">
                            <div className="absolute inset-x-0 top-1/2 h-px bg-gray-100" />
                            <span className="relative z-10 bg-white px-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Ou</span>
                        </div>

                        <button
                            onClick={handleBuyAddon}
                            className="w-full py-4 rounded-xl bg-white border-2 border-gray-100 text-gray-900 font-bold text-lg hover:border-rose-500 transition-all"
                            disabled={loading}
                        >
                            {loading ? "Chargement..." : "➕ Rajouter juste 1 guide (20 DH)"}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Addon Success Modal */}
            <Modal
                isOpen={isAddonSuccessOpen}
                onClose={() => setIsAddonSuccessOpen(false)}
                title="Guide ajouté ! ✨"
                icon="🎟️"
            >
                <div className="text-center py-6">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">C'est prêt !</h3>
                    <p className="text-gray-500 mb-8">
                        Votre limite a été augmentée de 1 guide. Vous pouvez désormais créer votre nouveau guide dès maintenant.
                    </p>
                    <button
                        onClick={() => setIsAddonSuccessOpen(false)}
                        className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-black transition-all"
                    >
                        Super, merci !
                    </button>
                </div>
            </Modal>
        </div>
    );
}
