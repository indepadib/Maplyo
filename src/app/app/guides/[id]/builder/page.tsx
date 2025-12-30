import { EnhancedBuilder } from "@/components/builder/EnhancedBuilder";
import { BlockType } from "@/types/blocks";
import { createSupabaseServerClient } from "@/lib/supabase-server"; // NEW
import { getUserSubscription } from "@/lib/subscription";

export default async function GuideBuilderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createSupabaseServerClient(); // NEW

    // Get Current User
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    console.log("Builder Server Debug:", {
        hasUser: !!user,
        userId: user?.id,
        authError: authError?.message,
        cookies: (await import("next/headers")).cookies().toString()
    });

    // In a real app we should redirect if no user
    if (!user) {
        // redirect('/login'); 
    }

    const subscription = await getUserSubscription(user?.id || 'anon', supabase);
    console.log("Builder Subscription Debug:", subscription);

    // Fetch from Supabase
    const { data, error } = await supabase
        .from("guides")
        .select("*")
        .eq("id", id)
        .single();

    let initialGuide;

    if (data) {
        // Map DB data to Guide type
        initialGuide = {
            id: data.id,
            slug: data.slug,
            title: data.title,
            theme: { themeId: data.theme_id || "minimal-white" },
            blocks: data.content?.blocks || [],
            updatedAt: data.updated_at,
            isPublished: data.is_published || false
        };
    } else {
        // Fallback or Create (should ideally not happen if created from Dashboard, but useful for direct access/dev)
        initialGuide = {
            id: id,
            slug: id as string,
            title: "Nouveau Guide",
            theme: { themeId: "minimal-white" },
            blocks: [
                {
                    id: "hero-1",
                    type: "hero" as BlockType,
                    title: "Hero",
                    visibility: { mode: "always" },
                    data: {
                        title: "Bienvenue",
                        subtitle: "Votre guide personnel",
                        coverImageUrl: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1200&q=80",
                        badges: ["Wi-Fi", "Piscine"]
                    }
                }
            ]
        };
    }

    return <EnhancedBuilder initialGuide={initialGuide as any} subscription={subscription} />;
}
