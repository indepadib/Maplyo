"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, MessageSquare, Loader2 } from "lucide-react";
import { Guide } from "@/types/blocks";
import { Button } from "@/components/ui/Button";

import { useTranslation } from "@/components/providers/LanguageProvider"; // Though usually we pass lang as prop here to avoid context if desired, or just use dictionary logic
import { TranslatedText } from "@/components/ui/TranslatedText";

// Better: we reuse the Dictionary for standard static strings, 
// OR we rely on the `lang` prop passed from parent.
// Since `StyledGuideRenderer` has `DICTIONARY`, let's import it or define it?
// Actually, `StyledGuideRenderer` defines `DICTIONARY` locally. 
// We should preferably import `DICTIONARY` from `@/lib/i18n/dictionary`.

import { DICTIONARY } from "@/lib/i18n/dictionary";

interface GuideChatbotProps {
    guide: Guide;
    primaryColor?: string;
    lang: 'fr' | 'en'; // Added lang prop
}

export function GuideChatbot({ guide, primaryColor = "#e11d48", forceMobile = false, lang }: GuideChatbotProps & { forceMobile?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Get translations
    const t = DICTIONARY[lang].ai;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            // Prepare context
            const condensedGuide = {
                title: guide.title,
                blocks: guide.blocks.map(b => ({ type: b.type, title: b.title, data: b.data }))
            };

            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages.concat([{ role: 'user', content: userMsg }]),
                    guideContext: condensedGuide,
                    lang: lang // Pass lang to backend for better answers
                })
            });

            if (!res.ok) throw new Error("Failed");

            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: t.error }]);
        } finally {
            setIsLoading(false);
        }
    };

    const isDesktopMode = !forceMobile;

    return (
        <>
            {/* TOGGLE BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    fixed w-14 h-14 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white z-50 hover:scale-105 transition-transform
                    ${isDesktopMode ? 'bottom-6 right-6 md:bottom-10 md:right-10' : 'bottom-6 right-6'}
                `}
                style={{ backgroundColor: primaryColor }}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
            </button>

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className={`
                    fixed flex flex-col overflow-hidden z-[100] bg-white border border-gray-100 fade-in duration-300
                    ${isDesktopMode
                        ? 'bottom-4 left-4 right-4 h-[75vh] w-auto rounded-3xl md:bottom-24 md:left-auto md:right-10 md:top-auto md:w-96 md:h-[550px] md:max-h-[70vh] md:rounded-2xl md:shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-5'
                        : 'bottom-4 left-4 right-4 h-[75vh] w-auto rounded-3xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-10'
                    }
                `}>
                    {/* Header */}
                    <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between gap-3 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">{t.assistant}</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs text-green-600 font-medium">{t.online}</span>
                                </div>
                            </div>
                        </div>
                        {/* Mobile Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className={`p-2 -mr-2 text-gray-400 hover:text-gray-900 ${isDesktopMode ? 'md:hidden' : ''}`}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-40">
                                <Sparkles className="w-12 h-12 mb-4 text-gray-300" />
                                <p className="text-sm font-medium text-gray-600">{t.empty}</p>
                            </div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-sm'
                                        : 'bg-white border border-gray-100 text-gray-800 shadow-sm rounded-bl-sm'
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2">
                                    <Loader2 className="w-3 h-3 text-gray-400 animate-spin" />
                                    <span className="text-xs text-gray-500">{t.thinking}</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2 shrink-0 pb-safe-area">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t.placeholder}
                            autoFocus={false}
                            disabled={isLoading}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm"
                        >
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
