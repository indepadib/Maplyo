"use client";

import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon?: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, icon, children }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-in">
                {/* Header */}
                <div className="sticky top-0 z-10 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-orange-50 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {icon && <span className="text-4xl">{icon}</span>}
                            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl bg-white hover:bg-rose-100 border border-rose-200 flex items-center justify-center text-gray-600 hover:text-rose-600 transition-all"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-4 md:p-6">
                    {children}
                </div>
            </div>

            <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}
