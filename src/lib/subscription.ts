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
        planId: 'free', // Default to free for everyone
        status: 'active'
    };
}

export function checkLimit(planId: 'free' | 'pro', resource: 'guides' | 'blocks', currentCount: number): boolean {
    const plan = PLANS[planId];
    const limit = plan.limits[resource];
    return currentCount < limit;
}

export function canUseFeature(planId: 'free' | 'pro', feature: 'mediaUploads' | 'aiTips'): boolean {
    return PLANS[planId].limits[feature];
}
