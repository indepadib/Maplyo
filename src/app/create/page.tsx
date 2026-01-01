"use client";

import { EnhancedBuilder } from "@/components/builder/EnhancedBuilder";
import { Guide } from "@/types/blocks";
import { useRouter } from "next/navigation";

// Initial Demo State
const DEMO_GUIDE: Guide = {
    id: "demo-guide",
    slug: "demo-appart-paris",
    title: "Mon Guide Demo",
    theme: { themeId: "theme-minimal-dark" },
    blocks: [
        { id: "h1", type: "hero", data: { title: "Bienvenue !", subtitle: "Découvrez Paris comme un local", coverImageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2946&auto=format&fit=crop" } },
        { id: "w1", type: "wifi", data: { networkName: "Superhost_Wifi", password: "ilovemaplyo" } },
        { id: "l1", type: "location", data: { address: "Tour Eiffel, Paris" } }
    ],
    user_id: "demo-user",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published: false,
    isPublished: false
};

export default function DemoPage() {
    const router = useRouter();

    const handleSaveAttempt = (guide: Guide) => {
        // Save to local storage to potentially recover after signup
        if (typeof window !== 'undefined') {
            localStorage.setItem('maplyo_demo_guide', JSON.stringify(guide));
        }
        // Redirect to signup
        router.push('/signup?ref=demo_save');
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="bg-rose-600 px-4 py-2 text-center text-white text-sm font-bold shadow-lg z-50 relative">
                MODE DÉMO • Les modifications ne sont pas enregistrées. <a href="/signup" className="underline opacity-90 hover:opacity-100">Créer un compte</a> pour sauvegarder.
            </div>
            <EnhancedBuilder
                initialGuide={DEMO_GUIDE}
                onSave={handleSaveAttempt}
                isDemoMode={true}
            />
        </div>
    );
}
