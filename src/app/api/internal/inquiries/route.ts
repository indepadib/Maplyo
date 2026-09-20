import { NextResponse } from "next/server";
import { z } from "zod";
import { requireInternalUser, getServiceRoleClient } from "@/lib/internal/admin-access";

const ConvertSchema = z.object({
  inquiryId: z.string().uuid(),
});

function initialScore(units: number | null | undefined, propertyType: string) {
  let score = 55;
  if (units && units >= 10) score += 10;
  if (units && units >= 30) score += 8;
  if (units && units >= 100) score += 5;
  if (["hotel", "guest_house", "property_manager", "aparthotel"].includes(propertyType)) score += 5;
  return Math.min(90, score);
}

export async function GET(req: Request) {
  const access = await requireInternalUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getServiceRoleClient();
  if (!admin) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  const { data, error } = await admin
    .from("sales_inquiries")
    .select("*")
    .in("status", ["new", "qualified"])
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: "Sales inquiries are not active yet", detail: error.message }, { status: 503 });
  }

  return NextResponse.json({ inquiries: data || [] });
}

export async function POST(req: Request) {
  const access = await requireInternalUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const parsed = ConvertSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid inquiry" }, { status: 400 });

  const admin = getServiceRoleClient();
  if (!admin) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  const { data: inquiry, error } = await admin
    .from("sales_inquiries")
    .select("*")
    .eq("id", parsed.data.inquiryId)
    .maybeSingle();

  if (error || !inquiry) return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });

  if (inquiry.converted_prospect_id) {
    return NextResponse.json({ success: true, prospectId: inquiry.converted_prospect_id, alreadyConverted: true });
  }

  const mappedPropertyType = ["hotel", "guest_house", "other"].includes(inquiry.property_type)
    ? inquiry.property_type
    : inquiry.property_type === "property_manager"
      ? "other"
      : "other";

  const now = new Date().toISOString();

  const { data: prospect, error: prospectError } = await admin
    .from("sales_prospects")
    .insert([{
      created_by: access.user.id,
      property_name: inquiry.property_name || inquiry.contact_name,
      contact_name: inquiry.contact_name,
      contact_email: inquiry.contact_email,
      contact_phone: inquiry.contact_phone,
      website_url: inquiry.website_url,
      city: inquiry.city,
      property_type: mappedPropertyType,
      estimated_units: inquiry.estimated_units,
      source: "inbound_sales",
      score: initialScore(inquiry.estimated_units, inquiry.property_type),
      stage: "new",
      notes: inquiry.message || null,
      last_activity_at: now,
    }])
    .select("id")
    .single();

  if (prospectError || !prospect) {
    return NextResponse.json({ error: prospectError?.message || "Could not create prospect" }, { status: 500 });
  }

  const { error: inquiryUpdateError } = await admin
    .from("sales_inquiries")
    .update({
      status: "converted",
      converted_prospect_id: prospect.id,
      updated_at: now,
    })
    .eq("id", inquiry.id)
    .is("converted_prospect_id", null);

  if (inquiryUpdateError) {
    await admin.from("sales_prospects").delete().eq("id", prospect.id);
    return NextResponse.json({ error: "Could not finalize conversion" }, { status: 409 });
  }

  await admin.from("sales_activities").insert([{
    prospect_id: prospect.id,
    created_by: access.user.id,
    activity_type: "prospect_created",
    channel: "inbound",
    metadata: {
      inquiry_id: inquiry.id,
      source: inquiry.source,
      utm_source: inquiry.utm_source,
      utm_medium: inquiry.utm_medium,
      utm_campaign: inquiry.utm_campaign,
    },
  }]).then(() => undefined, () => undefined);

  return NextResponse.json({ success: true, prospectId: prospect.id });
}
