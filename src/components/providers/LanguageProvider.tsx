"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DICTIONARY, Language } from '@/lib/i18n/dictionary';

type LanguageContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
    t: typeof DICTIONARY['fr']; // Type inference from French dictionary
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>('fr');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load saved language or default to 'fr'
        const savedCodes = localStorage.getItem('maplyo-lang');
        if (savedCodes && (savedCodes === 'fr' || savedCodes === 'en')) {
            setLangState(savedCodes);
        }
        setMounted(true);
    }, []);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem('maplyo-lang', newLang);
    };

    // Prevent hydration mismatch by rendering children only after mount (or handle carefully)
    // For this simple implementation, we'll return children but t content might flip. 
    // Ideally, we'd wait for mount to show correct language, but that flashes.
    // We'll trust default 'fr' for server render matching.

    const value = {
        lang,
        setLang,
        t: DICTIONARY[lang]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
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
