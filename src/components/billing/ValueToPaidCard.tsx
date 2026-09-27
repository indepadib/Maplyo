"use client";

import Link from "next/link";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { conversionMomentCopy } from "@/lib/i18n/conversion-moment";
import type { UserSubscription } from "@/types/subscription";

type GuideValue = {
  slug: string;
  is_published: boolean;
  views: number;
};

export function ValueToPaidCard({
  guides,
  subscription,
}: {
  guides: GuideValue[];
  subscription: UserSubscription | null;
}) {
  const { lang } = useTranslation();
  const t = conversionMomentCopy(lang);

  if (!subscription || subscription.status !== "trialing") return null;

  const published = guides.filter((guide) => guide.is_published);
  if (!published.length) return null;

  const totalViews = published.reduce((sum, guide) => sum + Number(guide.views || 0), 0);
  const firstPublished = published[0];
  const daysLeft = Math.max(
    1,
    Math.ceil((subscription.currentPeriodEnd - Date.now()) / (24 * 60 * 60 * 1000))
  );

  if (totalViews <= 0) {
    return (
      <section className="mb-8 rounded-3xl border border-sky-400/15 bg-gradient-to-r from-sky-500/8 to-indigo-500/8 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-sky-200">
              <Eye className="h-4 w-4" /> {t.firstGuestTitle}
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">{t.firstGuestText}</p>
          </div>
          <a
            href={`/g/${firstPublished.slug}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-xs font-bold text-white hover:bg-white/10"
          >
            {t.openGuestLink}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8 overflow-hidden rounded-3xl border border-purple-400/25 bg-gradient-to-br from-purple-500/14 via-rose-500/8 to-emerald-500/8 p-6 shadow-2xl shadow-purple-950/10">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/15 bg-purple-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-purple-200">
            <Sparkles className="h-3.5 w-3.5" /> Value moment
          </div>
          <h3 className="mt-4 text-xl font-bold text-white">{t.proofTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {t.proofBefore} <strong className="text-white">{totalViews}</strong> {t.proofAfter}
            {" "}{t.daysBefore} <strong className="text-white">{daysLeft}</strong> {t.daysAfter}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-500">{t.annualReason}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <Link
            href="/pricing?billing=annual&autocheckout=pro&ref=value-moment"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 hover:bg-zinc-200"
          >
            {t.annualCta} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 px-5 py-3 text-center text-xs font-bold text-zinc-500 hover:bg-white/5 hover:text-white"
          >
            {t.keepTesting}
          </Link>
        </div>
      </div>
    </section>
  );
}
