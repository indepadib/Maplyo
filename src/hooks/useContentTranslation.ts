import { useState, useEffect } from 'react';

// Simple in-memory cache to avoid re-fetching same translations in one session
const translationCache: Record<string, string> = {};

export function useContentTranslation(text: string, targetLang: 'fr' | 'en') {
    const [translatedText, setTranslatedText] = useState<string>(text);
    const [loading, setLoading] = useState(false);

    // If text is effectively empty or just numbers/symbols, ignore
    const shouldTranslate = text && text.trim().length > 2 && /[a-zA-Z]/.test(text);

    useEffect(() => {
        // Reset if back to French (assuming source is French for now, or just use original)
        // NOTE: In a real app, we'd detect source language. Here we assume Source = French (User Input).
        if (targetLang === 'fr') {
            setTranslatedText(text);
            return;
        }

        if (!shouldTranslate) {
            setTranslatedText(text);
            return;
        }

        const cacheKey = `${targetLang}:${text.substring(0, 50)}_${text.length}`; // Simple hash

        if (translationCache[cacheKey]) {
            setTranslatedText(translationCache[cacheKey]);
            return;
        }

        const translate = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/ai/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text, targetLang })
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.translatedText) {
                        translationCache[cacheKey] = data.translatedText;
                        setTranslatedText(data.translatedText);
                    }
                }
            } catch (error) {
                console.error("Translation failed", error);
                // Fallback to original
                setTranslatedText(text);
            } finally {
                setLoading(false);
            }
        };

        translate();

        // Cleanup/Debounce could be added here if text changes rapidly, 
        // but for read-only guide it's stable.
    }, [text, targetLang, shouldTranslate]);

    return { translatedText, loading };
}
