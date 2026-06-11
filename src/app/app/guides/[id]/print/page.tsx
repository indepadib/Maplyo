"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { PrintLayout } from "@/components/guide/PrintLayout";
import { Printer, ArrowLeft, Download, ShoppingBag, Check, Image as ImageIcon, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";
import Link from "next/link";
import { Guide } from "@/types/blocks";
import { motion, AnimatePresence } from "framer-motion";

const FORMATS = [
    { id: "a6", name: "Format A6", desc: "Chevet (10x15)", price: 15 },
    { id: "a5", name: "Format A5", desc: "Porte (15x21)", price: 25 },
    { id: "a4", name: "Format A4", desc: "Mural (21x29.7)", price: 35 }
];

const MATERIALS = [
    { id: "sticker", name: "Sticker Premium", desc: "Mat, waterproof", extra: 0 },
    { id: "plexi", name: "Plexiglas 3D", desc: "Reflet verre", extra: 15 },
    { id: "canvas", name: "Toile d'Art", desc: "Texture tableau", extra: 20 }
];

export default function PrintPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [guide, setGuide] = useState<Guide | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"digital" | "physical">("digital");
    
    // Physical order states
    const [selectedFormat, setSelectedFormat] = useState(FORMATS[1]);
    const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[1]);
    const [isOrdering, setIsOrdering] = useState(false);

    useEffect(() => {
        const loadGuide = async () => {
            if (!id) return;
            const { data, error } = await supabase.from("guides").select("*").eq("id", id).single();
            if (data && data.content) {
                setGuide({
                    ...data.content,
                    id: data.id,
                    title: data.title,
                    slug: data.slug,
                    themeId: data.theme_id,
                    lastUpdated: data.updated_at
                });
            }
            setLoading(false);
        };
        loadGuide();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" />
            </div>
        );
    }

    if (!guide) return <div className="min-h-screen flex items-center justify-center">Guide introuvable</div>;

    const handlePrint = () => window.print();

    const handleDownloadPng = async () => {
        const element = document.getElementById('print-container');
        if (!element) return;
        try {
            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff",
                logging: false,
            });
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `maplyo-qr-${guide.slug || 'guide'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Failed to generate PNG", error);
            alert("Erreur lors de la génération de l'image.");
        }
    };

    const handleOrder = () => {
        setIsOrdering(true);
        setTimeout(() => {
            alert("Votre demande de pré-commande a été envoyée ! Notre équipe vous contactera pour valider l'aperçu.");
            setIsOrdering(false);
        }, 1500);
    };

    const isLocked = guide.id === 'demo';
    const totalPrice = selectedFormat.price + selectedMaterial.extra;

    return (
        <div className="min-h-screen bg-[#F5F5F7] print:bg-white flex flex-col font-sans selection:bg-blue-500/30">
            {/* Top Navigation Bar */}
            <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-6 sticky top-0 z-50 print:hidden">
                <Link href={`/app/guides/${id}/builder`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors text-sm">
                    <ArrowLeft size={16} />
                    Retour à l'éditeur
                </Link>
                <div className="flex items-center gap-2 bg-gray-100/50 p-1 rounded-xl border border-gray-200/50">
                    <button
                        onClick={() => setActiveTab("digital")}
                        className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all duration-300 ${activeTab === "digital" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        Export Digital
                    </button>
                    <button
                        onClick={() => setActiveTab("physical")}
                        className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all duration-300 flex items-center gap-2 ${activeTab === "physical" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        <Sparkles size={14} className={activeTab === "physical" ? "text-amber-500" : ""} />
                        Achat Plaque
                    </button>
                </div>
                <div className="w-24" /> {/* Spacer for centering tabs */}
            </header>

            <main className="flex-1 flex flex-col lg:flex-row print:block">
                {/* Left Sidebar (Configuration) */}
                <div className="w-full lg:w-[400px] bg-white border-r border-gray-200/50 p-8 flex flex-col justify-between print:hidden overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {activeTab === "digital" ? (
                            <motion.div key="digital" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Export Digital</h2>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Générez le visuel PDF ou PNG de votre guide. Imprimez-le vous-même ou envoyez-le par email à vos voyageurs.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <button onClick={handleDownloadPng} className="w-full group flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                                <ImageIcon size={18} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">Image HD (PNG)</div>
                                                <div className="text-xs text-gray-500">Idéal pour les réseaux ou emails</div>
                                            </div>
                                        </div>
                                    </button>

                                    <button onClick={handlePrint} className="w-full group flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-900 hover:bg-gray-50 transition-all text-left">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform">
                                                <Printer size={18} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">Document (PDF)</div>
                                                <div className="text-xs text-gray-500">Pour une impression maison</div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="physical" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2 flex items-center gap-2">
                                        Plaque Premium
                                    </h2>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Recevez ce guide imprimé sur un support physique de très haute qualité, reprenant exactement votre design.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {/* Format Selection */}
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">1. Format</div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {FORMATS.map(f => (
                                                <button key={f.id} onClick={() => setSelectedFormat(f)} className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${selectedFormat.id === f.id ? "border-blue-600 bg-blue-50/50" : "border-gray-100 hover:border-gray-200"}`}>
                                                    <div className="text-left">
                                                        <div className={`font-bold text-sm ${selectedFormat.id === f.id ? "text-blue-900" : "text-gray-900"}`}>{f.name}</div>
                                                        <div className="text-xs text-gray-500">{f.desc}</div>
                                                    </div>
                                                    <div className={`text-sm font-bold ${selectedFormat.id === f.id ? "text-blue-600" : "text-gray-400"}`}>
                                                        {f.price}€
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Material Selection */}
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">2. Finition</div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {MATERIALS.map(m => (
                                                <button key={m.id} onClick={() => setSelectedMaterial(m)} className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${selectedMaterial.id === m.id ? "border-blue-600 bg-blue-50/50" : "border-gray-100 hover:border-gray-200"}`}>
                                                    <div className="text-left">
                                                        <div className={`font-bold text-sm ${selectedMaterial.id === m.id ? "text-blue-900" : "text-gray-900"}`}>{m.name}</div>
                                                        <div className="text-xs text-gray-500">{m.desc}</div>
                                                    </div>
                                                    <div className={`text-sm font-bold ${selectedMaterial.id === m.id ? "text-blue-600" : "text-gray-400"}`}>
                                                        {m.extra > 0 ? `+${m.extra}€` : "Inclus"}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <div className="flex justify-between items-end mb-4">
                                        <div className="text-sm font-medium text-gray-500">Total TTC</div>
                                        <div className="text-2xl font-black text-gray-900">{totalPrice}€</div>
                                    </div>
                                    <button 
                                        onClick={handleOrder}
                                        disabled={isOrdering || isLocked}
                                        className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white h-12 rounded-xl font-bold shadow-lg shadow-gray-900/20 hover:bg-black transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                                    >
                                        <ShoppingBag size={18} />
                                        {isOrdering ? "Préparation..." : "Pré-commander"}
                                    </button>
                                    <p className="text-center text-[11px] text-gray-400 mt-3 font-medium">
                                        Livraison offerte • Sans engagement
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Area (Preview) */}
                <div className="flex-1 flex items-center justify-center p-8 lg:p-12 print:p-0 relative overflow-hidden bg-gray-50/50">
                    {/* Apple-style background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-[100px] pointer-events-none print:hidden" />

                    <div className="relative z-10 w-full max-w-[210mm]">
                        
                        {/* The Mockup Container */}
                        <div className={`
                            relative mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                            ${activeTab === "physical" ? "scale-[0.85] lg:scale-90" : "scale-100"}
                        `}>
                            {/* Material Effects applied outside the actual PrintLayout so it feels like a physical object */}
                            {activeTab === "physical" && (
                                <div className={`
                                    absolute inset-0 z-20 pointer-events-none rounded-[1mm] transition-all duration-700
                                    ${selectedMaterial.id === "plexi" ? "shadow-[0_40px_80px_rgba(0,0,0,0.3)] ring-1 ring-white/50" : ""}
                                    ${selectedMaterial.id === "canvas" ? "shadow-[0_20px_50px_rgba(0,0,0,0.2)] mix-blend-multiply opacity-50" : "shadow-[0_10px_30px_rgba(0,0,0,0.1)]"}
                                `}>
                                    {/* Plexiglas Reflection */}
                                    {selectedMaterial.id === "plexi" && (
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transform -rotate-12 translate-x-1/4 scale-150" />
                                    )}
                                    {/* Canvas Texture */}
                                    {selectedMaterial.id === "canvas" && (
                                        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
                                    )}
                                </div>
                            )}

                            {/* The actual A4 document */}
                            <div id="print-container" className="print:w-full print:h-full relative bg-white">
                                <div className={`transition-all duration-500 ${isLocked ? 'blur-xl select-none pointer-events-none opacity-50' : ''}`}>
                                    <PrintLayout guide={guide} />
                                </div>

                                {/* Premium Lock Overlay */}
                                {isLocked && (
                                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 text-center bg-white/20 backdrop-blur-sm print:hidden">
                                        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50 max-w-sm mx-auto transform transition-transform hover:scale-105">
                                            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                                <Sparkles className="w-8 h-8 text-white" />
                                            </div>
                                            <h2 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Fonctionnalité Pro</h2>
                                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                                L'exportation PDF, PNG et la commande de plaque physique sont réservées aux membres premium.
                                            </p>
                                            <Link href="/pricing" className="inline-flex w-full justify-center px-6 py-3.5 bg-gray-900 text-white text-sm font-bold rounded-xl shadow-lg hover:bg-black transition-all">
                                                Débloquer Premium
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Physical Mockup Helper Text */}
                        <AnimatePresence>
                            {activeTab === "physical" && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute -bottom-16 left-0 right-0 text-center print:hidden"
                                >
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full text-xs font-bold text-gray-500 shadow-sm border border-gray-200/50">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Aperçu dynamique : Vos vraies couleurs, votre vrai QR Code.
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                @media print {
                    @page { size: A4; margin: 0; }
                    body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            `}</style>
        </div>
    );
}
