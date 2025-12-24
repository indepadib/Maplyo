"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink, Moon, Sun, LayoutGrid, List } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { guideThemes } from "@/types/themes";
import { Modal } from "@/components/ui/Modal";
import type { Guide, BlockType } from "@/types/blocks";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";

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
    // AI State
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiStep, setAiStep] = useState(1);
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
                // Ideally, we could open a Pro upgrade modal here
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
        const loadGuides = async () => {
            if (!user) return;
            setLoading(true);
            const { data, error } = await supabase
                .from("guides")
                .select("id, title, slug, theme_id, updated_at, content")
                .eq("user_id", user.id); // Filter by user

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
                items.sort((a, b) => b.updatedAt - a.updatedAt);
                setGuides(items);
            }
            setLoading(false);
        };
        loadGuides();
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
        if (!user) return;

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
        <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans selection:bg-blue-100">
            {/* Ambient Background Gradient */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none -z-10" />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all">
                <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                            M
                        </div>
                        <h1 className="font-bold text-xl tracking-tight text-gray-900">Maplyo</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-gray-100/50 p-1 rounded-xl">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="bg-transparent border-none text-sm font-medium px-3 py-1.5 cursor-pointer outline-none focus:ring-0 text-gray-600"
                            >
                                <option value="recent">Récents</option>
                                <option value="name">Nom</option>
                            </select>
                        </div>
                        <div className="h-6 w-px bg-gray-200 hidden md:block" />
                        <button
                            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                            className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all hover:text-gray-900"
                        >
                            {viewMode === "grid" ? <List size={20} /> : <LayoutGrid size={20} />}
                        </button>
                        <button
                            onClick={signOut}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-gray-600 text-sm hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 transition-all"
                            title="Se déconnecter"
                        >
                            {user?.email?.[0].toUpperCase() || "JD"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold mb-2 tracking-tight text-gray-900">Mes Guides</h2>
                        <p className="text-gray-500 text-lg">Gérez vos guides de bienvenue numériques.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsAiModalOpen(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95 group"
                        >
                            <span className="text-xl">✨</span>
                            <span className="hidden sm:inline">Magic Create</span>
                        </button>
                        <button
                            onClick={() => {
                                setNewGuideTitle("");
                                setIsCreateModalOpen(true);
                            }}
                            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-900/20 active:scale-95 group"
                        >
                            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span className="hidden sm:inline">Nouveau Guide</span>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {guides.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-gray-200 shadow-sm"
                        >
                            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                                📖
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">Aucun guide pour le moment</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                                Créez votre premier guide pour offrir une expérience exceptionnelle à vos voyageurs.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setIsAiModalOpen(true)}
                                    className="bg-purple-100 text-purple-700 px-8 py-4 rounded-2xl font-bold hover:bg-purple-200 transition-all"
                                >
                                    ✨ Essayer l'IA
                                </button>
                                <button
                                    onClick={() => {
                                        setNewGuideTitle("");
                                        setIsCreateModalOpen(true);
                                    }}
                                    className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40"
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
                                        className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
                                    >
                                        {/* Preview Banner */}
                                        <div className="h-48 bg-gray-100 relative overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                                                style={{ backgroundColor: theme.primary, backgroundImage: theme.bgType === 'image' ? `url(${theme.bgImage})` : undefined }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                                            <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                                <Link href={`/g/${guide.slug}`} target="_blank" className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white hover:bg-white hover:text-gray-900 transition-colors shadow-lg" title="Voir le guide public">
                                                    <ExternalLink size={18} />
                                                </Link>
                                            </div>

                                            <div className="absolute bottom-4 left-5 right-5">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white uppercase tracking-wider">
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
                                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">En ligne</span>
                                                    </div>
                                                    <p className="text-xs font-medium text-gray-400">
                                                        Mis à jour {new Date(guide.updatedAt).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long' })}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 font-mono bg-gray-50 p-2 rounded-lg border border-gray-100">
                                                    <span className="text-gray-400">maplyo.com/g/</span>
                                                    <span className="text-gray-900 select-all">{guide.slug}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                <Link href={`/app/guides/${guide.id}/builder`} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-colors shadow-lg shadow-gray-900/10">
                                                    <Edit2 size={18} />
                                                    Éditer
                                                </Link>
                                                <button
                                                    onClick={() => deleteGuide(guide.id)}
                                                    className="p-3.5 rounded-xl border border-gray-200 text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
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
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ville ou Lieu</label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all"
                                    placeholder="Ex: Marrakech, Quartier Guéliz"
                                    value={aiPrompt.city}
                                    onChange={e => setAiPrompt({ ...aiPrompt, city: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
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
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Voyageurs</label>
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

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Langue</label>
                                <div className="flex gap-4">
                                    <label className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all ${aiPrompt.language === 'fr' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-100'}`}>
                                        <input type="radio" className="hidden" name="lang" checked={aiPrompt.language === 'fr'} onChange={() => setAiPrompt({ ...aiPrompt, language: 'fr' })} />
                                        <span className="font-bold block text-center">Français 🇫🇷</span>
                                    </label>
                                    <label className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all ${aiPrompt.language === 'en' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-100'}`}>
                                        <input type="radio" className="hidden" name="lang" checked={aiPrompt.language === 'en'} onChange={() => setAiPrompt({ ...aiPrompt, language: 'en' })} />
                                        <span className="font-bold block text-center">English 🇬🇧</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ambiance (Mood)</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: 'relax', label: 'Détente 🌿' },
                                        { id: 'adventure', label: 'Aventure 🎒' },
                                        { id: 'romantic', label: 'Romantique ❤️' },
                                        { id: 'business', label: 'Travail 💼' }
                                    ].map((m) => (
                                        <label key={m.id} className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${aiPrompt.mood === m.id ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-100 hover:bg-gray-50'}`}>
                                            <input
                                                type="radio"
                                                className="hidden"
                                                name="mood"
                                                checked={aiPrompt.mood === m.id}
                                                onChange={() => setAiPrompt({ ...aiPrompt, mood: m.id as any })}
                                            />
                                            <span className="font-bold block text-center text-sm">{m.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Équipements Clés</label>
                                <div className="flex flex-wrap gap-2">
                                    {["Wi-Fi", "Piscine", "Parking", "Climatisation", "Cuisine", "TV", "Lave-linge"].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => {
                                                const current = aiPrompt.amenities || [];
                                                const exists = current.includes(item);
                                                setAiPrompt({
                                                    ...aiPrompt,
                                                    amenities: exists
                                                        ? current.filter((i: string) => i !== item)
                                                        : [...current, item]
                                                });
                                            }}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${(aiPrompt.amenities || []).includes(item)
                                                ? "bg-purple-100 border-purple-200 text-purple-700"
                                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
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
                        <label className="block text-sm font-bold text-gray-700 mb-2">
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
                        <p className="text-sm text-gray-500 mt-3 ml-1">
                            Choisissez un nom accueillant pour vos voyageurs.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl flex gap-4 text-blue-900 text-sm border border-blue-100">
                        <span className="text-2xl pt-1">💡</span>
                        <div className="space-y-1">
                            <p className="font-bold">Conseil de pro</p>
                            <p className="opacity-90 leading-relaxed">
                                Une fois créé, vous pourrez choisir un thème inspirant (comme "Marrakech" ou "Chefchaouen") et personnaliser chaque détail.
                            </p>
                        </div>
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
