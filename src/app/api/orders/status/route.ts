import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { sendGuestOrderStatusEmail } from "@/lib/order-email";

const BodySchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum(["confirmed", "fulfilled", "cancelled"]),
});

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

const allowedTransitions: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["fulfilled", "cancelled"],
  paid: ["fulfilled", "cancelled"],
};

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const parsed = BodySchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const admin = getAdmin();
    if (!url || !anonKey || !admin) return NextResponse.json({ error: "Ordering unavailable" }, { status: 503 });

    const auth = createClient(url, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });
    const { data: { user }, error: authError } = await auth.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: order, error: orderError } = await admin
      .from("orders")
      .select("id, organization_id, property_id, guest_id, status, metadata")
      .eq("id", parsed.data.orderId)
      .single();

    if (orderError || !order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const { data: membership } = await admin
      .from("organization_members")
      .select("role")
      .eq("organization_id", order.organization_id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (!membership || !["owner", "admin", "manager"].includes(membership.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const allowed = allowedTransitions[order.status] || [];
    if (!allowed.includes(parsed.data.status)) {
      return NextResponse.json({
        error: "Invalid status transition",
        from: order.status,
        to: parsed.data.status,
      }, { status: 409 });
    }

    const updatedAt = new Date().toISOString();
    const { error: updateError } = await admin
      .from("orders")
      .update({ status: parsed.data.status, updated_at: updatedAt })
      .eq("id", order.id);

    if (updateError) return NextResponse.json({ error: "Could not update order" }, { status: 500 });

    try {
      const [{ data: guest }, { data: property }, { data: items }] = await Promise.all([
        admin.from("guests").select("first_name, email").eq("id", order.guest_id).maybeSingle(),
        admin.from("properties").select("name").eq("id", order.property_id).maybeSingle(),
        admin.from("order_items").select("title").eq("order_id", order.id).limit(1),
      ]);

      if (guest?.email) {
        await sendGuestOrderStatusEmail({
          to: guest.email,
          guestName: guest.first_name || "there",
          propertyName: property?.name || "The property",
          serviceTitle: items?.[0]?.title || order.metadata?.service_title || "your service",
          status: parsed.data.status,
          orderId: order.id,
        });
      }
    } catch (notificationError) {
      console.info("[order-status] guest notification unavailable", notificationError);
    }

    return NextResponse.json({ success: true, orderId: order.id, status: parsed.data.status });
  } catch (error) {
    console.error("[order-status] unexpected error", error);
    return NextResponse.json({ error: "Could not update order" }, { status: 500 });
  }
}
