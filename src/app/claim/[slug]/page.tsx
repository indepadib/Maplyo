"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

export default function ClaimMagicDemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { user } = useAuth();
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"idle" | "claiming" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);

  useEffect(() => {
    if (!user || !slug || status !== "idle") return;

    const claim = async () => {
      setStatus("claiming");
      setError(null);

      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      const res = await fetch("/api/magic-demo/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ slug }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not claim this experience");
        setStatus("error");
        return;
      }

      window.location.href = `/app/guides/${data.guideId}/builder`;
    };

    claim();
  }, [user, slug, status]);

  const next = slug ? `/claim/${encodeURIComponent(slug)}` : "/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-5 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-rose-500">
          <Sparkles className="h-7 w-7" />
        </div>

        {!user ? (
          <>
            <div className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Your personalized Maplyo is ready</div>
            <h1 className="mt-3 text-3xl font-bold">Own this guest experience.</h1>
            <p className="mt-3 text-zinc-400">
              Create your free Maplyo account and this demo will be copied directly into your workspace so you can edit and publish it.
            </p>
            <div className="mt-7 grid gap-3">
              <Link
                href={`/signup?next=${encodeURIComponent(next)}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-bold text-slate-950"
              >
                Create my account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/login?next=${encodeURIComponent(next)}`}
                className="rounded-xl border border-white/10 px-5 py-3.5 font-bold text-zinc-300 hover:bg-white/5"
              >
                I already have an account
              </Link>
            </div>
          </>
        ) : status === "error" ? (
          <>
            <h1 className="mt-6 text-2xl font-bold">We couldn&apos;t claim this demo.</h1>
            <p className="mt-3 text-sm leading-6 text-red-200">{error}</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/dashboard" className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950">Go to dashboard</Link>
              <Link href={slug ? `/m/${slug}` : "/"} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold">Back to demo</Link>
            </div>
          </>
        ) : (
          <>
            <Loader2 className="mx-auto mt-7 h-7 w-7 animate-spin text-violet-300" />
            <h1 className="mt-5 text-2xl font-bold">Adding this property to your workspace…</h1>
            <p className="mt-2 text-sm text-zinc-500">Your personalized demo is becoming a real editable Maplyo experience.</p>
          </>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-600">
          <CheckCircle2 className="h-4 w-4" /> No credit card required to claim
        </div>
      </div>
    </main>
  );
}
