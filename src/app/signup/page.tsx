"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Lock, Mail, Map as MapIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${typeof window !== "undefined" ? window.location.origin : "https://maplyo.com"}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      window.location.href = "/onboarding";
      return;
    }

    fetch("/api/email/welcome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => undefined);

    setSuccess(true);
    setLoading(false);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-5 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-rose-600/15 blur-[130px]" />
        <div className="absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full bg-purple-600/15 blur-[130px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <Link href="/" className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 shadow-xl shadow-rose-600/20">
          <MapIcon className="h-7 w-7" />
        </Link>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Create your guest experience</h1>
          <p className="mt-3 text-zinc-400">Start with your property. No credit card required.</p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-xl">
          {success ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">Check your inbox</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                We sent a confirmation link to <strong className="text-white">{email}</strong>. After confirming, you will go straight to property setup.
              </p>
              <Link href="/login" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950">
                Continue to login <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-white outline-none transition focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    placeholder="6+ characters"
                    required
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-white outline-none transition focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
              </div>

              {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

              <button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 font-bold shadow-lg shadow-rose-600/20 disabled:opacity-60">
                {loading ? "Creating account…" : <>Continue to my property <ArrowRight className="h-4 w-4" /></>}
              </button>

              <p className="text-center text-xs leading-5 text-zinc-500">
                By continuing, you agree to the <Link href="/legal/terms" className="text-zinc-300 underline">Terms</Link> and acknowledge the <Link href="/legal/privacy" className="text-zinc-300 underline">Privacy Policy</Link>.
              </p>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account? <Link href="/login" className="font-semibold text-white">Sign in</Link>
        </p>
      </motion.div>
    </main>
  );
}
