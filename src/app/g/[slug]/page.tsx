import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Metadata } from "next";
import type { Guide } from "@/types/blocks";
import { GuideClient } from "./GuideClient";
import { slugify } from "@/lib/utils/slugify";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createSupabaseServerClient();
    const slugLower = slugify(slug);

    let query = supabase
        .from("guides")
        .select("title, content, slug, id");

    if (slug.length === 36 && /^[0-9a-f-]+$/i.test(slug)) {
        query = query.or(`id.eq.${slug},slug.eq.${slug},slug.eq.${slugLower}`);
    } else {
        query = query.or(`slug.eq.${slug},slug.eq.${slugLower}`);
    }

    let { data } = await query.single();

    if (!data) {
        const { data: all } = await supabase.from("guides").select("title, slug, id, content");
        data = all?.find(g => slugify(g.title || '') === slugLower) || null;
    }

    if (!data) {
        return {
            title: "Guide introuvable | Maplyo",
        };
    }

    const title = data.title || "Votre Guide Numérique";

    return {
        title: `${title} | Maplyo`,
        description: `Consultez le guide numérique pour ${title}. Toutes les infos pratiques, codes wifi, et bonnes adresses.`,
        openGraph: {
            title: title,
            description: "Accédez à toutes les informations de votre séjour.",
            images: ['/api/og?title=' + encodeURIComponent(title)],
        }
    };
}

export default async function PublicGuidePage({ 
    params, 
    searchParams 
}: { 
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { slug } = await params;
    const sParams = await searchParams;

    const supabase = await createSupabaseServerClient();

    // 1. Fetch guide first (without join to avoid schema cache issues)
    const slugLower = slugify(slug);
    let query = supabase.from("guides").select("*");

    if (slug.length === 36 && /^[0-9a-f-]+$/i.test(slug)) {
        query = query.or(`id.eq.${slug},slug.eq.${slug},slug.eq.${slugLower}`);
    } else {
        query = query.or(`slug.eq.${slug},slug.eq.${slugLower}`);
    }

    let { data: guideData } = await query.single();

    // 2. SUPER-RESILIENT REVERSE LOOKUP (Search by Title matching slug)
    if (!guideData) {
        const { data: allGuides } = await supabase.from("guides").select("*");
        guideData = allGuides?.find(g => slugify(g.title || '') === slugLower) || null;
    }

    // 3. Fetch Profile separately (Avoid join errors)
    let profile = null;
    if (guideData?.user_id) {
        const { data: pData } = await supabase
            .from('profiles')
            .select('plan_variant, subscription_status')
            .eq('id', guideData.user_id)
            .single();
        profile = pData;
    }

    // Check if current visitor is the owner
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    const isOwner = currentUser && currentUser.id === guideData?.user_id;

    const plan = profile?.plan_variant || 'pro'; 
    const status = profile?.subscription_status || 'active';

    const isSubscriptionValid = plan !== 'demo' && (status === 'active' || status === 'trialing' || status === 'free');
    const guideIsPublished = guideData?.is_published !== false; 
    const isPublicAllowed = guideIsPublished || isSubscriptionValid || slug === 'demo';

    let guide: Guide;

    if (guideData && (isOwner || isPublicAllowed)) {
        if (!isOwner && !isPublicAllowed) {
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
                id: guideData.id,
                slug: guideData.slug,
                title: guideData.title,
                theme: { themeId: guideData.theme_id || "minimal-white" },
                blocks: guideData.content?.blocks || [],
                updatedAt: guideData.updated_at
            };

            // Track view asynchronously if not owner
            if (!isOwner) {
                supabase.from("guide_views").insert({ guide_id: guide.id }).then();
            }
        }
    } else {
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
