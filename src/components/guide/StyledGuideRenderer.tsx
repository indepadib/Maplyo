"use client";

import Image from "next/image";

import { useState, useRef, useMemo, useEffect } from "react";
import { blockRegistry } from "@/components/blocks/registry";
import type { Guide, BlockType } from "@/types/blocks";
import { guideThemes } from "@/types/themes";
import { MinimalIcons } from "@/components/icons/MinimalIcons";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Wifi, Key, X, ExternalLink, Search, Globe, ChevronRight, CheckCircle2, MapPin, Sun, Moon, Coffee, Utensils, Music, Camera } from "lucide-react";
import { GuideChatbot } from "./GuideChatbot";
import { TipModal } from "./TipModal";

// --- TRANSLATIONS ---
const DICTIONARY = {
    fr: {
        searchPlaceholder: "Rechercher une info, un code...",
        wifi: "Wi-Fi",
        access: "Codes d'accès",
        checkin: "Arrivée",
        checkout: "Départ",
        location: "Localisation",
        rules: "Règles",
        contact: "Contact",
        amenities: "Équipements",
        places: "Lieux",
        events: "Événements",
        documents: "Documents",
        upsells: "Extras",
        viewMap: "Voir la carte",
        empty: "Aucun résultat trouvé",
        secureAccess: "Accès sécurisé",
        network: "Réseau",
        password: "Mot de passe",
        // Days
        sunday: "Dimanche",
        monday: "Lundi",
        tuesday: "Mardi",
        wednesday: "Mercredi",
        thursday: "Jeudi",
        friday: "Vendredi",
        saturday: "Samedi",
        // Daily Tips Defaults
        lazy: "Détente",
        mood: "Motivé",
        discovery: "Découverte",
        tasty: "Gourmand",
        adventure: "Aventure",
        festive: "Festif",
        outing: "Sortie",
        brunch: "Un brunch à",
        explore: "Explorez le centre de",
        museums: "Visitez les musées de",
        taste: "Goutez aux spécialités de",
        excursion: "Partez en excursion à",
        nightlife: "Sortez le soir à",
        walk: "Baladez-vous à",
        items: "éléments",
        tipOfTheDay: "Conseil du Jour",
    },
    en: {
        searchPlaceholder: "Search info, codes...",
        wifi: "Wi-Fi",
        access: "Access Codes",
        checkin: "Check-in",
        checkout: "Check-out",
        location: "Location",
        rules: "Rules",
        contact: "Contact",
        amenities: "Amenities",
        places: "Places",
        events: "Events",
        documents: "Documents",
        upsells: "Extras",
        viewMap: "View Map",
        empty: "No results found",
        secureAccess: "Secure Access",
        network: "Network",
        password: "Password",
        tipOfTheDay: "Daily Tip",
        // Days
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        // Daily Tips Defaults
        lazy: "Lazy",
        mood: "Mood",
        discovery: "Discovery",
        tasty: "Tasty",
        adventure: "Adventure",
        festive: "Festive",
        outing: "Outing",
        brunch: "Brunch in",
        explore: "Explore center of",
        museums: "Visit museums in",
        taste: "Taste specialties of",
        excursion: "Go on an excursion",
        nightlife: "Nightlife in",
        walk: "Walk around",
        items: "items",
    }
};

// --- SMART SEARCH KEYWORDS ---
const SEARCH_KEYWORDS: Record<string, string[]> = {
    places: ["restaurant", "manger", "eat", "food", "bar", "boire", "drink", "café", "coffee", "visiter", "visit", "musée", "museum", "culture"],
    access_codes: ["code", "clé", "key", "digicode", "box", "entree", "entry", "porte", "gate", "télécommande", "remote"],
    wifi: ["internet", "connection", "réseau", "network", "4g", "5g", "pass"],
    checkin: ["park", "parking", "arriver", "arrive", "heure", "time"],
    checkout: ["partir", "leave", "départ", "heure", "time"],
    rules: ["règlement", "interdit", "fumer", "chiens", "animaux", "bruit", "fête", "party", "smoking", "pets", "noise"],
    contact: ["téléphone", "phone", "email", "urgence", "emergency", "police", "pompier", "hospital", "docteur", "doctor"],
    faq: ["question", "problème", "help", "aide", "comment"],
    transport: ["bus", "train", "taxi", "uber", "métro", "gare", "station", "airport", "aéroport"]
};

