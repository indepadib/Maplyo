"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MaplyoLogo } from "@/components/ui/MaplyoLogo";
import { useAuth } from "@/components/auth/AuthProvider";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { MarketingLanguageSwitcher } from "@/components/marketing/MarketingLanguageSwitcher";
import { marketingCopy } from "@/lib/i18n/marketing";
import { CurrencyCode, PRICING_BY_CURRENCY } from "@/lib/pricing/currencies";
import { trackProductEvent } from "@/lib/analytics/product-events";

export default function PricingClient() {
  const { user, session } = useAuth();
  const { lang } = useTranslation();
  const t = marketingCopy(lang);
  const router = useRouter();
  const [currency, setCurrency] = useState<CurrencyCode>("MAD");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) trackProductEvent("pricing_viewed");

    const params = new URLSearchParams(window.location.search);
    const debugCurrency = params.get("debug_currency") as CurrencyCode | null;
    if (debugCurrency && PRICING_BY_CURRENCY[debugCurrency]) {
      setCurrency(debugCurrency);
      return;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split("; maplyo-currency=");
    if (parts.length === 2) {
      const cookieCurrency = parts.pop()?.split(";").shift() as CurrencyCode;
      if (cookieCurrency && PRICING_BY_CURRENCY[cookieCurrency]) setCurrency(cookieCurrency);
    }
  }, [user]);

  const pricing = PRICING_BY_CURRENCY[currency] || PRICING_BY_CURRENCY.MAD;

  const startFree = () => {
    if (user) router.push("/dashboard");
    else router.push("/signup?ref=pricing-free&offer=reverse-trial");
  };

  const buyPro = async () => {
    if (!user) {
      router.push("/signup?ref=pricing-pro&offer=reverse-trial");
      return;
    }

    setLoading(true);
    trackProductEvent("checkout_started", { metadata: { planId: "pro", currency } });

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ plan: "pro", currency }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "Checkout unavailable");
    } catch (error: any) {
      console.error(error);
      alert(error?.message || "Checkout unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/5 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-rose-600">
              <MaplyoLogo className="h-6 w-6" classNamePath="fill-white" showText={false} />
            </div>
            <span className="text-xl font-extrabold">Maplyo</span>
          </Link>

          <div className="flex items-center gap-3">
            <MarketingLanguageSwitcher compact />
            {user ? (
              <Link href="/dashboard" className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5">Dashboard</Link>
            ) : (
              <Link href="/login" className="hidden rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 sm:block">{t.nav.login}</Link>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full bg-purple-500/10 blur-[140px]" />
          <div className="absolute -bottom-40 -left-40 h-[650px] w-[650px] rounded-full bg-rose-500/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Maplyo
          </Link>

          <div className="mx-auto mt-12 max-w-3xl text-center">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-purple-300">{t.pricing.eyebrow}</div>
            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">{t.pricing.title}</h1>
            <p className="mt-6 text-lg leading-8 text-zinc-400">{t.pricing.subtitle}</p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <article className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.035] p-7">
              <div className="inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">{t.pricing.free.badge}</div>
              <h2 className="mt-5 text-2xl font-bold">{t.pricing.free.name}</h2>
              <div className="mt-4 text-5xl font-black">{currency === "MAD" ? "0 DH" : t.pricing.free.price}</div>
              <p className="mt-4 min-h-14 text-sm leading-6 text-zinc-500">{t.pricing.free.desc}</p>
              <ul className="mt-7 space-y-3">
                {t.pricing.free.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-zinc-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {feature}
                  </li>
                ))}
              </ul>
              <button onClick={startFree} className="mt-8 w-full rounded-xl bg-emerald-300 px-4 py-3 font-bold text-slate-950 hover:bg-emerald-200">
                {t.pricing.free.cta}
              </button>
            </article>

            <article className="relative rounded-3xl border border-purple-400/35 bg-gradient-to-b from-purple-500/10 via-white/[0.025] to-rose-500/5 p-7 shadow-2xl shadow-purple-950/20">
              <div className="absolute right-6 top-6"><Sparkles className="h-5 w-5 text-purple-300" /></div>
              <div className="inline-flex rounded-full bg-purple-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-200">{t.pricing.pro.badge}</div>
              <h2 className="mt-5 text-2xl font-bold">{t.pricing.pro.name}</h2>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black">{pricing.pro} {pricing.symbol}</span>
                <span className="text-sm text-zinc-500">{t.pricing.pro.priceSuffix}</span>
              </div>
              <p className="mt-4 min-h-14 text-sm leading-6 text-zinc-400">{t.pricing.pro.desc}</p>
              <ul className="mt-7 space-y-3">
                {t.pricing.pro.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-zinc-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" /> {feature}
                  </li>
                ))}
              </ul>
              <button onClick={buyPro} disabled={loading} className="mt-8 w-full rounded-xl bg-white px-4 py-3 font-bold text-slate-950 hover:bg-zinc-200 disabled:opacity-50">
                {loading ? "…" : t.pricing.pro.cta}
              </button>
              <p className="mt-3 text-center text-[11px] text-zinc-600">{t.hero.offer}</p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <Building2 className="h-3.5 w-3.5" /> Portfolio / Hotel
              </div>
              <h2 className="mt-5 text-2xl font-bold">{t.pricing.business.name}</h2>
              <div className="mt-4 text-4xl font-black">{t.pricing.business.price}</div>
              <p className="mt-4 min-h-14 text-sm leading-6 text-zinc-500">{t.pricing.business.desc}</p>
              <ul className="mt-7 space-y-3">
                {t.pricing.business.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-zinc-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" /> {feature}
                  </li>
                ))}
              </ul>
              <Link href="/contact-sales" className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-bold hover:bg-white/10">
                {t.pricing.business.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-center text-xs font-medium text-zinc-500">
            {t.pricing.reassurance}
          </div>

          <section className="mx-auto mt-24 max-w-4xl">
            <h2 className="text-center text-3xl font-bold md:text-4xl">{t.faq.title}</h2>
            <div className="mt-8 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
              {t.faq.items.map((item) => (
                <details key={item.q} className="p-6">
                  <summary className="cursor-pointer list-none font-bold">{item.q}</summary>
                  <p className="mt-4 text-sm leading-7 text-zinc-500">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
