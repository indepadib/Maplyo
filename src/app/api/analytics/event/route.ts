import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const EventSchema = z.object({
  guideId: z.string().uuid(),
  eventName: z.enum([
    "upsells_block_view",
    "service_view",
    "service_cta",
    "service_request",
    "order_started",
    "order_completed",
    "review_clicked",
  ]),
  sessionId: z.string().max(120).optional(),
  serviceKey: z.string().max(160).optional(),
  serviceId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const parsed = EventSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid event" }, { status: 400 });
    }

    const admin = getAdminClient();
    if (!admin) return NextResponse.json({ success: false });

    const { guideId, eventName, sessionId, serviceKey, serviceId, metadata } = parsed.data;

    let propertyId: string | null = null;
    const guideLookup = await admin
      .from("guides")
      .select("property_id")
      .eq("id", guideId)
      .maybeSingle();

    if (!guideLookup.error) propertyId = guideLookup.data?.property_id || null;

    const payload = {
      guide_id: guideId,
      property_id: propertyId,
      service_id: serviceId || null,
      event_name: eventName,
      session_id: sessionId || null,
      service_key: serviceKey || null,
      metadata: metadata || {},
    };

    const { error } = await admin.from("guest_events").insert(payload);

    // Tracking must never break the guest experience while migrations roll out.
    if (error) {
      console.info("[guest-event] tracking unavailable", error.message);
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[guest-event] unexpected error", error);
    return NextResponse.json({ success: false });
  }
}