// --- ANIMATED PRIMITIVES ---

function BottomSheet({ isOpen, onClose, children, title }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; title: string }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[32px] overflow-hidden max-h-[85vh] flex flex-col shadow-2xl"
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 100) onClose();
                        }}
                    >
                        <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        <div className="px-6 pb-4 flex items-center justify-between border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 md:p-6 pb-10 md:pb-12">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// --- DAILY RECOMMENDATION WIDGET (NOTIFICATION STYLE) ---

// --- DAILY RECOMMENDATION WIDGET (NOTIFICATION STYLE) ---

function DailyRecommendation({ city, lang, onClose }: { city: string; lang: 'fr' | 'en'; onClose: () => void }) {
    const [tip, setTip] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch AI Tip on Mount
    const [mounted, setMounted] = useState(false);

    // Use Effect to fetch tip on mount
    useEffect(() => {
        setMounted(true);
        const fetchTip = async () => {
            try {
                const res = await fetch('/api/ai/tip', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ city, lang })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.title && data.text) setTip(data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchTip();
    }, [city, lang]);

    const t = DICTIONARY[lang];

    // FALLBACK PLANS (If AI fails or loading)
    const day = new Date().getDay();
    const PLANS = [
        { day: 0, icon: Coffee, title: lang === 'fr' ? "Dimanche Détente" : `${t.sunday} ${t.lazy}`, text: lang === 'fr' ? `Un brunch à ${city || "ville"} ?` : `${t.brunch} ${city || "town"}?` },
        { day: 1, icon: Sun, title: lang === 'fr' ? "Lundi Motivé" : `${t.monday} ${t.mood}`, text: lang === 'fr' ? `Explorez le centre de ${city}.` : `${t.explore} ${city}.` },
        { day: 2, icon: Camera, title: lang === 'fr' ? "Mardi Découverte" : `${t.tuesday} ${t.discovery}`, text: lang === 'fr' ? `Visitez les musées de ${city}.` : `${t.museums} ${city}.` },
        { day: 3, icon: Utensils, title: lang === 'fr' ? "Mercredi Gourmand" : `${t.wednesday} ${t.tasty}`, text: lang === 'fr' ? `Goutez aux spécialités de ${city} !` : `${t.taste} ${city}!` },
        { day: 4, icon: MapPin, title: lang === 'fr' ? "Jeudi Aventure" : `${t.thursday} ${t.adventure}`, text: lang === 'fr' ? `Partez en excursion.` : `${t.excursion}.` },
        { day: 5, icon: Music, title: lang === 'fr' ? "Vendredi Festif" : `${t.friday} ${t.festive}`, text: lang === 'fr' ? `La vie nocturne de ${city} !` : `${t.nightlife} ${city}!` },
        { day: 6, icon: Sun, title: lang === 'fr' ? "Samedi Sortie" : `${t.saturday} ${t.outing}`, text: lang === 'fr' ? `Baladez-vous à ${city}.` : `${t.walk} ${city}.` },
    ];

    const fallback = PLANS[day];

    // Resolve Icon
    let Icon = fallback.icon;
    if (tip && tip.icon) {
        if (tip.icon === "Coffee") Icon = Coffee;
        else if (tip.icon === "Sun") Icon = Sun;
        else if (tip.icon === "Umbrella") Icon = Sun; // map to sun/cloud
        else if (tip.icon === "Camera") Icon = Camera;
        else if (tip.icon === "MapPin") Icon = MapPin;
    }

    const title = tip ? tip.title : fallback.title;
    const text = tip ? tip.text : fallback.text;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-auto max-w-md bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl p-3 flex items-center gap-3 shadow-2xl relative overflow-hidden group cursor-pointer hover:bg-white/20 transition-colors z-[100]"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg relative">
                    <Icon className="w-5 h-5 text-white relative z-10" />
                    {loading && <div className="absolute inset-0 bg-white/20 animate-pulse rounded-xl" />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">{t.tipOfTheDay}</span>
                        <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                    </div>
                    <div className="font-bold text-sm line-clamp-2 leading-tight">{title} : <span className="font-normal opacity-90">{text}</span></div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                    <X className="w-4 h-4 opacity-70" />
                </button>
            </motion.div>

            <TipModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tip={tip ? tip : { title: fallback.title, text: fallback.text, location: city }}
            />
        </>
    );
}

// --- SPECIALIZED CARDS ---

function WifiCard({ data, onClick, theme, className, lang }: { data: any; onClick: () => void; theme: any; className?: string; lang: 'fr' | 'en' }) {
    const t = DICTIONARY[lang];

    // Safety check
    if (!data || !data.networkName) return null;

    // Ensure data values are strings for QRCode
    // Format: WIFI:S:<SSID>;T:<WPA|WEP>;P:<PASSWORD>;;
    const qrValue = `WIFI:S:${data.networkName};T:WPA;P:${data.password};;`;

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] p-5 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity -rotate-12">
                <Wifi className="w-32 h-32" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-sm">
                    <QRCodeSVG
                        value={qrValue}
                        size={80}
                        level="M"
                        bgColor="#ffffff"
                        fgColor="#000000"
                        className="rounded-lg"
                    />
                </div>
                <div>
                    <div className="font-bold text-lg">{data.networkName}</div>
                    <div className="text-xs opacity-60 font-mono mt-1 select-all">{data.password || "••••••••"}</div>
                </div>
            </div>
        </motion.button>
    );
}

