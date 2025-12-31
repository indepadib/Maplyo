import { mockGuide } from "@/lib/mockGuide";
import { GuideClient } from "./GuideClient";

import { supabase } from "@/lib/supabase";
import type { Guide } from "@/types/blocks";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    // Fetch minimal guide info for metadata
    const { data } = await supabase
        .from("guides")
        .select("title, content")
        .eq("slug", slug)
        .single();

    if (!data) {
        return {
            title: "Guide introuvable | Maplyo",
        };
    }

    // Try to find a cover image in the blocks, otherwise use default
    // This is a simplification; in a real app check specific block types
    const title = data.title || "Votre Guide Numérique";

    return {
        title: `${title} | Maplyo`,
        description: `Consultez le guide numérique pour ${title}. Toutes les infos pratiques, codes wifi, et bonnes adresses.`,
        openGraph: {
            title: title,
            description: "Accédez à toutes les informations de votre séjour.",
            images: ['/api/og?title=' + encodeURIComponent(title)], // Optional: placeholder for dynamic OG image generation later
        }
    };
}

export default async function PublicGuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // 1. Fetch guide first (NO JOINS) to ensure we find it if it exists
    const { data: guideData, error: guideError } = await supabase
        .from("guides")
        .select("*")
        .eq("slug", slug)
        .single();

    // Debug info: Check if is_published matches
    let isPublished = guideData?.is_published;

    // Handle "Draft" state manually for clarity
    if (guideData && !isPublished) {
        // Return 404-like state but we know it exists
        console.log("Guide found but not published:", slug);
    }

    // 2. If found and published, fetch profile separately
    let guide: Guide;

    if (guideData && isPublished) {
        // Fetch plan separately (safer than join with RLS)
        const { data: profileData } = await supabase
            .from("profiles")
            .select("plan_variant")
            .eq("id", guideData.user_id)
            .single();

        const plan = profileData?.plan_variant || 'demo';

        // SECURITY CHECK: If owner is on "Demo" plan, do NOT show guide publicly
        if (plan === 'demo' && slug !== 'demo') {
            // Fallback to "Restricted" view
            guide = {
                id: "restricted",
                slug,
                title: "Guide Privé",
                theme: { themeId: "minimal-white" },
                blocks: [
                    {
                        id: "restricted",
                        type: "welcome",
                        visibility: { mode: "always" },
                        data: {
                            title: "Guide Privé",
                            content: "Ce guide est en mode démonstration et n'est pas accessible au public. Veuillez contacter l'hôte."
                        }
                    }
                ]
            };
        } else {
            // Success: Full Guide
            guide = {
                id: guideData.id,
                slug: guideData.slug,
                title: guideData.title,
                theme: { themeId: guideData.theme_id || "minimal-white" },
                blocks: guideData.content?.blocks || [],
                updatedAt: guideData.updated_at
            };
        }
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
