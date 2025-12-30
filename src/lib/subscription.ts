import { createClient } from "@supabase/supabase-js";
import { UserSubscription, PLANS, PlanId } from "@/types/subscription";

// Addons interface
interface UserAddons {
    themes?: boolean;
    extra_guides?: number;
}

// Initialize Supabase Client (Client-Side / Shared)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper check
export async function getUserSubscription(userId: string): Promise<UserSubscription> {
    if (!userId) return { userId: 'anon', planId: 'demo', status: 'active', currentPeriodEnd: 0 };

    const { data } = await supabase
        .from('profiles')
        .select('plan_variant, subscription_status, addons')
        .eq('id', userId)
        .single();

    const planId = (data?.plan_variant as PlanId) || 'demo';
    const status = (data?.subscription_status as any) || 'free';
    const addons = (data?.addons as UserAddons) || {};

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
