"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, ExternalLink, Loader2, Sparkles, WandSparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

type DemoRow = {
  id: string;
  slug: string;
  prospect_name?: string | null;
  property_name: string;
  property_type: string;
  source_url?: string | null;
  city?: string | null;
  status: string;
  view_count: number;
  last_viewed_at?: string | null;
  expires_at?: string | null;
  created_at: string;
};

export default function MagicDemoStudioPage() {
  const { user } = useAuth();
  const [sourceUrl, setSourceUrl] = useState("");
  const [propertyType, setPropertyType] = useState<"hotel" | "guest_house" | "other">("hotel");
  const [city, setCity] = useState("");
  const [prospectName, setProspectName] = useState("");
  const [prospectEmail, setProspectEmail] = useState("");
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [demos, setDemos] = useState<DemoRow[]>([]);

  const authHeaders = useCallback(async () => {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const loadDemos = useCallback(async () => {
    if (!user) return;
    setListLoading(true);
    try {
      const headers = await authHeaders();
      const res = await fetch("/api/internal/magic-demo", { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load Magic Demos");
      setDemos(data.demos || []);
    } catch (e: any) {
      setError(e?.message || "Could not load Magic Demos");
    } finally {
      setListLoading(false);
    }
  }, [user, authHeaders]);

  useEffect(() => {
    if (user) loadDemos();
  }, [user, loadDemos]);

  const createDemo = async () => {
    if (!sourceUrl || !authorized) return;
    setLoading(true);
    setError(null);
    setCreatedUrl(null);

    try {
      const headers = await authHeaders();
      const res = await fetch("/api/internal/magic-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          sourceUrl,
          propertyType,
          city: city || undefined,
          prospectName: prospectName || undefined,
          prospectEmail: prospectEmail || undefined,
          language,
          authorized,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.error || "Could not create demo");

      setCreatedUrl(data.url);
      await loadDemos();
    } catch (e: any) {
      setError(e?.message || "Could not create demo");
    } finally {
      setLoading(false);
    }
  };

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Maplyo
        </Link>

        <div className="mt-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Internal Growth Tool</div>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Magic Demo Studio</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Turn a prospect&apos;s property website into a personalized Maplyo guest experience before the sales call.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15">
                <WandSparkles className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h2 className="font-bold">Build a prospect demo</h2>
                <p className="text-xs text-zinc-500">One public website → one personalized experience.</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Property website</label>
                <input
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://www.riad-example.com"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 outline-none focus:border-violet-400/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Property type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-900 px-4 outline-none"
                  >
                    <option value="hotel">Hotel</option>
                    <option value="guest_house">Riad / Guest house</option>
                    <option value="other">Other hospitality</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-900 px-4 outline-none"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">City fallback</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Marrakech" className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Prospect / property</label>
                  <input value={prospectName} onChange={(e) => setProspectName(e.target.value)} placeholder="Riad Atlas" className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 outline-none" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Prospect email</label>
                  <input type="email" value={prospectEmail} onChange={(e) => setProspectEmail(e.target.value)} placeholder="manager@hotel.com" className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 outline-none" />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-black/10 p-4 text-xs leading-5 text-zinc-400">
                <input type="checkbox" checked={authorized} onChange={(e) => setAuthorized(e.target.checked)} className="mt-1" />
                <span>I confirm I am authorized to create this sales demonstration using the property website information.</span>
              </label>

              {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

              <button
                type="button"
                onClick={createDemo}
                disabled={!sourceUrl || !authorized || loading}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-rose-600 px-5 py-3.5 font-bold disabled:opacity-40"
              >
                {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Building Magic Demo…</> : <><Sparkles className="h-5 w-5" /> Generate personalized demo</>}
              </button>

              {createdUrl && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">Demo ready</div>
                  <div className="mt-3 break-all text-sm text-white">{createdUrl}</div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => copy(createdUrl)} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy link"}
                    </button>
                    <a href={createdUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-bold">
                      Open <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Prospect demos</h2>
                <p className="mt-1 text-sm text-zinc-500">Know what was generated and what got viewed.</p>
              </div>
              <button onClick={loadDemos} className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-zinc-400 hover:text-white">Refresh</button>
            </div>

            <div className="mt-6 space-y-3">
              {listLoading ? (
                <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-zinc-500" /></div>
              ) : demos.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-zinc-500">No Magic Demo yet.</div>
              ) : demos.map((demo) => {
                const url = typeof window !== "undefined" ? `${window.location.origin}/m/${demo.slug}` : `/m/${demo.slug}`;
                return (
                  <article key={demo.id} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-bold">{demo.property_name}</div>
                        <div className="mt-1 text-xs text-zinc-500">{demo.prospect_name || demo.source_url || demo.property_type}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-300">{demo.status}</span>
                          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-zinc-400">{demo.view_count || 0} views</span>
                          {demo.last_viewed_at && <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-zinc-500">Seen {new Date(demo.last_viewed_at).toLocaleDateString()}</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => copy(url)} className="rounded-xl border border-white/10 p-2 text-zinc-400 hover:text-white" title="Copy link"><Copy className="h-4 w-4" /></button>
                        <a href={url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 p-2 text-zinc-400 hover:text-white" title="Open demo"><ExternalLink className="h-4 w-4" /></a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
