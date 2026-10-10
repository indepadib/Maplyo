"use client";

import { useState } from "react";
import { ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import type { Language } from "@/lib/i18n/dictionary";

export const MARKETING_LANGUAGES: Array<{ code: Language; label: string; native: string }> = [
  { code: "fr", label: "FR", native: "Français" },
  { code: "en", label: "EN", native: "English" },
  { code: "es", label: "ES", native: "Español" },
  { code: "ar", label: "AR", native: "العربية" },
  { code: "nl", label: "NL", native: "Nederlands" },
  { code: "zh", label: "ZH", native: "中文" },
  { code: "pt", label: "PT", native: "Português" },
];

export function MarketingLanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = MARKETING_LANGUAGES.find((item) => item.code === lang) || MARKETING_LANGUAGES[1];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white ${compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"}`}
        aria-label="Change language"
      >
        <Languages className="h-4 w-4" />
        <span className="font-bold">{current.label}</span>
        {!compact && <span className="hidden lg:inline text-zinc-500">{current.native}</span>}
        <ChevronDown className="h-3.5 w-3.5 text-zinc-600" />
      </button>

      {open && (
        <>
          <button aria-label="Close language menu" className="fixed inset-0 z-40 cursor-default" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl">
            {MARKETING_LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLang(item.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${item.code === lang ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
              >
                <span>{item.native}</span>
                <span className="text-[10px] font-bold text-zinc-600">{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
