import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { FileUploader } from "@/components/ui/FileUploader";
import { useTranslation } from "@/components/providers/LanguageProvider";

// Helper components from SpecializedEditors
// Duplicating small helpers here to avoid circular deps or complex exports, keeping it self-contained for now.

function InputField({ label, value, onChange, placeholder, type = "text" }: any) {
    return (
        <div className="mb-4">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">{label}</label>
            <input
                type={type}
                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}

function TextAreaField({ label, value, onChange, placeholder }: any) {
    return (
        <div className="mb-4">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">{label}</label>
            <textarea
                className="w-full h-24 rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium resize-none"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}

// --- AI BUTTON HELPERS ---
function AIGenerateButton({ onGenerate, label = "Auto-Fill" }: { onGenerate: (city: string) => void; label?: string }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleClick = async () => {
        if (!showInput) {
            setShowInput(true);
            return;
        }
        if (!city) return;

        setLoading(true);
        await onGenerate(city);
        setLoading(false);
        setShowInput(false);
    };

    return (
        <div className="mb-6 flex gap-2 items-center">
            {showInput && (
                <input
                    autoFocus
                    className="h-9 rounded-lg border border-purple-200 px-3 text-sm outline-none w-32 focus:ring-2 focus:ring-purple-200"
                    placeholder={t.dashboard.aiModal.city}
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleClick()}
                />
            )}
            <button
                onClick={handleClick}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:shadow-lg transition-all disabled:opacity-50"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {loading ? t.dashboard.aiModal.generating : label}
            </button>
        </div>
    );
}

// --- WELCOME ---
export function WelcomeEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    return (
        <div>
            <InputField
                label={t.editor.common.title}
                value={data.title}
                onChange={(v: string) => onChange({ ...data, title: v })}
                placeholder={`${t.renderer.welcome}...`}
            />
            <TextAreaField
                label={t.editor.common.description}
                value={data.content}
                onChange={(v: string) => onChange({ ...data, content: v })}
                placeholder={t.editor.common.placeholderWelcome}
            />
            <FileUploader
                label={t.editor.common.uploadImage}
                value={data.imageUrl}
                onUpload={(url) => onChange({ ...data, imageUrl: url })}
            />
        </div>
    );
}

