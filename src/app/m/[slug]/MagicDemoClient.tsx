"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import type { Guide } from "@/types/blocks";
import { StyledGuideRenderer } from "@/components/guide/StyledGuideRenderer";

export function MagicDemoClient({ guide, propertyType }: { guide: Guide; propertyType: string }) {
  useEffect(() => {
    const key = `maplyo_magic_demo_session_${guide.slug}`;
    let sessionId = window.sessionStorage.getItem(key);

    if (!sessionId) {
      sessionId = typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `md_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
      window.sessionStorage.setItem(key, sessionId);
    }

    fetch("/api/magic-demo/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: guide.slug, sessionId }),
      keepalive: true,
    }).catch(() => undefined);
  }, [guide.slug]);

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="fixed inset-x-0 top-0 z-[70] border-b border-white/10 bg-slate-950/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-300">
              <Sparkles className="h-3.5 w-3.5" /> Personalized Maplyo Demo
            </div>
            <div className="truncate text-sm font-bold">{guide.title}</div>
          </div>
          <Link
            href={`/claim/${encodeURIComponent(guide.slug)}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-950 hover:bg-zinc-200"
          >
            Claim this experience <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="pt-[72px]">
        <StyledGuideRenderer guide={guide} unlocked />
      </div>

      <div className="pointer-events-none fixed bottom-4 left-4 z-[60] hidden md:block">
        <div className="pointer-events-auto rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-xs text-white shadow-2xl backdrop-blur">
          <div className="font-bold">This is a sales preview</div>
          <div className="mt-1 text-zinc-400">Property type: {propertyType.replaceAll("_", " ")}</div>
        </div>
      </div>
    </main>
  );
}
