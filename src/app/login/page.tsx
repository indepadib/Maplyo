"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail, Map as MapIcon } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { authCopy } from "@/lib/i18n/auth";
import { MarketingLanguageSwitcher } from "@/components/marketing/MarketingLanguageSwitcher";

export default function LoginPage() {
  const { lang } = useTranslation();
  const t = authCopy(lang).login;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (typeof document !== "undefined") {
        const cookiesToClear = ["sb-access-token", "sb-refresh-token"];
        const paths = ["/", "/dashboard", "/dashboard/settings", "/app"];
        cookiesToClear.forEach((name) => {
          paths.forEach((path) => {
            document.cookie = `${name}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
          });
        });
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const next = new URLSearchParams(window.location.search).get("next");
      const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
      window.location.href = safeNext;
    } catch (err: any) {
      setError(err?.message || "Authentication failed");
      setLoading(false);
    }
  };

  const next = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("next")
    : null;
  const signupHref = next ? `/signup?next=${encodeURIComponent(next)}` : "/signup";

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4 text-white">
      <div className="absolute right-5 top-5 z-20">
        <MarketingLanguageSwitcher compact />
      </div>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[20%] h-[80vw] w-[80vw] rounded-full bg-rose-600/10 blur-[150px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[60vw] w-[60vw] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 shadow-xl shadow-rose-500/20 transition hover:scale-105">
            <MapIcon className="h-8 w-8" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="mt-2 text-zinc-400">{t.subtitle}</p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="relative z-10 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500 rtl:left-auto rtl:right-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-white outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20 rtl:pl-4 rtl:pr-11"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">{t.password}</label>
                <Link href="/forgot-password" className="text-xs font-medium text-rose-300 hover:text-rose-200">{t.forgot}</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500 rtl:left-auto rtl:right-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-white outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20 rtl:pl-4 rtl:pr-11"
                />
              </div>
            </div>

            {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

            <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 font-semibold shadow-lg shadow-rose-600/20 disabled:opacity-60">
              {loading ? t.loading : <>{t.submit} <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        </div>

        <div className="mt-7 text-center">
          <p className="text-sm text-zinc-500">
            {t.noAccount} <Link href={signupHref} className="font-semibold text-white hover:text-rose-300">{t.createFree}</Link>
          </p>

          <button
            onClick={async () => {
              if (!confirm(t.resetConfirm)) return;
              await supabase.auth.signOut();
              localStorage.clear();
              sessionStorage.clear();
              document.cookie.split(";").forEach((cookie) => {
                document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
              });
              window.location.reload();
            }}
            className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-700 underline underline-offset-4 hover:text-zinc-500"
          >
            {t.resetSession}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
