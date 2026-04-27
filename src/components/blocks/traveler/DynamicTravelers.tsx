import { ExternalLink, Calendar, MapPin, FileText, Download, ShoppingBag } from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { TranslatedText } from "@/components/ui/TranslatedText";
import Image from "next/image";

// --- WELCOME (Text/Rich Content) ---
export function WelcomeTraveler({ data }: { data: any }) {
    const { lang } = useTranslation();
    return (
        <div className="space-y-4">
            {data.imageUrl && (
                <div className="rounded-2xl overflow-hidden aspect-video shadow-sm relative">
                    <Image src={data.imageUrl} alt="Welcome" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
            )}
            <div className="prose prose-sm max-w-none text-gray-600 bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    <TranslatedText text={data.title || "Bienvenue"} lang={lang} />
                </h3>
                <div className="whitespace-pre-wrap">
                    <TranslatedText text={data.content || "Bienvenue dans notre guide !"} lang={lang} />
                </div>
            </div>
        </div>
    );
}

// --- PLACES (Recommendations) ---
export function PlacesTraveler({ data }: { data: any }) {
    const { lang } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];

    if (items.length === 0) return <div className="text-center p-8 text-gray-400">Aucune recommandation</div>;

    return (
        <div className="space-y-4">
            {items.map((item: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {item.imageUrl && (
                        <div className="h-32 bg-gray-100 relative">
                            <Image src={item.imageUrl} alt={item.name || "Lieu"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                        </div>
                    )}
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">
                                    <TranslatedText text={item.name || "Lieu"} lang={lang} />
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    {item.priceLevel && (
                                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            {item.priceLevel === 'expensive' ? '€€€' : item.priceLevel === 'moderate' ? '€€' : '€'}
                                        </span>
                                    )}
                                    {item.rating && (
                                        <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                                            ★ {item.rating}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {item.url && (
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-white hover:bg-blue-600 transition-all shadow-sm">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>

                        {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                                {item.tags.map((tag: string, idx: number) => (
                                    <span key={idx} className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {item.description && <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-3">
                            <TranslatedText text={item.description} lang={lang} />
                        </p>}

                        {(item.address || item.mapUrl) && (
                            <a
                                href={item.mapUrl || `https://maps.google.com/?q=${item.address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-blue-500 transition-colors p-2 rounded-lg hover:bg-blue-50 -ml-2 w-fit"
                            >
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="underline decoration-dotted">
                                    <TranslatedText text={item.address || "Voir sur la carte"} lang={lang} />
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- EVENTS (Calendar) ---
export function EventsTraveler({ data }: { data: any }) {
    const { lang } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];

    if (items.length === 0) return <div className="text-center p-8 text-gray-400">Aucun événement</div>;

    return (
        <div className="space-y-3">
            {items.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex-shrink-0 w-14 h-14 bg-indigo-50 rounded-xl flex flex-col items-center justify-center text-indigo-600 border border-indigo-100">
                        <span className="text-xs font-bold uppercase">{item.month || "XXX"}</span>
                        <span className="text-xl font-bold leading-none">{item.day || "00"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 leading-tight mb-1">
                            <TranslatedText text={item.title || "Événement"} lang={lang} />
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
                            {item.time && <span>⏰ {item.time}</span>}
                            {item.location && <span>📍 <TranslatedText text={item.location} lang={lang} /></span>}
                        </div>
                        {item.description && <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            <TranslatedText text={item.description} lang={lang} />
                        </p>}

                        <div className="flex gap-2">
                            {item.url && (
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
                                    <ExternalLink className="w-3 h-3 mr-1" /> Site
                                </a>
                            )}
                            {item.mapUrl && (
                                <a href={item.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2.5 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
                                    <MapPin className="w-3 h-3 mr-1" /> Carte
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- DOCUMENTS (Files) ---
export function DocumentsTraveler({ data }: { data: any }) {
    const { lang } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];

    if (items.length === 0) return <div className="text-center p-8 text-gray-400">Aucun document</div>;

    return (
        <div className="grid gap-3">
            {items.map((item: any, i: number) => (
                <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group"
                >
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-gray-900">
                            <TranslatedText text={item.title || "Document"} lang={lang} />
                        </div>
                        {item.description && <div className="text-xs text-gray-500">
                            <TranslatedText text={item.description} lang={lang} />
                        </div>}
                    </div>
                    <div className="p-2 text-gray-400 group-hover:text-blue-500 transition-colors">
                        <Download className="w-5 h-5" />
                    </div>
                </a>
            ))}
        </div>
    );
}

// --- UPSELLS (Extras) ---
export function UpsellsTraveler({ data }: { data: any }) {
    const { lang } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];

    if (items.length === 0) return <div className="text-center p-8 text-gray-400">Aucune offre</div>;

    return (
        <div className="space-y-4">
            {items.map((item: any, i: number) => (
                <div key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    {item.imageUrl && (
                        <div className="h-40 overflow-hidden relative">
                            <Image src={item.imageUrl} alt={item.title || "Upsell"} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>
                    )}
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-gray-900">
                                <TranslatedText text={item.title || "Offre"} lang={lang} />
                            </h4>
                            {item.price && (
                                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                                    {item.price}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            <TranslatedText text={item.description} lang={lang} />
                        </p>

                        {item.url && (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
                            >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                <TranslatedText text={item.cta || "Réserver"} lang={lang} />
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- EMBED (Iframe) ---
export function EmbedTraveler({ data }: { data: any }) {
    if (!data.url) return <div className="text-center p-8 text-gray-400">Aucune URL définie</div>;

    return (
        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 aspect-[9/16] md:aspect-video shadow-sm">
            <iframe
                src={data.url}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
        </div>
    );
}
