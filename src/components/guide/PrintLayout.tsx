import { Guide } from "@/types/blocks";
import { guideThemes } from "@/types/themes";
import { QRCodeSVG } from "qrcode.react";
import { MinimalIcons } from "@/components/icons/MinimalIcons";

interface PrintLayoutProps {
    guide: Guide;
}

export function PrintLayout({ guide }: PrintLayoutProps) {
    // Try to find a WiFi block
    const wifiBlock = guide.blocks.find(b => b.type === "wifi");
    const wifiData = wifiBlock?.data as any; // { ssid, password, security }

    // Format WiFi QR string: WIFI:S:MyNetwork;T:WPA;P:MyPassword;;
    const wifiQrData = wifiData
        ? `WIFI:S:${wifiData.networkName || wifiData.ssid};T:${wifiData.security || 'WPA'};P:${wifiData.password};;`
        : null;

    // TODO: Use real domain from env or window location
    const guideUrl = `https://maplyo.com/g/${guide.slug}`;

    // Theme styling
    // @ts-ignore
    const themeId = guide.themeId || guide.theme?.themeId || "minimal-white";
    const theme = guideThemes.find(t => t.id === themeId) || guideThemes[0];

    return (
        <div
            className="w-[210mm] min-h-[297mm] mx-auto relative overflow-hidden flex flex-col print:w-full print:h-full print:m-0 break-inside-avoid shadow-2xl print:shadow-none text-gray-900"
            style={{
                backgroundColor: theme.background,
                backgroundImage: theme.bgType === "image" ? `url(${theme.bgImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                printColorAdjust: 'exact',
                WebkitPrintColorAdjust: 'exact'
            }}
        >
            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

            {/* Header Content */}
            <div className="relative pt-12 px-12 text-center z-10">
                <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm text-white">
                    Bienvenue
                </div>
                <h1 className="text-5xl font-black mb-2 break-words text-shadow-xl leading-tight tracking-tight drop-shadow-md text-white">
                    {guide.title}
                </h1>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-12 gap-12">

                {/* WIFI QR (Minimalist Top) */}
                {wifiQrData && (
                    <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="p-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 relative group">
                            <QRCodeSVG
                                value={wifiQrData}
                                size={120} // Smaller, icon-like
                                level={"M"}
                                fgColor="black"
                                bgColor="transparent"
                            />
                            <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                                <MinimalIcons.wifi className="w-4 h-4" />
                            </div>
                        </div>
                        <span className="text-white/80 text-sm font-medium tracking-wide uppercase">Scan Wi-Fi</span>
                    </div>
                )}

                {/* GUIDE QR (Center Hero) */}
                <div className="relative group transform hover:scale-105 transition-transform duration-500">
                    <div className="absolute -inset-4 bg-white/20 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50">
                        <QRCodeSVG
                            value={guideUrl}
                            size={300}
                            level={"Q"}
                            fgColor={theme.primary}
                            bgColor="#ffffff"
                        />
                        {/* Corner Accents */}
                        <div className="absolute -top-3 -left-3 w-12 h-12 border-t-[6px] border-l-[6px] rounded-tl-2xl" style={{ borderColor: theme.primary }} />
                        <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-[6px] border-r-[6px] rounded-br-2xl" style={{ borderColor: theme.primary }} />
                    </div>
                </div>

                <div className="text-center max-w-md space-y-2">
                    <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-lg">
                        Guide du Voyageur
                    </h2>
                    <p className="text-lg text-white/80 font-medium leading-relaxed drop-shadow-md">
                        Scannez pour accéder à toutes les informations du logement et nos recommandations.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 pb-8 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <span>Maplyo</span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span>Premium Experience</span>
                </div>
            </div>
        </div>
    );
}