// --- PLACES ---
export function PlacesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];

    const handleAI = async (city: string) => {
        try {
            const res = await fetch('/api/ai/block-content', {
                method: 'POST',
                body: JSON.stringify({ city, blockType: 'places' })
            });
            const json = await res.json();
            if (json.items) {
                onChange({ ...data, items: [...items, ...json.items] });
            }
        } catch (e) {
            console.error(e);
            alert("AI Generation failed");
        }
    };

    const updateItem = (index: number, key: string, val: string | string[]) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: val };
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        onChange({ ...data, items: [...items, { name: "", description: "" }] });
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_: any, i: number) => i !== index);
        onChange({ ...data, items: newItems });
    };

    return (
        <div>
            <AIGenerateButton onGenerate={handleAI} label={t.editor.places.aiButton} />

            <div className="space-y-6 mb-6">
                {items.map((item: any, i: number) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                        <button onClick={() => removeItem(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <InputField label={t.editor.places.name} value={item.name} onChange={(v: string) => updateItem(i, "name", v)} />
                            </div>
                            <div className="col-span-2">
                                <TextAreaField label={t.editor.common.description} value={item.description} onChange={(v: string) => updateItem(i, "description", v)} />
                            </div>
                            <InputField label={t.editor.common.address} value={item.address} onChange={(v: string) => updateItem(i, "address", v)} />
                            <div className="col-span-1">
                                <InputField label={t.editor.common.linkUrl} value={item.url} onChange={(v: string) => updateItem(i, "url", v)} />
                            </div>
                            <div className="col-span-1">
                                <InputField label={t.editor.common.mapUrl} value={item.mapUrl} onChange={(v: string) => updateItem(i, "mapUrl", v)} />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">{t.editor.common.price}</label>
                                <select
                                    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none"
                                    value={item.priceLevel || "moderate"}
                                    onChange={(e) => updateItem(i, "priceLevel", e.target.value)}
                                >
                                    <option value="cheap">€ ({t.editor.common.priceCheap})</option>
                                    <option value="moderate">€€ ({t.editor.common.priceModerate})</option>
                                    <option value="expensive">€€€ ({t.editor.common.priceExpensive})</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <InputField
                                    label={t.editor.common.tags}
                                    value={item.tags?.join(', ')}
                                    onChange={(v: string) => updateItem(i, "tags", v.split(',').map((s: string) => s.trim()))}
                                    placeholder={t.editor.common.placeholderTags}
                                />
                            </div>
                            <div className="col-span-2">
                                <FileUploader
                                    label={t.editor.common.uploadImage}
                                    value={item.imageUrl}
                                    onUpload={(url) => updateItem(i, "imageUrl", url)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-gray-700">
                + {t.editor.places.add}
            </button>
        </div>
    );
}

// --- EVENTS ---
export function EventsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];

    const handleAI = async (city: string) => {
        try {
            const res = await fetch('/api/ai/block-content', {
                method: 'POST',
                body: JSON.stringify({ city, blockType: 'events' })
            });
            const json = await res.json();
            if (json.items) {
                onChange({ ...data, items: [...items, ...json.items] });
            }
        } catch (e) {
            console.error(e);
            alert("AI Generation failed");
        }
    };

    const updateItem = (index: number, key: string, val: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: val };
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        // Default to today/current month
        const now = new Date();
        const month = now.toLocaleString('default', { month: 'short' }).toUpperCase();
        onChange({ ...data, items: [...items, { title: "", month, day: now.getDate() }] });
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_: any, i: number) => i !== index);
        onChange({ ...data, items: newItems });
    };

    return (
        <div>
            <AIGenerateButton onGenerate={handleAI} label={t.editor.events.aiButton} />

            <div className="space-y-6 mb-6">
                {items.map((item: any, i: number) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                        <button onClick={() => removeItem(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>

                        <InputField label={t.editor.common.title} value={item.title} onChange={(v: string) => updateItem(i, "title", v)} />
                        <div className="grid grid-cols-2 gap-3">
                            <InputField label={t.editor.common.month} value={item.month} onChange={(v: string) => updateItem(i, "month", v)} placeholder={t.editor.common.placeholderMonth} />
                            <InputField label={t.editor.common.day} value={item.day} onChange={(v: string) => updateItem(i, "day", v)} placeholder={t.editor.common.placeholderDay} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <InputField label={t.editor.common.time} value={item.time} onChange={(v: string) => updateItem(i, "time", v)} placeholder={t.editor.common.placeholderTime} />
                            <InputField label={t.editor.common.location} value={item.location} onChange={(v: string) => updateItem(i, "location", v)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <InputField label={t.editor.common.linkUrl} value={item.url} onChange={(v: string) => updateItem(i, "url", v)} placeholder="https://..." />
                            <InputField label={t.editor.common.mapUrl} value={item.mapUrl} onChange={(v: string) => updateItem(i, "mapUrl", v)} placeholder="https://goo.gl/maps/..." />
                        </div>
                        <TextAreaField label={t.editor.common.description} value={item.description} onChange={(v: string) => updateItem(i, "description", v)} />
                    </div>
                ))}
            </div>
            <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-gray-700">
                + {t.editor.events.add}
            </button>
        </div>
    );
}

// --- DOCUMENTS ---
export function DocumentsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];

    const updateItem = (index: number, key: string, val: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: val };
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        onChange({ ...data, items: [...items, { title: "", url: "" }] });
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_: any, i: number) => i !== index);
        onChange({ ...data, items: newItems });
    };

    return (
        <div>
            <div className="space-y-4 mb-6">
                {items.map((item: any, i: number) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                        <button onClick={() => removeItem(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>

                        <InputField label={t.editor.documents.name} value={item.title} onChange={(v: string) => updateItem(i, "title", v)} />
                        <InputField label={t.editor.documents.url} value={item.url} onChange={(v: string) => updateItem(i, "url", v)} />
                        <InputField label={t.editor.common.description} value={item.description} onChange={(v: string) => updateItem(i, "description", v)} />
                    </div>
                ))}
            </div>
            <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-gray-700">
                + {t.editor.documents.add}
            </button>
        </div>
    );
}

