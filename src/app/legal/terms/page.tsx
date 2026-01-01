"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";

export default function TermsPage() {
    const { t } = useTranslation();
    const legal = t.legalPage;
    const terms = legal.terms;

    return (
        <div className="prose prose-invert prose-lg max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {legal.titleTerms}
            </h1>
            <p className="text-sm text-gray-500 mb-8">
                {legal.effectiveDate} {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-4">
                <p>{terms.intro}</p>

                <h3 className="text-xl font-bold mt-8">{terms.section1.title}</h3>
                <p>{terms.section1.content}</p>

                <h3 className="text-xl font-bold mt-8">{terms.section2.title}</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {terms.section2.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>

                <h3 className="text-xl font-bold mt-8">{terms.section3.title}</h3>
                <p>{terms.section3.intro}</p>
                <ul className="list-disc pl-5 space-y-2">
                    {terms.section3.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>

                <h3 className="text-xl font-bold mt-8">{terms.section4.title}</h3>
                <p>{terms.section4.content}</p>

                <h3 className="text-xl font-bold mt-8">{terms.section5.title}</h3>
                <p>{terms.section5.content}</p>

                <h3 className="text-xl font-bold mt-8">{terms.section6.title}</h3>
                <p>{terms.section6.content}</p>
            </section>
        </div>
    );
}
