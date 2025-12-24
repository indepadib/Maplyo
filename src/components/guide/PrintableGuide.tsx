import React from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Guide } from "@/types/blocks";
import { Wifi, Key, MapPin, Phone, Clock } from "lucide-react";

interface PrintableGuideProps {
    guide: Guide;
}

export const PrintableGuide = React.forwardRef<HTMLDivElement, PrintableGuideProps>(({ guide }, ref) => {
    // Extract specific blocks
    const wifiBlock = guide.blocks.find((b) => b.type === "wifi");
    const accessBlock = guide.blocks.find((b) => b.type === "access_codes");

    // In a real app, we'd have specific blocks for these, or extract from a "details" block
    // For now, we'll try to find them or hide them
    const locationBlock = guide.blocks.find((b) => b.type === "location");
    const contactBlock = guide.blocks.find((b) => b.type === "contact");
    const checkinBlock = guide.blocks.find((b) => b.type === "checkin");
    const checkoutBlock = guide.blocks.find((b) => b.type === "checkout");

    const guideUrl = `https://eguidehq.com/g/${guide.slug}`;

    return (
        <div className="hidden print:block">
            <div
                ref={ref}
                className="w-[210mm] h-[297mm] bg-white p-12 relative flex flex-col text-slate-900 mx-auto"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                {/* Header */}
                <div className="border-b-4 border-slate-900 pb-8 mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{guide.title}</h1>
                        <p className="text-xl text-slate-500 font-medium">Guide Voyageur</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-slate-400 font-mono">SCANNER LE CODE</div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-2 gap-12 flex-1 content-start">

                    {/* Left Column: Critical Info */}
                    <div className="space-y-12">

                        {/* WIFI */}
                        {wifiBlock && (
                            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100">
                                <div className="flex items-center gap-3 mb-4 text-emerald-600">
                                    <Wifi className="w-8 h-8" />
                                    <h3 className="text-2xl font-bold">Wi-Fi</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Réseau (SSID)</div>
                                        <div className="text-xl font-mono font-bold">{(wifiBlock.data as any).networkName || "—"}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Mot de passe</div>
                                        <div className="text-xl font-mono font-bold bg-white px-3 py-2 rounded border border-slate-200 inline-block">
                                            {(wifiBlock.data as any).password || "—"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Access Codes */}
                        {accessBlock && (
                            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100">
                                <div className="flex items-center gap-3 mb-4 text-indigo-600">
                                    <Key className="w-8 h-8" />
                                    <h3 className="text-2xl font-bold">Accès</h3>
                                </div>
                                <div className="space-y-4">
                                    {(accessBlock.data as any).buildingDoorCode && (
                                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                            <span className="font-medium">Porte Immeuble</span>
                                            <span className="font-mono font-bold text-lg">{(accessBlock.data as any).buildingDoorCode}</span>
                                        </div>
                                    )}
                                    {(accessBlock.data as any).apartmentDoorCode && (
                                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                            <span className="font-medium">Appartement</span>
                                            <span className="font-mono font-bold text-lg">{(accessBlock.data as any).apartmentDoorCode}</span>
                                        </div>
                                    )}
                                    {(accessBlock.data as any).gateCode && (
                                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                            <span className="font-medium">Portail</span>
                                            <span className="font-mono font-bold text-lg">{(accessBlock.data as any).gateCode}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Timings */}
                        {(checkinBlock || checkoutBlock) && (
                            <div className="flex gap-6">
                                {checkinBlock && (
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 text-slate-400">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase">Arrivée</span>
                                        </div>
                                        <div className="text-xl font-bold">15:00</div>
                                    </div>
                                )}
                                {checkoutBlock && (
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 text-slate-400">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase">Départ</span>
                                        </div>
                                        <div className="text-xl font-bold">11:00</div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    {/* Right Column: QR & Misc */}
                    <div className="flex flex-col items-center justify-center text-center space-y-8 h-full">

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <QRCodeSVG
                                value={guideUrl}
                                size={250}
                                level={"H"}
                                includeMargin
                                imageSettings={{
                                    src: "/icon-192.png", // Fallback or app icon if we had one
                                    x: undefined,
                                    y: undefined,
                                    height: 24,
                                    width: 24,
                                    excavate: true,
                                }}
                            />
                        </div>

                        <div className="max-w-xs">
                            <h3 className="text-2xl font-bold mb-2">Tout votre guide <br />dans votre poche</h3>
                            <p className="text-slate-500">
                                Scannez ce code pour accéder au guide complet: bonnes adresses, vidéos, mode d'emploi et plus.
                            </p>
                        </div>

                        {/* Fake Contact Placeholder if missing */}
                        <div className="w-full mt-auto pt-12 border-t border-slate-100">
                            <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
                                <Phone className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase">Urgence / Contact</span>
                            </div>
                            <div className="text-lg font-bold">+33 6 00 00 00 00</div>
                        </div>

                    </div>

                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-slate-100 text-slate-300 text-sm">
                    Propulsé par eGuideHQ
                </div>

            </div>

            {/* Print Styles Injection */}
            <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          /* Hide everything else */
          body > *:not(.print\\:block) {
            display: none !important;
          }
          /* Ensure our component is visible */
          .print\\:block {
            display: block !important;
            height: 100vh;
            width: 100vw;
          }
        }
      `}</style>
        </div>
    );
});

PrintableGuide.displayName = "PrintableGuide";
