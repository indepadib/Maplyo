"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type LangOption = {
    code: string;
    label: string;
    flag: string;
};

const LANGUAGES: LangOption[] = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "ar", label: "العربية", flag: "🇲🇦" },
    { code: "nl", label: "Nederlands", flag: "🇳🇱" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
    { code: "pt", label: "Português", flag: "🇵🇹" },
];

interface LanguageSwitcherProps {
    variant?: "dark" | "light" | "glass";
    compact?: boolean;
}

export function LanguageSwitcher({ variant = "dark", compact = false }: LanguageSwitcherProps) {
    const { lang, setLang } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const baseBtn =
        variant === "glass"
            ? "bg-white/10 backdrop-blur-2xl border border-white/20 text-white hover:bg-white/20"
            : variant === "light"
            ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
            : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10";

    return (
        <div ref={ref} className="relative" dir="ltr">
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm transition-all active:scale-95 ${baseBtn}`}
                aria-label="Select language"
            >
                <Globe className="w-4 h-4 opacity-70" />
                <span className="text-base leading-none">{current.flag}</span>
                {!compact && <span className="hidden sm:inline uppercase text-xs font-bold tracking-wider">{current.code}</span>}
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 z-[999]">
                    {LANGUAGES.map(l => (
                        <button
                            key={l.code}
                            onClick={() => { setLang(l.code as any); setOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5 text-left ${lang === l.code ? "text-rose-400 bg-rose-500/10" : "text-zinc-300"}`}
                        >
                            <span className="text-lg leading-none">{l.flag}</span>
                            <span>{l.label}</span>
                            {lang === l.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-400" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
