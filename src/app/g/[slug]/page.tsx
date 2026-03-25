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
    const isDebug = sParams.debug === '1';

    const supabase = await createSupabaseServerClient();

    // 1. Fetch guide WITH owner profile plan in one shot (joined query)
    let mainQuery = supabase
        .from("guides")
        .select(`
            *,
            profiles:user_id (
                id,
                plan_variant,
                subscription_status
            )
        `);

    const slugLower = slugify(slug);
    if (slug.length === 36 && /^[0-9a-f-]+$/i.test(slug)) {
        mainQuery = mainQuery.or(`id.eq.${slug},slug.eq.${slug},slug.eq.${slugLower}`);
    } else {
        mainQuery = mainQuery.or(`slug.eq.${slug},slug.eq.${slugLower}`);
    }

    let { data: guideData, error: guideError } = await mainQuery.single();

    // 2.5 SUPER-RESILIENT REVERSE LOOKUP (Search by Title matching slug)
    if (!guideData && !guideError) {
        const { data: allGuides } = await supabase.from("guides").select("*, profiles:user_id(id, plan_variant, subscription_status)");
        guideData = allGuides?.find(g => slugify(g.title || '') === slugLower) || null;
    }

    // Check if current visitor is the owner
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    const isOwner = currentUser && currentUser.id === guideData?.user_id;

    // @ts-ignore
    const profile = guideData?.profiles;
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
            {isDebug && (
                <div className="fixed bottom-4 right-4 z-50 p-4 bg-black/90 text-green-400 text-[10px] font-mono rounded-xl border border-green-900/50 max-w-xs shadow-2xl backdrop-blur-md">
                    <p className="font-bold border-b border-green-900/50 mb-1 pb-1">DEBUG INFO</p>
                    <p>Slug: {slug}</p>
                    <p>Found: {guideData ? "YES" : "NO"}</p>
                    {guideError && <p className="text-red-400">Error: {guideError.message}</p>}
                    {guideData && (
                        <>
                            <p>GuideID: {guideData.id.slice(0,8)}...</p>
                            <p>IsPublished: {String(guideData.is_published)}</p>
                            <p>OwnerID: {guideData.user_id?.slice(0,8)}...</p>
                            <p>Plan: {plan}</p>
                            <p>Status: {status}</p>
                            <p>IsOwner: {String(isOwner)}</p>
                            <p>PublicAllowed: {String(isPublicAllowed)}</p>
                        </>
                    )}
                </div>
            )}
            <GuideClient guide={guide} />
        </main>
    );
}
