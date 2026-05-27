"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DICTIONARY, Language, DictionaryShape } from '@/lib/i18n/dictionary';

type LanguageContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
    t: any; // Allow flexible dictionary shape during transitions
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function createFallbackProxy(target: any, fallback: any): any {
    if (typeof target !== 'object' || target === null) {
        return target ?? fallback;
    }
    return new Proxy(target, {
        get(obj, prop) {
            if (typeof prop === 'symbol') {
                return obj[prop];
            }
            if (typeof prop === 'string' && (prop.startsWith('$$') || prop === 'then' || prop === 'toJSON')) {
                return obj[prop];
            }
            const val = obj[prop];
            const fallbackVal = fallback ? fallback[prop] : undefined;

            if (val === undefined) {
                if (typeof fallbackVal === 'object' && fallbackVal !== null) {
                    const fallbackEmpty = Array.isArray(fallbackVal) ? [] : {};
                    return createFallbackProxy(fallbackEmpty, fallbackVal);
                }
                return fallbackVal;
            }

            if (typeof val === 'object' && val !== null) {
                return createFallbackProxy(val, fallbackVal);
            }

            return val;
        }
    });
}

export function LanguageProvider({ children, defaultLang = 'fr' }: { children: React.ReactNode, defaultLang?: Language }) {
    const [lang, setLangState] = useState<Language>(defaultLang);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load saved language or default to 'fr'
        const savedCodes = localStorage.getItem('maplyo-lang');
        const validLanguages: Language[] = ['fr', 'en', 'es', 'ar', 'nl', 'zh', 'pt'];
        if (savedCodes && validLanguages.includes(savedCodes as Language)) {
            setLangState(savedCodes as Language);
        } else {
            localStorage.setItem('maplyo-lang', defaultLang);
        }
        setMounted(true);
    }, [defaultLang]);

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

    const t = React.useMemo(() => {
        const targetDict = DICTIONARY[lang] || {};
        const fallbackDict = DICTIONARY['fr'] || {};
        return createFallbackProxy(targetDict, fallbackDict);
    }, [lang]);

    const value = {
        lang,
        setLang,
        t
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
