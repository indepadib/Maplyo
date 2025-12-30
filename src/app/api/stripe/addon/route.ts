import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const getStripe = () => {
    return new Stripe(process.env.STRIPE_SECRET_KEY || "", {
        apiVersion: "2025-01-27.acacia" as any,
    });
};

export async function POST(req: Request) {
    try {
        const stripe = getStripe();
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Validate User
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey, {
            global: { headers: { Authorization: authHeader } }
        });

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get Profile to find Stripe Customer ID
        const { data: profile } = await supabase
            .from("profiles")
            .select("stripe_customer_id, plan_variant, extra_guides")
            .eq("id", user.id)
            .single();

        if (!profile?.stripe_customer_id) {
            return NextResponse.json({ error: "No Subscription Found" }, { status: 404 });
        }

        // Get Active Subscription
        const subscriptions = await stripe.subscriptions.list({
            customer: profile.stripe_customer_id,
            status: 'active',
            limit: 1,
            expand: ['data.items']
        });

        if (subscriptions.data.length === 0) {
            return NextResponse.json({ error: "No Active Subscription" }, { status: 400 });
        }

        const subscription = subscriptions.data[0];
        const addonPriceId = process.env.STRIPE_ADDON_PRICE_ID;

        if (!addonPriceId) {
            return NextResponse.json({ error: "Server Error: Missing Addon ID" }, { status: 500 });
        }

        // Check if user already has this item
        const existingItem = subscription.items.data.find(item => item.price.id === addonPriceId);

        if (existingItem) {
            // Update Quantity
            await stripe.subscriptionItems.update(existingItem.id, {
                quantity: (existingItem.quantity || 0) + 1,
                proration_behavior: 'always_invoice' // Charge immediately
            });
        } else {
            // Create new Item
            await stripe.subscriptionItems.create({
                subscription: subscription.id,
                price: addonPriceId,
                quantity: 1,
                proration_behavior: 'always_invoice'
            });
        }

        return NextResponse.json({ success: true, message: "Guide added successfully" });

    } catch (error: any) {
        console.error("Addon Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
