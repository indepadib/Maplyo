"use client";

import { useState } from "react";
import type { BlockType } from "@/types/blocks";

interface AccordionSectionProps {
    icon: string;
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    theme?: "light" | "dark" | "blue" | "green";
}

export function AccordionSection({ icon, title, isOpen, onToggle, children, theme = "light" }: AccordionSectionProps) {
    const themeStyles = {
        light: {
            bg: "bg-white",
            border: "border-gray-200",
            headerBg: "bg-gradient-to-r from-gray-50 to-gray-100",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
            text: "text-gray-900",
            hover: "hover:bg-gray-50"
        },
        dark: {
            bg: "bg-slate-800",
            border: "border-slate-700",
            headerBg: "bg-gradient-to-r from-slate-700 to-slate-800",
            iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
            text: "text-white",
            hover: "hover:bg-slate-700"
        },
        blue: {
            bg: "bg-white",
            border: "border-blue-200",
            headerBg: "bg-gradient-to-r from-blue-50 to-cyan-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
            text: "text-gray-900",
            hover: "hover:bg-blue-50"
        },
        green: {
            bg: "bg-white",
            border: "border-emerald-200",
            headerBg: "bg-gradient-to-r from-emerald-50 to-teal-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
            text: "text-gray-900",
            hover: "hover:bg-emerald-50"
        },
    };

    const style = themeStyles[theme];

    return (
        <div className={`rounded-2xl border-2 ${style.border} ${style.bg} overflow-hidden shadow-sm hover:shadow-lg transition-all`}>
            <button
                onClick={onToggle}
                className={`w-full px-6 py-5 flex items-center gap-4 ${style.headerBg} ${style.hover} transition-all`}
            >
                {/* Grand picto cliquable */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${style.iconBg} flex items-center justify-center text-3xl shadow-lg transform transition-transform ${isOpen ? "scale-110" : "scale-100"}`}>
                    {icon}
                </div>

                <div className="flex-1 text-left">
                    <h3 className={`text-lg font-bold ${style.text}`}>{title}</h3>
                    <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        {isOpen ? "Cliquez pour fermer" : "Cliquez pour ouvrir"}
                    </p>
                </div>

                {/* Chevron animé */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${theme === "dark" ? "bg-slate-600" : "bg-white"} flex items-center justify-center transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <svg className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-gray-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Contenu accordéon avec animation */}
            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <div className={`p-6 border-t-2 ${style.border}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

// Icônes pour chaque type de bloc
export const BLOCK_ICONS: Record<BlockType, string> = {
    hero: "🏠",
    wifi: "📶",
    access_codes: "🔐",
    welcome: "👋",
    contact: "📞",
    checkin: "🚪",
    location: "📍",
    rules: "📜",
    amenities: "✨",
    checkout: "👋",
    faq: "❓",
    places: "🗺️",
    events: "📅",
    documents: "📄",
    upsells: "🎁",
    embed: "🖼️",
};
