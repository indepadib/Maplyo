"use client";
import { supabase } from "@/lib/supabase";
import { useState, useMemo, useEffect } from "react";
import { blockLibrary, blockRegistry } from "@/components/blocks/registry";
import { Button } from "@/components/ui/Button";
import type { Guide as GuideType } from "@/types/blocks"; // Renamed to avoid conflict with value import
import { StyledGuideRenderer as GuideRenderer } from "@/components/guide/StyledGuideRenderer";
import { Modal } from "@/components/ui/Modal";
import { guideThemes as themes, type GuideTheme as Theme } from "@/types/themes";
import { MinimalIcons } from "@/components/icons/MinimalIcons";
import { Settings, ChevronRight, Trash2, ExternalLink, ChevronLeft, Plus, Lock, Check as CheckIcon, Palette, QrCode, Monitor, Smartphone } from "lucide-react";
import { canUseFeature } from "@/lib/subscription";
import { UserSubscription } from "@/types/subscription";
import { Guide, BlockType } from "@/types/blocks"; // Value import for Guide and BlockType

function uid() { return Math.random().toString(36).slice(2, 10); }
const STORAGE_KEY = "eguidehq_demo_guide_v1";

const ESSENTIAL_THEMES = ["minimal-white", "soft-gray", "ocean", "nature", "sunset"];

// Icons for blocks - using MinimalIcons directly in render

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") return;
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);
    return matches;
}





