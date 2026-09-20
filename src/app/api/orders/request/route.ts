import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const RequestSchema = z.object({
  guideId: z.string().uuid(),
  serviceId: z.string().uuid().optional(),
  serviceKey: z.string().max(160),
  title: z.string().min(1).max(160),
  priceAmount: z.coerce.number().min(0).optional(),
  currency: z.enum(["MAD", "EUR", "USD", "GBP"]).default("MAD"),
  guestName: z.string().min(1).max(120),
  guestEmail: z.string().email().optional().or(z.literal("")),
  guestPhone: z.string().max(40).optional(),
  notes: z.string().max(500).optional(),
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
    const parsed = RequestSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
    }

    const admin = getAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Native ordering is not configured" }, { status: 503 });
    }

    const input = parsed.data;

    const guideResult = await admin
      .from("guides")
      .select("id, property_id")
      .eq("id", input.guideId)
      .maybeSingle();

    if (guideResult.error || !guideResult.data?.property_id) {
      return NextResponse.json({
        error: "Native ordering is not active for this property yet",
        code: "ORDERING_NOT_ACTIVE",
      }, { status: 409 });
    }

    const propertyId = guideResult.data.property_id;

    const propertyResult = await admin
      .from("properties")
      .select("id, organization_id")
      .eq("id", propertyId)
      .single();

    if (propertyResult.error || !propertyResult.data) {
      return NextResponse.json({ error: "Property not available" }, { status: 409 });
    }

    const organizationId = propertyResult.data.organization_id;

    const guestResult = await admin
      .from("guests")
      .insert([{
        organization_id: organizationId,
        first_name: input.guestName,
        email: input.guestEmail || null,
        phone: input.guestPhone || null,
        marketing_consent: false,
        metadata: { source: "maplyo_service_request" },
      }])
      .select("id")
      .single();

    if (guestResult.error || !guestResult.data) {
      console.error("[service-order] guest creation failed", guestResult.error);
      return NextResponse.json({ error: "Could not create guest request" }, { status: 500 });
    }

    const amount = Number(input.priceAmount || 0);

    const orderResult = await admin
      .from("orders")
      .insert([{
        organization_id: organizationId,
        property_id: propertyId,
        guest_id: guestResult.data.id,
        status: "pending",
        subtotal_amount: amount,
        commission_amount: 0,
        total_amount: amount,
        currency: input.currency,
        metadata: {
          source: "maplyo_guest_experience",
          guide_id: input.guideId,
          notes: input.notes || null,
          service_key: input.serviceKey,
          service_title: input.title,
        },
      }])
      .select("id")
      .single();

    if (orderResult.error || !orderResult.data) {
      console.error("[service-order] order creation failed", orderResult.error);
      return NextResponse.json({ error: "Could not create order" }, { status: 500 });
    }

    const itemResult = await admin.from("order_items").insert([{
      order_id: orderResult.data.id,
      service_id: input.serviceId || null,
      title: input.title,
      quantity: 1,
      unit_price: amount,
      total_amount: amount,
      commission_amount: 0,
      metadata: { service_key: input.serviceKey },
    }]);

    if (itemResult.error) {
      console.error("[service-order] item creation failed", itemResult.error);
      await admin.from("orders").delete().eq("id", orderResult.data.id);
      return NextResponse.json({ error: "Could not create order item" }, { status: 500 });
    }

    await admin.from("guest_events").insert([{
      guide_id: input.guideId,
      property_id: propertyId,
      service_id: input.serviceId || null,
      service_key: input.serviceKey,
      event_name: "service_request",
      metadata: { order_id: orderResult.data.id, title: input.title },
    }]).then(() => undefined, () => undefined);

    return NextResponse.json({
      success: true,
      orderId: orderResult.data.id,
      status: "pending",
    });
  } catch (error) {
    console.error("[service-order] unexpected error", error);
    return NextResponse.json({ error: "Could not submit request" }, { status: 500 });
  }
}
