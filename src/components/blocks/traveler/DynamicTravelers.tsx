import { ExternalLink, Calendar, MapPin, FileText, Download, ShoppingBag } from "lucide-react";

// --- WELCOME (Text/Rich Content) ---
export function WelcomeTraveler({ data }: { data: any }) {
    return (
        <div className="space-y-4">
            {data.imageUrl && (
                <div className="rounded-2xl overflow-hidden aspect-video shadow-sm">
                    <img src={data.imageUrl} alt="Welcome" className="w-full h-full object-cover" />
                </div>
            )}
            <div className="prose prose-sm max-w-none text-gray-600 bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{data.title || "Bienvenue"}</h3>
                <div className="whitespace-pre-wrap">{data.content || "Bienvenue dans notre guide !"}</div>
            </div>
        </div>
    );
}

// --- PLACES (Recommendations) ---
export function PlacesTraveler({ data }: { data: any }) {
    const items = Array.isArray(data.items) ? data.items : [];

    if (items.length === 0) return <div className="text-center p-8 text-gray-400">Aucune recommandation</div>;

    return (
        <div className="space-y-4">
            {items.map((item: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {item.imageUrl && (
                        <div className="h-32 bg-gray-100">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-900">{item.name || "Lieu"}</h4>
                            {item.url && (
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-gray-50 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                        {item.description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>}
                        {item.address && (
                            <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-gray-500">
                                <MapPin className="w-3.5 h-3.5" />
                                {item.address}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- EVENTS (Calendar) ---
export function EventsTraveler({ data }: { data: any }) {
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
                    <div>
                        <h4 className="font-bold text-gray-900 leading-tight mb-1">{item.title || "Événement"}</h4>
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
                            {item.time && <span>⏰ {item.time}</span>}
                            {item.location && <span>📍 {item.location}</span>}
                        </div>
                        {item.description && <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- DOCUMENTS (Files) ---
export function DocumentsTraveler({ data }: { data: any }) {
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
                        <div className="font-bold text-gray-900">{item.title || "Document"}</div>
                        {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
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
    const items = Array.isArray(data.items) ? data.items : [];

    if (items.length === 0) return <div className="text-center p-8 text-gray-400">Aucune offre</div>;

    return (
        <div className="space-y-4">
            {items.map((item: any, i: number) => (
                <div key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    {item.imageUrl && (
                        <div className="h-40 overflow-hidden">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                    )}
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-gray-900">{item.title || "Offre"}</h4>
                            {item.price && (
                                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                                    {item.price}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>

                        {item.url && (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
                            >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                {item.cta || "Réserver"}
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
