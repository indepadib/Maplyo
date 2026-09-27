import Link from "next/link";
import { ArrowRight, Bot, Building2, Check, Globe2, LineChart, Smartphone, Sparkles, WalletCards } from "lucide-react";

type SegmentLandingProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  outcomes: string[];
  useCases: { title: string; description: string }[];
  ctaLabel: string;
};

export function SegmentLanding({ eyebrow, title, subtitle, outcomes, useCases, ctaLabel }: SegmentLandingProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.16),transparent_36%),radial-gradient(circle_at_top_left,rgba(147,51,234,0.14),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Maplyo</Link>
          <div className="mt-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200">
              <Sparkles className="h-4 w-4" /> {eyebrow}
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">{subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-zinc-200">
                {ctaLabel}<ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/demo" className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 font-semibold hover:bg-white/5">
                See a live experience
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-16 md:grid-cols-3">
        {[
          { icon: Bot, title: "AI concierge", text: "Answer recurring guest questions from property information you control." },
          { icon: WalletCards, title: "Ancillary revenue", text: "Surface late checkout, breakfast, transfers and other services in the guest journey." },
          { icon: Smartphone, title: "No app required", text: "Guests open one web link or QR code. Nothing to install." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <Icon className="h-7 w-7 text-rose-300" />
            <h2 className="mt-5 text-xl font-bold">{title}</h2>
            <p className="mt-2 text-zinc-400">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-slate-900/50 p-8 md:grid-cols-2 md:p-12">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-purple-300"><LineChart className="h-4 w-4" /> Business outcomes</div>
            <h2 className="mt-4 text-3xl font-bold">Make every stay easier to operate and easier to monetize.</h2>
          </div>
          <div className="space-y-4">
            {outcomes.map(item => (
              <div key={item} className="flex gap-3 text-zinc-300"><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-center gap-2 text-sm font-semibold text-rose-300"><Building2 className="h-4 w-4" /> Built around real guest journeys</div>
        <div className="grid gap-5 md:grid-cols-2">
          {useCases.map(item => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-7 text-zinc-400">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 text-center">
        <Globe2 className="mx-auto h-8 w-8 text-purple-300" />
        <h2 className="mt-5 text-3xl font-bold md:text-4xl">One guest layer across your hospitality stack.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">Maplyo is designed to sit above your existing PMS, channel manager or operating process—not replace everything you already use.</p>
      </section>
    </main>
  );
}
