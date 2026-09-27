"use client";

import { useState } from "react";
import { ExternalLink, Calendar, MapPin, FileText, Download, ShoppingBag } from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { TranslatedText } from "@/components/ui/TranslatedText";
import Image from "next/image";
import { trackGuestEvent } from "@/lib/analytics/guest-events";

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

// --- UPSELLS (Revenue Services) ---
function serviceKey(item: any, index: number) {
    return item.id || item.serviceId || `legacy_${String(item.title || "service").toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${index}`;
}

function servicePrice(item: any) {
    if (item.price) return item.price;
    if (item.priceAmount !== undefined && item.priceAmount !== null && item.priceAmount !== "") {
        return `${item.priceAmount} ${item.currency || "MAD"}`;
    }
    return "";
}

export function UpsellsTraveler({ data, ctx }: { data: any; ctx?: { guideId?: string } }) {
    const { lang } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];
    const [selected, setSelected] = useState<{ item: any; index: number } | null>(null);
    const [requestForm, setRequestForm] = useState({ name: "", email: "", phone: "", notes: "" });
    const [submitting, setSubmitting] = useState(false);
    const [requestStatus, setRequestStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

    if (items.length === 0) return <div className="text-center p-8 text-gray-400">Aucun service disponible</div>;

    const openService = (item: any, i: number) => {
        const key = serviceKey(item, i);
        trackGuestEvent({
            guideId: ctx?.guideId,
            eventName: "service_cta",
            serviceKey: key,
            serviceId: item.serviceId,
            metadata: {
                title: item.title || "Service",
                category: item.category || "other",
                priceAmount: item.priceAmount ?? null,
                currency: item.currency || null,
                destinationType: item.url ? "external" : "native_request",
            },
        });

        if (item.url) {
            window.open(item.url, "_blank", "noopener,noreferrer");
            return;
        }

        setRequestStatus(null);
        setSelected({ item, index: i });
    };

    const submitRequest = async () => {
        if (!selected || !ctx?.guideId || !requestForm.name || (!requestForm.email && !requestForm.phone)) return;

        setSubmitting(true);
        setRequestStatus(null);

        const item = selected.item;
        const key = serviceKey(item, selected.index);

        try {
            const res = await fetch("/api/orders/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    guideId: ctx.guideId,
                    serviceId: item.serviceId || undefined,
                    serviceKey: key,
                    title: item.title || "Service",
                    priceAmount: item.priceAmount === "" || item.priceAmount === undefined ? undefined : Number(item.priceAmount),
                    currency: item.currency || "MAD",
                    guestName: requestForm.name,
                    guestEmail: requestForm.email || undefined,
                    guestPhone: requestForm.phone || undefined,
                    notes: requestForm.notes || undefined,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                if (result.code === "ORDERING_NOT_ACTIVE") {
                    setRequestStatus({
                        type: "error",
                        message: "Direct requests are not enabled for this property yet. Please contact your host to confirm this service."
                    });
                    return;
                }
                throw new Error(result.error || "Could not send your request");
            }

            setRequestStatus({
                type: "success",
                message: "Request sent. Your host can now confirm availability and next steps."
            });
            setRequestForm({ name: "", email: "", phone: "", notes: "" });
        } catch (error: any) {
            setRequestStatus({ type: "error", message: error?.message || "Could not send your request" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="space-y-6 bg-[#FAF9F6] -m-5 md:-m-6 p-5 md:p-6 min-h-full">
                <div className="text-center mb-6">
                    <h3 className="text-sm font-bold tracking-[0.2em] text-amber-700 uppercase mb-2">Enhance your stay</h3>
                    <p className="text-xs text-gray-500">Services selected by your host</p>
                    <div className="w-8 h-0.5 bg-amber-200 mx-auto mt-3"></div>
                </div>

                {items.map((item: any, i: number) => {
                    const price = servicePrice(item);
                    return (
                        <div key={serviceKey(item, i)} className="group bg-white rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all border border-gray-100 flex flex-col md:flex-row">
                            {item.imageUrl && (
                                <div className="h-48 md:h-auto md:w-2/5 overflow-hidden relative">
                                    <Image src={item.imageUrl} alt={item.title || "Service"} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                                    {price && (
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 font-bold px-4 py-1.5 rounded-full text-sm shadow-lg">
                                            {price}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-3 gap-3">
                                    <div>
                                        {item.category && (
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1">{String(item.category).replaceAll("_", " ")}</div>
                                        )}
                                        <h4 className="text-xl font-medium text-gray-900 tracking-tight">
                                            <TranslatedText text={item.title || "Service"} lang={lang} />
                                        </h4>
                                    </div>
                                    {!item.imageUrl && price && (
                                        <span className="bg-gray-100 text-gray-900 font-bold px-3 py-1 rounded-full text-sm whitespace-nowrap">
                                            {price}
                                        </span>
                                    )}
                                </div>
                                {item.description && (
                                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                        <TranslatedText text={item.description} lang={lang} />
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={() => openService(item, i)}
                                    className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-[#111] text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors mt-auto"
                                >
                                    <ShoppingBag className="w-4 h-4 mr-2" />
                                    <TranslatedText text={item.cta || (item.url ? "Book this service" : "Request this service")} lang={lang} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selected && (
                <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-5">
                    <div className="w-full max-w-lg rounded-t-[28px] md:rounded-[28px] bg-white p-6 text-gray-900 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">Service request</div>
                                <h3 className="mt-2 text-2xl font-bold">{selected.item.title || "Service"}</h3>
                                <p className="mt-1 text-sm text-gray-500">{servicePrice(selected.item) || "Price on request"}</p>
                            </div>
                            <button type="button" onClick={() => { setSelected(null); setRequestStatus(null); }} className="h-10 w-10 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">✕</button>
                        </div>

                        {requestStatus?.type === "success" ? (
                            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                                <div className="font-bold text-emerald-800">Request received</div>
                                <p className="mt-2 text-sm leading-6 text-emerald-700">{requestStatus.message}</p>
                                <button type="button" onClick={() => { setSelected(null); setRequestStatus(null); }} className="mt-4 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white">Done</button>
                            </div>
                        ) : (
                            <>
                                <div className="mt-6 space-y-4">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">Your name</label>
                                        <input value={requestForm.name} onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })} className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-gray-400" placeholder="Sarah" />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">Email</label>
                                            <input type="email" value={requestForm.email} onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })} className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-gray-400" placeholder="sarah@email.com" />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">Phone</label>
                                            <input value={requestForm.phone} onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })} className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-gray-400" placeholder="+212..." />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">Note (optional)</label>
                                        <textarea value={requestForm.notes} onChange={(e) => setRequestForm({ ...requestForm, notes: e.target.value })} className="min-h-24 w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-gray-400" placeholder="Preferred time, number of guests…" />
                                    </div>
                                </div>

                                {requestStatus?.type === "error" && (
                                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-5 text-amber-800">{requestStatus.message}</div>
                                )}

                                <button
                                    type="button"
                                    onClick={submitRequest}
                                    disabled={submitting || !requestForm.name || (!requestForm.email && !requestForm.phone)}
                                    className="mt-6 w-full rounded-xl bg-gray-950 px-5 py-3.5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {submitting ? "Sending…" : "Send request"}
                                </button>
                                <p className="mt-3 text-center text-[11px] leading-5 text-gray-400">This sends a service request to the property. It is not a confirmed booking until the host accepts it.</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
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
