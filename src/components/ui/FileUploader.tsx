"use client";

import { useState } from "react";
import { Upload, Loader2, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface FileUploaderProps {
    value?: string;
    onUpload: (url: string) => void;
    label?: string;
    accept?: string;
    maxSize?: number; // in MB
}

export function FileUploader({ value, onUpload, label = "Upload Image", accept = "image/*", maxSize = 5 }: FileUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > maxSize * 1024 * 1024) {
            setError(`Fichier trop volumineux (Max ${maxSize}MB)`);
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media') // Assumes 'media' bucket exists
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            onUpload(data.publicUrl);
        } catch (err: any) {
            console.error("Upload error:", err);
            setError("Erreur lors de l'upload. Vérifiez votre connexion.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mb-4">
            {label && <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">{label}</label>}

            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video flex items-center justify-center">
                    {accept.startsWith('image') ? (
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-gray-500 font-medium truncate px-4">{value}</div>
                    )}

                    <button
                        onClick={() => onUpload("")}
                        className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleFile}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={uploading}
                    />
                    <div className={`border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors ${uploading ? 'bg-gray-50' : 'hover:bg-gray-50 hover:border-gray-400'}`}>
                        {uploading ? (
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                        ) : (
                            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2">
                                <Upload className="w-5 h-5" />
                            </div>
                        )}
                        <p className="text-sm font-bold text-gray-700">
                            {uploading ? "Upload en cours..." : "Cliquez pour Uploader"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, MP4 (Max {maxSize}MB)</p>
                    </div>
                </div>
            )}
            {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
        </div>
    );
}
