import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ExternalLink } from "lucide-react";

interface TipModalProps {
    isOpen: boolean;
    onClose: () => void;
    tip: {
        title: string;
        text: string;
        location?: string;
        imageUrl?: string;
        mapUrl?: string;
    } | null;
}

export function TipModal({ isOpen, onClose, tip }: TipModalProps) {
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
                    className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {tip.imageUrl ? (
                        <div className="h-48 relative">
                            <img src={tip.imageUrl} alt={tip.title} className="w-full h-full object-cover" />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="h-24 bg-gradient-to-br from-rose-500 to-purple-600 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}

                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                        <p className="text-gray-600 mb-6">{tip.text}</p>

                        {(tip.location || tip.mapUrl) && (
                            <a
                                href={tip.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tip.location || "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                            >
                                <MapPin size={18} />
                                Voir sur la carte
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
