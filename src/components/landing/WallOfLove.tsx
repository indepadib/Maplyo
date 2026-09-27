"use client";

import { motion } from "framer-motion";
import { Bot, Globe2, KeyRound, LineChart, QrCode, WalletCards } from "lucide-react";

const CAPABILITIES = [
  { icon: QrCode, title: "One guest link", text: "Share one web experience by QR code or message. No guest app installation." },
  { icon: Bot, title: "AI-assisted concierge", text: "Help guests find answers from the property information you choose to publish." },
  { icon: WalletCards, title: "Upsell-ready", text: "Surface late checkout, transfers, breakfast and other services inside the guest journey." },
  { icon: Globe2, title: "Multilingual", text: "Serve international travelers with a guest experience designed for multiple languages." },
  { icon: KeyRound, title: "Access-aware", text: "Keep arrival, access and connected-lock workflows close to the guest experience." },
  { icon: LineChart, title: "Built to measure", text: "Track engagement and evolve toward revenue-per-stay and service conversion metrics." },
];

export function WallOfLove() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28">
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-400">Guest Experience Layer</span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">Built around the moments that shape a stay.</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Maplyo brings practical information, guest assistance and revenue opportunities into one mobile-first experience.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(({ icon: Icon, title, text }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Icon className="h-6 w-6 text-rose-300" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-zinc-400">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
