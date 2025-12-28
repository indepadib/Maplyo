import { MinimalIcons } from "@/components/icons/MinimalIcons";
import { ExternalLink, Copy, Phone, MessageCircle, Mail } from "lucide-react";

// --- CHECK-IN / CHECK-OUT ---
export function CheckinTraveler({ data, title }: { data: any; title?: string }) {
    const time = data.time || "15:00";
    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-[32px] border border-gray-100">
                <div className="text-6xl font-black text-gray-900 tracking-tighter mb-2">{time}</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{title || "Arrivée"}</div>
            </div>

            {data.instruction && (
                <div className="prose prose-sm max-w-none text-gray-600 bg-white p-4 rounded-2xl border border-gray-100">
                    <p>{data.instruction}</p>
                </div>
            )}

            {data.videoUrl && (
                <div className="rounded-[24px] overflow-hidden bg-black aspect-video shadow-md">
                    <iframe
                        src={data.videoUrl.replace("watch?v=", "embed/")}
                        className="w-full h-full"
                        allowFullScreen
                        title="Video"
                    />
                </div>
            )}

            {data.images && data.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                    {data.images.map((img: string, i: number) => (
                        <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                            <img src={img} alt="Detail" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// --- LOCATION ---
export function LocationTraveler({ data }: { data: any }) {
    const address = data.address || "Adresse non renseignée";
    const mapUrl = data.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="space-y-6">
            <div className="aspect-video w-full rounded-[32px] overflow-hidden bg-gray-100 relative shadow-sm border border-gray-100 group">
                {data.address ? (
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={embedUrl}
                        className="grayscale hover:grayscale-0 transition-all duration-700"
                    />
                ) : (
                    <>
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-30 grayscale" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white p-3 rounded-full shadow-xl text-rose-500 animate-bounce">
                                <MinimalIcons.location className="w-8 h-8" />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="bg-gray-50 p-6 rounded-[24px] border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Adresse</h3>
                <p className="text-lg font-medium text-gray-900 leading-relaxed mb-4">{address}</p>

                <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors mb-2"
                >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ouvrir dans Google Maps
                </a>
                <button
                    onClick={() => navigator.clipboard.writeText(address)}
                    className="flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                    <Copy className="w-4 h-4 mr-2" />
                    Copier l'adresse
                </button>
            </div>
        </div>
    );
}

// --- CONTACT ---
export function ContactTraveler({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 mb-4 shadow-xl flex items-center justify-center text-4xl font-bold text-white">
                    {(data.name || "H").charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{data.name || "Hôte"}</h2>
                <p className="text-gray-500 font-medium">Votre hôte</p>
            </div>

            <div className="grid gap-3">
                {data.phone && (
                    <a href={`tel:${data.phone}`} className="flex items-center p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-bold text-gray-400 uppercase">Téléphone</div>
                            <div className="font-bold text-gray-900">{data.phone}</div>
                        </div>
                    </a>
                )}

                {data.whatsapp && (
                    <a href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="flex items-center p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-4">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-bold text-gray-400 uppercase">WhatsApp</div>
                            <div className="font-bold text-gray-900">Ouvrir la conversation</div>
                        </div>
                    </a>
                )}

                {data.email && (
                    <a href={`mailto:${data.email}`} className="flex items-center p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-bold text-gray-400 uppercase">Email</div>
                            <div className="font-bold text-gray-900">{data.email}</div>
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
}

// --- RULES ---
export function RulesTraveler({ data }: { data: any }) {
    const rules = Array.isArray(data.items) ? data.items : [];

    if (rules.length === 0) {
        return (
            <div className="text-center p-8 text-gray-400">
                <p>Aucune règle spécifiée</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {rules.map((rule: any, i: number) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {i + 1}
                    </div>
                    <div className="pt-1.5 font-medium text-gray-900">
                        {typeof rule === "string" ? rule : (rule.text || "")}
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- AMENITIES ---
export function AmenitiesTraveler({ data }: { data: any }) {
    const items = Array.isArray(data.items) ? data.items : [];

    if (items.length === 0) {
        return (
            <div className="text-center p-8 text-gray-400">
                <p>Aucun équipement spécifié</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3">
            {items.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <MinimalIcons.amenities className="w-4 h-4" />
                    </div>
                    <div className="font-medium text-gray-900 text-sm">
                        {typeof item === "string" ? item : (item.text || "")}
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- FAQ ---
export function FaqTraveler({ data }: { data: any }) {
    const items = Array.isArray(data.items) ? data.items : [];

    if (items.length === 0) {
        return (
            <div className="text-center p-8 text-gray-400">
                <p>Aucune question FAQ</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {items.map((item: any, i: number) => (
                <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                    <div className="font-bold text-gray-900 mb-2 flex gap-3">
                        <span className="text-blue-500">Q.</span>
                        {item.question || "Question"}
                    </div>
                    <div className="text-gray-600 pl-6 border-l-2 border-blue-100 italic">
                        {item.answer || "Réponse"}
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- TRASH ---
export function TrashTraveler({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-[24px] border border-gray-100 flex flex-col gap-4">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Gestion des Déchets</h3>
                    {data.location && <p className="text-gray-500 text-sm">{data.location}</p>}
                </div>
            </div>

            {data.imageUrl && (
                <div className="rounded-xl overflow-hidden aspect-video relative">
                    <img src={data.imageUrl} alt="Trash Location" className="w-full h-full object-cover" />
                </div>
            )}

            <div className="grid grid-cols-2 gap-3 mt-2">
                {data.trashDay && (
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                        <div className="text-[10px] font-bold uppercase text-gray-400 mb-1">Ordures</div>
                        <div className="font-bold text-gray-900">{data.trashDay}</div>
                    </div>
                )}
                {data.recyclingDay && (
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                        <div className="text-[10px] font-bold uppercase text-yellow-500 mb-1">Recyclage</div>
                        <div className="font-bold text-gray-900">{data.recyclingDay}</div>
                    </div>
                )}
            </div>
        </div>

            {
        data.instructions && (
            <div className="prose prose-sm max-w-none text-gray-600 bg-white p-4 rounded-2xl border border-gray-100">
                <p>{data.instructions}</p>
            </div>
        )
    }
        </div >
    );
}

// --- PARKING ---
export function ParkingTraveler({ data }: { data: any }) {
    const mapUrl = data.mapUrl || (data.location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}` : null);

    return (
        <div className="space-y-6">
            <div className="aspect-video w-full rounded-[32px] overflow-hidden bg-gray-100 relative shadow-sm border border-gray-100 group">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${data.imageUrl || 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80'}')` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <MinimalIcons.parking className="w-10 h-10 mb-2 opacity-90" />
                    {data.location && <h3 className="text-lg font-bold">{data.location}</h3>}
                    {data.cost && <div className="mt-2 inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase">{data.cost}</div>}
                </div>
            </div>

            {data.instructions && (
                <div className="prose prose-sm max-w-none text-gray-600 bg-white p-4 rounded-2xl border border-gray-100">
                    <p>{data.instructions}</p>
                </div>
            )}

            {mapUrl && (
                <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
                >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir sur la carte
                </a>
            )}
        </div>
    );
}

// --- BREAKFAST ---
export function BreakfastTraveler({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center justify-center p-8 bg-amber-50 rounded-[32px] border border-amber-100 relative overflow-hidden">
                <MinimalIcons.breakfast className="w-32 h-32 text-amber-500/10 absolute -top-4 -right-4" />

                {data.time && (
                    <div className="text-4xl font-black text-amber-900 tracking-tighter mb-2 relative z-10">
                        {data.time}
                    </div>
                )}
                <div className="text-sm font-bold text-amber-400 uppercase tracking-widest relative z-10">
                    {data.location || "Petit Déjeuner"}
                </div>
            </div>

            {data.menu && (
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Au Menu</h3>
                    <p className="text-gray-700 italic leading-relaxed">
                        "{data.menu}"
                    </p>
                </div>
            )}
        </div>
    );
}

// --- TRANSPORT ---
export function TransportTraveler({ data }: { data: any }) {
    const options = Array.isArray(data.options) ? data.options : [];

    const getIcon = (type: string) => {
        switch (type) {
            case "bus": return "🚌";
            case "train": return "🚆";
            case "taxi": return "🚕";
            case "bike": return "🚲";
            default: return "🚗";
        }
    };

    if (options.length === 0) return <div className="text-center text-gray-400 py-8">Aucune info transport</div>;

    return (
        <div className="space-y-3">
            {options.map((opt: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-2xl w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl">
                        {getIcon(opt.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">{opt.name}</h3>
                            {opt.phone && (
                                <a href={`tel:${opt.phone}`} className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200">
                                    Appeler
                                </a>
                            )}
                        </div>
                        {opt.description && <p className="text-sm text-gray-500 truncate">{opt.description}</p>}
                    </div>
                    {opt.url && (
                        <a href={opt.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-900">
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}
