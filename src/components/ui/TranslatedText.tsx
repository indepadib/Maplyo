import { useContentTranslation } from "@/hooks/useContentTranslation";

export function TranslatedText({ text, lang, className }: { text: string, lang: 'fr' | 'en', className?: string }) {
    const { translatedText, loading } = useContentTranslation(text, lang);

    return (
        <span className={`${className || ''} ${loading ? 'animate-pulse opacity-70' : ''} transition-opacity duration-300`}>
            {translatedText}
        </span>
    );
}
