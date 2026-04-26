// --- SHARED UI HELPERS ---
import { FileUploader } from "@/components/ui/FileUploader";
import { useTranslation } from "@/components/providers/LanguageProvider";

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

// --- CHECK-IN / CHECK-OUT ---
export function CheckinEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    return (
        <div>
            <InputField
                label={t.editor.common.time}
                value={data.time}
                onChange={(v: string) => onChange({ ...data, time: v })}
                placeholder={t.editor.checkin.timePlaceholder}
            />
            <TextAreaField
                label={t.editor.common.instructions}
                value={data.instruction}
                onChange={(v: string) => onChange({ ...data, instruction: v })}
                placeholder={t.editor.checkin.instrPlaceholder}
            />
            <FileUploader
                label={t.editor.common.videoUrl}
                value={data.videoUrl}
                onUpload={(url) => onChange({ ...data, videoUrl: url })}
                accept="video/*"
            />
            <FileUploader
                label={`${t.editor.common.location} / Photo`}
                value={data.images?.[0]}
                onUpload={(url) => onChange({ ...data, images: url ? [url] : [] })}
            />
        </div>
    );
}

// --- LOCATION ---
export function LocationEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    return (
        <div>
            <InputField
                label={t.editor.common.address}
                value={data.address}
                onChange={(v: string) => onChange({ ...data, address: v })}
                placeholder={t.editor.common.placeholderAddress}
            />
            <InputField
                label={t.editor.common.mapUrl}
                value={data.googleMapsUrl}
                onChange={(v: string) => onChange({ ...data, googleMapsUrl: v })}
                placeholder={t.editor.common.placeholderMap}
            />
        </div>
    );
}

// --- CONTACT ---
export function ContactEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    return (
        <div>
            <InputField
                label={t.editor.contact.nameLabel}
                value={data.name}
                onChange={(v: string) => onChange({ ...data, name: v })}
                placeholder={t.editor.contact.namePlaceholder}
            />
            <InputField
                label={t.editor.common.phone}
                value={data.phone}
                onChange={(v: string) => onChange({ ...data, phone: v })}
                placeholder={t.editor.common.placeholderPhone}
            />
            <InputField
                label={t.editor.common.whatsapp}
                value={data.whatsapp}
                onChange={(v: string) => onChange({ ...data, whatsapp: v })}
                placeholder={t.editor.common.placeholderWhatsapp}
            />
            <InputField
                label={t.editor.common.email}
                value={data.email}
                onChange={(v: string) => onChange({ ...data, email: v })}
                placeholder={t.editor.common.placeholderEmail}
            />
        </div>
    );
}

// --- RULES ---
export function RulesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];

    const updateItem = (index: number, val: string) => {
        const newItems = [...items];
        newItems[index] = { text: val };
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        onChange({ ...data, items: [...items, { text: "" }] });
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_: any, i: number) => i !== index);
        onChange({ ...data, items: newItems });
    };

    return (
        <div>
            <div className="space-y-3 mb-4">
                {items.map((item: any, i: number) => (
                    <div key={i} className="flex gap-2">
                        <div className="flex-1">
                            <InputField
                                label={`${t.editor.rules.title} #${i + 1}`}
                                value={item.text || item} // Support legacy string array if any
                                onChange={(v: string) => updateItem(i, v)}
                                placeholder={t.editor.rules.placeholder}
                            />
                        </div>
                        <button
                            onClick={() => removeItem(i)}
                            className="mt-6 w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={addItem}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-gray-400 hover:text-gray-600 transition-all flex items-center justify-center gap-2"
            >
                <span>➕</span> {t.editor.rules.add}
            </button>
        </div>
    );
}

// --- AMENITIES ---
export function AmenitiesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];

    const updateItem = (index: number, val: string) => {
        const newItems = [...items];
        newItems[index] = { text: val };
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        onChange({ ...data, items: [...items, { text: "" }] });
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_: any, i: number) => i !== index);
        onChange({ ...data, items: newItems });
    };

    return (
        <div>
            <div className="space-y-3 mb-4">
                {items.map((item: any, i: number) => (
                    <div key={i} className="flex gap-2">
                        <div className="flex-1">
                            <InputField
                                label={`${t.editor.amenities.title} #${i + 1}`}
                                value={item.text || item}
                                onChange={(v: string) => updateItem(i, v)}
                                placeholder={t.editor.amenities.placeholder}
                            />
                        </div>
                        <button
                            onClick={() => removeItem(i)}
                            className="mt-6 w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={addItem}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-gray-400 hover:text-gray-600 transition-all flex items-center justify-center gap-2"
            >
                <span>➕</span> {t.editor.amenities.add}
            </button>
        </div>
    );
}

// --- FAQ ---
export function FaqEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    const items = Array.isArray(data.items) ? data.items : [];

    const updateItem = (index: number, key: string, val: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: val };
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        onChange({ ...data, items: [...items, { question: "", answer: "" }] });
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
                        <button
                            onClick={() => removeItem(i)}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                            ✕
                        </button>

                        <div className="mb-3 pr-8">
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">{t.editor.faq.question}</label>
                            <input
                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-bold text-gray-900 outline-none focus:border-blue-500"
                                value={item.question || ""}
                                onChange={(e) => updateItem(i, "question", e.target.value)}
                                placeholder={t.editor.faq.qPlaceholder}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">{t.editor.faq.answer}</label>
                            <textarea
                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 resize-none h-20"
                                value={item.answer || ""}
                                onChange={(e) => updateItem(i, "answer", e.target.value)}
                                placeholder={t.editor.faq.aPlaceholder}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addItem}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-gray-400 hover:text-gray-600 transition-all flex items-center justify-center gap-2"
            >
                <span>➕</span> {t.editor.faq.add}
            </button>
        </div>
    );
}

