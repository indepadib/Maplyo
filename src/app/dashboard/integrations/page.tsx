"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, CalendarDays, CheckCircle2, KeyRound, RefreshCw, TriangleAlert } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { connectionsHealthCopy } from "@/lib/i18n/connections-health";

type Row = {
  guideId: string;
  guideTitle: string;
  guideSlug: string;
  published: boolean;
  overall: "healthy" | "degraded" | "error" | "disconnected";
  issues: string[];
  property?: { id: string; name: string; city?: string | null; type?: string | null } | null;
  airbnb: { connected: boolean; health: string; lastSyncAt?: string | null; reservationCount: number };
  tuya: { assigned: boolean; health: string; deviceName?: string | null; codeLength: number };
};

type Payload = {
  summary: {
    total: number;
    connected: number;
    healthy: number;
    attention: number;
    airbnbConnected: number;
    tuyaAssigned: number;
  };
  rows: Row[];
};

export default function ConnectionsPage() {
  const { lang } = useTranslation();
  const t = connectionsHealthCopy(lang);
  const [payload, setPayload] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "attention">("all");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const res = await fetch("/api/integrations/health", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not load connections");
      setPayload(body);
    } catch (e: any) {
      setError(e?.message || "Could not load connections");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const rows = useMemo(() => {
    const source = payload?.rows || [];
    return filter === "attention"
      ? source.filter((row) => row.overall === "degraded" || row.overall === "error")
      : source;
  }, [payload, filter]);

  const badge = (state: string) => {
    if (state === "healthy") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    if (state === "error") return "border-red-400/20 bg-red-400/10 text-red-300";
    if (state === "degraded") return "border-amber-400/20 bg-amber-400/10 text-amber-300";
    return "border-white/10 bg-white/5 text-zinc-500";
  };

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Maplyo
        </Link>

        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300">{t.eyebrow}</div>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{t.title}</h1>
            <p className="mt-3 max-w-3xl text-zinc-400">{t.subtitle}</p>
          </div>
          <button
            onClick={() => void load()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-zinc-300 hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> {t.refresh}
          </button>
        </div>

        {error && <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">{error}</div>}

        {payload && (
          <>
            <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-6">
              {[
                [t.total, payload.summary.total, Building2],
                [t.connected, payload.summary.connected, CheckCircle2],
                [t.healthy, payload.summary.healthy, CheckCircle2],
                [t.attention, payload.summary.attention, TriangleAlert],
                [t.airbnb, payload.summary.airbnbConnected, CalendarDays],
                [t.tuya, payload.summary.tuyaAssigned, KeyRound],
              ].map(([label, value, Icon]: any) => (
                <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-zinc-600">
                    <span>{label}</span><Icon className="h-4 w-4 text-indigo-300" />
                  </div>
                  <div className="mt-4 text-2xl font-black">{value}</div>
                </article>
              ))}
            </section>

            <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-5">
              <div className="flex gap-2">
                <button onClick={() => setFilter("all")} className={`rounded-xl px-4 py-2 text-xs font-bold ${filter === "all" ? "bg-white text-slate-950" : "border border-white/10 text-zinc-500"}`}>
                  {t.total}
                </button>
                <button onClick={() => setFilter("attention")} className={`rounded-xl px-4 py-2 text-xs font-bold ${filter === "attention" ? "bg-amber-300 text-slate-950" : "border border-white/10 text-zinc-500"}`}>
                  {t.attention}
                </button>
              </div>

              <div className="mt-5 overflow-x-auto">
                <div className="min-w-[960px] overflow-hidden rounded-2xl border border-white/10">
                  <div className="grid grid-cols-[2fr_.8fr_1.2fr_1fr_1fr_.7fr] gap-3 bg-white/5 px-4 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-600">
                    <div>{t.property}</div><div>{t.status}</div><div>{t.airbnb}</div><div>{t.lastSync}</div><div>{t.tuya}</div><div></div>
                  </div>
                  <div className="divide-y divide-white/10">
                    {rows.map((row) => (
                      <div key={row.guideId} className="grid grid-cols-[2fr_.8fr_1.2fr_1fr_1fr_.7fr] gap-3 px-4 py-4 text-sm">
                        <div>
                          <div className="font-bold">{row.property?.name || row.guideTitle}</div>
                          <div className="mt-1 text-xs text-zinc-600">{[row.property?.city, row.guideTitle].filter(Boolean).join(" · ")}</div>
                          {row.issues.length > 0 && <div className="mt-2 text-[10px] leading-4 text-amber-300">{row.issues.join(" · ")}</div>}
                        </div>
                        <div><span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${badge(row.overall)}`}>{row.overall}</span></div>
                        <div>
                          <div className="font-bold">{row.airbnb.connected ? `${row.airbnb.reservationCount} ${t.reservations}` : "—"}</div>
                          {row.airbnb.connected && <div className="mt-1 text-[10px] text-zinc-600">{row.airbnb.health}</div>}
                        </div>
                        <div className="text-xs text-zinc-500">{row.airbnb.lastSyncAt ? new Date(row.airbnb.lastSyncAt).toLocaleString() : t.never}</div>
                        <div>
                          <div className="font-bold">{row.tuya.assigned ? (row.tuya.deviceName || t.lock) : "—"}</div>
                          {row.tuya.assigned && <div className="mt-1 text-[10px] text-zinc-600">{row.tuya.health} · {row.tuya.codeLength}</div>}
                        </div>
                        <div>
                          <Link href={`/app/guides/${row.guideId}/builder?integrations=1`} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-zinc-300 hover:bg-white/5">
                            {t.configure}
                          </Link>
                        </div>
                      </div>
                    ))}
                    {!rows.length && <div className="p-10 text-center text-sm text-zinc-600">{t.noConnections}</div>}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {loading && !payload && <div className="mt-16 flex justify-center"><RefreshCw className="h-6 w-6 animate-spin text-zinc-500" /></div>}
      </div>
    </main>
  );
}
