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
import { useTranslation } from "@/components/providers/LanguageProvider";

// --- Components ---

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang, setLang } = useTranslation();

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
            {t.footer.links.features}
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            {t.footer.links.pricing}
          </Link>
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="text-sm font-bold text-zinc-400 hover:text-white border border-white/10 rounded-full px-3 py-1 transition-colors uppercase ml-4"
          >
            {lang}
          </button>
          <div className="flex items-center gap-4 ml-4">
            <Link href="/login">
              <Button variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border-white/10 backdrop-blur-sm">
                {t.common.login}
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-rose-600/20">
                {t.common.getStarted}
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
  const { t } = useTranslation();
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
                <Link href="/demo">
                  <Button variant="secondary" className="h-14 px-8 text-lg bg-white/5 text-white border-white/10 hover:bg-white/10 backdrop-blur-sm rounded-full">
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    {t.hero.demo}
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
                <div key={i} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 px-6">
                  {/* Abstract Geometric Logo for each */}
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/10">
                    <span className="text-xs font-black text-white">{name[0]}</span>
                  </div>
                  <span className="text-lg font-bold tracking-widest text-white/80">{name}</span>
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
                {t.features.title} <br />
                <span className="text-zinc-600">{t.features.subtitle}</span>
              </motion.h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {t.features.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Smartphone,
                  title: t.features.items.mobileFirst.title,
                  desc: t.features.items.mobileFirst.desc
                },
                {
                  icon: Lock,
                  title: t.features.items.secure.title,
                  desc: t.features.items.secure.desc
                },
                {
                  icon: MapIcon,
                  title: t.features.items.map.title,
                  desc: t.features.items.map.desc
                },
                {
                  icon: Zap,
                  title: t.features.items.live.title,
                  desc: t.features.items.live.desc
                },
                {
                  icon: Globe,
                  title: t.features.items.translate.title,
                  desc: t.features.items.translate.desc
                },
                {
                  icon: Check,
                  title: t.features.items.checklist.title,
                  desc: t.features.items.checklist.desc
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.pricing.title}</h2>
              <p className="text-xl text-zinc-400">{t.pricing.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                tier="Basic"
                price={`49 DH`}
                features={t.pricing.plans.basic.features}
                delay={0}
              />
              <PricingCard
                tier="Pro"
                price={`99 DH`}
                popular={true}
                features={t.pricing.plans.pro.features}
                delay={0.1}
              />
              <PricingCard
                tier="Business"
                price="Sur devis"
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
              <h3 className="text-white font-bold text-lg mb-2">{t.pricing.enterprise.title}</h3>
              <p className="text-zinc-500 mb-6">{t.pricing.enterprise.desc}</p>
              <Button variant="secondary" className="border-white/10 text-white hover:bg-white/10">{t.pricing.enterprise.cta}</Button>
            </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-900/20 pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              {t.cta.title}
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <Link href="/signup">
              <Button className="h-16 px-12 text-xl bg-white text-slate-950 font-bold hover:scale-105 transition-transform shadow-2xl shadow-rose-500/20 border-0 rounded-full">
                {t.cta.button}
              </Button>
            </Link>
            <p className="mt-8 text-zinc-500 text-sm">
              {t.cta.subtext}
            </p>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="border-t border-white/5 bg-black pt-20 pb-10 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center">
                  <MaplyoLogo className="w-5 h-5" classNamePath="fill-white" showText={false} />
                </div>
                <span className="text-xl font-bold text-white">Maplyo</span>
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                {t.footer.desc}
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">{t.footer.product}</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><Link href="#" className="hover:text-rose-400 transition-colors">{t.footer.links.features}</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">{t.footer.links.pricing}</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">{t.footer.links.testimonials}</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">{t.footer.links.roadmap}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">{t.footer.support}</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><Link href="#" className="hover:text-rose-400 transition-colors">{t.footer.links.help}</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">{t.footer.links.contact}</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">API Docs</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">Status</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">{t.footer.legal}</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><Link href="/legal/privacy" className="hover:text-rose-400 transition-colors">{t.footer.links.privacy}</Link></li>
                <li><Link href="/legal/terms" className="hover:text-rose-400 transition-colors">{t.footer.links.terms}</Link></li>
                <li><Link href="#" className="hover:text-rose-400 transition-colors">{t.footer.links.legal}</Link></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-sm">
              © {new Date().getFullYear()} Maplyo. {t.footer.rights}
            </p>
            <div className="flex gap-6 items-center">
              <span className="text-xs text-zinc-600 font-semibold uppercase tracking-wider flex items-center gap-2">
                <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {t.footer.securePayment}
              </span>
              {/* Payment Icons (Text for now to allow SVG icons later if needed) */}
              <div className="flex gap-4">
                {/* VISA */}
                <svg className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="fill-white" d="M13.623 0L9.049 23.594H3.012L7.586 0h6.037z" /><path className="fill-white" d="M37.98 0l-3.003 14.739c-.198.857-1.127 1.401-1.896 1.401h-4.664l2.87-16.14h6.693z" /><path className="fill-[#F79E1B]" d="M26.262 18.068C26.96 17.07 27.696 15.65 28.16 13.91l2.05-10.02a18.257 18.257 0 00-6.732-1.076c-3.13 0-5.32 1.636-5.32 3.996 0 2.228 2.016 3.447 3.535 4.192 1.57.771 2.096 1.258 2.096 1.944 0 1.054-1.267 1.536-2.44 1.536-1.63 0-3.32-.821-4.28-1.78l-2.618 3.326c1.64 1.492 4.675 2.14 6.84 2.14 3.73 0 6.07-1.868 6.07-4.57 0-1.874-1.04-3.21-3.664-4.498-1.46-.73-2.396-1.503-2.396-2.636 0-1.18 1.15-1.995 2.502-1.995 1.43 0 2.89.542 3.82 1.156L26.26 18.068z" /><path className="fill-white" d="M9.162 0L6.72 15.66s-.31.877-1.428 1.11C3.33 17.152.013 15.86.013 15.86L.002 16c1.86.417 5.068 2.126 6.574 2.126 3.02 0 4.65-1.528 4.88-3.053L14.735 0H9.162z" /></svg>
                {/* MASTERCARD */}
                <svg className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EB001B" d="M14.2 17.6c-1.6 1-3.6 1.6-5.6 1.6-2 0-3.9-.5-5.6-1.5-1.7-1-2.9-2.5-2.9-4.2 0-3.2 4.1-5.7 8.5-5.7 4.5 0 8.5 2.5 8.5 5.7 0 1.7-1.2 3.2-2.9 4.1z" />
                  <path fill="#F79E1B" d="M9.8 17.6c1.6 1 3.6 1.6 5.6 1.6 2 0 3.9-.5 5.6-1.5 1.7-1 2.9-2.5 2.9-4.2 0-3.2-4.1-5.7-8.5-5.7-4.5 0-8.5 2.5-8.5 5.7 0 1.7 1.2 3.2 2.9 4.1z" />
                  <path fill="#FF5F00" d="M14.2 13.5c0 3.2-2.5 5.7-5.7 5.7-3.2 0-5.7-2.5-5.7-5.7 0-3.2 2.5-5.7 5.7-5.7 3.2 0 5.7 2.5 5.7 5.7z" transform="matrix(0.7 0 0 1 4.3 0)" />
                </svg>
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