function AccessCard({ data, onClick, theme, className, lang }: { data: any; onClick: () => void; theme: any; className?: string; lang: 'fr' | 'en' }) {
    const t = DICTIONARY[lang];
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] p-5 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-[-15deg]">
                <Key className="w-32 h-32" />
            </div>

            <div className="p-2.5 w-fit rounded-2xl bg-amber-500/10 text-amber-600 mb-2">
                <Key className="w-6 h-6" />
            </div>

            <div>
                <div className="font-bold text-lg leading-none mb-1">{t.access}</div>
                <div className="text-xs opacity-60 font-medium">{t.secureAccess}</div>
            </div>
        </motion.button>
    );
}

function StandardCard({ icon: Icon, title, onClick, theme, className }: { icon: any; title: string; onClick: () => void; theme: any; className?: string }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[28px] flex flex-col items-center justify-center p-4 gap-3 text-center shadow-sm transition-all w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors"
                style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
            >
                <Icon className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm leading-tight line-clamp-2 px-1">{title}</span>
        </motion.button>
    );
}


function TimeCard({ type, data, onClick, theme, className, lang }: { type: string; data: any; onClick: () => void; theme: any; className?: string; lang: 'fr' | 'en' }) {
    const t = DICTIONARY[lang];
    const isCheckIn = type === "checkin";
    const label = isCheckIn ? t.checkin : t.checkout;
    const time = data.time || (isCheckIn ? "15:00" : "11:00");
    const Icon = MinimalIcons[type as BlockType] || MinimalIcons.hero;

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] p-4 md:p-5 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="flex justify-between items-start w-full">
                <div className="p-2.5 rounded-2xl bg-gray-100 text-gray-600">
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            <div>
                <div className="text-2xl md:text-3xl font-black tracking-tighter mb-1 relative z-10">
                    {time}
                </div>
                <div className="text-[10px] md:text-xs font-bold opacity-60 uppercase tracking-wider">{label}</div>
            </div>
        </motion.button>
    );
}

function LocationCard({ data, onClick, theme, className, lang }: { data: any; onClick: () => void; theme: any; className?: string; lang: 'fr' | 'en' }) {
    const t = DICTIONARY[lang];
    const mapLink = data.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address || "")}`;

    return (
        <motion.a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className={`block rounded-[24px] md:rounded-[32px] relative overflow-hidden shadow-sm group text-left w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            {/* Pseudo-Map Background */}
            <div className="absolute inset-0 opacity-40 hover:opacity-100 transition-opacity duration-500 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')" // Placeholder
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 p-2 rounded-2xl bg-white text-rose-500 shadow-md z-10">
                <MinimalIcons.location className="w-6 h-6" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <div className="text-lg font-bold leading-tight mb-1 line-clamp-2">
                    {data.address ? data.address.split(',')[0] : t.location}
                </div>
                <div className="text-xs font-medium opacity-80 uppercase tracking-wider flex items-center gap-1">
                    {t.viewMap} <ExternalLink className="w-3 h-3" />
                </div>
            </div>
        </motion.a>
    )
}

