"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring
} from "framer-motion";
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
  X,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import dynamic from 'next/dynamic';
const PhoneMockup3D = dynamic(() => import("@/components/landing/PhoneMockup3D").then(mod => mod.PhoneMockup3D), {
  ssr: false,
  loading: () => <div className="w-[300px] h-[600px] bg-white/5 rounded-[3rem] animate-pulse mx-auto" />
});
import { MaplyoLogo } from "@/components/ui/MaplyoLogo";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:shadow-rose-500/40 transition-shadow">
            <MaplyoLogo className="w-6 h-6" classNamePath="fill-white" showText={false} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Maplyo
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Fonctionnalités
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Tarifs
          </Link>
          <div className="flex items-center gap-4 ml-4">
            <Link href="/login">
              <Button variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border-white/10 backdrop-blur-sm">
                Connexion
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-rose-600/20">
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-slate-950 border-b border-white/10 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              <Link href="#features" className="text-zinc-300 py-3 border-b border-white/5" onClick={() => setMobileMenuOpen(false)}>
                Fonctionnalités
              </Link>
              <Link href="#pricing" className="text-zinc-300 py-3 border-b border-white/5" onClick={() => setMobileMenuOpen(false)}>
                Tarifs
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full justify-center mt-2">Connexion</Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center bg-rose-600">Commencer</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay, index }: { icon: any, title: string, desc: string, delay: number, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className="group relative p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 overflow-hidden"
  >
    {/* Hover Gradient Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-black/50 border border-white/5">
        <Icon className="w-7 h-7 text-rose-400 group-hover:text-rose-300 transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">{title}</h3>
      <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{desc}</p>
    </div>
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
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className={`relative p-8 rounded-[2rem] border transition-transform duration-300 hover:-translate-y-2 ${popular
      ? "bg-gradient-to-b from-rose-950/40 to-slate-950/80 border-rose-500/30 shadow-2xl shadow-rose-900/10"
      : "bg-slate-900/30 border-white/5 hover:border-white/10"
      } flex flex-col h-full`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-purple-500/20">
        Most Popular
      </div>
    )}

    <div className="mb-8">
      <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${popular ? 'text-rose-400' : 'text-zinc-500'}`}>
        {tier}
      </h3>
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-bold text-white tracking-tight">{price}</span>
        {price !== "Sur devis" && <span className="text-zinc-500 font-medium">/mo</span>}
      </div>
      <p className="text-zinc-500 text-sm mt-4">
        {tier === "Basic" && "Pour les hôtes débutants"}
        {tier === "Pro" && "Pour les Superhosts ambitieux"}
        {tier === "Business" && "Pour les conciergeries & agences"}
      </p>
    </div>

    <div className="h-px bg-white/5 mb-8" />

    <ul className="flex-1 space-y-4 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm group">
          <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${popular ? 'bg-rose-500/20' : 'bg-white/5'} group-hover:bg-green-500/20 transition-colors`}>
            <Check className={`w-3 h-3 ${popular ? 'text-rose-400' : 'text-zinc-500'} group-hover:text-green-400`} />
          </div>
          <span className="group-hover:text-white transition-colors">{feature}</span>
        </li>
      ))}
    </ul>

    <Link href="/pricing" className="w-full">
      <Button
        className={`w-full h-12 text-sm font-semibold rounded-xl transition-all duration-300 ${popular
          ? "bg-white text-slate-900 hover:bg-zinc-200 hover:scale-[1.02] shadow-xl"
          : "bg-white/5 hover:bg-white/10 text-white hover:scale-[1.02]"
          } border-0`}
      >
        Choisir {tier}
      </Button>
    </Link>
  </motion.div>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-rose-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-950 font-sans selection:bg-rose-500/30 overflow-x-hidden">
      <ScrollProgress />
      <Nav />

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          style={{ y: yBackground, opacity: 0.5 }}
          className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-rose-600/10 rounded-full blur-3xl mix-blend-screen"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]), opacity: 0.3 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-3xl mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
      </div>

      <main className="relative z-10">

        {/* --- Hero Section (3D & Interactive) --- */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 backdrop-blur-md hover:bg-white/[0.05] transition-colors cursor-default"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">Le Futur De L'Accueil</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
              >
                Sublimez <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-rose-400 animate-gradient bg-[length:200%_auto]">
                  votre accueil.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed font-light"
              >
                Créez des guides voyageurs interactifs, élégants et intelligents.
                Impressionnez vos locataires avant même qu'ils ne posent leurs valises.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-14 px-8 text-lg bg-white text-slate-950 font-bold hover:bg-zinc-200 border-0 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:scale-105 transition-all duration-300">
                    Commencer Gratuitement
                  </Button>
                </Link>
                <Link href="/g/demo" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg bg-transparent hover:bg-white/5 text-white border border-white/20 backdrop-blur-sm group">
                    <Play className="w-4 h-4 mr-2 fill-current" /> Voir la démo
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-12 flex items-center gap-4 text-xs font-medium text-zinc-500"
              >
                <span>TRUSTPILOT</span>
                <div className="flex gap-1 text-green-500">★★★★★</div>
                <span className="text-zinc-400">4.9/5 par 500+ Hôtes</span>
              </motion.div>
            </div>

            {/* Right Content - 3D Phone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
              className="relative h-[600px] hidden lg:flex items-center justify-center z-10"
            >
              {/* Decorative Elements behind phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-rose-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />

              {/* 3D Component */}
              <PhoneMockup3D />

              {/* Floating Badges */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute top-20 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold">✓</div>
                  <span className="text-white text-sm font-bold">Auto-Traduit</span>
                </div>
                <p className="text-xs text-zinc-400">Vos guides parlent la langue de vos invités.</p>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-40 left-0 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">Map</div>
                  <span className="text-white text-sm font-bold">Google Maps Intégré</span>
                </div>
                <p className="text-xs text-zinc-400">Google Maps directement dans le guide.</p>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* --- Social Proof Marquee --- */}
        <section className="py-10 border-y border-white/5 bg-black/20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Utilisé par les meilleures conciergeries</p>
          </div>
          <div className="relative flex overflow-x-hidden group">
            <div className="animate-marquee whitespace-nowrap flex space-x-12 items-center">
              {/* Logos placeholders - duplicated for seamless loop */}
              {[
                "HOSTPILOT",
                "CONCIERGERIE ZENATA",
                "CONCIERGERIE CABO NEGRO",
                "BNB MANAGER",
                "KEY CONCIERGE",
                "HOSTPILOT",
                "CONCIERGERIE ZENATA",
                "CONCIERGERIE CABO NEGRO"
              ].map((name, i) => (
                <div key={i} className="text-xl font-bold text-white/30 flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/10 rounded-full" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section id="features" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Tout ce dont vous avez besoin. <br />
                <span className="text-zinc-600">Rien de superflu.</span>
              </motion.h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Des outils puissants pour automatiser votre accueil et rassurer vos voyageurs, sans la complexité technique.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Smartphone,
                  title: "100% Mobile First",
                  desc: "Pas d'application à télécharger. Vos guides s'ouvrent instantanément dans n'importe quel navigateur mobile."
                },
                {
                  icon: Lock,
                  title: "Codes Sécurisés",
                  desc: "Protégez l'accès au WiFi et aux boîtes à clés. Déverrouillage par email ou code unique."
                },
                {
                  icon: MapIcon,
                  title: "Carte Interactive",
                  desc: "Intégrez vos restaurants, bars et activités préférés avec itinéraires Google Maps en un clic."
                },
                {
                  icon: Zap,
                  title: "Modifications Live",
                  desc: "Changez le code WiFi ou une recommandation, c'est mis à jour instantanément sur tous les téléphones."
                },
                {
                  icon: Globe,
                  title: "Traduction Auto",
                  desc: "Détecte automatiquement la langue du téléphone du visiteur et traduit votre guide."
                },
                {
                  icon: Check,
                  title: "Check-lists",
                  desc: "Instructions claires pour l'arrivée et le départ. Réduisez les questions répétitives de 80%."
                }
              ].map((f, i) => (
                <FeatureCard key={i} {...f} index={i} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* --- Pricing Section --- */}
        <section id="pricing" className="py-32 relative overflow-hidden px-6 bg-slate-900/20">
          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-rose-600/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tarification Transparente</h2>
              <p className="text-xl text-zinc-400">Commencez gratuitement. Évoluez quand vous voulez.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                tier="Basic"
                price="50 DH"
                features={[
                  "1 Guide Actif",
                  "Design Standard",
                  "Support Email",
                  "Hébergement Inclus"
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
                  "Priorité Support",
                  "Marque Blanche (No Logo)",
                  "Statistiques Avancées"
                ]}
                delay={0.1}
              />
              <PricingCard
                tier="Business"
                price="200 DH"
                features={[
                  "Guides Illimités",
                  "Design 100% Custom",
                  "Manager de Conciergerie",
                  "API Access",
                  "Formation Équipe"
                ]}
                delay={0.2}
              />
            </div>

            <div className="mt-20 p-8 rounded-3xl bg-white/[0.03] border border-white/5 text-center max-w-3xl mx-auto">
              <h3 className="text-white font-bold text-lg mb-2">Besoin d'une solution Enterprise ?</h3>
              <p className="text-zinc-500 mb-6">Pour les gestionnaires de plus de 50 propriétés, nous proposons des tarifs dégressifs et une intégration PMS.</p>
              <Button variant="secondary" className="border-white/10 text-white hover:bg-white/10">Contacter l'équipe commerciale</Button>
            </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-900/20 pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Prêt à impressionner ?
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Rejoignez la nouvelle génération d'hôtes qui offrent une expérience exceptionnelle.
            </p>
            <Link href="/signup">
              <Button className="h-16 px-12 text-xl bg-white text-slate-950 font-bold hover:scale-105 transition-transform shadow-2xl shadow-rose-500/20 border-0 rounded-full">
                Créer mon premier guide
              </Button>
            </Link>
            <p className="mt-8 text-zinc-500 text-sm">
              Aucune carte de crédit requise • Annulable à tout moment
            </p>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="border-t border-white/5 bg-black pt-20 pb-10 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center">
                  <MaplyoLogo className="w-5 h-5" classNamePath="fill-white" />
                </div>
                <span className="text-xl font-bold text-white">Maplyo</span>
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                Maplyo aide les hôtes et les conciergeries à offrir une expérience 5 étoiles grâce à des guides digitaux intelligents.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Produit</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Fonctionnalités</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Tarifs</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Témoignages</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Roadmap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Aide</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">API Docs</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Status</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Légal</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Confidentialité</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Conditions</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-sm">
              © {new Date().getFullYear()} Maplyo. Tous droits réservés.
            </p>
            <div className="flex gap-6 items-center">
              <span className="text-xs text-zinc-600 font-semibold uppercase tracking-wider flex items-center gap-2">
                <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Paiement Sécurisé
              </span>
              {/* Payment Icons (Text for now to allow SVG icons later if needed) */}
              <div className="flex gap-2 opacity-40 grayscale">
                <div className="h-5 w-8 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-zinc-500">VISA</div>
                <div className="h-5 w-8 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-zinc-500">MC</div>
              </div>
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
          animation: gradient 8s ease infinite;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
        .animate-pulse-slow {
            animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
