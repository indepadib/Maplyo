"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CalendarClock,
  Eye,
  ExternalLink,
  Flame,
  Loader2,
  Mail,
  Plus,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

const STAGES = [
  "new",
  "demo_ready",
  "contacted",
  "engaged",
  "meeting",
  "trial",
  "claimed",
  "paid",
  "lost",
] as const;

type Stage = typeof STAGES[number];

type Prospect = {
  id: string;
  property_name: string;
  contact_name?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  website_url?: string | null;
  city?: string | null;
  property_type: string;
  estimated_units?: number | null;
  score: number;
  stage: Stage;
  notes?: string | null;
  next_action_at?: string | null;
  last_contacted_at?: string | null;
  last_activity_at?: string | null;
  created_at: string;
  magic_demo?: {
    id: string;
    slug: string;
    status: string;
    view_count: number;
    last_viewed_at?: string | null;
  } | null;
};

const STAGE_LABELS: Record<Stage, string> = {
  new: "New",
  demo_ready: "Demo ready",
  contacted: "Contacted",
  engaged: "Engaged",
  meeting: "Meeting",
  trial: "Trial",
  claimed: "Claimed",
  paid: "Paid",
  lost: "Lost",
};

const ACTIVE_STAGES: Stage[] = ["new", "demo_ready", "contacted", "engaged", "meeting", "trial", "claimed", "paid"];

