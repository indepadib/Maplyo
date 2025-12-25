"use client";

import Image from "next/image";

import { useState, useRef } from "react";
import { blockRegistry } from "@/components/blocks/registry";
import type { Guide, BlockType } from "@/types/blocks";
import { guideThemes } from "@/types/themes";
import { MinimalIcons } from "@/components/icons/MinimalIcons";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Wifi, Key, X, ExternalLink } from "lucide-react";

// --- ANIMATED PRIMITIVES ---

function BottomSheet({ isOpen, onClose, children, title }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; title: string }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
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
                        {/* Drag Handle */}
                        <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* Header */}
                        <div className="px-6 pb-4 flex items-center justify-between border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-5 md:p-6 pb-10 md:pb-12">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// --- SPECIALIZED CARDS ---

function WifiCard({ data, onClick, theme, className }: { data: any; onClick: () => void; theme: any; className?: string }) {
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative overflow-hidden rounded-[24px] md:rounded-[32px] p-4 md:p-6 text-left shadow-sm group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wifi className="w-16 h-16 md:w-24 md:h-24" />
            </div>

            <div className="flex items-start justify-between relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                            <Wifi className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xs md:text-sm opacity-60 uppercase tracking-wider">Wi-Fi</span>
                    </div>
                    <div className="text-xl md:text-2xl font-bold mb-1">{data.networkName || "Réseau"}</div>
                    <div className="font-mono text-lg opacity-70 bg-black/5 inline-block px-2 py-1 rounded-lg">
                        {data.password || "••••••••"}
                    </div>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm hidden md:block">
                    <QRCodeSVG value={`WIFI:S:${data.networkName};T:WPA;P:${data.password};;`} size={60} />
                </div>
            </div>
        </motion.button>
    );
}

function AccessCard({ data, onClick, theme, className }: { data: any; onClick: () => void; theme: any; className?: string }) {
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-[-15deg]">
                <Key className="w-32 h-32" />
            </div>

            <div className="p-2.5 w-fit rounded-xl bg-amber-100 text-amber-700 mb-2">
                <Key className="w-6 h-6" />
            </div>

            <div>
                <div className="font-bold text-base md:text-lg leading-none mb-1">Codes</div>
                <div className="text-xs opacity-60">Accès sécurisé</div>
            </div>
        </motion.button>
    );
}

function StandardCard({ icon: Icon, title, onClick, theme, className }: { icon: any; title: string; onClick: () => void; theme: any; className?: string }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)" }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] flex flex-col items-center justify-center p-3 md:p-4 gap-2 md:gap-3 text-center shadow-sm transition-all w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
                style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
            >
                <Icon className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <span className="font-bold text-xs md:text-sm leading-tight">{title}</span>
        </motion.button>
    );
}


// --- TIME CARD (Check-in / Check-out) ---

function TimeCard({ type, data, onClick, theme, className }: { type: string; data: any; onClick: () => void; theme: any; className?: string }) {
    const isCheckIn = type === "checkin";
    const label = isCheckIn ? "Arrivée" : "Départ";
    const time = data.time || (isCheckIn ? "15:00" : "11:00");
    const Icon = MinimalIcons[type as BlockType] || MinimalIcons.hero;

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="flex justify-between items-start w-full">
                <div className="p-2 md:p-2.5 rounded-xl bg-gray-100 text-gray-600">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
            </div>

            <div>
                <div className="text-2xl md:text-4xl font-black tracking-tighter mb-1 relative z-10">
                    {time}
                </div>
                <div className="text-sm font-bold opacity-60 uppercase tracking-wider">{label}</div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-current opacity-5 pointer-events-none" />
        </motion.button>
    );
}

// --- LOCATION CARD ---

function LocationCard({ data, onClick, theme, className }: { data: any; onClick: () => void; theme: any; className?: string }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] relative overflow-hidden shadow-sm group text-left w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            {/* Pseudo-Map Background */}
            <div className="absolute inset-0 opacity-20 grayscale saturate-0 group-hover:scale-110 transition-transform duration-700 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=14&size=400x400&key=YOUR_API_KEY_HERE_PLACEHOLDER')]"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute top-4 left-4 md:top-6 md:left-6 p-2 md:p-2.5 rounded-xl bg-white text-rose-500 shadow-md">
                <MinimalIcons.location className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-white">
                <div className="text-sm md:text-lg font-bold leading-tight mb-1 line-clamp-2">
                    {data.address || "Localisation"}
                </div>
                <div className="text-[10px] md:text-xs font-medium opacity-80 uppercase tracking-wider flex items-center gap-1">
                    Voir la carte <ExternalLink className="w-3 h-3" />
                </div>
            </div>
        </motion.button>
    )
}

