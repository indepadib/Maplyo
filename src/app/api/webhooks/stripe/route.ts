import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Helper for lazy init
const getStripe = () => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    return new Stripe(key, { apiVersion: "2025-01-27.acacia" as any });
};

// Init Supabase Admin (Bypass RLS to update user status)
// ...

// Init Supabase Admin (Bypass RLS to update user status)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature") as string;

    let event: Stripe.Event;

    // 1. Verify Signature
    try {
        const stripe = getStripe();
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`❌ Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }

    // 2. Handle Events
    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutCompleted(session);
                break;
            }
            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionUpdated(subscription);
                break;
            }
            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionDeleted(subscription);
                break;
            }
            default:
        }
    } catch (error: any) {
        console.error(`❌ Handler failed: ${error.message}`);
        return NextResponse.json({ error: "Handler Error" }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}

// --- HANDLERS ---

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId || 'pro'; // You should pass this in metadata

    if (!userId) {
        console.error("❌ No userId in session metadata:", session.id);
        return;
    }

    // Update Profile
    const { error } = await supabase
        .from("profiles")
        .update({
            subscription_status: "active",
            plan_variant: planId,
            stripe_customer_id: session.customer as string,
        })
        .eq("id", userId);

    if (error) console.error("❌ Supabase update failed:", error);
    else console.log(`✅ User ${userId} upgraded to ${planId}`);
}

async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
    const customerId = sub.customer as string;

    // Find user by stripe_customer_id
    const { data: profiles } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

    if (!profiles) return; // User not found (maybe mismatch)

    const status = sub.status; // active, past_due, etc.

    // Check for Add-ons (Extra Guides & Themes)
    // Check for Plans & Add-ons
    const addonPriceId = process.env.STRIPE_ADDON_PRICE_ID;
    const themesPriceId = process.env.STRIPE_THEMES_PRICE_ID;
    const proPriceId = process.env.STRIPE_PRO_PRICE_ID;
    const basicPriceId = process.env.STRIPE_BASIC_PRICE_ID;

    let extraGuides = 0;
    let themesUnlocked = false;
    let planVariant = null;

    if (sub.items && sub.items.data) {
        for (const item of sub.items.data) {
            const priceId = item.price.id;

            // Detect Plan
            if (priceId === proPriceId) planVariant = 'pro';
            else if (priceId === basicPriceId) planVariant = 'basic';

            // Detect Add-ons
            if (addonPriceId && priceId === addonPriceId) {
                extraGuides += (item.quantity || 0);
            }
            if (themesPriceId && priceId === themesPriceId) {
                themesUnlocked = true;
            }
        }
    }

    const updateData: any = {
        subscription_status: status,
        extra_guides: extraGuides,
        themes_unlocked: themesUnlocked
    };

    // Only update plan_variant if we found a recognized plan price
    if (planVariant) {
        updateData.plan_variant = planVariant;
    }

    await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", profiles.id);

    console.log(`🔄 Subscription updated for ${profiles.id}: Plan=${planVariant}, Status=${status}, Extra=${extraGuides}, Themes=${themesUnlocked}`);
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
    const customerId = sub.customer as string;

    const { data: profiles } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

    if (!profiles) return;

    await supabase
        .from("profiles")
        .update({
            subscription_status: "canceled",
            plan_variant: "free" // Revert to free? or keep as is?
        })
        .eq("id", profiles.id);

    console.log(`🚫 Subscription canceled for ${profiles.id}`);
}
