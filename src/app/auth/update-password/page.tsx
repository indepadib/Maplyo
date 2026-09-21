"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Lock, Map as MapIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { authCopy } from "@/lib/i18n/auth";
import { MarketingLanguageSwitcher } from "@/components/marketing/MarketingLanguageSwitcher";

export default function UpdatePasswordPage() {
  const { lang } = useTranslation();
  const t = authCopy(lang).update;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      setReady(Boolean(data.session));
    }, 300);
    return () => window.clearTimeout(timer);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(t.mismatch);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-5 text-white">
      <div className="absolute right-5 top-5 z-20"><MarketingLanguageSwitcher compact /></div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-rose-600/12 blur-[130px]" />
        <div className="absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full bg-purple-600/12 blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600">
          <MapIcon className="h-7 w-7" />
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-bold">{success ? t.successTitle : t.title}</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{success ? t.successText : t.subtitle}</p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          {success ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
              <Link href="/dashboard" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950">{t.dashboard}</Link>
            </div>
          ) : ready ? (
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">{t.password}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500 rtl:left-auto rtl:right-4" />
                  <input
                    type="password"
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 outline-none focus:border-rose-400/50 rtl:pl-4 rtl:pr-11"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">{t.confirm}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500 rtl:left-auto rtl:right-4" />
                  <input
                    type="password"
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 outline-none focus:border-rose-400/50 rtl:pl-4 rtl:pr-11"
                  />
                </div>
              </div>

              {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

              <button disabled={loading} className="h-12 w-full rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 font-bold disabled:opacity-50">
                {loading ? t.loading : t.submit}
              </button>
            </form>
          ) : (
            <div className="text-center text-sm text-zinc-500">
              <Link href="/forgot-password" className="underline">Request a new reset link</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
