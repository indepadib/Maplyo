"use client";
import { useMemo, useState } from "react";
import { blockLibrary, blockRegistry } from "@/components/blocks/registry";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { Guide, BlockType } from "@/types/blocks";
import { GuideRenderer } from "@/components/guide/GuideRenderer";

function uid() { return Math.random().toString(36).slice(2, 10); }
const STORAGE_KEY = "eguidehq_demo_guide_v1";

export function BuilderShell({ initialGuide }: { initialGuide: Guide }) {
  const [guide, setGuide] = useState<Guide>(() => {
    if (typeof window === "undefined") return initialGuide;
    try { const raw = window.localStorage.getItem(STORAGE_KEY); return raw ? (JSON.parse(raw) as Guide) : initialGuide; }
    catch { return initialGuide; }
  });
  const [selectedId, setSelectedId] = useState<string | null>(guide.blocks[0]?.id ?? null);

  const selected = useMemo(() => guide.blocks.find((b) => b.id === selectedId) ?? null, [guide, selectedId]);
  const selectedDef = selected ? blockRegistry[selected.type] : null;

  function persist(next: Guide) {
    setGuide(next);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
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

  function move(id: string, dir: -1 | 1) {
    const idx = guide.blocks.findIndex((b) => b.id === id);
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= guide.blocks.length) return;
    const nextBlocks = [...guide.blocks];
    [nextBlocks[idx], nextBlocks[j]] = [nextBlocks[j], nextBlocks[idx]];
    persist({ ...guide, blocks: nextBlocks });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr_360px]">
      <Card className="h-fit">
        <CardHeader><CardTitle>Blocs</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {["Essentiels", "Voyage", "Business"].map((cat) => (
            <div key={cat}>
              <div className="mb-2 text-xs font-medium text-zinc-500">{cat}</div>
              <div className="space-y-2">
                {blockLibrary.filter((b) => b.category === (cat as any)).map((b) => (
                  <Button key={b.type} variant="secondary" className="w-full justify-between" onClick={() => addBlock(b.type)}>
                    <span>{b.label}</span>
                    {b.isSensitive ? <span className="text-xs text-zinc-500">🔐</span> : null}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Canvas</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {guide.blocks.map((b, idx) => (
              <div key={b.id} className={["flex items-center gap-2 rounded-xl border p-3 text-sm", b.id === selectedId ? "border-black" : "border-zinc-200"].join(" ")}>
                <button className="flex-1 text-left" onClick={() => setSelectedId(b.id)}>
                  <div className="font-medium text-zinc-900">{b.title ?? blockRegistry[b.type]?.label ?? b.type}</div>
                  <div className="text-xs text-zinc-500">{b.type}</div>
                </button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => move(b.id, -1)} disabled={idx === 0}>↑</Button>
                  <Button variant="ghost" size="sm" onClick={() => move(b.id, 1)} disabled={idx === guide.blocks.length - 1}>↓</Button>
                  <Button variant="ghost" size="sm" onClick={() => removeBlock(b.id)}>✕</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Preview (voyageur)</CardTitle></CardHeader>
          <CardContent><GuideRenderer guide={guide} unlocked={true} /></CardContent>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader><CardTitle>Réglages</CardTitle></CardHeader>
        <CardContent>
          {selected && selectedDef ? (
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-xs font-medium text-zinc-700">Titre du bloc</div>
                <input
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                  value={selected.title ?? ""}
                  onChange={(e) => persist({ ...guide, blocks: guide.blocks.map((b) => b.id === selected.id ? { ...b, title: e.target.value } : b) })}
                />
              </div>

              <selectedDef.Editor
                title={selected.title}
                data={selected.data}
                visibility={selected.visibility}
                onChangeVisibility={(v: any) => persist({ ...guide, blocks: guide.blocks.map((b) => b.id === selected.id ? { ...b, visibility: v } : b) })}
                onChange={(data: any) => persist({ ...guide, blocks: guide.blocks.map((b) => b.id === selected.id ? { ...b, data } : b) })}
              />

              <Button
                variant="secondary"
                onClick={() => {
                  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
                  persist(initialGuide);
                  setSelectedId(initialGuide.blocks[0]?.id ?? null);
                }}
              >
                Reset demo
              </Button>
            </div>
          ) : (
            <div className="text-sm text-zinc-600">Sélectionne un bloc.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
