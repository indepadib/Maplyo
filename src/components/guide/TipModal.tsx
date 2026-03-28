import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ExternalLink } from "lucide-react";

interface TipModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: string; // Added lang property
    tip: {
        title: string;
        text: string;
        location?: string;
        imageUrl?: string;
        mapUrl?: string;
        city?: string; // Added city property
    } | null;
}

export function TipModal({ isOpen, onClose, lang, tip }: TipModalProps) {
    if (!isOpen || !tip) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-[340px] md:max-w-sm bg-white rounded-[2rem] overflow-hidden shadow-2xl z-10 m-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative h-28 md:h-48 w-full overflow-hidden">
                        {tip.imageUrl ? (
                            <Image
                                src={tip.imageUrl}
                                alt={tip.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className={`w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center`}>
                                <div className="text-white opacity-20 text-5xl font-black">{tip.city?.slice(0, 2).toUpperCase() || "MA"}</div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 p-1.5 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="p-4 md:p-6 text-center md:text-left">
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 leading-tight">{tip.title}</h3>
                        <p className="text-xs md:text-base text-gray-600 mb-4 md:mb-6">{tip.text}</p>

                        {(tip.location || tip.mapUrl) && (
                            <a
                                href={tip.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tip.location || "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                            >
                                <MapPin size={18} />
                                {lang === 'fr' ? 'Voir sur la carte' : 'View on Map'}
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
