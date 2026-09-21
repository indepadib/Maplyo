"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  CircleDollarSign,
  Globe2,
  Languages,
  Menu,
  MessageSquareText,
  Play,
  QrCode,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MaplyoLogo } from "@/components/ui/MaplyoLogo";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { marketingCopy } from "@/lib/i18n/marketing";
import { MarketingLanguageSwitcher, MARKETING_LANGUAGES } from "@/components/marketing/MarketingLanguageSwitcher";
import { CurrencyCode, PRICING_BY_CURRENCY } from "@/lib/pricing/currencies";

const PhoneMockup3D = dynamic(
  () => import("@/components/landing/PhoneMockup3D").then((mod) => mod.PhoneMockup3D),
  {
    ssr: false,
    loading: () => <div className="mx-auto h-[560px] w-[280px] animate-pulse rounded-[3rem] bg-white/5" />,
  }
);

function OfferBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-200">
      <Sparkles className="h-4 w-4 shrink-0" />
      <span>{text}</span>
    </div>
  );
}

export default function LandingPage() {
  const { lang } = useTranslation();
  const t = marketingCopy(lang);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>("MAD");

  useEffect(() => {
    if (typeof document === "undefined") return;
    const value = `; ${document.cookie}`;
    const parts = value.split("; maplyo-currency=");
    if (parts.length === 2) {
      const code = parts.pop()?.split(";").shift() as CurrencyCode;
      if (code && PRICING_BY_CURRENCY[code]) setCurrency(code);
    }
  }, []);

  const pricing = PRICING_BY_CURRENCY[currency] || PRICING_BY_CURRENCY.MAD;
  const proPrice = `${pricing.pro} ${pricing.symbol}`;
  const rtl = lang === "ar";

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="min-h-screen overflow-x-hidden bg-slate-950 text-white selection:bg-rose-500/30">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-rose-600 shadow-lg shadow-rose-500/20">
              <MaplyoLogo className="h-6 w-6" classNamePath="fill-white" showText={false} />
            </div>
            <span className="text-xl font-extrabold tracking-tight">Maplyo</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link href="#product" className="text-sm font-medium text-zinc-400 hover:text-white">{t.nav.product}</Link>
            <Link href="#solutions" className="text-sm font-medium text-zinc-400 hover:text-white">{t.nav.solutions}</Link>
            <Link href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white">{t.nav.pricing}</Link>
            <Link href="/demo" className="text-sm font-medium text-zinc-400 hover:text-white">{t.nav.demo}</Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <MarketingLanguageSwitcher compact />
            <Link href="/login" className="px-3 py-2 text-sm font-bold text-zinc-400 hover:text-white">{t.nav.login}</Link>
            <Link href="/signup?ref=landing&offer=reverse-trial">
              <Button className="rounded-xl border-0 bg-white text-slate-950 hover:bg-zinc-200">{t.nav.cta}</Button>
            </Link>
          </div>

          <button onClick={() => setMobileOpen((v) => !v)} className="rounded-xl border border-white/10 p-2 md:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/5 bg-slate-950 px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <MarketingLanguageSwitcher />
              <Link onClick={() => setMobileOpen(false)} href="#product" className="py-2 text-zinc-300">{t.nav.product}</Link>
              <Link onClick={() => setMobileOpen(false)} href="#solutions" className="py-2 text-zinc-300">{t.nav.solutions}</Link>
              <Link onClick={() => setMobileOpen(false)} href="#pricing" className="py-2 text-zinc-300">{t.nav.pricing}</Link>
              <Link onClick={() => setMobileOpen(false)} href="/demo" className="py-2 text-zinc-300">{t.nav.demo}</Link>
              <Link onClick={() => setMobileOpen(false)} href="/signup?ref=landing-mobile&offer=reverse-trial" className="rounded-xl bg-white px-4 py-3 text-center font-bold text-slate-950">{t.nav.cta}</Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-rose-500/10 blur-[140px]" />
            <div className="absolute -bottom-40 -left-40 h-[620px] w-[620px] rounded-full bg-purple-600/10 blur-[140px]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div className={rtl ? "text-right" : ""}>
              <div className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-rose-300">{t.hero.eyebrow}</div>
              <OfferBadge text={t.hero.offer} />

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                {t.hero.title}
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
                {t.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {t.hero.importHint.split("·").map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-zinc-400">
                    {item.trim()}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup?ref=hero&offer=reverse-trial">
                  <Button className="h-14 w-full rounded-xl border-0 bg-white px-7 text-base font-bold text-slate-950 hover:bg-zinc-200 sm:w-auto">
                    {t.hero.primary} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo" target="_blank">
                  <Button variant="secondary" className="h-14 w-full rounded-xl border-white/10 bg-white/5 px-7 text-base font-bold text-white hover:bg-white/10 sm:w-auto">
                    <Play className="mr-2 h-4 w-4 fill-white" /> {t.hero.secondary}
                  </Button>
                </Link>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-500">{t.hero.fallback}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {MARKETING_LANGUAGES.map((item) => (
                  <span key={item.code} className="rounded-lg border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-[10px] font-bold text-zinc-500">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative hidden min-h-[620px] items-center justify-center lg:flex">
              <div className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-br from-rose-500/15 to-purple-500/15 blur-3xl" />
              <PhoneMockup3D />
              <div className="absolute right-0 top-20 rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-bold"><Bot className="h-4 w-4 text-rose-300" /> {t.proof.cards[2].title}</div>
                <div className="mt-1 max-w-[220px] text-xs text-zinc-500">{t.proof.cards[2].text}</div>
              </div>
              <div className="absolute bottom-28 left-0 rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-bold"><CircleDollarSign className="h-4 w-4 text-emerald-300" /> {t.proof.cards[3].title}</div>
                <div className="mt-1 max-w-[220px] text-xs text-zinc-500">{t.proof.cards[3].text}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="product" className="border-y border-white/5 bg-white/[0.015] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{t.outcomes.title}</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-400">{t.outcomes.subtitle}</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {t.outcomes.cards.map((card, index) => {
                const icons = [MessageSquareText, CircleDollarSign, Globe2, Building2];
                const Icon = icons[index] || Zap;
                return (
                  <article key={card.title} className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5"><Icon className="h-5 w-5 text-rose-300" /></div>
                    <h3 className="mt-5 text-lg font-bold">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-500">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">{t.proof.eyebrow}</div>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">{t.proof.title}</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-400">{t.proof.subtitle}</p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {t.proof.cards.map((card, index) => {
                const icons = [QrCode, Sparkles, Bot, CircleDollarSign, Languages, Building2];
                const Icon = icons[index] || Check;
                return (
                  <article key={card.title} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                    <Icon className="h-5 w-5 text-emerald-300" />
                    <h3 className="mt-4 font-bold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{card.text}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <Link href="/demo" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold hover:bg-white/10">
                <Play className="h-4 w-4" /> {t.hero.secondary}
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-slate-900/30 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-rose-300">{t.how.eyebrow}</div>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">{t.how.title}</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {t.how.steps.map((step, index) => (
                <article key={step.title} className="relative rounded-3xl border border-white/10 bg-slate-950/70 p-7">
                  <div className="text-5xl font-black text-white/[0.06]">0{index + 1}</div>
                  <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="solutions" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold md:text-5xl">{t.segments.title}</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-400">{t.segments.subtitle}</p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {t.segments.cards.map((card, index) => {
                const href = index === 0 ? "/for-hosts" : index === 1 ? "/for-property-managers" : "/for-hotels";
                return (
                  <Link key={card.title} href={href} className="group rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition hover:border-rose-400/30 hover:bg-white/[0.04]">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-600">0{index + 1}</div>
                    <h3 className="mt-5 text-2xl font-bold">{card.title}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-500">{card.text}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-rose-300">
                      {card.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-y border-white/5 bg-white/[0.015] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-purple-300">{t.pricing.eyebrow}</div>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">{t.pricing.title}</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-400">{t.pricing.subtitle}</p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <article className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.035] p-7">
                <div className="inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">{t.pricing.free.badge}</div>
                <h3 className="mt-5 text-2xl font-bold">{t.pricing.free.name}</h3>
                <div className="mt-4 text-5xl font-black">{currency === "MAD" ? "0 DH" : t.pricing.free.price}</div>
                <p className="mt-4 min-h-12 text-sm leading-6 text-zinc-500">{t.pricing.free.desc}</p>
                <ul className="mt-6 space-y-3">
                  {t.pricing.free.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-zinc-300"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {feature}</li>
                  ))}
                </ul>
                <Link href="/signup?ref=pricing-free&offer=reverse-trial" className="mt-8 block rounded-xl bg-emerald-300 px-4 py-3 text-center text-sm font-bold text-slate-950 hover:bg-emerald-200">
                  {t.pricing.free.cta}
                </Link>
              </article>

              <article className="relative rounded-3xl border border-purple-400/35 bg-gradient-to-b from-purple-500/10 to-rose-500/5 p-7 shadow-2xl shadow-purple-950/20">
                <div className="inline-flex rounded-full bg-purple-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-200">{t.pricing.pro.badge}</div>
                <h3 className="mt-5 text-2xl font-bold">{t.pricing.pro.name}</h3>
                <div className="mt-4 flex items-baseline gap-2"><span className="text-5xl font-black">{proPrice}</span><span className="text-sm text-zinc-500">{t.pricing.pro.priceSuffix}</span></div>
                <p className="mt-4 min-h-12 text-sm leading-6 text-zinc-400">{t.pricing.pro.desc}</p>
                <ul className="mt-6 space-y-3">
                  {t.pricing.pro.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-zinc-200"><Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" /> {feature}</li>
                  ))}
                </ul>
                <Link href="/signup?ref=pricing-pro&offer=reverse-trial" className="mt-8 block rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-950 hover:bg-zinc-200">
                  {t.pricing.pro.cta}
                </Link>
              </article>

              <article className="rounded-3xl border border-white/10 bg-slate-900/50 p-7">
                <div className="inline-flex rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">{t.pricing.business.name}</div>
                <h3 className="mt-5 text-2xl font-bold">{t.pricing.business.name}</h3>
                <div className="mt-4 text-4xl font-black">{t.pricing.business.price}</div>
                <p className="mt-4 min-h-12 text-sm leading-6 text-zinc-500">{t.pricing.business.desc}</p>
                <ul className="mt-6 space-y-3">
                  {t.pricing.business.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-zinc-300"><Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" /> {feature}</li>
                  ))}
                </ul>
                <Link href="/contact-sales" className="mt-8 block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-bold hover:bg-white/10">
                  {t.pricing.business.cta}
                </Link>
              </article>
            </div>

            <p className="mt-7 text-center text-xs font-medium text-zinc-500">{t.pricing.reassurance}</p>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-bold md:text-5xl">{t.faq.title}</h2>
            <div className="mt-10 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
              {t.faq.items.map((item) => (
                <details key={item.q} className="group p-6">
                  <summary className="cursor-pointer list-none font-bold marker:hidden">{item.q}</summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-28 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-purple-500/10" />
          <div className="relative mx-auto max-w-4xl">
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">{t.final.title}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">{t.final.subtitle}</p>
            <Link href="/signup?ref=final-cta&offer=reverse-trial" className="mt-9 inline-flex rounded-xl bg-white px-7 py-4 text-base font-bold text-slate-950 hover:bg-zinc-200">
              {t.final.cta} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <p className="mt-5 text-xs text-zinc-600">{t.final.subtext}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-black px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600"><MaplyoLogo className="h-5 w-5" classNamePath="fill-white" showText={false} /></div>
            <div><div className="font-bold">Maplyo</div><div className="text-xs text-zinc-600">Guest Experience & Revenue OS</div></div>
          </div>
          <div className="flex flex-wrap gap-5 text-xs text-zinc-500">
            <Link href="/pricing" className="hover:text-white">{t.nav.pricing}</Link>
            <Link href="/legal/privacy" className="hover:text-white">{t.signup.privacy}</Link>
            <Link href="/legal/terms" className="hover:text-white">{t.signup.terms}</Link>
            <Link href="/contact-sales" className="hover:text-white">{t.pricing.business.cta}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
