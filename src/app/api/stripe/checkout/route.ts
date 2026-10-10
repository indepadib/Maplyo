import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { z } from "zod";
import { PRICING_BY_CURRENCY, type CurrencyCode } from "@/lib/pricing/currencies";

const CheckoutSchema = z.object({
  plan: z.enum(["basic","pro"]),
  currency: z.enum(["MAD","EUR","GBP","USD"]).default("MAD"),
  billingCycle: z.enum(["monthly","annual"]).default("monthly"),
  ref: z.string().max(120).optional(),
});

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes("placeholder")) {
    throw new Error("Stripe is not configured");
  }
  return new Stripe(key, { apiVersion: "2025-01-27.acacia" as any });
}

function getBaseUrl(req: Request) {
  const configured = process.env.URL || process.env.NEXT_PUBLIC_APP_URL;
  if (configured) return configured.replace(/\/$/, "");

  const origin = req.headers.get("origin") || "";
  try {
    const parsed = new URL(origin);
    if (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "maplyo.com" ||
      parsed.hostname.endsWith(".maplyo.com") ||
      parsed.hostname.endsWith(".netlify.app")
    ) {
      return parsed.origin;
    }
  } catch {}

  return "https://maplyo.com";
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Billing unavailable" }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = CheckoutSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid checkout request" }, { status: 400 });
    }

    const { plan, currency, billingCycle, ref } = parsed.data;
    const pricing = PRICING_BY_CURRENCY[currency as CurrencyCode] || PRICING_BY_CURRENCY.MAD;
    const monthlyPrice = pricing[plan];
    const annual = billingCycle === "annual";
    const chargeAmount = annual ? monthlyPrice * 10 : monthlyPrice;
    const unitAmount = Math.round(chargeAmount * 100);

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();

    const stripe = getStripe();
    const baseUrl = getBaseUrl(req);

    const metadata = {
      userId: user.id,
      planId: plan,
      billingCycle,
      acquisitionRef: ref || "",
    };

    const customerFields = profile?.stripe_customer_id
      ? { customer: profile.stripe_customer_id as string }
      : { customer_email: user.email };

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ...customerFields,
      client_reference_id: user.id,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `Maplyo ${plan === "pro" ? "Pro" : "Basic"} · ${annual ? "Annual" : "Monthly"}`,
              description: plan === "pro"
                ? "2 published guides included, AI concierge, multilingual guest experience, premium themes and advanced analytics."
                : "One active guide with essential hosting features.",
            },
            unit_amount: unitAmount,
            recurring: {
              interval: annual ? "year" : "month",
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata,
      },
      success_url: `${baseUrl}/dashboard?success=true&billing=${billingCycle}`,
      cancel_url: `${baseUrl}/pricing?canceled=true&billing=${billingCycle}`,
      metadata,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Checkout session unavailable" }, { status: 502 });
    }

    return NextResponse.json({
      url: session.url,
      billingCycle,
      amount: chargeAmount,
      currency,
    });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: err?.message || "Secure checkout unavailable" },
      { status: 500 }
    );
  }
}
