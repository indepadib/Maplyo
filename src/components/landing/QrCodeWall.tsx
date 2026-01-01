"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { QrCode, Smartphone, Wifi, ArrowRight } from "lucide-react";
import Image from "next/image";

export function QrCodeWall() {
    const { t } = useTranslation();

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left: Text Content */}
                <div className="order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <QrCode className="w-3 h-3" />
                            <span>Phygital Experience</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Du mur à leur mobile<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                                en une seconde.
                            </span>
                        </h2>

                        <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                            Imprimez votre QR Code Maplyo et encadrez-le dans votre logement.
                            Vos invités scannent, et hop : ils ont le <strong>Code Wi-Fi</strong>,
                            les <strong>règles de la maison</strong> et vos <strong>bonnes adresses</strong>.
                        </p>

                        <div className="flex flex-col gap-4">
                            {[
                                { title: "Connexion Wi-Fi Instantanée", desc: "Plus de 'C'est quoi le code ?'" },
                                { title: "Instructions toujours accessibles", desc: "Fini les classeurs papiers écornés." },
                                { title: "Mise à jour à distance", desc: "Changez une info, le QR code reste le même." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 border border-white/10">
                                        <Wifi className="w-5 h-5 text-rose-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                        <p className="text-sm text-zinc-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right: Visual (Wall + Phone Animation) */}
                <div className="order-1 lg:order-2 relative h-[600px] flex items-center justify-center">

                    {/* The Wall Context */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full max-w-md aspect-[3/4] bg-zinc-900 rounded-2xl border-8 border-zinc-800 shadow-2xl overflow-hidden flex flex-col items-center p-8 text-center"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    >
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                        {/* Framed QR Code on Wall */}
                        <div className="relative z-10 mt-12 bg-white p-6 pb-8 shadow-2xl rounded-sm transform rotate-1 max-w-[240px]">
                            <div className="border border-slate-200 p-1">
                                <div className="aspect-square bg-slate-900 w-full mb-4 flex items-center justify-center relative overflow-hidden">
                                    {/* Fake QR Pattern */}
                                    <div className="absolute inset-2 border-[12px] border-black rounded-lg opacity-20"></div>
                                    <div className="absolute top-2 right-2 w-4 h-4 bg-black rounded-sm opacity-20"></div>
                                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-black rounded-sm opacity-20"></div>

                                    {/* Maplyo Logo Center */}
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center relative z-10 shadow-lg">
                                        <QrCode className="w-8 h-8 text-slate-900" />
                                    </div>

                                    {/* Matrix */}
                                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-50 mix-blend-overlay"></div>
                                </div>
                                <h3 className="font-serif text-2xl text-slate-900 font-bold mb-1">Bienvenue</h3>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-sans">Scannez pour le guide</p>
                            </div>
                            {/* Tape Effect */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm rotate-2 shadow-sm"></div>
                        </div>
                    </motion.div>

                    {/* The Phone Scanning Interaction */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, y: 100, rotate: 10 }}
                        whileInView={{ opacity: 1, x: -20, y: 40, rotate: -5 }}
                        transition={{ duration: 1, delay: 0.5, type: "spring" }}
                        className="absolute bottom-10 right-0 w-[240px] h-[480px] bg-black rounded-[2.5rem] border-[6px] border-zinc-800 shadow-2xl z-20 flex items-center justify-center overflow-hidden"
                    >
                        {/* Camera UI Overlay */}
                        <div className="absolute inset-0 bg-black/10 z-10">
                            {/* Focus Corners */}
                            <div className="absolute top-12 left-8 w-8 h-8 border-t-2 border-l-2 border-yellow-400" />
                            <div className="absolute top-12 right-8 w-8 h-8 border-t-2 border-r-2 border-yellow-400" />
                            <div className="absolute bottom-12 left-8 w-8 h-8 border-b-2 border-l-2 border-yellow-400" />
                            <div className="absolute bottom-12 right-8 w-8 h-8 border-b-2 border-r-2 border-yellow-400" />

                            {/* Scan Text */}
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-white text-xs backdrop-blur-md whitespace-nowrap">
                                Maplyo Guide Detected
                            </div>
                        </div>

                        {/* Screen Content (See-through to wall + overlay) */}
                        <div className="w-full h-full bg-transparent relative">
                            {/* Notification Pop-up */}
                            <motion.div
                                initial={{ y: -100 }}
                                whileInView={{ y: 0 }}
                                transition={{ delay: 1.5, type: "spring" }}
                                className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-xl p-3 rounded-2xl shadow-lg z-20 flex items-center gap-3 cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white">
                                    <ArrowRight className="w-5 h-5 -rotate-45" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] text-zinc-500 font-medium uppercase">Safari • Main</p>
                                    <p className="text-sm font-bold text-slate-900">Ouvrir le Guide</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
