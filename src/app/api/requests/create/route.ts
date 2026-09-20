import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const BodySchema = z.object({
  guideId: z.string().uuid(),
  category: z.enum(["housekeeping","maintenance","information","complaint","lost_found","transport","food_beverage","other"]),
  priority: z.enum(["low","normal","high","urgent"]).default("normal"),
  title: z.string().min(2).max(160),
  message: z.string().max(1200).optional(),
  guestName: z.string().min(1).max(120),
  guestEmail: z.string().email().optional().or(z.literal("")),
  guestPhone: z.string().max(40).optional(),
}).refine((data) => Boolean(data.guestEmail || data.guestPhone), {
  message: "Email or phone is required",
});

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const parsed = BodySchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const admin = getAdmin();
    if (!admin) return NextResponse.json({ error: "Guest requests unavailable" }, { status: 503 });

    const input = parsed.data;

    const { data: guide } = await admin
      .from("guides")
      .select("id, property_id")
      .eq("id", input.guideId)
      .maybeSingle();

    if (!guide?.property_id) {
      return NextResponse.json({ error: "Guest requests are not active for this property", code: "REQUESTS_NOT_ACTIVE" }, { status: 409 });
    }

    const { data: property } = await admin
      .from("properties")
      .select("id, organization_id, name")
      .eq("id", guide.property_id)
      .single();

    if (!property) return NextResponse.json({ error: "Property not available" }, { status: 409 });

    let guestId: string | null = null;

    if (input.guestEmail) {
      const existing = await admin
        .from("guests")
        .select("id")
        .eq("organization_id", property.organization_id)
        .eq("email", input.guestEmail)
        .limit(1)
        .maybeSingle();

      if (existing.data?.id) guestId = existing.data.id;
    }

    if (!guestId) {
      const created = await admin
        .from("guests")
        .insert([{
          organization_id: property.organization_id,
          first_name: input.guestName,
          email: input.guestEmail || null,
          phone: input.guestPhone || null,
          marketing_consent: false,
          metadata: { source: "guest_request" },
        }])
        .select("id")
        .single();

      guestId = created.data?.id || null;
    }

    const { data: requestRow, error } = await admin
      .from("guest_requests")
      .insert([{
        organization_id: property.organization_id,
        property_id: property.id,
        guide_id: input.guideId,
        guest_id: guestId,
        category: input.category,
        priority: input.priority,
        status: "new",
        title: input.title,
        message: input.message || null,
        guest_name: input.guestName,
        guest_email: input.guestEmail || null,
        guest_phone: input.guestPhone || null,
        metadata: { source: "guest_experience" },
      }])
      .select("id, status")
      .single();

    if (error || !requestRow) {
      console.error("[guest-request] insert failed", error);
      return NextResponse.json({ error: "Could not create request" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      requestId: requestRow.id,
      status: requestRow.status,
      propertyName: property.name,
    });
  } catch (error) {
    console.error("[guest-request] unexpected error", error);
    return NextResponse.json({ error: "Could not create request" }, { status: 500 });
  }
}
