
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Initialize Stripe safely
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2025-12-15.clover" as any,
});

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Validate user via Supabase
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

        const supabase = createClient(
            supabaseUrl,
            supabaseKey,
            {
                global: { headers: { Authorization: authHeader } }
            }
        );
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { plan } = body; // 'pro'

        // Mock price ID for demo (replace with real Stripe Price ID)
        // In production: const priceId = "price_1Q...";
        // For testing use: 'price_1Q...' (Test mode price)
        const priceId = process.env.STRIPE_PRO_PRICE_ID || "price_H5ggYwtDq4fbrJ";

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.get("origin")}/dashboard?success=true`,
            cancel_url: `${req.headers.get("origin")}/onboarding?canceled=true`,
            customer_email: user.email,
            metadata: {
                userId: user.id
            }
        });

        return NextResponse.json({ url: session.url });

    } catch (err: any) {
        console.error("Stripe Checkout Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
