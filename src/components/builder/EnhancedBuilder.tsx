"use client";
import { supabase } from "@/lib/supabase";
import { useState, useMemo } from "react";
import { blockLibrary, blockRegistry } from "@/components/blocks/registry";
import { Button } from "@/components/ui/Button";
import type { Guide, BlockType } from "@/types/blocks";
import { StyledGuideRenderer as GuideRenderer } from "@/components/guide/StyledGuideRenderer";
import { Modal } from "@/components/ui/Modal";
import { guideThemes as themes, type GuideTheme as Theme } from "@/types/themes";
import { MinimalIcons } from "@/components/icons/MinimalIcons";
import { Settings, ChevronRight, Trash2, Check, ExternalLink } from "lucide-react";

function uid() { return Math.random().toString(36).slice(2, 10); }
const STORAGE_KEY = "eguidehq_demo_guide_v1";

// Icons for blocks - using MinimalIcons directly in render


export function EnhancedBuilder({ initialGuide }: { initialGuide: Guide }) {
    function getKey(id: string) { return `guide-${id}`; }

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
    const categories = ["Essentiels", "Voyage", "Business"];

    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden font-sans text-gray-900">
            {/* TOP BAR */}
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                        G
                    </div>
                    <div>
                        <h1 className="font-bold text-sm text-gray-900">{guide.title}</h1>
                        <p className="text-xs text-gray-500">Mode Éditeur</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => setShowThemes(true)} className="gap-2 text-sm bg-gray-100 hover:bg-gray-200 border-0">
                        <span className="text-lg">🎨</span> Thème
                    </Button>
                    <a href={`/app/guides/${guide.id}/print`} className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-black no-underline">
                        <span className="text-lg">🖨️</span> Poster QR
                    </a>
                    <div className="h-6 w-px bg-gray-200 mx-2" />
                    <a href={`/g/${guide.slug}`} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-bold">
                        <ExternalLink size={16} /> Aperçu Public
                    </a>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* 1. LEFT COLUMN: LIBRARY */}
                <aside className="w-80 bg-white border-r border-gray-200 flex flex-col z-10 overflow-y-auto">
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
                <aside className="w-[420px] bg-white border-l border-gray-200 flex flex-col z-10 shadow-xl">
                    {/* TOGGLE TABS (Optional future feature, for now split view) */}

                    {/* TOP: PREVIEW */}
                    <div className="h-[55%] bg-gray-50 flex flex-col border-b border-gray-200 relative">
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <span className="px-2 py-1 bg-white/80 backdrop-blur rounded-md text-xs font-bold text-gray-500 shadow-sm border border-gray-200 pointer-events-none">
                                Aperçu Mobile
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 flex justify-center items-start">
                            <div className="w-[320px] min-h-[600px] bg-white rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden relative transform scale-90 origin-top">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
                                <div className="h-full overflow-y-auto no-scrollbar bg-white" style={{ backgroundColor: selectedTheme.background }}>
                                    <GuideRenderer guide={guide} unlocked={true} forceMobile={true} />
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
                <div className="grid grid-cols-2 gap-4">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => {
                                persist({ ...guide, theme: { themeId: theme.id } });
                                setShowThemes(false);
                            }}
                            className={`
                                group relative overflow-hidden rounded-2xl border-2 transition-all hover:scale-[1.02] text-left
                                ${selectedTheme.id === theme.id ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-100 hover:border-gray-300'}
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
                            </div>
                            <div className="p-4 bg-white">
                                <h3 className="font-bold text-gray-900">{theme.name}</h3>
                                <p className="text-xs text-gray-500">{theme.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </Modal>
        </div>
    );
}

// Icons
function TrashIcon({ size = 24, ...props }: any) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>;
}

function ExternalLinkIcon({ size = 24, ...props }: any) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;
}

function CheckIcon({ size = 24, ...props }: any) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12" /></svg>;
}