// --- TRASH ---
export function TrashEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    return (
        <div>
            <TextAreaField
                label={t.editor.common.instructions}
                value={data.instructions}
                onChange={(v: string) => onChange({ ...data, instructions: v })}
                placeholder={t.editor.trash.instrPlaceholder || "Ex: Le tri est obligatoire..."}
            />
            <div className="grid grid-cols-2 gap-4">
                <InputField
                    label={t.editor.trash.dayTrash}
                    value={data.trashDay}
                    onChange={(v: string) => onChange({ ...data, trashDay: v })}
                    placeholder={t.editor.trash.dayTrashPlaceholder || "ex: Lundi soir"}
                />
                <InputField
                    label={t.editor.trash.dayRecycling}
                    value={data.recyclingDay}
                    onChange={(v: string) => onChange({ ...data, recyclingDay: v })}
                    placeholder={t.editor.trash.dayRecyclingPlaceholder || "ex: Jeudi matin"}
                />
            </div>
            <InputField
                label={t.editor.trash.location}
                value={data.location}
                onChange={(v: string) => onChange({ ...data, location: v })}
                placeholder={t.editor.trash.locPlaceholder || "ex: Dans le garage, au fond à droite"}
            />
            <InputField
                label={t.editor.common.mapUrl}
                value={data.mapUrl}
                onChange={(v: string) => onChange({ ...data, mapUrl: v })}
                placeholder="https://maps.google.com/..."
            />
            <FileUploader
                label={t.editor.trash.photoLocal}
                value={data.imageUrl}
                onUpload={(url) => onChange({ ...data, imageUrl: url })}
            />
        </div>
    );
}

// --- PARKING ---
export function ParkingEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    return (
        <div>
            <TextAreaField
                label={t.editor.common.instructions}
                value={data.instructions}
                onChange={(v: string) => onChange({ ...data, instructions: v })}
                placeholder={t.editor.parking.instrPlaceholder || "Ex: Garez-vous sur la place N°42 only."}
            />
            <InputField
                label={`${t.editor.common.location} / ${t.editor.common.address}`}
                value={data.location}
                onChange={(v: string) => onChange({ ...data, location: v })}
                placeholder={t.editor.parking.locPlaceholder || "ex: Parking Indigo, 2 rue de la Paix"}
            />
            <div className="grid grid-cols-2 gap-4">
                <InputField
                    label={t.editor.common.cost}
                    value={data.cost}
                    onChange={(v: string) => onChange({ ...data, cost: v })}
                    placeholder={t.editor.parking.costPlaceholder}
                />
                <InputField
                    label={t.editor.common.mapUrl}
                    value={data.mapUrl}
                    onChange={(v: string) => onChange({ ...data, mapUrl: v })}
                    placeholder={t.editor.common.placeholderMap}
                />
            </div>
            <FileUploader
                label={t.editor.parking.photo}
                value={data.imageUrl}
                onUpload={(url) => onChange({ ...data, imageUrl: url })}
            />
        </div>
    );
}

