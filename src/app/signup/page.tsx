"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Lock, Mail, Map as MapIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { marketingCopy } from "@/lib/i18n/marketing";
import { MarketingLanguageSwitcher } from "@/components/marketing/MarketingLanguageSwitcher";

export default function SignupPage() {
  const { lang } = useTranslation();
  const t = marketingCopy(lang);
  const s = t.signup;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    const ref = params.get("ref");
    const offer = params.get("offer");
    const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/onboarding";
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("next", safeNext);

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: callbackUrl.toString(),
        data: {
          acquisition_ref: ref || null,
          acquisition_offer: offer || null,
          preferred_language: lang,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      window.location.href = safeNext;
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const nextParam = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("next")
    : null;
  const loginHref = nextParam
    ? `/login?next=${encodeURIComponent(nextParam)}`
    : "/login";

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-5 text-white">
      <div className="absolute right-5 top-5 z-20">
        <MarketingLanguageSwitcher compact />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-rose-600/15 blur-[130px]" />
        <div className="absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full bg-purple-600/15 blur-[130px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <Link href="/" className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 shadow-xl shadow-rose-600/20">
          <MapIcon className="h-7 w-7" />
        </Link>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">{s.title}</h1>
          <p className="mt-3 text-zinc-400">{s.subtitle}</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 text-[11px] font-bold text-zinc-400">
          <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 text-emerald-200">1 Free guide</span>
          <span className="rounded-full border border-purple-400/15 bg-purple-400/10 px-3 py-1.5 text-purple-200">30 days Pro</span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">No card</span>
        </div>

        <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-xl">
          {success ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">{s.checkInbox}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {s.checkInboxBody} <strong className="text-white">{email}</strong>
              </p>
              <Link href={loginHref} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950">
                {s.continueLogin} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">{s.email}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500 rtl:left-auto rtl:right-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-white outline-none transition focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20 rtl:pl-4 rtl:pr-11"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">{s.password}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500 rtl:left-auto rtl:right-4" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    placeholder={s.passwordPlaceholder}
                    autoComplete="new-password"
                    required
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-white outline-none transition focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20 rtl:pl-4 rtl:pr-11"
                  />
                </div>
              </div>

              {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

              <button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 font-bold shadow-lg shadow-rose-600/20 disabled:opacity-60">
                {loading ? s.loading : <>{s.button} <ArrowRight className="h-4 w-4" /></>}
              </button>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="flex items-start gap-3 text-xs leading-5 text-zinc-500">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" />
                  <div>
                    <div className="font-bold text-zinc-300">{t.hero.offer}</div>
                    <div className="mt-1">{t.hero.fallback}</div>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs leading-5 text-zinc-500">
                {s.termsPrefix} <Link href="/legal/terms" className="text-zinc-300 underline">{s.terms}</Link> · <Link href="/legal/privacy" className="text-zinc-300 underline">{s.privacy}</Link>.
              </p>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          {s.existing} <Link href={loginHref} className="font-semibold text-white">{s.signIn}</Link>
        </p>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-zinc-600">
          <Check className="h-3.5 w-3.5 text-emerald-500" /> Maplyo Free remains usable after the Pro trial.
        </div>
      </motion.div>
    </main>
  );
}
