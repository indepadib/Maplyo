import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { PRICING_BY_CURRENCY, CurrencyCode } from "@/lib/pricing/currencies";

// Initialize Stripe safely (Lazy)
const getStripe = () => {
    return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
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
        const { currency = 'MAD' } = body;

        const validCurrency = (currency as CurrencyCode) || 'MAD';
        const pricing = PRICING_BY_CURRENCY[validCurrency] || PRICING_BY_CURRENCY['MAD'];

        // Unit amount for 1 Extra Guide
        const unitAmount = Math.round(pricing.addon * 100);

        const session = await stripe.checkout.sessions.create({
            mode: "payment", // One-time payment
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: validCurrency.toLowerCase(),
                        product_data: {
                            name: `1 Guide Supplémentaire`,
                            description: `Augmentez votre limite de guides de 1 de manière permanente.`,
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.get("origin")}/dashboard?success_addon=true`,
            cancel_url: `${req.headers.get("origin")}/dashboard?canceled=true`,
            customer_email: user.email,
            metadata: {
                userId: user.id,
                type: 'addon_guide'
            }
        });

        return NextResponse.json({ url: session.url });

    } catch (err: any) {
        console.error("Stripe Addon Checkout Error:", err);

        // --- FALLBACK FOR DEMO ---
        if (err.type === 'StripeAuthenticationError' || err.message.includes("Invalid API Key")) {
            return NextResponse.json({
                url: `${req.headers.get("origin")}/dashboard?success_addon=true&mock=true`
            });
        }

        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