// --- REVENUE SERVICES / UPSELLS ---
export function UpsellsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const items = Array.isArray(data.items) ? data.items : [];

    const updateItem = (index: number, key: string, val: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: val };

        // Keep legacy display price synchronized while moving to structured pricing.
        if (key === "priceAmount" || key === "currency") {
            const priceAmount = key === "priceAmount" ? val : newItems[index].priceAmount;
            const currency = key === "currency" ? val : (newItems[index].currency || "MAD");
            newItems[index].price = priceAmount !== "" && priceAmount !== undefined ? `${priceAmount} ${currency}` : "";
        }

        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        const id = `svc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
        onChange({
            ...data,
            items: [...items, {
                id,
                title: "",
                description: "",
                category: "other",
                priceAmount: "",
                currency: "MAD",
                pricingType: "fixed",
                fulfillmentType: "property",
                cta: "Book this service",
                url: ""
            }]
        });
    };

    const removeItem = (index: number) => {
        onChange({ ...data, items: items.filter((_: any, i: number) => i !== index) });
    };

    return (
        <div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800">Revenue services</div>
                <p className="text-xs text-amber-700 mt-1 leading-5">Each extra now has a stable service ID and structured pricing so Maplyo can measure demand and progressively support native ordering.</p>
            </div>

            <div className="space-y-6 mb-6">
                {items.map((item: any, i: number) => (
                    <div key={item.id || i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                        <button type="button" onClick={() => removeItem(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>

                        <div className="pr-7">
                            <InputField label="Service name" value={item.title} onChange={(v: string) => updateItem(i, "title", v)} placeholder="Late checkout" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Category</label>
                                <select
                                    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none"
                                    value={item.category || "other"}
                                    onChange={(e) => updateItem(i, "category", e.target.value)}
                                >
                                    <option value="late_checkout">Late checkout</option>
                                    <option value="early_checkin">Early check-in</option>
                                    <option value="transfer">Transfer</option>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="food_beverage">Food & beverage</option>
                                    <option value="spa">Spa / wellness</option>
                                    <option value="experience">Experience / activity</option>
                                    <option value="housekeeping">Housekeeping</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Pricing</label>
                                <select
                                    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none"
                                    value={item.pricingType || "fixed"}
                                    onChange={(e) => updateItem(i, "pricingType", e.target.value)}
                                >
                                    <option value="fixed">Fixed price</option>
                                    <option value="per_guest">Per guest</option>
                                    <option value="per_night">Per night</option>
                                    <option value="quote">On request</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <InputField label="Price" type="number" value={item.priceAmount ?? ""} onChange={(v: string) => updateItem(i, "priceAmount", v)} placeholder="250" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Currency</label>
                                <select
                                    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none"
                                    value={item.currency || "MAD"}
                                    onChange={(e) => updateItem(i, "currency", e.target.value)}
                                >
                                    <option value="MAD">MAD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                        </div>

                        <TextAreaField label="Description" value={item.description} onChange={(v: string) => updateItem(i, "description", v)} placeholder="What does the guest get?" />
                        <InputField label="CTA text" value={item.cta} onChange={(v: string) => updateItem(i, "cta", v)} placeholder="Book this service" />
                        <InputField label="Booking / payment link (optional for now)" value={item.url} onChange={(v: string) => updateItem(i, "url", v)} placeholder="https://..." />
                        <FileUploader label="Service image" value={item.imageUrl} onUpload={(url) => updateItem(i, "imageUrl", url)} />

                        <div className="mt-3 text-[10px] font-mono text-gray-400">Service ID: {item.id || "legacy item — ID will be assigned when recreated"}</div>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addItem} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-gray-700">
                + Add revenue service
            </button>
        </div>
    );
}

// --- EMBED ---
export function EmbedEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    return (
        <div>
            <InputField
                label={t.editor.embed.url}
                value={data.url}
                onChange={(v: string) => onChange({ ...data, url: v })}
                placeholder="https://..."
            />
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                ⚠️ {t.editor.embed.warning}
            </div>
        </div>
    );
}
