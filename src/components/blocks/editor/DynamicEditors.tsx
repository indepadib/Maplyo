import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { FileUploader } from "@/components/ui/FileUploader";

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
                    placeholder="City..."
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
                {loading ? "Generating..." : label}
            </button>
        </div>
    );
}

// --- WELCOME ---
export function WelcomeEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    return (
        <div>
            <InputField
                label="Titre"
                value={data.title}
                onChange={(v: string) => onChange({ ...data, title: v })}
                placeholder="Bienvenue..."
            />
            <TextAreaField
                label="Message de bienvenue"
                value={data.content}
                onChange={(v: string) => onChange({ ...data, content: v })}
                placeholder="Nous sommes ravis de vous accueillir..."
            />
            <FileUploader
                label="Image de couverture"
                value={data.imageUrl}
                onUpload={(url) => onChange({ ...data, imageUrl: url })}
            />
        </div>
    );
}

// --- PLACES ---
export function PlacesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
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
            <AIGenerateButton onGenerate={handleAI} label="AI Recommendation" />

            <div className="space-y-6 mb-6">
                {items.map((item: any, i: number) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                        <button onClick={() => removeItem(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <InputField label="Nom du lieu" value={item.name} onChange={(v: string) => updateItem(i, "name", v)} />
                            </div>
                            <div className="col-span-2">
                                <TextAreaField label="Description" value={item.description} onChange={(v: string) => updateItem(i, "description", v)} />
                            </div>
                            <InputField label="Adresse" value={item.address} onChange={(v: string) => updateItem(i, "address", v)} />
                            <div className="col-span-1">
                                <InputField label="Lien URL (Site Web)" value={item.url} onChange={(v: string) => updateItem(i, "url", v)} />
                            </div>
                            <div className="col-span-1">
                                <InputField label="Lien Google Maps (Optionnel)" value={item.mapUrl} onChange={(v: string) => updateItem(i, "mapUrl", v)} />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Prix</label>
                                <select
                                    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none"
                                    value={item.priceLevel || "moderate"}
                                    onChange={(e) => updateItem(i, "priceLevel", e.target.value)}
                                >
                                    <option value="cheap">€ (Abordable)</option>
                                    <option value="moderate">€€ (Moyen)</option>
                                    <option value="expensive">€€€ (Luxe)</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <InputField
                                    label="Tags (séparés par virgule)"
                                    value={item.tags?.join(', ')}
                                    onChange={(v: string) => updateItem(i, "tags", v.split(',').map((s: string) => s.trim()))}
                                    placeholder="Romantique, Vue mer, Italien..."
                                />
                            </div>
                            <div className="col-span-2">
                                <FileUploader
                                    label="Image Principale"
                                    value={item.imageUrl}
                                    onUpload={(url) => updateItem(i, "imageUrl", url)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-gray-700">
                + Ajouter un lieu
            </button>
        </div>
    );
}

// --- EVENTS ---
export function EventsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
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
            <AIGenerateButton onGenerate={handleAI} label="Find Events" />

            <div className="space-y-6 mb-6">
                {items.map((item: any, i: number) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                        <button onClick={() => removeItem(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>

                        <InputField label="Titre de l'événement" value={item.title} onChange={(v: string) => updateItem(i, "title", v)} />
                        <div className="grid grid-cols-2 gap-3">
                            <InputField label="Mois (3 lettres)" value={item.month} onChange={(v: string) => updateItem(i, "month", v)} placeholder="JAN" />
                            <InputField label="Jour" value={item.day} onChange={(v: string) => updateItem(i, "day", v)} placeholder="01" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <InputField label="Heure" value={item.time} onChange={(v: string) => updateItem(i, "time", v)} placeholder="20:00" />
                            <InputField label="Lieu" value={item.location} onChange={(v: string) => updateItem(i, "location", v)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <InputField label="Lien URL (Site/Billeterie)" value={item.url} onChange={(v: string) => updateItem(i, "url", v)} placeholder="https://..." />
                            <InputField label="Lien Google Maps" value={item.mapUrl} onChange={(v: string) => updateItem(i, "mapUrl", v)} placeholder="https://goo.gl/maps/..." />
                        </div>
                        <TextAreaField label="Description" value={item.description} onChange={(v: string) => updateItem(i, "description", v)} />
                    </div>
                ))}
            </div>
            <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-gray-700">
                + Ajouter un événement
            </button>
        </div>
    );
}

// --- DOCUMENTS ---
export function DocumentsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
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

                        <InputField label="Nom du document" value={item.title} onChange={(v: string) => updateItem(i, "title", v)} />
                        <InputField label="URL du fichier (PDF...)" value={item.url} onChange={(v: string) => updateItem(i, "url", v)} />
                        <InputField label="Description courte" value={item.description} onChange={(v: string) => updateItem(i, "description", v)} />
                    </div>
                ))}
            </div>
            <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-gray-700">
                + Ajouter un document
            </button>
        </div>
    );
}

// --- UPSELLS ---
export function UpsellsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const items = Array.isArray(data.items) ? data.items : [];

    const updateItem = (index: number, key: string, val: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: val };
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        onChange({ ...data, items: [...items, { title: "", price: "" }] });
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_: any, i: number) => i !== index);
        onChange({ ...data, items: newItems });
    };

    return (
        <div>
            <div className="space-y-6 mb-6">
                {items.map((item: any, i: number) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                        <button onClick={() => removeItem(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">✕</button>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <InputField label="Titre" value={item.title} onChange={(v: string) => updateItem(i, "title", v)} />
                            </div>
                            <InputField label="Prix" value={item.price} onChange={(v: string) => updateItem(i, "price", v)} placeholder="25€" />
                        </div>
                        <TextAreaField label="Description" value={item.description} onChange={(v: string) => updateItem(i, "description", v)} />
                        <InputField label="Texte bouton" value={item.cta} onChange={(v: string) => updateItem(i, "cta", v)} placeholder="Réserver" />
                        <InputField label="Lien bouton" value={item.url} onChange={(v: string) => updateItem(i, "url", v)} />
                        <FileUploader
                            label="Image de l'offre"
                            value={item.imageUrl}
                            onUpload={(url) => updateItem(i, "imageUrl", url)}
                        />
                    </div>
                ))}
            </div>
            <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl font-bold text-gray-500 hover:text-gray-700">
                + Ajouter une offre
            </button>
        </div>
    );
}

// --- EMBED ---
export function EmbedEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    return (
        <div>
            <InputField
                label="URL à intégrer (Iframe)"
                value={data.url}
                onChange={(v: string) => onChange({ ...data, url: v })}
                placeholder="https://..."
            />
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                ⚠️ Assurez-vous que le site autorise l'intégration (X-Frame-Options).
            </div>
        </div>
    );
}
