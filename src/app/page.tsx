"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Map as MapIcon,
  Lock,
  Smartphone,
  Zap,
  Globe,
  Star,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// --- Components ---

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-slate-900/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <MapIcon className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
            Maplyo
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Fonctionnalités
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Tarifs
          </Link>
          <div className="flex items-center gap-4 ml-4">
            <Link href="/login">
              <Button variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border-white/10">
                Connexion
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white border-0 shadow-lg shadow-rose-600/20">
                Commencer
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            <Link href="#features" className="text-zinc-300 py-2" onClick={() => setMobileMenuOpen(false)}>
              Fonctionnalités
            </Link>
            <Link href="#pricing" className="text-zinc-300 py-2" onClick={() => setMobileMenuOpen(false)}>
              Tarifs
            </Link>
            <div className="h-px bg-white/10 my-2" />
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full justify-center">Connexion</Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center bg-rose-600">Commencer</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-rose-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{desc}</p>
  </motion.div>
);

const PricingCard = ({
  tier,
  price,
  features,
  popular = false,
  delay
}: {
  tier: string,
  price: string,
  features: string[],
  popular?: boolean,
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`relative p-8 rounded-3xl border ${popular
        ? "bg-gradient-to-b from-rose-900/20 to-slate-900/50 border-rose-500/50 shadow-2xl shadow-rose-900/20"
        : "bg-slate-900/50 border-white/10 hover:border-white/20"
      } flex flex-col`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
        Recommandé
      </div>
    )}
    <div className="mb-8">
      <h3 className="text-lg font-medium text-zinc-400 mb-2">{tier}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-sm text-zinc-500">/mois</span>
      </div>
    </div>
    <ul className="flex-1 space-y-4 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
          <Check className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button
      className={`w-full ${popular ? "bg-rose-600 hover:bg-rose-700" : "bg-white/10 hover:bg-white/20"} text-white border-0`}
    >
      Choisir {tier}
    </Button>
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-rose-500/30">
      <Nav />

      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] opacity-50 mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-30 mix-blend-screen" />
      </div>

      <main className="relative z-10">

        {/* --- Hero Section --- */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto text-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-zinc-300 tracking-wide uppercase">Nouvelle Version 2.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8"
            >
              Le guide voyageur <br />
              <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                qui impressionne.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Offrez une expérience 5 étoiles à vos locataires Airbnb.
              Codes WiFi, check-in, recommandations locales — tout en un seul lien élégant.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <Link href="/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 px-8 text-lg bg-rose-600 hover:bg-rose-700 text-white border-0 shadow-xl shadow-rose-600/20 transform hover:scale-105 transition-all">
                  Commencer Gratuitement
                </Button>
              </Link>
              <Link href="/g/demo" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg bg-white/5 hover:bg-white/10 text-white border-white/10 group">
                  Voir une démo <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 border-t border-white/5 pt-12"
            >
              <div className="flex flex-col items-center">
                <div className="flex -space-x-3 mb-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-zinc-800" />
                  ))}
                </div>
                <p className="text-sm text-zinc-500">Rejoint par <span className="text-white font-medium">500+ hôtes</span></p>
              </div>
              <div className="h-10 w-px bg-white/10 hidden md:block" />
              <div className="flex flex-col items-center">
                <div className="flex gap-1 text-yellow-500 mb-2">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-sm text-zinc-500">Noté <span className="text-white font-medium">4.9/5</span> sur Trustpilot</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Visual Demo Section --- */}
        <section className="py-20 px-4 md:px-0 overflow-hidden">
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute inset-0 bg-rose-500/10 blur-[100px] -z-10" />
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring" }}
              className="perspective-1000"
            >
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-xl md:p-4">
                {/* Placeholder for a nice dashboard screenshot or app view */}
                <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <span className="text-zinc-500 text-lg">App Interface Preview</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section id="features" className="py-24 bg-slate-950 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Tout ce dont vous avez besoin</h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Des outils puissants pour automatiser votre accueil et rassurer vos voyageurs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Smartphone,
                  title: "100% Mobile First",
                  desc: "Pas d'application à télécharger. Vos guides s'ouvrent instantanément dans le navigateur."
                },
                {
                  icon: Lock,
                  title: "Codes Sécurisés",
                  desc: "Protégez l'accès au WiFi et aux boîtes à clés derrière une interface sécurisée."
                },
                {
                  icon: MapIcon,
                  title: "Carte Interactive",
                  desc: "Ajoutez vos restaurants, bars et activités préférés directement sur une carte Google Maps."
                },
                {
                  icon: Zap,
                  title: "Mises à jour Instantanées",
                  desc: "Modifiez une info, elle est à jour partout. Fini les livrets papier obsolètes."
                },
                {
                  icon: Globe,
                  title: "Traduction Auto",
                  desc: "Vos guides sont automatiquement accessibles dans la langue de vos voyageurs."
                },
                {
                  icon: Check,
                  title: "Check-lists",
                  desc: "Guides de départ et d'arrivée clairs pour éviter les oublis et les conflits."
                }
              ].map((f, i) => (
                <FeatureCard key={i} {...f} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* --- Pricing Section --- */}
        <section id="pricing" className="py-24 relative overflow-hidden px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-900/10 rounded-full blur-[120px] -z-10" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Tarifs Simples</h2>
              <p className="text-xl text-zinc-400">Choisissez le plan adapté à votre activité.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                tier="Basic"
                price="50 DH"
                features={[
                  "1 Guide Actif",
                  "Design Standard",
                  "Support Email",
                  "Mises à jour illimitées"
                ]}
                delay={0}
              />
              <PricingCard
                tier="Pro"
                price="100 DH"
                popular={true}
                features={[
                  "5 Guides Actifs",
                  "Design Premium",
                  "Support Prioritaire",
                  "Statistiques de vues",
                  "Logo personnalisé"
                ]}
                delay={0.1}
              />
              <PricingCard
                tier="Business"
                price="200 DH"
                features={[
                  "Guides Illimités",
                  "Design 100% Custom",
                  "Support Dédié",
                  "API Access",
                  "Multi-utilisateurs"
                ]}
                delay={0.2}
              />
            </div>

            <div className="mt-16 text-center">
              <p className="text-zinc-500 mb-4">Besoin d'une solution sur mesure pour plus de 50 propriétés ?</p>
              <Link href="mailto:sales@maplyo.com" className="text-rose-400 hover:text-rose-300 font-medium underline underline-offset-4">
                Contactez notre équipe Enterprise
              </Link>
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-rose-600 to-rose-700 rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Prêt à moderniser votre accueil ?
            </h2>
            <p className="text-rose-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
              Rejoignez les hôtes qui gagnent du temps et ravissent leurs voyageurs.
              Essai gratuit, sans engagement.
            </p>
            <div className="relative z-10">
              <Link href="/signup">
                <Button className="h-16 px-10 text-xl bg-white text-rose-600 hover:bg-zinc-100 border-0 shadow-xl transform hover:scale-105 transition-all">
                  Créer mon premier guide
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="border-t border-white/10 bg-slate-950 pt-20 pb-10 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center">
                  <MapIcon className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white">Maplyo</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                La plateforme tout-en-un pour les hôtes Airbnb et les conciergeries modernes.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Produit</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link href="#" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Exemples</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Mises à jour</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Ressources</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Centre d'aide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Communauté</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link href="#" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">CGU</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-sm">
              © {new Date().getFullYear()} Maplyo. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              {/* Social icons could go here */}
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  );
}