// --- CONTACT CARD ---

function ContactCard({ data, onClick, theme, className }: { data: any; onClick: () => void; theme: any; className?: string }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`rounded-[32px] p-5 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 mb-3 shadow-lg flex items-center justify-center text-xl md:text-2xl font-bold text-white relative z-10">
                {(data.name || "H").charAt(0)}
            </div>

            <div className="font-bold text-base md:text-lg leading-tight mb-0.5 relative z-10">
                {data.name?.split(" ")[0] || "Hôte"}
            </div>

            <div className="flex gap-2 mt-3 relative z-10">
                <div className="p-2 rounded-full bg-green-100 text-green-600"><MinimalIcons.contact className="w-4 h-4" /></div>
            </div>

            <div className="absolute inset-0 bg-current opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" />
        </motion.button>
    )
}

// --- RULES CARD ---

function RulesCard({ data, onClick, theme, className }: { data: any; onClick: () => void; theme: any; className?: string }) {
    const rules = Array.isArray(data.items) ? data.items : [];
    const count = rules.length;
    const firstRule = rules[0]?.text || rules[0] || "";

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="flex justify-between items-start w-full relative z-10">
                <div className="p-2 md:p-2.5 rounded-xl bg-rose-100 text-rose-600">
                    <MinimalIcons.rules className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="font-bold text-[10px] md:text-xs opacity-60 uppercase tracking-wider bg-black/5 px-2 py-1 rounded-lg">
                    {count} {count > 1 ? "Règles" : "Règle"}
                </div>
            </div>

            <div className="relative z-10">
                <div className="font-medium text-sm line-clamp-3 opacity-80 leading-relaxed">
                    {firstRule ? `1. ${firstRule}` : "Consulter le règlement"}
                </div>
                {count > 1 && (
                    <div className="text-xs font-bold opacity-50 mt-1 uppercase tracking-wider">
                        + {count - 1} autre{count > 2 ? "s" : ""}
                    </div>
                )}
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12">
                <MinimalIcons.rules className="w-32 h-32" />
            </div>
        </motion.button>
    );
}

// --- AMENITIES CARD ---

function AmenitiesCard({ data, onClick, theme, className }: { data: any; onClick: () => void; theme: any; className?: string }) {
    const items = Array.isArray(data.items) ? data.items : [];
    const count = items.length;
    const firstItems = items.slice(0, 2).map((i: any) => i.text || i).join(", ");

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="flex justify-between items-start w-full relative z-10">
                <div className="p-2 md:p-2.5 rounded-xl bg-blue-100 text-blue-600">
                    <MinimalIcons.amenities className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="font-bold text-[10px] md:text-xs opacity-60 uppercase tracking-wider bg-black/5 px-2 py-1 rounded-lg">
                    {count}
                </div>
            </div>

            <div className="relative z-10">
                <div className="font-medium text-sm line-clamp-2 opacity-80 leading-relaxed">
                    {firstItems ? `${firstItems}${count > 2 ? "..." : ""}` : "Voir les équipements"}
                </div>
                {count > 2 && (
                    <div className="text-xs font-bold opacity-50 mt-1 uppercase tracking-wider">
                        + {count - 2} autre{count > 3 ? "s" : ""}
                    </div>
                )}
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-[-15deg]">
                <MinimalIcons.amenities className="w-32 h-32" />
            </div>
        </motion.button>
    );
}

// --- FAQ CARD ---

function FaqCard({ data, onClick, theme, className }: { data: any; onClick: () => void; theme: any; className?: string }) {
    const items = Array.isArray(data.items) ? data.items : [];
    const count = items.length;
    const firstQ = items[0]?.question || "";

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="flex justify-between items-start w-full relative z-10">
                <div className="p-2 md:p-2.5 rounded-xl bg-purple-100 text-purple-600">
                    <MinimalIcons.faq className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="font-bold text-[10px] md:text-xs opacity-60 uppercase tracking-wider bg-black/5 px-2 py-1 rounded-lg">
                    {count} {count > 1 ? "Q&R" : "Q"}
                </div>
            </div>

            <div className="relative z-10">
                <div className="font-medium text-sm line-clamp-3 opacity-80 leading-relaxed italic">
                    {firstQ ? `Q: ${firstQ}` : "Foire aux questions"}
                </div>

            </div>

            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12">
                <MinimalIcons.faq className="w-32 h-32" />
            </div>
        </motion.button>
    );
}

// --- PLACES / EVENTS CARD ---

function ListCard({ title, icon: Icon, items, theme, className }: { title: string; icon: any; items: any[]; theme: any; className?: string }) {
    const count = items.length;
    const firstItem = items[0];
    const firstText = firstItem?.name || firstItem?.title || "Voir la liste";

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={`rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="flex justify-between items-start w-full relative z-10">
                <div className="p-2 md:p-2.5 rounded-xl bg-orange-100 text-orange-600">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="font-bold text-[10px] md:text-xs opacity-60 uppercase tracking-wider bg-black/5 px-2 py-1 rounded-lg">
                    {count}
                </div>
            </div>

            <div className="relative z-10">
                <div className="font-bold text-base md:text-lg mb-0.5">{title}</div>
                <div className="font-medium text-xs md:text-sm line-clamp-1 opacity-70">
                    {firstText}
                </div>
                {count > 1 && (
                    <div className="text-xs font-bold opacity-50 mt-1 uppercase tracking-wider">
                        + {count - 1} autre{count > 2 ? "s" : ""}
                    </div>
                )}
            </div>
        </motion.button>
    )
}