export default function ProspectsPage() {
  const { user } = useAuth();
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    propertyName: "",
    contactName: "",
    contactEmail: "",
    websiteUrl: "",
    city: "",
    propertyType: "hotel",
    estimatedUnits: "",
  });

  const getToken = useCallback(async () => {
    const session = await supabase.auth.getSession();
    return session.data.session?.access_token || "";
  }, []);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch("/api/internal/prospects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.error || "Could not load prospects");
      setProspects(data.prospects || []);
    } catch (e: any) {
      setError(e?.message || "Could not load prospects");
    } finally {
      setLoading(false);
    }
  }, [user, getToken]);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  const updateProspect = async (id: string, patch: Record<string, unknown>) => {
    const token = await getToken();
    const res = await fetch("/api/internal/prospects", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, ...patch }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Could not update prospect");
      return;
    }
    setProspects((current) =>
      current.map((p) => p.id === id ? { ...p, ...data.prospect, magic_demo: p.magic_demo } : p)
    );
  };

  const createProspect = async () => {
    if (!form.propertyName) return;
    setCreating(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch("/api/internal/prospects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          estimatedUnits: form.estimatedUnits ? Number(form.estimatedUnits) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create prospect");
      setForm({ propertyName: "", contactName: "", contactEmail: "", websiteUrl: "", city: "", propertyType: "hotel", estimatedUnits: "" });
      setShowCreate(false);
      await load();
    } catch (e: any) {
      setError(e?.message || "Could not create prospect");
    } finally {
      setCreating(false);
    }
  };

  const stats = useMemo(() => {
    const active = prospects.filter((p) => p.stage !== "lost");
    const viewed = prospects.filter((p) => (p.magic_demo?.view_count || 0) > 0);
    const highIntent = prospects.filter((p) => ["engaged", "meeting", "trial", "claimed"].includes(p.stage));
    const paid = prospects.filter((p) => p.stage === "paid");
    return {
      active: active.length,
      viewed: viewed.length,
      highIntent: highIntent.length,
      paid: paid.length,
    };
  }, [prospects]);

  const grouped = useMemo(() => {
    const map = new Map<Stage, Prospect[]>();
    STAGES.forEach((stage) => map.set(stage, []));
    prospects.forEach((prospect) => map.get(prospect.stage)?.push(prospect));
    return map;
  }, [prospects]);

  const magicStudioUrl = (p: Prospect) => {
    const qs = new URLSearchParams();
    if (p.website_url) qs.set("url", p.website_url);
    qs.set("name", p.property_name);
    if (p.contact_email) qs.set("email", p.contact_email);
    if (p.city) qs.set("city", p.city);
    qs.set("type", ["hotel", "guest_house", "other"].includes(p.property_type) ? p.property_type : "hotel");
    return `/internal/magic-demo?${qs.toString()}`;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Maplyo
          </Link>
          <div className="flex gap-2">
            <Link href="/internal/magic-demo" className="inline-flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2.5 text-sm font-bold text-violet-200">
              <WandSparkles className="h-4 w-4" /> Magic Demo Studio
            </Link>
            <button onClick={() => setShowCreate((v) => !v)} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950">
              <Plus className="h-4 w-4" /> Add prospect
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Internal Sales Engine</div>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Prospect Command Center</h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            A demo view is a buying signal. Move the right property at the right time instead of sending generic follow-ups.
          </p>
        </div>

        <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Active pipeline", value: stats.active, icon: Target },
            { label: "Demos viewed", value: stats.viewed, icon: Eye },
            { label: "High intent", value: stats.highIntent, icon: Flame },
            { label: "Paid", value: stats.paid, icon: Sparkles },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</span>
                <Icon className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="mt-4 text-3xl font-bold">{loading ? "…" : value}</div>
            </div>
          ))}
        </section>

        {showCreate && (
          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <input value={form.propertyName} onChange={(e) => setForm({ ...form, propertyName: e.target.value })} placeholder="Property name *" className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 outline-none" />
              <input value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} placeholder="https://hotel.com" className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 outline-none" />
              <input value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} placeholder="Contact name" className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 outline-none" />
              <input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} placeholder="Contact email" className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 outline-none" />
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 outline-none" />
              <select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })} className="h-12 rounded-xl border border-white/10 bg-slate-900 px-4">
                <option value="hotel">Hotel</option>
                <option value="guest_house">Riad / Guest house</option>
                <option value="other">Other</option>
              </select>
              <input type="number" value={form.estimatedUnits} onChange={(e) => setForm({ ...form, estimatedUnits: e.target.value })} placeholder="Rooms / units" className="h-12 rounded-xl border border-white/10 bg-black/20 px-4 outline-none" />
              <button disabled={creating || !form.propertyName} onClick={createProspect} className="h-12 rounded-xl bg-cyan-300 px-4 font-bold text-slate-950 disabled:opacity-40">
                {creating ? "Creating…" : "Create prospect"}
              </button>
            </div>
          </section>
        )}

        {error && <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

        {loading ? (
          <div className="flex justify-center py-24"><Loader2 className="h-7 w-7 animate-spin text-zinc-500" /></div>
        ) : (
          <div className="mt-8 overflow-x-auto pb-6">
            <div className="flex min-w-max gap-4">
              {ACTIVE_STAGES.map((stage) => {
                const items = grouped.get(stage) || [];
                return (
                  <section key={stage} className="w-[320px] shrink-0">
                    <div className="mb-3 flex items-center justify-between px-1">
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">{STAGE_LABELS[stage]}</div>
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-bold text-zinc-500">{items.length}</span>
                    </div>
                    <div className="space-y-3">
                      {items.map((p) => (
                        <article key={p.id} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-xl shadow-black/10">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate font-bold">{p.property_name}</h3>
                              <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                                <Building2 className="h-3.5 w-3.5" />
                                <span>{p.city || p.property_type.replaceAll("_", " ")}</span>
                                {p.estimated_units ? <span>• {p.estimated_units} units</span> : null}
                              </div>
                            </div>
                            <div className={`rounded-full px-2 py-1 text-[10px] font-black ${p.score >= 75 ? "bg-orange-400/10 text-orange-300" : p.score >= 55 ? "bg-cyan-400/10 text-cyan-300" : "bg-white/5 text-zinc-500"}`}>
                              {p.score}
                            </div>
                          </div>

                          {(p.contact_name || p.contact_email) && (
                            <div className="mt-4 rounded-xl bg-black/10 p-3 text-xs text-zinc-400">
                              {p.contact_name && <div className="font-semibold text-zinc-300">{p.contact_name}</div>}
                              {p.contact_email && <div className="mt-1 flex items-center gap-1.5"><Mail className="h-3 w-3" /> {p.contact_email}</div>}
                            </div>
                          )}

                          {p.magic_demo ? (
                            <div className="mt-3 rounded-xl border border-violet-500/15 bg-violet-500/5 p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300">Magic Demo</span>
                                <span className="text-xs font-bold">{p.magic_demo.view_count || 0} views</span>
                              </div>
                              {p.magic_demo.last_viewed_at && (
                                <div className="mt-1 text-[10px] text-zinc-500">Last seen {new Date(p.magic_demo.last_viewed_at).toLocaleString()}</div>
                              )}
                              <a href={`/m/${p.magic_demo.slug}`} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-white">
                                Open demo <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          ) : (
                            <Link href={magicStudioUrl(p)} className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-violet-400/20 px-3 py-2.5 text-xs font-bold text-violet-300">
                              <WandSparkles className="h-3.5 w-3.5" /> Build Magic Demo
                            </Link>
                          )}

                          {p.next_action_at && (
                            <div className="mt-3 flex items-center gap-2 text-xs text-amber-300">
                              <CalendarClock className="h-3.5 w-3.5" /> {new Date(p.next_action_at).toLocaleString()}
                            </div>
                          )}

                          <div className="mt-4 flex gap-2">
                            <select
                              value={p.stage}
                              onChange={(e) => updateProspect(p.id, { stage: e.target.value })}
                              className="h-9 min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-900 px-2 text-xs font-bold outline-none"
                            >
                              {STAGES.map((value) => <option key={value} value={value}>{STAGE_LABELS[value]}</option>)}
                            </select>
                            {p.website_url && (
                              <a href={p.website_url} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </article>
                      ))}
                      {items.length === 0 && <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-zinc-600">Empty</div>}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
