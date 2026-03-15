import { createClient } from "@supabase/supabase-js";
import { UserSubscription, PLANS, PlanId } from "@/types/subscription";

// Addons interface
interface UserAddons {
    themes?: boolean;
    extra_guides?: number;
}

// Use current project vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Helper check
import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserSubscription(userId: string, supabaseClient?: SupabaseClient): Promise<UserSubscription> {
    if (!userId) return { userId: 'anon', planId: 'demo', status: 'active', currentPeriodEnd: 0 };

    // Use provided client. If none, we can only return demo mode.
    const client = supabaseClient;
    if (!client) return { userId: userId || 'anon', planId: 'demo', status: 'active', currentPeriodEnd: 0 };

    const { data } = await client
        .from('profiles')
        .select('plan_variant, subscription_status, addons, extra_guides, themes_unlocked')
        .eq('id', userId)
        .single();

    const planId = (data?.plan_variant as PlanId) || 'demo';
    const status = (data?.subscription_status as any) || 'free';

    // Construct addons object from DB columns
    const addons = {
        themes: data?.themes_unlocked || false,
        extra_guides: data?.extra_guides || 0
    };

    return {
        userId: userId,
        planId: planId,
        status: status,
        currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000,
        addons: addons
    };
}

export function checkLimit(subscription: UserSubscription, resource: 'guides', currentCount: number): boolean {
    const plan = PLANS[subscription.planId as PlanId] || PLANS.demo;

    let limit = plan.limits[resource];

    // Check for add-ons
    // @ts-ignore
    if (subscription.addons?.extra_guides) {
        // @ts-ignore
        limit += subscription.addons.extra_guides;
    }

    return currentCount < limit;
}

export function canUseFeature(subscription: UserSubscription, feature: 'ai' | 'themes'): boolean {
    const plan = PLANS[subscription.planId as PlanId] || PLANS.demo;

    // 1. Check native plan limits
    if (plan.limits[feature]) return true;

    // 2. Check addons
    // @ts-ignore
    if (feature === 'themes' && subscription.addons?.themes) return true;

    return false;
}
