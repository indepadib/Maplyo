"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, MessageSquare, Loader2 } from "lucide-react";
import { Guide } from "@/types/blocks";
import { Button } from "@/components/ui/Button";

interface GuideChatbotProps {
    guide: Guide;
    primaryColor?: string;
}

export function GuideChatbot({ guide, primaryColor = "#e11d48" }: GuideChatbotProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
        { role: 'assistant', content: "Bonjour ! Je suis l'assistant virtuel de ce guide. Avez-vous des questions sur les codes wifi, le parking, ou les recommandations ?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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
            // Prepare context: remove heavy objects if needed, but guide blocks are essential
            const condensedGuide = {
                title: guide.title,
                blocks: guide.blocks.map(b => ({ type: b.type, title: b.title, data: b.data }))
            };

            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages.concat([{ role: 'user', content: userMsg }]),
                    guideContext: condensedGuide
                })
            });

            if (!res.ok) throw new Error("Failed");

            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, je ne parviens pas à répondre pour le moment." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* TOGGLE BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white z-50 hover:scale-105 transition-transform"
                style={{ backgroundColor: primaryColor }}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
            </button>

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 md:right-10 w-[calc(100vw-3rem)] md:w-96 h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Assistant Guide</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-green-600 font-medium">En ligne</span>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white border border-gray-100 text-gray-700 shadow-sm rounded-bl-none'
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                                    <Loader2 className="w-3 h-3 text-gray-400 animate-spin" />
                                    <span className="text-xs text-gray-400">Réflexion...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Posez votre question..."
                            disabled={isLoading}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
