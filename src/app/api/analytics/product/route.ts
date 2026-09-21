import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const ProductEventSchema = z.object({
  eventName: z.enum([
    "onboarding_viewed",
    "generation_started",
    "generation_completed",
    "property_created",
    "experience_published",
    "revenue_service_created",
    "pricing_viewed",
    "checkout_started",
  ]),
  guideId: z.string().uuid().optional(),
  propertyId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return NextResponse.json({ success: false }, { status: 401 });

    const parsed = ProductEventSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid product event" }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !anonKey || !serviceKey) return NextResponse.json({ success: false });

    const authClient = createClient(url, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });

    const { data: { user } } = await authClient.auth.getUser();
    if (!user) return NextResponse.json({ success: false }, { status: 401 });

    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

    const { error } = await admin.from("product_events").insert([{
      user_id: user.id,
      guide_id: parsed.data.guideId || null,
      property_id: parsed.data.propertyId || null,
      event_name: parsed.data.eventName,
      metadata: parsed.data.metadata || {},
    }]);

    // Event collection should fail open while migrations roll out.
    if (error) {
      console.info("[product-event] unavailable", error.message);
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[product-event] unexpected error", error);
    return NextResponse.json({ success: false });
  }
}
