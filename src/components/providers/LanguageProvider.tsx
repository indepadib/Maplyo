"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DICTIONARY, Language, DictionaryShape } from '@/lib/i18n/dictionary';

type LanguageContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
    t: DictionaryShape;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>('fr');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load saved language or default to 'fr'
        const savedCodes = localStorage.getItem('maplyo-lang');
        const validLanguages: Language[] = ['fr', 'en', 'es', 'ar', 'nl', 'zh'];
        if (savedCodes && validLanguages.includes(savedCodes as Language)) {
            setLangState(savedCodes as Language);
        }
        setMounted(true);
    }, []);

    // Sync DIR and Cookie when language changes
    useEffect(() => {
        if (!mounted) return;
        
        // Update document direction
        const dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;

        // Sync cookie for middleware
        document.cookie = `maplyo-lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }, [lang, mounted]);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem('maplyo-lang', newLang);
    };

    const value = {
        lang,
        setLang,
        t: DICTIONARY[lang]
    };

    return (
        <LanguageContext.Provider value={value}>
            <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
}