function ListCard({ title, icon: Icon, items, theme, className }: { title: string; icon: any; items: any[]; theme: any; className?: string }) {
    const count = items.length;

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`rounded-[24px] md:rounded-[32px] p-5 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="flex justify-between items-start w-full relative z-10">
                <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-600">
                    <Icon className="w-6 h-6" />
                </div>
                <div className="font-bold text-[10px] opacity-60 uppercase tracking-wider bg-black/5 px-2 py-1 rounded-lg">
                    {count}
                </div>
            </div>

            <div className="relative z-10 mt-4">
                <div className="font-bold text-lg mb-2">{title}</div>
                <div className="space-y-1">
                    {items.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm opacity-70">
                            <span className="w-1 h-1 rounded-full bg-current" />
                            <span className="truncate">{item.name || item.title || "Item"}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.button>
    )
}

function UpsellsCard({ data, onClick, theme, className }: { data: any; onClick: () => void; theme: any; className?: string }) {
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] p-5 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <MinimalIcons.upsells className="w-24 h-24" />
            </div>

            <div className="flex justify-between items-start w-full relative z-10">
                <div className="p-2.5 rounded-2xl bg-green-500/10 text-green-600">
                    <MinimalIcons.upsells className="w-6 h-6" />
                </div>
                <div className="font-bold text-[10px] text-white bg-green-500 px-2 py-1 rounded-lg shadow-sm">
                    Shop
                </div>
            </div>

            <div className="relative z-10">
                <div className="font-bold text-lg mb-1">Extras</div>
                <div className="font-medium text-sm opacity-70">
                    Découvrez nos services exclusifs
                </div>
            </div>
        </motion.button>
    )
}

// --- SUB-CARDS (Rules, FAQ, Amenities, Contact) ---
// Simplified square versions to match "Apple" grid
function MiniInfoCard({ icon: Icon, title, count, subtitle, colorClass, theme, onClick, className }: any) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[28px] p-4 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="flex justify-between items-start w-full relative z-10">
                <div className={`p-2.5 rounded-2xl ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            <div className="relative z-10 mt-2">
                {count !== undefined && (
                    <div className="text-[10px] font-bold opacity-50 uppercase tracking-wider mb-0.5">{count} items</div>
                )}
                <div className="font-bold text-base leading-tight">{title}</div>
            </div>
        </motion.button>
    )
}

// --- MAIN RENDERER ---

