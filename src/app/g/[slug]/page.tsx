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
                plan_variant,
                subscription_status
            )
        `)
        .eq("slug", slug)
        .single();

    const isPublished = guideData?.is_published;
    
    // Check if current visitor is the owner
    const { data: { user } } = await supabase.auth.getUser();
    const isOwner = user && user.id === guideData?.user_id;

    // @ts-ignore
    const profile = guideData?.profiles;
    const plan = profile?.plan_variant || 'pro'; 
    const status = profile?.subscription_status || 'free';

    // Access Logic:
    // 1. Owner can always see.
    // 2. Public can only see if:
    //    a. is_published is true
    //    b. Owner plan is NOT 'demo' (unless slug is specifically 'demo')
    //    c. Owner subscription status is 'active' or 'trialing'
    
    const isSubscriptionValid = plan !== 'demo' && (status === 'active' || status === 'trialing');
    const isPublicAllowed = isPublished && (isSubscriptionValid || slug === 'demo');
    let guide: Guide;

    if (guideData && (isOwner || isPublicAllowed)) {
        // SECURITY CHECK: If not owner and public access is restricted but somehow bypassed RLS or reached this point
        if (!isOwner && !isPublicAllowed) {
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