export function EnhancedBuilder({ initialGuide, subscription, isGuest = false }: { initialGuide: Guide; subscription?: UserSubscription, isGuest?: boolean }) {
    function getKey(id: string) { return `guide-${id}`; }

    // --- SUBSCRIPTION CHECK ---
    const planId = subscription?.planId || 'demo';
    // @ts-ignore
    const unlockedThemes = subscription ? canUseFeature(subscription, 'themes') : false;

    // --- STATE ---
    const [guide, setGuide] = useState<Guide>(() => {
        if (typeof window === "undefined") return initialGuide;
        try {
            const key = getKey(initialGuide.id);
            if (initialGuide.id === "demo" && !window.localStorage.getItem(key)) {
                const old = window.localStorage.getItem(STORAGE_KEY);
                if (old) return JSON.parse(old);
            }
            const raw = window.localStorage.getItem(key);
            return raw ? (JSON.parse(raw) as Guide) : initialGuide;
        }
        catch { return initialGuide; }
    });

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [showThemes, setShowThemes] = useState(false);
    const [showSubscribe, setShowSubscribe] = useState(false);
    const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

    // Initialize theme
    const selectedTheme = useMemo(() => {
        const savedId = guide.theme?.themeId;
        return themes.find(t => t.id === savedId) || themes[0];
    }, [guide.theme]);

    const editing = useMemo(() => guide.blocks.find((b) => b.id === editingId) ?? null, [guide, editingId]);
    const editingDef = editing ? blockRegistry[editing.type] : null;

    // --- ACTIONS ---
    async function persist(next: Guide) {
        setGuide(next);
        // Optimistic update to LocalStorage (optional but good for safety)
        if (typeof window !== "undefined") window.localStorage.setItem(getKey(next.id), JSON.stringify(next));

        // Save to Supabase
        if (!isGuest) {
            const { error } = await supabase
                .from("guides")
                .update({
                    title: next.title,
                    theme_id: next.theme.themeId,
                    content: { blocks: next.blocks },
                    updated_at: new Date().toISOString()
                })
                .eq("id", next.id);

            if (error) console.error("Error saving guide:", error);
        }
    }

    function addBlock(type: BlockType) {
        const def = blockRegistry[type];
        const newBlock = {
            id: uid(),
            type,
            title: def.label,
            visibility: def.isSensitive ? { mode: "with_code" as const, unlockCode: "0000" } : { mode: "always" as const },
            data: def.defaultData,
        };
        const next = { ...guide, blocks: [...guide.blocks, newBlock] };
        persist(next);
        setEditingId(newBlock.id);
    }

    function removeBlock(id: string) {
        const nextBlocks = guide.blocks.filter((b) => b.id !== id);
        persist({ ...guide, blocks: nextBlocks });
        if (editingId === id) setEditingId(null);
    }

    function handleDragStart(id: string) {
        setDraggedId(id);
    }

    function handleDragOver(e: React.DragEvent, targetId: string) {
        e.preventDefault();
        if (!draggedId || draggedId === targetId) return;

        const draggedIdx = guide.blocks.findIndex((b) => b.id === draggedId);
        const targetIdx = guide.blocks.findIndex((b) => b.id === targetId);

        if (draggedIdx === -1 || targetIdx === -1) return;

        const nextBlocks = [...guide.blocks];
        const [draggedBlock] = nextBlocks.splice(draggedIdx, 1);
        nextBlocks.splice(targetIdx, 0, draggedBlock);

        persist({ ...guide, blocks: nextBlocks });
    }

    function handleDragEnd() {
        setDraggedId(null);
    }

    // --- UI HELPERS ---
    const isMobile = useMediaQuery("(max-width: 768px)");

    // --- DEBUG BANNER (TEMP) ---
    const debugInfo = JSON.stringify(subscription, null, 2);
    // ---------------------------

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
            {/* DEBUG OVERLAY */}
            <div className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white text-xs font-mono p-1 text-center opacity-90 hover:opacity-100 transition-opacity pointer-events-none">
                DEBUG: {debugInfo}
            </div>

            {/* TOP BAR */}
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    {/* Back Button Behavior */}
                    {isGuest ? (
                        <a href="/" className="p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Retour à l'accueil">
                            <ChevronLeft size={20} />
                        </a>
                    ) : (
                        <a href="/dashboard" className="p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="Retour au Dashboard">
                            <ChevronLeft size={20} />
                        </a>
                    )}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                            G
                        </div>
                        <div>
                            <h1 className="font-bold text-sm text-gray-900">{guide.title}</h1>
                            <p className="text-xs text-gray-500">Mode Éditeur</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" onClick={() => setShowThemes(true)} className="gap-2 text-sm bg-gray-100 hover:bg-gray-200 border-0 text-gray-700">
                        <Palette className="w-4 h-4" /> Thème
                    </Button>
                    <a href={`/app/guides/${guide.id}/print`} className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-700 no-underline">
                        <QrCode className="w-4 h-4" /> QR
                    </a>

                    <div className="h-6 w-px bg-gray-200 mx-2" />

                    {/* PUBLISH TOGGLE / GUEST PROMPT */}
                    {isGuest ? (
                        <div className="flex items-center gap-2">
                            <a href="/signup" className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-sm font-bold shadow-lg shadow-rose-200">
                                🚀 Créer mon compte
                            </a>
                        </div>
                    ) : (guide.isPublished ? (
                        <div className="flex items-center gap-2">
                            <a href={`/g/${guide.slug}`} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-bold shadow-green-200 shadow-lg">
                                <ExternalLink size={16} /> En Ligne
                            </a>
                            <button
                                onClick={async () => {
                                    if (confirm("Voulez-vous vraiment retirer ce guide du public ?")) {
                                        await supabase.from("guides").update({ is_published: false }).eq("id", guide.id);
                                        setGuide({ ...guide, isPublished: false });
                                    }
                                }}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                title="Dépublier"
                            >
                                <Lock size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={async () => {
                                // 1. CHECK PLAN
                                if (subscription?.planId === 'demo') {
                                    setShowSubscribe(true);
                                    return;
                                }

                                // 2. CHECK LIMITS (Optimistic check, strict check should be server-side or count based)
                                // Ideally fetch current count here against limit. For this demo, we assume the user dashboard blocked creation if full.

                                // But enabling publishing might need double check.

                                // 3. PUBLISH
                                const { error } = await supabase.from("guides").update({ is_published: true }).eq("id", guide.id);
                                if (!error) {
                                    setGuide({ ...guide, isPublished: true });
                                    alert("Guide publié avec succès ! 🚀");
                                }
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-bold shadow-xl"
                        >
                            🚀 Publier
                        </button>
                    ))}
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* 1. LEFT COLUMN: LIBRARY */}
                <aside className="w-80 bg-white border-r border-gray-200 flex-col z-10 overflow-y-auto hidden lg:flex">
                    <div className="p-6">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">Bibliothèque</h2>
                        <div className="space-y-8">
                            {categories.map(cat => (
                                <div key={cat}>
                                    <h3 className="text-sm font-bold text-gray-900 mb-4">{cat}</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {blockLibrary.filter(b => b.category === cat).map(b => {
                                            const Icon = MinimalIcons[b.type as BlockType];
                                            return (
                                                <button
                                                    key={b.type}
                                                    onClick={() => addBlock(b.type)}
                                                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group text-center gap-2"
                                                >
                                                    <div className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors">
                                                        {Icon ? <Icon className="w-8 h-8" color="currentColor" /> : <span className="text-xl">?</span>}
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-600 group-hover:text-blue-700">{b.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* 2. CENTER COLUMN: CANVAS */}
                <main className="flex-1 bg-gray-100/50 overflow-y-auto p-8 flex justify-center">
                    <div className="w-full max-w-xl pb-20">
                        <div className="lg:hidden p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl mb-6 text-sm flex items-start gap-3">
                            <span className="text-xl">💻</span>
                            <div>
                                <p className="font-bold">Mode Consultation</p>
                                <p className="opacity-90 mt-1">L'éditeur complet est optimisé pour ordinateur.</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Structure du guide</h2>
                            <span className="text-sm text-gray-500">{guide.blocks.length} blocs</span>
                        </div>

                        {guide.blocks.length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center h-96 flex flex-col items-center justify-center bg-white/50">
                                <span className="text-6xl mb-4 opacity-30">✨</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Ton guide est vide</h3>
                                <p className="text-gray-500 mb-6">Sélectionne un bloc à gauche pour commencer.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {guide.blocks.map((block, idx) => {
                                    const def = blockRegistry[block.type];
                                    const isSelected = editingId === block.id;
                                    const Icon = MinimalIcons[block.type as BlockType];

                                    return (
                                        <div
                                            key={block.id}
                                            draggable
                                            onDragStart={() => handleDragStart(block.id)}
                                            onDragOver={(e) => handleDragOver(e, block.id)}
                                            onDragEnd={handleDragEnd}
                                            onClick={() => setEditingId(block.id)}
                                            className={`
                                                relative group bg-white p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4
                                                ${isSelected ? 'border-blue-600 shadow-xl shadow-blue-900/5 scale-[1.02] z-10' : 'border-transparent hover:border-gray-200 hover:shadow-lg'}
                                                ${draggedId === block.id ? 'opacity-20' : 'opacity-100'}
                                            `}
                                        >
                                            <div className="w-6 text-gray-300 font-bold text-sm text-center select-none handle cursor-grab active:cursor-grabbing">
                                                ⋮⋮
                                            </div>

                                            <div className={`
                                                w-12 h-12 rounded-xl flex items-center justify-center
                                                ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}
                                            `}>
                                                {Icon ? <Icon className="w-6 h-6" color="currentColor" /> : <span>?</span>}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-bold text-base truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>{block.title}</h3>
                                                <p className="text-xs text-gray-500 truncate">{def?.label}</p>
                                            </div>

                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <ChevronRight size={18} className="text-gray-300" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </main>

                {/* 3. RIGHT COLUMN: PREVIEW & EDITOR */}
                <aside className="w-[420px] bg-white border-l border-gray-200 flex-col z-10 shadow-xl hidden lg:flex">
                    {/* TOGGLE TABS (Optional future feature, for now split view) */}

                    {/* TOP: PREVIEW */}
                    <div className="h-[55%] bg-gray-50 flex flex-col border-b border-gray-200 relative">
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <div className="bg-white/80 backdrop-blur rounded-lg p-1 flex border border-gray-200 shadow-sm">
                                <button
                                    onClick={() => setPreviewDevice('mobile')}
                                    className={`p-1.5 rounded-md transition-all ${previewDevice === 'mobile' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <Smartphone size={16} />
                                </button>
                                <button
                                    onClick={() => setPreviewDevice('desktop')}
                                    className={`p-1.5 rounded-md transition-all ${previewDevice === 'desktop' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <Monitor size={16} />
                                </button>
                            </div>
                        </div>

                        <div className={`flex-1 overflow-y-auto overflow-x-hidden p-6 flex justify-center items-start ${previewDevice === 'desktop' ? 'bg-gray-100' : ''}`}>
                            <div className={`${previewDevice === 'desktop' ? 'w-[1024px] h-[640px] scale-[0.4] origin-top' : 'w-[320px] min-h-[600px] scale-90 origin-top'} bg-white rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden relative transition-all duration-300`}>
                                {previewDevice === 'mobile' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>}
                                <div className="h-full overflow-y-auto no-scrollbar bg-white" style={{ backgroundColor: selectedTheme.background }}>
                                    <GuideRenderer guide={guide} unlocked={true} forceMobile={previewDevice === 'mobile'} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM: EDITOR */}
                    <div className="h-[45%] flex flex-col bg-white">
                        {editing && editingDef ? (
                            <>
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 text-blue-600">
                                            {(() => {
                                                const Icon = MinimalIcons[editing.type as BlockType];
                                                return Icon ? <Icon className="w-8 h-8" color="currentColor" /> : null;
                                            })()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{editingDef.label}</h3>
                                            <p className="text-xs text-blue-600 font-medium">Édition en cours</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setEditingId(null)} className="text-xs font-bold text-gray-400 hover:text-gray-900 uppercase tracking-wider">
                                        Fermer
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    {/* Common: Title */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Titre du bloc</label>
                                        <input
                                            className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            value={editing.title ?? ""}
                                            onChange={(e) => persist({
                                                ...guide,
                                                blocks: guide.blocks.map((b) => b.id === editing.id ? { ...b, title: e.target.value } : b)
                                            })}
                                        />
                                    </div>

                                    {/* Specific Editor */}
                                    <editingDef.Editor
                                        title={editing.title}
                                        data={editing.data}
                                        visibility={editing.visibility}
                                        onChangeVisibility={(v: any) => persist({
                                            ...guide,
                                            blocks: guide.blocks.map((b) => b.id === editing.id ? { ...b, visibility: v } : b)
                                        })}
                                        onChange={(data: any) => persist({
                                            ...guide,
                                            blocks: guide.blocks.map((b) => b.id === editing.id ? { ...b, data } : b)
                                        })}
                                    />

                                    <div className="h-12"></div> {/* Spacer */}
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                <Settings size={48} className="mb-4 opacity-20" />
                                <p className="font-medium">Sélectionne un bloc pour le modifier</p>
                                <p className="text-sm mt-2 opacity-60">Les paramètres apparaîtront ici</p>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
            {/* Modal Thèmes */}
            <Modal
                isOpen={showThemes}
                onClose={() => setShowThemes(false)}
                title="Design & Thème"
                icon="🎨"
            >
                {!unlockedThemes && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl flex items-center gap-3 text-amber-800 text-xs font-medium">
                        <span className="p-1.5 bg-amber-100 rounded-lg">👑</span>
                        Passer en PRO pour débloquer tous les thèmes premium.
                    </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                    {themes.map((theme) => {
                        const isLocked = !unlockedThemes && !ESSENTIAL_THEMES.includes(theme.id);

                        return (
                            <button
                                key={theme.id}
                                disabled={isLocked}
                                onClick={() => {
                                    if (isLocked) return;
                                    persist({ ...guide, theme: { themeId: theme.id } });
                                    setShowThemes(false);
                                }}
                                className={`
                                group relative overflow-hidden rounded-2xl border-2 transition-all text-left
                                ${selectedTheme.id === theme.id ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-100'}
                                ${isLocked ? 'opacity-60 cursor-not-allowed grayscale-[0.5]' : 'hover:scale-[1.02] hover:border-gray-300'}
                            `}
                            >
                                <div className="h-24 bg-gray-100 relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundColor: theme.primary, backgroundImage: theme.bgType === 'image' ? `url(${theme.bgImage})` : undefined }}
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                                    {selectedTheme.id === theme.id && (
                                        <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow-lg">
                                            <CheckIcon size={12} />
                                        </div>
                                    )}

                                    {isLocked && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                                                <Lock size={14} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 bg-white">
                                    <h3 className="font-bold text-gray-900">{theme.name}</h3>
                                    <p className="text-xs text-gray-500">{theme.description}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </Modal>

            {/* Modal Subscribe */}
            <Modal
                isOpen={showSubscribe}
                onClose={() => setShowSubscribe(false)}
                title="Débloquez la publication"
                icon="🚀"
            >
                <div className="text-center p-4">
                    <p className="text-gray-600 mb-6">
                        La publication de guides est réservée aux membres Pro.
                        Abonnez-vous pour partager vos guides avec vos invités !
                    </p>
                    <a href="/pricing" className="inline-flex w-full justify-center px-6 py-3 bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity">
                        Voir les offres
                    </a>
                </div>
            </Modal>
        </div>
    );
}

// Local icons removed as they are imported from lucide-react
