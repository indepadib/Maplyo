import { mockGuide } from "@/lib/mockGuide";
import { GuideClient } from "./GuideClient";

import { supabase } from "@/lib/supabase";
import type { Guide } from "@/types/blocks";

export default async function PublicGuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    // Fetch guide by slug (or id if you want to support both, but slug is cleaner for public)
    const { data } = await supabase
        .from("guides")
        .select("*")
        .eq("slug", slug)
        .single();
    
    let guide: Guide;

    if (data) {
        guide = {
            id: data.id,
            slug: data.slug,
            title: data.title,
            theme: { themeId: data.theme_id || "minimal-white" },
            blocks: data.content?.blocks || [],
            updatedAt: data.updated_at
        };
    } else {
        // Fallback for "demo" or not found -> Show a 404 block or generic Welcome
        guide = {
            id: "not-found",
            slug,
            title: "Guide Introuvable",
            theme: { themeId: "minimal-white" },
            blocks: [
                {
                    id: "404",
                    type: "welcome",
                    visibility: { mode: "always" },
                    data: {
                        title: "Guide Introuvable",
                        content: "Le guide que vous cherchez n'existe pas ou a été supprimé."
                    }
                }
            ]
        };
    }

    return (
        <main className="min-h-screen bg-white">
            <GuideClient guide={guide} />
        </main>
    );
}