export function StyledGuideRenderer({ guide, unlocked, forceMobile = false, forceDesktop = false }: { guide: Guide; unlocked: boolean; forceMobile?: boolean; forceDesktop?: boolean }) {
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [lang, setLang] = useState<'fr' | 'en'>('fr');
    // Notification state
    const [showTip, setShowTip] = useState(true);

    // LAYOUT LOGIC
    // responsive: use md: prefixes
    // forceDesktop: use direct classes (simulate desktop on any screen)
    // forceMobile: use direct mobile classes (simulate mobile on any screen)
    const isResponsive = !forceMobile && !forceDesktop;

    // Helper to conditionally apply classes
    // If Responsive: val="h-[50vh] md:h-[85vh]"
    // If Desktop: val="h-[85vh]"
    // If Mobile: val="h-[50vh]"

    const heroHeightBase = "h-[50vh]";
    const heroHeightDesktop = "h-[85vh] -mb-32";
    const heroHeightClass = isResponsive
        ? `${heroHeightBase} md:h-[85vh] md:-mb-32`
        : (forceDesktop ? heroHeightDesktop : heroHeightBase);

    const gridColsBase = "grid-cols-2";
    const gridColsDesktop = "grid-cols-4";
    const gridColsClass = isResponsive
        ? `${gridColsBase} md:grid-cols-4`
        : (forceDesktop ? gridColsDesktop : gridColsBase);

    const paddingBase = "p-4";
    const paddingDesktop = "p-10";
    const paddingClass = isResponsive
        ? `${paddingBase} md:p-10`
        : (forceDesktop ? paddingDesktop : paddingBase);

    const t = DICTIONARY[lang];

    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 200]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const gridY = useTransform(scrollY, [0, 400], [0, -40]);

    // Theme resolution
    // @ts-ignore
    const themeId = guide.theme?.themeId;
    const currentTheme = guideThemes.find(t => t.id === themeId) || guideThemes[0];

    const heroBlock = guide.blocks.find(b => b.type === "hero");
    const wifiBlock = guide.blocks.find(b => b.type === "wifi");
    const accessBlock = guide.blocks.find(b => b.type === "access_codes");
    const locationBlock = guide.blocks.find(b => b.type === "location");

    // Extract city from location for Smart Recommendations
    const city = (locationBlock && (locationBlock.data as any).address
        ? (locationBlock.data as any).address.split(',').slice(-1)[0].trim()
        : "") || "Destination";

    // Intelligent Filter logic
    const gridBlocks = useMemo(() => {
        const all = guide.blocks.filter(b => !["hero", "wifi", "access_codes"].includes(b.type));
        if (!searchQuery) return all;

        const q = searchQuery.toLowerCase();

        return all.filter(b => {
            // 1. Direct Text Match
            if (b.title?.toLowerCase().includes(q)) return true;
            if (JSON.stringify(b.data).toLowerCase().includes(q)) return true;

            // 2. Type Label Match
            if (blockRegistry[b.type]?.label.toLowerCase().includes(q)) return true;

            // 3. Smart Keyword Match
            const keywords = SEARCH_KEYWORDS[b.type] || [];
            if (keywords.some(k => k.includes(q))) return true;

            return false;
        });
    }, [guide.blocks, searchQuery]);


    const selectedBlock = guide.blocks.find(b => b.id === selectedBlockId);
    const SelectedDef = selectedBlock ? blockRegistry[selectedBlock.type] : null;

    return (
        <div
            className="min-h-screen bg-gray-50 pb-20 selection:bg-rose-500/30 font-sans relative"
            style={{
                backgroundColor: currentTheme.background
            }}
        >
            {currentTheme.bgType === "image" && currentTheme.bgImage && (
                <div className="fixed inset-0 z-0">
                    <Image
                        src={currentTheme.bgImage}
                        alt="Background"
                        fill
                        className="object-cover opacity-100"
                        priority
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                </div>
            )}

            <div className={`w-full relative z-10 ${isDesktop ? '' : 'max-w-md mx-auto'}`}>

                {/* CINEMATIC HERO */}
                <div className={`relative overflow-hidden ${heroHeightClass}`}>
                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {heroBlock && (heroBlock.data as any).coverImageUrl ? (
                            <Image
                                src={(heroBlock.data as any).coverImageUrl}
                                alt="Hero Cover"
                                fill
                                className="object-cover"
                                priority
                                sizes="100vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        {/* Top Bar with Search & Lang */}
                        <div className="absolute top-0 left-0 right-0 p-4 z-50 flex flex-col gap-4">
                            <div className="flex justify-between items-start gap-4">
                                <div className="bg-black/30 backdrop-blur-xl rounded-full p-1.5 flex items-center border border-white/20 w-full shadow-lg">
                                    <Search className="w-4 h-4 text-white/70 ml-3" />
                                    <input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t.searchPlaceholder}
                                        className="bg-transparent border-none outline-none text-white text-sm px-2 py-1 w-full placeholder:text-white/50"
                                    />
                                </div>

                                <button
                                    onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                                    className="bg-black/30 backdrop-blur-xl rounded-full px-3 py-2.5 flex items-center gap-2 border border-white/20 text-white text-xs font-bold uppercase hover:bg-black/40 transition-colors shadow-lg"
                                >
                                    <Globe className="w-3.5 h-3.5" />
                                    {lang}
                                </button>
                            </div>

                            {/* TIP ALERT - Floating Notification Style */}
                            <AnimatePresence>
                                {/* Removed city check to fix visibility issue if city is undefined */}
                                {!searchQuery && showTip && (
                                    <DailyRecommendation city={city} lang={lang} onClose={() => setShowTip(false)} />
                                )}
                            </AnimatePresence>
                        </div>

                        <div className={`absolute left-0 right-0 px-6 max-w-7xl mx-auto z-20 ${isResponsive ? 'bottom-40 md:bottom-48 md:px-12 text-center md:text-left' : (forceDesktop ? 'bottom-48 px-12 text-left' : 'bottom-32 text-center')}`}>
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className={`font-black mb-3 text-white tracking-tight leading-[1.1] drop-shadow-2xl text-3xl ${isResponsive ? 'md:text-8xl md:mb-4' : (forceDesktop ? 'text-8xl mb-4' : '')}`}>
                                    {(heroBlock?.data as any)?.title || guide.title}
                                </h1>
                            </motion.div>

                            {heroBlock && (
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className={`flex flex-col gap-4 items-center ${isResponsive ? 'md:items-start' : (forceDesktop ? 'items-start' : '')}`}
                                >
                                    <p className={`text-white/90 max-w-xl font-medium leading-relaxed drop-shadow-md text-base md:text-xl`}>
                                        {(heroBlock.data as any).subtitle}
                                    </p>

                                    {/* City & Badges */}
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                                        <div className="flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-transform">
                                            <MapPin className="w-4 h-4 text-rose-500 fill-rose-500" />
                                            {city}
                                        </div>
                                        {/* Display Badges from Hero Data if available */}
                                        {(heroBlock.data as any).badges?.map((badge: string, i: number) => (
                                            <span key={i} className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* BENTO GRID */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{ y: gridY }}
                    className={`relative max-w-5xl mx-auto px-4 ${isResponsive ? 'md:px-12' : (forceDesktop ? 'px-12' : '')}`}
                >
                    <div className={`bg-white/5 backdrop-blur-2xl border border-white/10 rounded-t-[32px] md:rounded-[48px] shadow-2xl min-h-[50vh] ${paddingClass}`}>

                        {/* 
                            GRID REFINEMENT: 
                            Mobile: 2 Cols
                            Desktop: 4 Cols but contained in max-w-5xl (Compact)
                        */}
                        <div className={`grid gap-3 md:gap-4 ${gridColsClass}`}>

                            {/* 1. WIFI (Rectangle 2x1) */}
                            {wifiBlock && !searchQuery && (
                                <div className="col-span-2 md:col-span-2 aspect-[2/1] md:aspect-auto md:h-52">
                                    <WifiCard
                                        data={wifiBlock.data}
                                        onClick={() => setSelectedBlockId(wifiBlock.id)}
                                        theme={currentTheme}
                                        lang={lang}
                                    />
                                </div>
                            )}

                            {/* 2. ACCESS CODES */}
                            {accessBlock && !searchQuery && (
                                <div className="col-span-2 md:col-span-2 aspect-[2/1] md:aspect-auto md:h-52">
                                    <AccessCard
                                        data={accessBlock.data}
                                        onClick={() => setSelectedBlockId(accessBlock.id)}
                                        theme={currentTheme}
                                        lang={lang}
                                    />
                                </div>
                            )}

                            {/* 3. DYNAMIC BLOCKS */}
                            {gridBlocks.map((b, i) => {
                                const def = blockRegistry[b.type];
                                const Icon = MinimalIcons[b.type] || MinimalIcons.hero;

                                // APPLE STYLE SIZING LOGIC
                                // ------------------------

                                // Default: Square (1x1)
                                let colSpan = "col-span-1";
                                let aspect = "aspect-square"; // Enforce Square

                                // "Rich" Blocks: Rectangle (2x1)
                                const isRichBlock = ["location", "places", "events", "upsells", "marketing_hero", "documents"].includes(b.type);

                                if (isRichBlock) {
                                    colSpan = "col-span-2"; // Full width on mobile (2 cols), Half width on Desktop (2 of 4)
                                    aspect = "aspect-[2/1]"; // Enforce Rect
                                }

                                // Special Case: Location on Desktop can be huge
                                const allowDesktopLayout = isResponsive || forceDesktop;
                                if (b.type === "location" && allowDesktopLayout) {
                                    colSpan = isResponsive ? "md:col-span-2 md:row-span-2" : "col-span-2 row-span-2";
                                    aspect = "aspect-square";
                                } else if (isRichBlock) {
                                    colSpan = "col-span-2";
                                    aspect = "aspect-[2/1]";
                                }

                                const cardProps = {
                                    data: b.data,
                                    onClick: () => setSelectedBlockId(b.id),
                                    theme: currentTheme,
                                    lang: lang
                                };

                                const wrapperClass = `${colSpan} ${aspect} relative group`;


                                // COMPONENT SELECTION

                                if (isRichBlock) {
                                    if (b.type === "location") return <div key={b.id} className={wrapperClass}><LocationCard {...cardProps} /></div>;
                                    if (b.type === "upsells") return <div key={b.id} className={wrapperClass}><UpsellsCard {...cardProps} /></div>;

                                    // Translate default title if needed
                                    const displayTitle = b.title || (t[b.type as keyof typeof t] || def.label);

                                    return <div key={b.id} className={wrapperClass}><ListCard title={displayTitle} icon={Icon} items={(b.data as any).items || []} theme={currentTheme} /></div>;
                                }

                                if (b.type === "checkin" || b.type === "checkout") {
                                    return <div key={b.id} className={wrapperClass}><TimeCard type={b.type} {...cardProps} /></div>;
                                }

                                // Mini Cards (Square)
                                if (["contact", "rules", "amenities", "faq"].includes(b.type)) {
                                    let colorClass = "bg-gray-100 text-gray-600";
                                    let startTitle = b.title || (t[b.type as keyof typeof t] || def.label);
                                    let count = undefined;

                                    if (b.type === "contact") { colorClass = "bg-green-100 text-green-600"; }
                                    if (b.type === "rules") { colorClass = "bg-rose-100 text-rose-600"; count = (b.data as any).items?.length; }
                                    if (b.type === "amenities") { colorClass = "bg-blue-100 text-blue-600"; count = (b.data as any).items?.length; }
                                    if (b.type === "faq") { colorClass = "bg-purple-100 text-purple-600"; count = (b.data as any).items?.length; }

                                    return (
                                        <div key={b.id} className={wrapperClass}>
                                            <MiniInfoCard
                                                icon={Icon}
                                                title={startTitle}
                                                count={count}
                                                colorClass={colorClass}
                                                theme={currentTheme}
                                                onClick={() => setSelectedBlockId(b.id)}
                                            />
                                        </div>
                                    )
                                }

                                // Fallback
                                return (
                                    <div key={b.id} className={wrapperClass}>
                                        <StandardCard icon={Icon} title={b.title || def.label} {...cardProps} />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Empty State */}
                        {gridBlocks.length === 0 && !wifiBlock && !accessBlock && (
                            <div className="py-20 text-center text-white/50">
                                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium">{t.empty}</p>
                            </div>
                        )}

                        <div className="text-center mt-12 mb-4 flex items-center justify-center gap-2 opacity-50">
                            <span className="w-1 h-1 rounded-full bg-current"></span>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Maplyo</p>
                            <span className="w-1 h-1 rounded-full bg-current"></span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* DRAWER FOR DETAILS */}
            <BottomSheet
                isOpen={!!selectedBlockId}
                onClose={() => setSelectedBlockId(null)}
                title={selectedBlock?.title || SelectedDef?.label || "Détail"}
            >
                {selectedBlock && SelectedDef && (
                    <SelectedDef.Traveler
                        title={selectedBlock.title}
                        data={selectedBlock.data}
                        ctx={{ mode: "traveler", unlocked, lang }}
                        visibility={selectedBlock.visibility}
                    />
                )}
            </BottomSheet>

            {/* AI CHATBOT INTEGRATION */}
            <GuideChatbot guide={guide} primaryColor={currentTheme.primary} forceMobile={forceMobile} />
        </div>
    );
}
