"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageProvider";

export function FAQ() {
    const { lang } = useTranslation();

    const questions = lang === 'fr' ? [
        {
            q: "Faut-il des compétences techniques ?",
            a: "Aucune. C'est aussi simple que de remplir un profil Facebook. Vous ajoutez vos infos, on génère le design."
        },
        {
            q: "Comment mes voyageurs accèdent au guide ?",
            a: "Via un simple QR Code que vous placez dans le logement, ou un lien que vous envoyez par message avant leur arrivée."
        },
        {
            q: "Puis-je modifier le guide après impression du QR Code ?",
            a: "Oui ! C'est la magie du numérique. Mettez à jour vos infos (code wifi, restos...) et le QR Code reste le même."
        },
        {
            q: "Y a-t-il un engagement ?",
            a: "Non, c'est sans engagement. Vous pouvez arrêter quand vous voulez."
        }
    ] : [
        {
            q: "Do I need technical skills?",
            a: "None at all. It's as easy as filling out a social media profile. You add info, we handle the design."
        },
        {
            q: "How do guests access the guide?",
            a: "Via a simple QR Code you place in the rental, or a link you send via message before arrival."
        },
        {
            q: "Can I update the guide after printing the QR Code?",
            a: "Yes! That's the magic. Update your info (wifi, restaurants...) and the QR Code stays exactly the same."
        },
        {
            q: "Is there a contract?",
            a: "No, cancel anytime."
        }
    ];

    return (
        <section className="py-24 bg-slate-950 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {lang === 'fr' ? "Questions Fréquentes" : "Frequently Asked Questions"}
                    </h2>
                    <p className="text-zinc-400">
                        {lang === 'fr'
                            ? "Tout ce que vous devez savoir pour démarrer."
                            : "Everything you need to know to get started."}
                    </p>
                </div>

                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <FAQItem key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
                <span className="font-semibold text-white">{question}</span>
                {isOpen ? <Minus className="text-rose-500" /> : <Plus className="text-zinc-500" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
