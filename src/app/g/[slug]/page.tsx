import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Metadata } from "next";
import type { Guide } from "@/types/blocks";
import { GuideClient } from "./GuideClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createSupabaseServerClient();

    // Fetch minimal guide info for metadata
    const { data } = await supabase
        .from("guides")
        .select("title, content")
        .eq("slug", slug)
        .single();
// ... (rest of metadata)

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
    const supabase = await createSupabaseServerClient();

    // 1. Fetch guide WITH owner profile plan in one shot (joined query)
    // This is more resilient for public views
    const { data: guideData, error: guideError } = await supabase
        .from("guides")
        .select(`
            *,
            profiles:user_id (
                plan_variant
            )
        `)
        .eq("slug", slug)
        .single();

    const isPublished = guideData?.is_published;
    
    // @ts-ignore
    const plan = guideData?.profiles?.plan_variant || 'pro'; // Default to pro if published to avoid false demo locks

    let guide: Guide;

    if (guideData && isPublished) {
        // SECURITY CHECK: If owner is on "Demo" plan, do NOT show guide publicly
        if (plan === 'demo' && slug !== 'demo') {
            // Fallback to "Restricted" view
// ...
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
