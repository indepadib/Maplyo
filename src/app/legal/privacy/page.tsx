"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";

export default function PrivacyPage() {
    const { t } = useTranslation();
    const legal = t.legalPage;
    const p = legal.privacy;

    return (
        <div className="prose prose-invert prose-lg max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {legal.titlePrivacy}
            </h1>
            <p className="text-sm text-gray-500 mb-8">
                {legal.lastUpdated} {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-4">
                <p dangerouslySetInnerHTML={{ __html: p.intro.replace("'nous', 'notre'", "<strong>'nous'</strong>, <strong>'notre'</strong>") }} />

                <h3 className="text-xl font-bold mt-8">{p.section1.title}</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {p.section1.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>

                <h3 className="text-xl font-bold mt-8">{p.section2.title}</h3>
                <p>{p.section2.intro}</p>
                <ul className="list-disc pl-5 space-y-2">
                    {p.section2.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>

                <h3 className="text-xl font-bold mt-8">{p.section3.title}</h3>
                <p>{p.section3.content}</p>

                <h3 className="text-xl font-bold mt-8">{p.section4.title}</h3>
                <p>{p.section4.content}</p>

                <h3 className="text-xl font-bold mt-8">{p.section5.title}</h3>
                <p>{p.section5.content}</p>
                <p className="font-bold">{p.section5.contact}</p>
            </section>
        </div>
    );
}
