"use client";

import Link from "next/link";
import { BedDouble, Clock3, Coffee, MapPin, MessageCircle, Sparkles, Wifi } from "lucide-react";

const cards = [
  { icon: Wifi, label: "Wi-Fi", value: "RiadAtlas_Guest", note: "Tap to reveal password" },
  { icon: Clock3, label: "Check-in", value: "From 15:00", note: "Reception open until 23:00" },
  { icon: Coffee, label: "Breakfast", value: "07:30 — 10:30", note: "Patio • 120 MAD / guest" },
  { icon: MapPin, label: "Getting here", value: "Marrakech Medina", note: "Open directions" },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#f5f1ea] text-slate-900">
      <div className="mx-auto max-w-md min-h-screen bg-white shadow-2xl">
        <div className="relative h-72 overflow-hidden bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=1200&q=85"
            alt="Riad Atlas demo"
            className="h-full w-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
          <div className="absolute left-6 right-6 bottom-6 text-white">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Powered by Maplyo
            </div>
            <h1 className="text-3xl font-bold">Riad Atlas Marrakech</h1>
            <p className="mt-1 text-sm text-white/80">Welcome, Sarah. Everything for your stay is here.</p>
          </div>
        </div>

        <div className="space-y-6 p-5 pb-28">
          <section className="rounded-3xl bg-slate-950 p-5 text-white">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white/10 p-3"><MessageCircle className="h-5 w-5" /></div>
              <div>
                <p className="font-semibold">Ask your digital concierge</p>
                <p className="mt-1 text-sm text-white/60">Property information, services and local recommendations.</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/80">“Can I book an airport transfer for tomorrow?”</div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Your stay</h2>
            <div className="grid grid-cols-2 gap-3">
              {cards.map(({ icon: Icon, label, value, note }) => (
                <div key={label} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <Icon className="h-5 w-5 text-rose-500" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                  <p className="mt-1 font-bold">{value}</p>
                  <p className="mt-1 text-xs text-slate-500">{note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Enhance your stay</p>
                <h2 className="mt-1 text-2xl font-bold">Services for you</h2>
              </div>
            </div>
            <div className="space-y-3">
              {[
                ["Airport transfer", "Private pickup from Marrakech airport", "250 MAD"],
                ["Late checkout", "Keep your room until 15:00", "200 MAD"],
                ["Traditional dinner", "Three-course Moroccan dinner in the riad", "320 MAD"],
              ].map(([title, desc, price]) => (
                <div key={title} className="flex items-center gap-4 rounded-3xl border border-slate-200 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50"><BedDouble className="h-5 w-5 text-rose-500" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{title}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <span className="text-sm font-bold">{price}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-amber-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Today in Marrakech</p>
            <h2 className="mt-2 text-xl font-bold">Explore the souks before sunset</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Your host recommends entering through Bab Doukkala and finishing near Jemaa el-Fna for dinner.</p>
          </section>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t border-slate-200 bg-white/95 p-4 backdrop-blur">
          <div className="flex gap-3">
            <Link href="/signup" className="flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-bold text-white">Create yours</Link>
            <Link href="/for-hotels" className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-bold">For hotels</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
