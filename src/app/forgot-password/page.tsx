"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Map as MapIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { authCopy } from "@/lib/i18n/auth";
import { MarketingLanguageSwitcher } from "@/components/marketing/MarketingLanguageSwitcher";

export default function ForgotPasswordPage() {
  const { lang } = useTranslation();
  const t = authCopy(lang).forgot;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const redirectTo = new URL("/auth/update-password", window.location.origin).toString();
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
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
          <h1 className="text-3xl font-bold">{sent ? t.successTitle : t.title}</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{sent ? t.successText : t.subtitle}</p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <Mail className="h-6 w-6" />
              </div>
              <Link href="/login" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950">
                <ArrowLeft className="h-4 w-4" /> {t.back}
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
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
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 outline-none focus:border-rose-400/50 rtl:pl-4 rtl:pr-11"
                  />
                </div>
              </div>

              {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

              <button disabled={loading} className="h-12 w-full rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 font-bold disabled:opacity-50">
                {loading ? t.loading : t.submit}
              </button>
            </form>
          )}
        </div>

        {!sent && (
          <div className="mt-6 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> {t.back}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
