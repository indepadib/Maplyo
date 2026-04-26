"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { PrintLayout } from "@/components/guide/PrintLayout";
import { Printer, ArrowLeft, Download } from "lucide-react";
import html2canvas from "html2canvas";
import Link from "next/link";
import { Guide } from "@/types/blocks";

export default function PrintPage({ params }: { params: Promise<{ id: string }> }) {

    // Unwrap params using React.use()
    const { id } = use(params);

    const [guide, setGuide] = useState<Guide | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGuide = async () => {
            if (!id) return;
            // Fetch guide from Supabase
            const { data, error } = await supabase
                .from("guides")
                .select("*")
                .eq("id", id)
                .single();

            if (data && data.content) {
                // Merge DB content with DB columns
                const fullGuide: Guide = {
                    ...data.content, // Load block structure
                    id: data.id,
                    title: data.title,
                    slug: data.slug,
                    themeId: data.theme_id,
                    lastUpdated: data.updated_at
                };
                setGuide(fullGuide);
            } else if (error) {
                console.error("Error loading guide for print:", error);
            }
            setLoading(false);
        };
        loadGuide();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
    if (!guide) return <div className="min-h-screen flex items-center justify-center">Guide introuvable</div>;

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPng = async () => {
        const element = document.getElementById('print-container');
        if (!element) return;
        
        try {
            // Temporarily hide elements not meant for print (though we are capturing the element itself)
            // The container itself doesn't have 'print:hidden' elements usually, 
            // but we ensure we are capturing it cleanly.
            const canvas = await html2canvas(element, {
                scale: 2, // High resolution
                useCORS: true, // Allow cross-origin images
                backgroundColor: null, // Transparent background
                logging: false,
                // html2canvas doesn't support all CSS properties perfectly, 
                // but Maplyo's PrintLayout uses inline styles specifically for this reason
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

    return (
        <div className="min-h-screen bg-gray-100 print:bg-white text-black p-8 print:p-0 font-sans">
            {/* Toolbar - Hidden when printing */}
            <div className="max-w-[210mm] mx-auto mb-8 flex items-center justify-between print:hidden">
                <Link
                    href={`/app/guides/${id}/builder`}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                    <ArrowLeft size={20} />
                    Retour à l'éditeur
                </Link>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDownloadPng}
                        className="flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg active:scale-95"
                    >
                        <Download size={20} />
                        Télécharger (PNG)
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
                    >
                        <Printer size={20} />
                        Imprimer PDF
                    </button>
                </div>
            </div>

            {/* A4 Preview Container */}
            <div className="print:w-full print:h-full relative" id="print-container">
                <div className={`transition-all duration-500 ${guide?.id === 'demo' ? 'blur-xl select-none pointer-events-none opacity-50' : ''}`}>
                    <PrintLayout guide={guide} />
                </div>

                {/* Lock Overlay for Content Protection */}
                {guide?.id === 'demo' && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 text-center bg-white/30 print:hidden">
                        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 max-w-md mx-auto">
                            <span className="text-4xl mb-4 block">🔒</span>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fonctionnalité Premium</h2>
                            <p className="text-gray-600 mb-6">
                                L'exportation PDF et l'impression QR Code sont réservées aux membres Pro.
                            </p>
                            <Link href="/pricing" className="inline-flex w-full justify-center px-6 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-black transition-all">
                                Passer en Pro
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        background: white;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    /* Hide everything else if necessary, but the component already handles print:w-full */
                }
            `}</style>
        </div>
    );
}
