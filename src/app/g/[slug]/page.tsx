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

    // Fetch guide by slug (or id if you want to support both, but slug is cleaner for public)
    const { data } = await supabase
        .from("guides")
        .select("*, profiles!inner(plan_variant)")
        .eq("slug", slug)
        .eq("is_published", true) // Only fetch if published
        .single();

    let guide: Guide;

    if (data) {
        // SECURITY CHECK: If owner is on "Demo" plan, do NOT show guide publicly
        // Unless we are in a preview context (which this page isn't really, usually preview is in /builder)
        // But let's say /g/[slug] is strictly PUBLIC access.
        const plan = data.profiles?.plan_variant || 'demo';

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
            guide = {
                id: data.id,
                slug: data.slug,
                title: data.title,
                theme: { themeId: data.theme_id || "minimal-white" },
                blocks: data.content?.blocks || [],
                updatedAt: data.updated_at
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
