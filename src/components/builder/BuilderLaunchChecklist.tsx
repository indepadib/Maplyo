"use client";

import { useMemo, useState } from "react";
import { Check, Circle, Copy, Sparkles } from "lucide-react";
import type { Guide } from "@/types/blocks";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { activationCopy } from "@/lib/i18n/activation";

export function BuilderLaunchChecklist({
  guide,
  onAddService,
}: {
  guide: Guide;
  onAddService: () => void;
}) {
  const { lang } = useTranslation();
  const t = activationCopy(lang);
  const [copied, setCopied] = useState(false);

  const state = useMemo(() => {
    const types = new Set(guide.blocks.map((block) => block.type));
    const essentials = types.has("hero") && types.has("wifi") && types.has("checkin");
    const service = guide.blocks.some((block) => {
      if (block.type !== "upsells") return false;
      const items = Array.isArray((block.data as any)?.items) ? (block.data as any).items : [];
      return items.length > 0;
    });
    const published = Boolean(guide.isPublished);
    return { essentials, service, published };
  }, [guide]);

  const complete = [state.essentials, state.service, state.published].filter(Boolean).length;

  const copyLink = async () => {
    const url = `${window.location.origin}/g/${guide.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt(t.copyLink, url);
    }
  };

  return (
    <div className="shrink-0 border-b border-gray-200 bg-slate-950 px-4 py-2 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 sm:flex">
            <Sparkles className="h-4 w-4 text-purple-300" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-bold">{complete === 3 ? t.ready : t.title}</div>
            <div className="text-[10px] text-zinc-500">{complete}/3 {t.progress}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            [state.essentials, t.essentials],
            [state.service, t.service],
            [state.published, t.publish],
          ].map(([done, label]) => (
            <span key={String(label)} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${done ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-white/5 text-zinc-500"}`}>
              {done ? <Check className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
              {String(label)}
            </span>
          ))}

          {!state.service && (
            <button onClick={onAddService} className="rounded-lg bg-purple-400 px-3 py-1.5 text-[10px] font-bold text-slate-950 hover:bg-purple-300">
              {t.addService}
            </button>
          )}

          {state.service && !state.published && (
            <span className="rounded-lg border border-white/10 px-3 py-1.5 text-[10px] font-bold text-zinc-400">{t.publishHint}</span>
          )}

          {state.published && (
            <button onClick={copyLink} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold text-slate-950 hover:bg-zinc-200">
              <Copy className="h-3 w-3" /> {copied ? t.copied : t.copyLink}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
