"use client";
import { useMemo, useState, useEffect } from "react";
import { blockLibrary, blockRegistry } from "@/components/blocks/registry";
import { Button } from "@/components/ui/Button";
import type { Guide, BlockType } from "@/types/blocks";
import { GuideRenderer } from "@/components/guide/GuideRenderer";
import { StyledGuideRenderer } from "@/components/guide/StyledGuideRenderer";
import { guideThemes } from "@/types/themes";
import { MinimalIcons } from "@/components/icons/MinimalIcons";
import { useReactToPrint } from "react-to-print";
import { PrintableGuide } from "@/components/guide/PrintableGuide";
import { useRef } from "react";

function uid() { return Math.random().toString(36).slice(2, 10); }
const STORAGE_KEY = "eguidehq_demo_guide_v1";

export function DragDropBuilder({ initialGuide }: { initialGuide: Guide }) {
    const [guide, setGuide] = useState<Guide>(initialGuide);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    // Dériver le thème actuel depuis le guide
    // @ts-ignore - guide.theme might be undefined in old saved data
    const themeId = guide.theme?.themeId;
    const currentTheme = guideThemes.find(t => t.id === themeId) || guideThemes[0];

    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Guide-${guide.title || "Voyageur"}`
    });

    const selected = useMemo(() => guide.blocks.find((b) => b.id === selectedId) ?? null, [guide, selectedId]);
    const selectedDef = selected ? blockRegistry[selected.type] : null;

    // Charger depuis localStorage après montage
    // Charger depuis localStorage après montage
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const raw = window.localStorage.getItem(STORAGE_KEY);
                if (raw) {
                    const loadedGuide = JSON.parse(raw) as Guide;
                    // Migration pour les anciens guides sans theme
                    if (!loadedGuide.theme) {
                        loadedGuide.theme = { themeId: guideThemes[0].id };
                    }
                    setGuide(loadedGuide);
                }
            } catch { }
        }
    }, []);

    function persist(next: Guide) {
        setGuide(next);
        if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }

    function handleThemeChange(newThemeId: string) {
        persist({
            ...guide,
            theme: { ...guide.theme, themeId: newThemeId }
        });
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
        setSelectedId(newBlock.id);
    }

    function removeBlock(id: string) {
        const idx = guide.blocks.findIndex((b) => b.id === id);
        const nextBlocks = guide.blocks.filter((b) => b.id !== id);
        const next = { ...guide, blocks: nextBlocks };
        persist(next);
        if (selectedId === id) setSelectedId(nextBlocks[Math.max(0, idx - 1)]?.id ?? nextBlocks[0]?.id ?? null);
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

    const blockCount = guide.blocks.length;

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-blue-200 shadow-lg">
                                B
                            </div>
                            <div>
                                <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">Builder</div>
                                <h1 className="text-lg font-bold text-gray-900">{guide.title}</h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 relative">
                            {/* Sélecteur de thème Custom */}
                            <div className="relative group">
                                <button
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <span className="w-5 h-5 rounded-full border border-gray-300 shadow-sm" style={{ background: currentTheme.primary }}></span>
                                    <span className="text-sm font-medium text-gray-700">{currentTheme.name}</span>
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 hidden group-hover:block hover:block z-50 animate-in fade-in slide-in-from-top-2">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Choisir un thème</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {guideThemes.map(t => (
                                            <button
                                                key={t.id}
                                                onClick={() => handleThemeChange(t.id)}
                                                className={`flex items-center gap-2 p-2 rounded-lg transition-all text-left ${currentTheme.id === t.id
                                                    ? "bg-blue-50 border border-blue-200 ring-1 ring-blue-200"
                                                    : "hover:bg-gray-50 border border-transparent"
                                                    }`}
                                            >
                                                <div
                                                    className="w-8 h-8 rounded-full border border-gray-200 shadow-sm flex-shrink-0"
                                                    style={{
                                                        background: t.bgType === "image" ? `url(${t.bgImage}) center/cover` : t.primary
                                                    }}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs font-bold text-gray-900 truncate">{t.name}</div>
                                                    <div className="text-[10px] text-gray-400 truncate">{t.description}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="h-6 w-px bg-gray-200 mx-2" />

                            <Button
                                variant="secondary"
                                onClick={() => {
                                    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
                                    setGuide(initialGuide);
                                    setSelectedId(null);
                                }}
                                className="text-sm h-9"
                            >
                                Réinitialiser
                            </Button>
                            <a href="/g/demo" target="_blank">
                                <Button className="h-9 bg-gray-900 text-white hover:bg-black shadow-lg">
                                    Voir le guide ↗
                                </Button>
                            </a>
                            <Button
                                variant="secondary"
                                onClick={() => handlePrint()}
                                className="h-9 border-2"
                                style={{ borderColor: currentTheme.primary + "40" }}
                            >
                                🖨️ A4
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid lg:grid-cols-[300px_1fr_360px] gap-8">
                    {/* Left Sidebar - Block Library */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                                    Ajouter un bloc
                                </h2>
                            </div>

                            <div className="p-3 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                                {["Essentiels", "Voyage", "Business"].map((cat) => (
                                    <div key={cat}>
                                        <div className="mb-3 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{cat}</div>
                                        <div className="space-y-1">
                                            {blockLibrary.filter((b) => b.category === (cat as any)).map((b) => {
                                                const Icon = MinimalIcons[b.type as BlockType] || MinimalIcons.hero;
                                                return (
                                                    <button
                                                        key={b.type}
                                                        onMouseEnter={() => setHoveredCategory(b.type)}
                                                        onMouseLeave={() => setHoveredCategory(null)}
                                                        onClick={() => addBlock(b.type)}
                                                        className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all flex items-center gap-3 group ${hoveredCategory === b.type
                                                            ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                                                            : "border-transparent hover:bg-gray-50 text-gray-700"
                                                            }`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${hoveredCategory === b.type ? "bg-white" : "bg-gray-100 group-hover:bg-white group-hover:shadow-sm"
                                                            }`}>
                                                            <Icon className="w-5 h-5" color={hoveredCategory === b.type ? "#2563EB" : "#6B7280"} />
                                                        </div>
                                                        <span className="font-medium text-sm flex-1">{b.label}</span>
                                                        {b.isSensitive && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">CODE</span>}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center - Canvas */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[500px] flex flex-col">
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm font-medium text-gray-600">Structure du guide</span>
                                </div>
                                <span className="text-xs font-medium text-gray-400">{blockCount} blocs</span>
                            </div>

                            <div className="p-6 flex-1 bg-gray-50/30">
                                {blockCount === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 rounded-xl">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl">✨</div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Commencez ici</h3>
                                        <p className="text-gray-500 text-sm max-w-xs">
                                            Sélectionnez des blocs dans le menu de gauche pour construire votre guide.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {guide.blocks.map((b, idx) => {
                                            const Icon = MinimalIcons[b.type as BlockType] || MinimalIcons.hero;
                                            const isSelected = b.id === selectedId;

                                            return (
                                                <div
                                                    key={b.id}
                                                    draggable
                                                    onDragStart={() => handleDragStart(b.id)}
                                                    onDragOver={(e) => handleDragOver(e, b.id)}
                                                    onDragEnd={handleDragEnd}
                                                    onClick={() => setSelectedId(b.id)}
                                                    className={`group relative cursor-move rounded-xl border-2 transition-all duration-200 ${isSelected
                                                        ? "border-blue-600 bg-white shadow-lg shadow-blue-500/10 z-10"
                                                        : draggedId === b.id
                                                            ? "border-dashed border-gray-300 bg-gray-50 opacity-50"
                                                            : "border-transparent bg-white shadow-sm hover:border-gray-200 hover:shadow-md"
                                                        }`}
                                                >
                                                    <div className="p-4 flex items-center gap-4">
                                                        <div className="flex flex-col items-center gap-1">
                                                            <span className="text-[10px] font-bold text-gray-300 font-mono">{(idx + 1).toString().padStart(2, '0')}</span>
                                                            <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500">
                                                                <svg width="12" height="20" viewBox="0 0 6 20" fill="currentColor">
                                                                    <circle cx="2" cy="2" r="1.5" /><circle cx="2" cy="10" r="1.5" /><circle cx="2" cy="18" r="1.5" />
                                                                    <circle cx="5" cy="2" r="1.5" /><circle cx="5" cy="10" r="1.5" /><circle cx="5" cy="18" r="1.5" />
                                                                </svg>
                                                            </div>
                                                        </div>

                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isSelected ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                                            }`}>
                                                            <Icon className="w-6 h-6" color="currentColor" />
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <h3 className={`font-bold text-base truncate ${isSelected ? "text-blue-900" : "text-gray-900"}`}>
                                                                {b.title || blockRegistry[b.type]?.label}
                                                            </h3>
                                                            <p className="text-xs text-gray-500 truncate mt-0.5">
                                                                {blockRegistry[b.type]?.label}
                                                            </p>
                                                        </div>

                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeBlock(b.id);
                                                            }}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M18 6L6 18M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {isSelected && (
                                                        <div className="absolute -left-[2px] top-4 bottom-4 w-1 bg-blue-600 rounded-r-full" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Settings & Preview */}
                    <div className="space-y-6">
                        {/* Live Preview Mini */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Aperçu mobile</span>
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                            </div>
                            <div className="relative h-[600px] bg-gray-200 overflow-hidden flex justify-center pt-4">
                                <div
                                    className="w-[375px] h-[812px] bg-white shadow-2xl origin-top scale-[0.7]"
                                    style={{
                                        pointerEvents: "none" // Optional: disable interaction if we just want visual preview, enabling it might be weird with scale
                                    }}
                                >
                                    {/* Enable pointer events on the renderer if we want interaction, but simplified for now */}
                                    <div style={{ pointerEvents: "auto", height: "100%", overflowY: "auto" }} className="custom-scrollbar">
                                        <StyledGuideRenderer guide={guide} unlocked={true} forceMobile={true} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Block Settings */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Propriétés du bloc
                            </div>

                            <div className="p-5 max-h-[calc(100vh-600px)] overflow-y-auto custom-scrollbar">
                                {selected && selectedDef ? (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block mb-2 text-xs font-bold text-gray-700 uppercase tracking-wide">Titre</label>
                                            <input
                                                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                                                value={selected.title ?? ""}
                                                onChange={(e) => persist({ ...guide, blocks: guide.blocks.map((b) => b.id === selected.id ? { ...b, title: e.target.value } : b) })}
                                                placeholder="Titre du bloc..."
                                            />
                                        </div>

                                        <div className="border-t border-gray-100 pt-6">
                                            <label className="block mb-4 text-xs font-bold text-gray-700 uppercase tracking-wide">Contenu</label>
                                            <selectedDef.Editor
                                                title={selected.title}
                                                data={selected.data}
                                                visibility={selected.visibility}
                                                onChangeVisibility={(v: any) => persist({ ...guide, blocks: guide.blocks.map((b) => b.id === selected.id ? { ...b, visibility: v } : b) })}
                                                onChange={(data: any) => persist({ ...guide, blocks: guide.blocks.map((b) => b.id === selected.id ? { ...b, data } : b) })}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-10 opacity-50">
                                        <p className="text-sm text-gray-500">Sélectionne un bloc <br />pour le modifier</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hidden Printable Component */}
            <div style={{ display: "none" }}>
                <PrintableGuide ref={printRef} guide={guide} />
            </div>
        </div>
    );
}
