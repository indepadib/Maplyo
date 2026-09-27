"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleAlert, Database, RefreshCw, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

type Check = {
  key: string;
  label: string;
  group: "environment" | "database" | "payments" | "ai";
  ok: boolean;
  detail: string;
  blocking: boolean;
};

type Payload = {
  generatedAt: string;
  ready: boolean;
  score: number;
  blockerCount: number;
  checks: Check[];
};

const groupLabel: Record<Check["group"], string> = {
  environment: "Runtime & environment",
  database: "Database modules",
  payments: "Billing",
  ai: "AI & automation",
};

export default function InternalReadinessPage() {
  const { user } = useAuth();
  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      const res = await fetch("/api/internal/readiness", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not run readiness checks");
      setData(body);
    } catch (e: any) {
      setError(e?.message || "Could not run readiness checks");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  const grouped = useMemo(() => {
    const groups: Record<string, Check[]> = {};
    for (const check of data?.checks || []) {
      (groups[check.group] ||= []).push(check);
    }
    return groups;
  }, [data]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Maplyo
        </Link>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Internal Platform</div>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">System Readiness</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              One diagnostic for migrations, runtime configuration, payments and AI infrastructure.
            </p>
          </div>

          <button
            onClick={load}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold hover:bg-white/10 disabled:opacity-40"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh checks
          </button>
        </div>

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-200">{error}</div>
        )}

        {data && (
          <>
            <section className="mt-8 grid gap-4 md:grid-cols-4">
              <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">Readiness</div>
                <div className="mt-4 text-4xl font-bold">{data.score}%</div>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">Status</div>
                <div className={`mt-4 text-xl font-bold ${data.ready ? "text-emerald-300" : "text-amber-300"}`}>
                  {data.ready ? "Ready" : "Attention required"}
                </div>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">Blocking issues</div>
                <div className="mt-4 text-4xl font-bold">{data.blockerCount}</div>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">Last check</div>
                <div className="mt-4 text-sm font-bold">{new Date(data.generatedAt).toLocaleString()}</div>
              </article>
            </section>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {Object.entries(grouped).map(([group, checks]) => (
                <section key={group} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                  <div className="flex items-center gap-3">
                    {group === "database" ? <Database className="h-5 w-5 text-sky-300" /> : <ShieldCheck className="h-5 w-5 text-emerald-300" />}
                    <h2 className="text-xl font-bold">{groupLabel[group as Check["group"]] || group}</h2>
                  </div>

                  <div className="mt-5 space-y-3">
                    {checks.map((check) => (
                      <div key={check.key} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-bold">{check.label}</div>
                            <div className="mt-1 text-xs leading-5 text-zinc-500">{check.detail}</div>
                          </div>
                          {check.ok
                            ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                            : <CircleAlert className={`h-5 w-5 shrink-0 ${check.blocking ? "text-amber-300" : "text-zinc-600"}`} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}

        {loading && !data && (
          <div className="mt-12 flex justify-center">
            <RefreshCw className="h-7 w-7 animate-spin text-zinc-500" />
          </div>
        )}
      </div>
    </main>
  );
}
