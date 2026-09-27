"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Database,
  Loader2,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

type ReadinessCheck = {
  key: string;
  label: string;
  group: "environment" | "database" | "payments" | "ai";
  ok: boolean;
  detail: string;
  blocking: boolean;
};

type Result = {
  generatedAt: string;
  ready: boolean;
  score: number;
  blockerCount: number;
  checks: ReadinessCheck[];
};

const GROUPS = [
  { id: "environment", label: "Platform", icon: ServerCog },
  { id: "database", label: "Database & migrations", icon: Database },
  { id: "payments", label: "Billing", icon: CircleDollarSign },
  { id: "ai", label: "AI", icon: Bot },
] as const;

export default function SystemReadinessPage() {
  const { user } = useAuth();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token || "";
      const res = await fetch("/api/internal/readiness", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not run readiness checks");
      setResult(data);
    } catch (e: any) {
      setError(e?.message || "Could not run readiness checks");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  const blockingMissing = useMemo(
    () => result?.checks.filter((check) => check.blocking && !check.ok) || [],
    [result]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Maplyo
          </Link>
          <button onClick={load} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-zinc-300 hover:bg-white/5 disabled:opacity-50">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Re-run checks
          </button>
        </div>

        <div className="mt-8">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Internal Launch Control</div>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">System Readiness</h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            One place to verify the infrastructure behind the Guest Experience OS before merging or launching.
          </p>
        </div>

        {error && <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-200">{error}</div>}

        {loading && !result ? (
          <div className="flex justify-center py-24"><Loader2 className="h-7 w-7 animate-spin text-zinc-500" /></div>
        ) : result ? (
          <>
            <section className={`mt-8 rounded-3xl border p-7 ${result.ready ? "border-emerald-500/20 bg-emerald-500/10" : "border-amber-500/20 bg-amber-500/10"}`}>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${result.ready ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}>
                    {result.ready ? <ShieldCheck className="h-7 w-7" /> : <AlertTriangle className="h-7 w-7" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{result.ready ? "Launch infrastructure ready" : "Launch blockers detected"}</h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      {result.ready
                        ? "All blocking environment and migration checks passed."
                        : `${result.blockerCount} blocking item${result.blockerCount === 1 ? "" : "s"} still need attention.`}
                    </p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-5xl font-black">{result.score}%</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-zinc-500">readiness</div>
                </div>
              </div>
            </section>

            {blockingMissing.length > 0 && (
              <section className="mt-6 rounded-2xl border border-red-500/15 bg-red-500/[0.06] p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-red-300">Blocking before production rollout</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {blockingMissing.map((check) => (
                    <span key={check.key} className="rounded-full border border-red-500/15 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200">
                      {check.label}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {GROUPS.map(({ id, label, icon: Icon }) => {
                const checks = result.checks.filter((check) => check.group === id);
                const okCount = checks.filter((check) => check.ok).length;
                return (
                  <section key={id} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5"><Icon className="h-5 w-5 text-zinc-300" /></div>
                        <div>
                          <h3 className="font-bold">{label}</h3>
                          <p className="text-xs text-zinc-600">{okCount}/{checks.length} checks passing</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 divide-y divide-white/5">
                      {checks.map((check) => (
                        <div key={check.key} className="flex items-start gap-3 py-3">
                          {check.ok
                            ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                            : <XCircle className={`mt-0.5 h-5 w-5 shrink-0 ${check.blocking ? "text-red-400" : "text-amber-400"}`} />}
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-semibold">{check.label}</span>
                              {!check.blocking && <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500">optional</span>}
                            </div>
                            <p className="mt-1 break-words text-xs leading-5 text-zinc-500">{check.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            <p className="mt-6 text-center text-xs text-zinc-700">
              Last checked {new Date(result.generatedAt).toLocaleString()}. No credential values are returned by this page.
            </p>
          </>
        ) : null}
      </div>
    </main>
  );
}
