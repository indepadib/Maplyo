import { createClient } from "@supabase/supabase-js";
import { UserSubscription, PLANS } from "@/types/subscription";

// Initialize Supabase Client (Client-Side / Shared)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

// Helper check
export async function getUserSubscription(userId: string): Promise<UserSubscription> {
    // In a real app, this would fetch from a 'subscriptions' or 'profiles' table properly.
    // We will assume a 'profiles' table with 'plan' column.

    // const { data } = await supabase.from('profiles').select('plan, stripe_status').eq('id', userId).single();

    // MOCK FOR NOW until DB is confirmed
    return {
        userId: userId,
        planId: 'demo', // Default to demo
        status: 'active',
        currentPeriodEnd: Date.now() + 10000000
    };
}

export function checkLimit(planId: string, resource: 'guides', currentCount: number): boolean {
    // @ts-ignore
    const plan = PLANS[planId] || PLANS.demo;
    const limit = plan.limits[resource];
    return currentCount < limit;
}

export function canUseFeature(planId: string, feature: 'ai' | 'themes'): boolean {
    // @ts-ignore
    const plan = PLANS[planId] || PLANS.demo;
    return plan.limits[feature];
}