function UpsellsCard({ data, onClick, theme, className }: { data: any; onClick: () => void; theme: any; className?: string }) {
    const items = data.items || [];
    const count = items.length;
    const firstFn = items[0];

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col justify-between text-left shadow-sm relative overflow-hidden group w-full h-full ${className || ''}`}
            style={{ backgroundColor: theme.cardBg, color: theme.text }}
        >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <MinimalIcons.upsells className="w-24 h-24" />
            </div>

            <div className="flex justify-between items-start w-full relative z-10">
                <div className="p-2 md:p-2.5 rounded-xl bg-green-100 text-green-600">
                    <MinimalIcons.upsells className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="font-bold text-[10px] md:text-xs text-white bg-green-500 px-2 py-1 rounded-lg shadow-sm">
                    Shop
                </div>
            </div>

            <div className="relative z-10">
                <div className="font-bold text-base md:text-lg mb-0.5">Extras</div>
                <div className="font-medium text-xs md:text-sm opacity-70">
                    {firstFn?.title || "Services disponibles"}
                </div>
            </div>
        </motion.button>
    )
}

// --- MAIN RENDERER ---

export function StyledGuideRenderer({ guide, unlocked, forceMobile = false }: { guide: Guide; unlocked: boolean; forceMobile?: boolean }) {
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Disable Desktop enhancements if forceMobile is on (for Builder Preview)
    const isDesktop = !forceMobile;

    // Parallax & Fade for Hero
    const heroY = useTransform(scrollY, [0, 500], [0, 200]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const gridY = useTransform(scrollY, [0, 400], [0, -40]); // Subtle overlap effect

    // Theme resolution
    // @ts-ignore
    const themeId = guide.theme?.themeId;
    const currentTheme = guideThemes.find(t => t.id === themeId) || guideThemes[0];

    const heroBlock = guide.blocks.find(b => b.type === "hero");
    const wifiBlock = guide.blocks.find(b => b.type === "wifi");
    const accessBlock = guide.blocks.find(b => b.type === "access_codes");

    // Filter out special blocks handled separately in the grid
    const gridBlocks = guide.blocks.filter(b => !["hero", "wifi", "access_codes"].includes(b.type));

    const selectedBlock = guide.blocks.find(b => b.id === selectedBlockId);
    const SelectedDef = selectedBlock ? blockRegistry[selectedBlock.type] : null;

    return (
        <div
            className="min-h-screen bg-gray-50 pb-20 selection:bg-blue-100 font-sans relative"
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

            {/* Changed from max-w-md to responsive wide container */}
            <div className={`w-full relative z-10 ${isDesktop ? '' : 'max-w-md mx-auto'}`}>

                {/* CINEMATIC HERO AREA */}
                {/* Height increased: 60vh mobile, 85vh desktop */}
                <div className={`relative overflow-hidden ${isDesktop ? 'md:-mb-12 h-[55vh] md:h-[85vh]' : 'h-[55vh]'}`}>
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
                                sizes="(max-width: 768px) 100vw, 100vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black" />
                        )}
                        {/* Dramatic Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        <div className={`absolute left-0 right-0 px-6 max-w-7xl mx-auto z-20 ${isDesktop ? 'bottom-16 md:bottom-24 md:px-12 text-center md:text-left' : 'bottom-16 text-center'}`}>
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <h1 className={`font-black mb-3 text-white tracking-tight leading-[1.1] drop-shadow-2xl ${isDesktop ? 'text-3xl md:text-8xl md:mb-4 md:leading-none' : 'text-3xl'}`}>
                                    {(heroBlock?.data as any)?.title || guide.title}
                                </h1>
                            </motion.div>

                            {heroBlock && (
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className={`flex flex-col gap-4 items-center ${isDesktop ? 'md:flex-row md:items-start' : ''}`}
                                >
                                    <p className={`text-white/90 max-w-xl font-medium leading-relaxed drop-shadow-md ${isDesktop ? 'text-base md:text-2xl' : 'text-base'}`}>
                                        {(heroBlock.data as any).subtitle}
                                    </p>

                                    <div className={`flex gap-2 flex-wrap justify-center mt-2 ${isDesktop ? 'md:justify-start md:mt-0' : ''}`}>
                                        {((heroBlock.data as any).badges || []).map((b: string, i: number) => (
                                            <motion.span
                                                key={b}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.4 + (i * 0.1) }}
                                                className={`bg-white/10 backdrop-blur-md rounded-full font-bold border border-white/20 text-white shadow-lg ${isDesktop ? 'px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm' : 'px-3 py-1.5 text-xs'}`}
                                            >
                                                {b}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: [0, 10, 0] }}
                            transition={{ delay: 1, duration: 2, repeat: Infinity }}
                            className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 z-20 ${isDesktop ? 'md:hidden' : ''}`}
                        >
                            <div className="w-1 h-12 rounded-full border border-white/30 flex justify-center p-1">
                                <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* BENTO GRID */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{ y: gridY }}
                    className={`relative max-w-7xl mx-auto ${isDesktop ? 'px-4 md:px-8' : 'px-4'}`}
                >
                    <div className={`bg-white/5 backdrop-blur-2xl border border-white/10 rounded-t-[32px] md:rounded-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.3)] min-h-[50vh] ${isDesktop ? 'p-4 md:p-10' : 'p-4'}`}>
                        {/* Responsive Grid: If forceMobile (isDesktop false), force grid-cols-2. Else use responsive classes. */}
                        {/* Responsive Grid: Multi-column on Desktop, Single column on Mobile */}
                        <div className={`grid gap-3 md:gap-6 ${isDesktop ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>

                            {/* 1. WIFI */}
                            {wifiBlock && (
                                <div className="col-span-1 md:col-span-2">
                                    <WifiCard
                                        data={wifiBlock.data}
                                        onClick={() => setSelectedBlockId(wifiBlock.id)}
                                        theme={currentTheme}
                                    />
                                </div>
                            )}

                            {/* 2. ACCESS CODES */}
                            {accessBlock && (
                                <div className="col-span-1 md:col-span-1">
                                    <AccessCard
                                        data={accessBlock.data}
                                        onClick={() => setSelectedBlockId(accessBlock.id)}
                                        theme={currentTheme}
                                    />
                                </div>
                            )}

                            {/* 3. DYNAMIC BLOCKS */}
                            {gridBlocks.map((b, i) => {
                                const def = blockRegistry[b.type];
                                const Icon = MinimalIcons[b.type] || MinimalIcons.hero;

                                // SIZING LOGIC
                                // Mobile: Always col-span-1 (full width in grid-cols-1). Natural height.
                                // Desktop: Standard grid behavior.

                                let desktopClass = "md:col-span-1";
                                let aspectClass = ""; // No forced aspect ratio by default on mobile

                                // Define sizes per block type
                                if (["location", "marketing_hero"].includes(b.type)) {
                                    // Large Map or Hero
                                    desktopClass = "md:col-span-2 md:row-span-2";
                                    aspectClass = isDesktop ? "aspect-square" : "aspect-square"; // Keep square for maps even on mobile? Or auto? Let's keep square for map.
                                } else if (["checkin", "checkout", "upsells"].includes(b.type)) {
                                    // Wide cards on desktop
                                    desktopClass = "md:col-span-2";
                                    aspectClass = isDesktop ? "aspect-[2/1]" : ""; // Natural height on mobile
                                } else {
                                    // Standard cards
                                    aspectClass = isDesktop ? "aspect-square" : ""; // Natural height on mobile
                                }

                                const cardProps = {
                                    data: b.data,
                                    onClick: () => setSelectedBlockId(b.id),
                                    theme: currentTheme
                                };

                                const wrapperClass = `col-span-1 ${desktopClass} ${aspectClass} relative group`;

                                // Select Component
                                if (b.type === "checkin" || b.type === "checkout") {
                                    return (
                                        <div key={b.id} className={wrapperClass}>
                                            <TimeCard type={b.type} {...cardProps} />
                                        </div>
                                    )
                                }

                                if (b.type === "location") {
                                    return (
                                        <div key={b.id} className={wrapperClass}>
                                            <LocationCard {...cardProps} />
                                        </div>
                                    )
                                }

                                if (b.type === "parking") {
                                    return (
                                        <div key={b.id} className="col-span-1 md:col-span-1 relative group">
                                            <StandardCard icon={Icon} title={b.title || def.label} {...cardProps} />
                                        </div>
                                    )
                                }

                                if (b.type === "contact") {
                                    return (
                                        <div key={b.id} className={wrapperClass}>
                                            <ContactCard {...cardProps} />
                                        </div>
                                    )
                                }

                                if (b.type === "rules") {
                                    return (
                                        <div key={b.id} className={wrapperClass}>
                                            <RulesCard {...cardProps} />
                                        </div>
                                    )
                                }

                                if (b.type === "amenities") {
                                    return (
                                        <div key={b.id} className={wrapperClass}>
                                            <AmenitiesCard {...cardProps} />
                                        </div>
                                    )
                                }

                                if (b.type === "faq") {
                                    return (
                                        <div key={b.id} className={wrapperClass}>
                                            <FaqCard {...cardProps} />
                                        </div>
                                    )
                                }

                                if (b.type === "places" || b.type === "events" || b.type === "documents") {
                                    return (
                                        <div key={b.id} className={wrapperClass}>
                                            <ListCard
                                                title={b.title || def.label}
                                                icon={Icon}
                                                items={(b.data as any).items || []}
                                                theme={currentTheme}
                                            />
                                        </div>
                                    )
                                }

                                if (b.type === "upsells") {
                                    return (
                                        <div key={b.id} className={wrapperClass}>
                                            <UpsellsCard {...cardProps} />
                                        </div>
                                    )
                                }

                                // Fallback to Standard
                                return (
                                    <div key={b.id} className="col-span-1 md:col-span-1 relative group">
                                        <StandardCard
                                            icon={Icon}
                                            title={b.title || def.label}
                                            {...cardProps}
                                        />
                                    </div>
                                );
                            })}

                            {/* Empty State */}
                            {gridBlocks.length === 0 && !wifiBlock && !accessBlock && (
                                <div className="col-span-2 md:col-span-4 py-32 text-center text-white/60">
                                    <div className="text-4xl mb-4 opacity-50">✨</div>
                                    <p className="text-xl font-light">Le guide est en cours de création</p>
                                </div>
                            )}
                        </div>

                        <div className="text-center mt-16 mb-8 flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                            <span className="w-1 h-1 rounded-full bg-current"></span>
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white mix-blend-overlay">
                                Maplyo
                            </p>
                            <span className="w-1 h-1 rounded-full bg-current"></span>
                        </div>
                    </div>
                </motion.div>

            </div>


            {/* Quick Access FAB */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 pointer-events-none">
                <div className="pointer-events-auto flex flex-col gap-3">
                    {accessBlock && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedBlockId(accessBlock.id)}
                            className="w-14 h-14 rounded-full bg-white shadow-xl shadow-black/20 flex items-center justify-center text-gray-800 border border-gray-100 backdrop-blur-sm"
                            style={{ color: currentTheme.primary }}
                            title="Codes d'accès"
                        >
                            <MinimalIcons.access_codes className="w-6 h-6" />
                        </motion.button>
                    )}
                    {wifiBlock && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedBlockId(wifiBlock.id)}
                            className="w-14 h-14 rounded-full bg-white shadow-xl shadow-black/20 flex items-center justify-center text-gray-800 border border-gray-100 backdrop-blur-sm"
                            style={{ color: currentTheme.primary }}
                            title="Wi-Fi"
                        >
                            <MinimalIcons.wifi className="w-6 h-6" />
                        </motion.button>
                    )}
                </div>
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
                        ctx={{ mode: "traveler", unlocked }}
                        visibility={selectedBlock.visibility}
                    />
                )}
            </BottomSheet>

        </div >
    );
}