// --- BREAKFAST ---
export function BreakfastEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    return (
        <div>
            <InputField
                label={t.editor.common.hours}
                value={data.time}
                onChange={(v: string) => onChange({ ...data, time: v })}
                placeholder={t.editor.breakfast.hoursPlaceholder || "ex: 07:00 - 10:30"}
            />
            <InputField
                label={t.editor.common.location}
                value={data.location}
                onChange={(v: string) => onChange({ ...data, location: v })}
                placeholder={t.editor.breakfast.locPlaceholder || "ex: Salle à manger, RDC"}
            />
            <TextAreaField
                label={t.editor.breakfast.menu}
                value={data.menu}
                onChange={(v: string) => onChange({ ...data, menu: v })}
                placeholder={t.editor.breakfast.menuPlaceholder}
            />
        </div>
    );
}

// --- TRANSPORT ---
export function TransportEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const { t } = useTranslation();
    const options = Array.isArray(data.options) ? data.options : [];

    const updateOption = (index: number, key: string, val: string) => {
        const newOptions = [...options];
        newOptions[index] = { ...newOptions[index], [key]: val };
        onChange({ ...data, options: newOptions });
    };

    const addOption = () => {
        onChange({ ...data, options: [...options, { type: "other", name: "", description: "" }] });
    };

    const removeOption = (index: number) => {
        const newOptions = options.filter((_: any, i: number) => i !== index);
        onChange({ ...data, options: newOptions });
    };

    return (
        <div>
            <div className="space-y-6 mb-6">
                {options.map((item: any, i: number) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                        <button
                            onClick={() => removeOption(i)}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                            ✕
                        </button>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Type</label>
                                <select
                                    className="w-full h-10 bg-white border border-gray-300 rounded-lg px-3 text-sm font-bold text-gray-900 outline-none focus:border-blue-500"
                                    value={item.type || "other"}
                                    onChange={(e) => updateOption(i, "type", e.target.value)}
                                >
                                    <option value="bus">{t.editor.transport.bus}</option>
                                    <option value="train">{t.editor.transport.train}</option>
                                    <option value="taxi">{t.editor.transport.taxi}</option>
                                    <option value="bike">{t.editor.transport.bike}</option>
                                    <option value="other">{t.editor.common.other}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">{t.editor.common.title}</label>
                                <input
                                    className="w-full h-10 bg-white border border-gray-300 rounded-lg px-3 text-sm font-bold text-gray-900 outline-none focus:border-blue-500"
                                    value={item.name || ""}
                                    onChange={(e) => updateOption(i, "name", e.target.value)}
                                    placeholder={t.editor.transport.linePlaceholder || "ex: Ligne 4"}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">{t.editor.transport.stop}</label>
                            <input
                                className="w-full h-10 bg-white border border-gray-300 rounded-lg px-3 text-sm text-gray-700 outline-none focus:border-blue-500"
                                value={item.description || ""}
                                onChange={(e) => updateOption(i, "description", e.target.value)}
                                placeholder={t.editor.transport.stopPlaceholder || "ex: Arrêt 'Hôtel de Ville' à 5min"}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Link (Opt)</label>
                                <input
                                    className="w-full h-10 bg-white border border-gray-300 rounded-lg px-3 text-sm text-gray-700 outline-none focus:border-blue-500"
                                    value={item.url || ""}
                                    onChange={(e) => updateOption(i, "url", e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">{t.editor.common.phone} (Opt)</label>
                                <input
                                    className="w-full h-10 bg-white border border-gray-300 rounded-lg px-3 text-sm text-gray-700 outline-none focus:border-blue-500"
                                    value={item.phone || ""}
                                    onChange={(e) => updateOption(i, "phone", e.target.value)}
                                    placeholder="+33..."
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addOption}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-gray-400 hover:text-gray-600 transition-all flex items-center justify-center gap-2"
            >
                <span>➕</span> {t.editor.transport.add}
            </button>
        </div>
    );
}
