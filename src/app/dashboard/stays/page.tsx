"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Copy, Link2, RefreshCw, UserRound } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

type GuideMap = Record<string, string>;

type StayRow = {
  id: string;
  property_id: string;
  primary_guest_id?: string | null;
  source: string;
  check_in_at: string;
  check_out_at: string;
  status: string;
  metadata?: Record<string, any> | null;
  properties?: { name?: string | null } | Array<{ name?: string | null }> | null;
  guests?: { first_name?: string | null; email?: string | null; phone?: string | null } | Array<{ first_name?: string | null; email?: string | null; phone?: string | null }> | null;
};

function first<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] || null;
  return value || null;
}

export default function StaysPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<StayRow[]>([]);
  const [guideByProperty, setGuideByProperty] = useState<GuideMap>({});
  const [links, setLinks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [coreActive, setCoreActive] = useState(true);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);

      const guides = await supabase
        .from("guides")
        .select("id, property_id")
        .eq("user_id", user.id)
        .not("property_id", "is", null);

      const mapping: GuideMap = {};
      for (const guide of guides.data || []) {
        if (guide.property_id && !mapping[guide.property_id]) mapping[guide.property_id] = guide.id;
      }
      setGuideByProperty(mapping);

      const propertyIds = Object.keys(mapping);
      if (!propertyIds.length) {
        setCoreActive(false);
        setLoading(false);
        return;
      }

      const from = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const result = await supabase
        .from("stays")
        .select("id, property_id, primary_guest_id, source, check_in_at, check_out_at, status, metadata, properties(name), guests(first_name,email,phone)")
        .in("property_id", propertyIds)
        .gte("check_out_at", from)
        .order("check_in_at", { ascending: true })
        .limit(250);

      if (result.error) {
        setCoreActive(false);
        setRows([]);
      } else {
        setCoreActive(true);
        setRows((result.data || []) as StayRow[]);
      }

      setLoading(false);
    };

    load();
  }, [user]);

  const upcoming = useMemo(() => rows.filter((row) => !["cancelled", "no_show"].includes(row.status)), [rows]);

  const generateLink = async (stay: StayRow) => {
    const guideId = guideByProperty[stay.property_id];
    if (!guideId) return;

    setGenerating(stay.id);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) return;

      const res = await fetch("/api/stays/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ stayId: stay.id, guideId }),
      });

      const result = await res.json();
      if (res.ok && result.url) {
        setLinks((current) => ({ ...current, [stay.id]: result.url }));
      }
    } finally {
      setGenerating(null);
    }
  };

  const copyLink = async (stayId: string) => {
    const url = links[stayId];
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this guest link:", url);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to operations
        </Link>

        <div className="mt-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Stay Operations</div>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Upcoming stays</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Reservations synchronized into Maplyo can generate a personalized, expiring guest experience link.
          </p>
        </div>

        {!coreActive && !loading && (
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-100">
            Stay Operations becomes active after the hospitality migrations are applied and reservations are synchronized.
          </div>
        )}

        <section className="mt-8 space-y-3">
          {!loading && upcoming.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center text-zinc-500">
              No upcoming stays synchronized yet.
            </div>
          ) : upcoming.map((stay) => {
            const property = first(stay.properties);
            const guest = first(stay.guests);
            const guestName = guest?.first_name || stay.metadata?.guest_name || "Guest";

            return (
              <article key={stay.id} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-sky-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                        {stay.source.replaceAll("_", " ")}
                      </span>
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        {stay.status}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold">{property?.name || "Property"}</h3>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
                      <span className="inline-flex items-center gap-2">
                        <UserRound className="h-4 w-4" /> {guestName}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(stay.check_in_at).toLocaleDateString()} → {new Date(stay.check_out_at).toLocaleDateString()}
                      </span>
                    </div>

                    {(guest?.email || guest?.phone) && (
                      <div className="mt-2 text-xs text-zinc-600">{guest?.email || guest?.phone}</div>
                    )}

                    {links[stay.id] && (
                      <div className="mt-4 max-w-2xl truncate rounded-xl border border-sky-400/15 bg-sky-400/5 px-3 py-2 font-mono text-xs text-sky-300">
                        {links[stay.id]}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {!links[stay.id] ? (
                      <button
                        onClick={() => generateLink(stay)}
                        disabled={generating === stay.id || !guideByProperty[stay.property_id]}
                        className="inline-flex items-center gap-2 rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-sky-300 disabled:opacity-40"
                      >
                        {generating === stay.id ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
                        Generate guest link
                      </button>
                    ) : (
                      <button
                        onClick={() => copyLink(stay.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-zinc-200"
                      >
                        <Copy className="h-4 w-4" /> Copy link
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
