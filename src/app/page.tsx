"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MinimalIcons } from "@/components/icons/MinimalIcons";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
                Maplyo
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  Connexion
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white border-0 shadow-lg shadow-rose-500/50">
                  Commencer gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-white/90 text-sm font-medium">Nouvelle version disponible</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-rose-200 to-pink-200 bg-clip-text text-transparent">
              Le guide voyageur
            </span>
            <br />
            <span className="bg-gradient-to-r from-rose-400 via-red-400 to-rose-400 bg-clip-text text-transparent animate-gradient">
              qui impressionne
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-rose-100/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            Créez des guides interactifs premium pour vos locations Airbnb et conciergeries.
            Builder intelligent, design époustouflant, sécurité renforcée.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link href="/app/guides">
              <Button className="h-14 px-8 text-lg bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white border-0 shadow-2xl shadow-rose-500/50 transform hover:scale-105 transition-all">
                🚀 Essayer gratuitement
              </Button>
            </Link>
            <Link href="/g/demo">
              <Button variant="secondary" className="h-14 px-8 text-lg bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
                👀 Voir une démo
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 text-rose-200/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 border-2 border-slate-900" />
                ))}
              </div>
              <span>500+ hôtes satisfaits</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              <span>4.9/5 basé sur 200+ avis</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
          <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-rose-500/20 backdrop-blur-sm bg-white/5 p-8 transform hover:scale-[1.02] transition-all duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { Icon: MinimalIcons.checkin, title: "Check-in facile", desc: "Codes WiFi & accès sécurisés" },
                { Icon: MinimalIcons.places, title: "Recommandations", desc: "Lieux & événements locaux" },
                { Icon: MinimalIcons.wifi, title: "Mise à jour live", desc: "Modifications instantanées" },
                { Icon: MinimalIcons.access_codes, title: "Sécurité max", desc: "Protection des données" },
                { Icon: MinimalIcons.embed, title: "Thèmes premium", desc: "Design personnalisable" },
                { Icon: MinimalIcons.hero, title: "Mobile-first", desc: "Expérience optimale" },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-rose-400/50 transition-all group cursor-pointer"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-rose-200/60 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-rose-200/70">
            Des fonctionnalités pensées pour maximiser l'expérience de vos voyageurs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Builder par blocs intuitif",
              desc: "Drag & drop, réorganisez vos sections en un clic. Aucune compétence technique requise.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              title: "Codes d'accès verrouillés",
              desc: "WiFi et portes protégés. Déverrouillez uniquement pour vos voyageurs confirmés.",
              gradient: "from-rose-500 to-pink-500",
            },
            {
              title: "Maps & recommandations",
              desc: "Intégrez vos spots favoris, restaurants, et événements locaux automatiquement.",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              title: "Thèmes premium illimités",
              desc: "Choisissez parmi des designs époustouflants qui reflètent votre marque.",
              gradient: "from-orange-500 to-red-500",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all hover:shadow-2xl hover:shadow-rose-500/20 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`} />
              <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-rose-200/70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 mb-20">
        <div className="rounded-3xl bg-gradient-to-r from-rose-600 to-pink-600 p-12 text-center shadow-2xl shadow-rose-500/50 border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prêt à impressionner vos voyageurs ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'hôtes qui ont transformé leur expérience voyageur avec Maplyo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/signup">
              <Button className="h-14 px-10 text-lg bg-white text-rose-600 hover:bg-rose-50 border-0 shadow-xl transform hover:scale-105 transition-all">
                Commencer maintenant →
              </Button>
            </Link>
            <Link href="/app/guides/demo/builder">
              <Button className="h-14 px-10 text-lg bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md">
                Tester le builder
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-white/70 text-sm">
            ✨ Gratuit pour commencer • Aucune carte de crédit requise • Configuration en 10 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
              Maplyo
            </span>
          </div>
          <p className="text-rose-200/60 text-sm">
            La plateforme nouvelle génération pour créer des guides voyageurs premium.
          </p>
          <p className="text-rose-200/40 text-xs mt-4">
            © 2024 Maplyo. Tous droits réservés.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
