"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink, Moon, Sun, LayoutGrid, List, Map as MapIcon, LogOut, Sparkles, Settings } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { guideThemes } from "@/types/themes";
import { Modal } from "@/components/ui/Modal";
import type { Guide, BlockType } from "@/types/blocks";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";
import { MaplyoLogo } from "@/components/ui/MaplyoLogo";
import { getUserSubscription, checkLimit } from "@/lib/subscription";
import { UserSubscription } from "@/types/subscription";

type GuideSummary = {
    id: string;
    title: string;
    slug: string;
    themeId: string;
    updatedAt: number;
    blockCount: number;
};

export default function DashboardPage() {
    const { user, signOut } = useAuth();
    const [guides, setGuides] = useState<GuideSummary[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<"recent" | "name">("recent");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
                alert("Limite atteinte ! Passez à la version Pro pour créer plus de guides.");
                return;
            }

            if (data.guide && user) {
                // Save to Supabase
                const { data: saved, error } = await supabase
                    .from("guides")
                    .insert([{
                        title: data.guide.title,
                        slug: data.guide.slug + "-" + Math.floor(Math.random() * 1000),
                        theme_id: data.guide.theme.themeId,
                        user_id: user.id,
                        content: { blocks: data.guide.blocks }
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

        const load = async () => {
            // 1. Load Guides
            const { data, error } = await supabase
                .from('guides')
                .select('id, title, slug, theme_id, updated_at, content')
                .eq('user_id', user.id)
                .order('updated_at', { ascending: false });

            if (error) {
                console.error("Error loading guides:", error);
            } else if (data) {
                const items: GuideSummary[] = data.map((g: any) => ({
                    id: g.id,
                    title: g.title,
                    slug: g.slug,
                    themeId: g.theme_id || "minimal-white",
                    updatedAt: new Date(g.updated_at).getTime(),
                    blockCount: g.content?.blocks?.length || 0
                }));
                setGuides(items);
            }

            // 2. Load Subscription
            const sub = await getUserSubscription(user.id);
            setSubscription(sub);

            setLoading(false);
        };
        load();
    }, [user]);

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
            // Redirect to Pricing
            setIsCreateModalOpen(false); // Close modal
            window.location.href = '/pricing';
            return;
        }

        const newGuideData = {
            title: newGuideTitle || "Mon Nouveau Guide",
            slug: Math.random().toString(36).substr(2, 9),
            theme_id: "minimal-white",
            user_id: user.id, // Assign ownership
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
            alert("Erreur lors de la création.");
        } else if (data) {
            window.location.href = `/app/guides/${data.id}/builder`;
        }
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
                                                <Link href={`/g/${guide.slug}`} target="_blank" className="p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white hover:text-black transition-colors shadow-lg" title="Voir le guide public">
                                                    <ExternalLink size={18} />
                                                </Link>
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
                                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse box-shadow-green shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">En ligne</span>
                                                    </div>
                                                    <p className="text-xs font-medium text-zinc-600">
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
        </div>
    );
}
