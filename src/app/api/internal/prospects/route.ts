import { NextResponse } from "next/server";
import { z } from "zod";
import { requireInternalUser, getServiceRoleClient } from "@/lib/internal/admin-access";

const CreateSchema = z.object({
  propertyName: z.string().min(1).max(180),
  contactName: z.string().max(160).optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().max(50).optional(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  city: z.string().max(120).optional(),
  propertyType: z.enum(["hotel", "guest_house", "other"]).default("hotel"),
  estimatedUnits: z.coerce.number().int().positive().max(10000).optional(),
  score: z.coerce.number().int().min(0).max(100).default(50),
  notes: z.string().max(3000).optional(),
});

const PatchSchema = z.object({
  id: z.string().uuid(),
  stage: z.enum(["new","demo_ready","contacted","engaged","meeting","trial","claimed","paid","lost"]).optional(),
  score: z.coerce.number().int().min(0).max(100).optional(),
  notes: z.string().max(3000).nullable().optional(),
  nextActionAt: z.string().datetime().nullable().optional(),
});

export async function GET(req: Request) {
  const access = await requireInternalUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getServiceRoleClient();
  if (!admin) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  const { data: prospects, error } = await admin
    .from("sales_prospects")
    .select("*")
    .eq("created_by", access.user.id)
    .order("last_activity_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(300);

  if (error) {
    return NextResponse.json({ error: "Sales pipeline is not active yet", detail: error.message }, { status: 503 });
  }

  const ids = (prospects || []).map((p: any) => p.id);
  let demos: any[] = [];

  if (ids.length) {
    const demoResult = await admin
      .from("magic_demos")
      .select("id, prospect_id, slug, status, view_count, last_viewed_at, created_at")
      .in("prospect_id", ids)
      .order("created_at", { ascending: false });
    if (!demoResult.error) demos = demoResult.data || [];
  }

  const latestDemoByProspect = new Map<string, any>();
  for (const demo of demos) {
    if (demo.prospect_id && !latestDemoByProspect.has(demo.prospect_id)) {
      latestDemoByProspect.set(demo.prospect_id, demo);
    }
  }

  return NextResponse.json({
    prospects: (prospects || []).map((p: any) => ({
      ...p,
      magic_demo: latestDemoByProspect.get(p.id) || null,
    })),
  });
}

export async function POST(req: Request) {
  const access = await requireInternalUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const parsed = CreateSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid prospect", details: parsed.error.flatten() }, { status: 400 });

  const admin = getServiceRoleClient();
  if (!admin) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  const input = parsed.data;
  const now = new Date().toISOString();

  const { data, error } = await admin
    .from("sales_prospects")
    .insert([{
      created_by: access.user.id,
      property_name: input.propertyName,
      contact_name: input.contactName || null,
      contact_email: input.contactEmail || null,
      contact_phone: input.contactPhone || null,
      website_url: input.websiteUrl || null,
      city: input.city || null,
      property_type: input.propertyType,
      estimated_units: input.estimatedUnits || null,
      source: "manual",
      score: input.score,
      stage: "new",
      notes: input.notes || null,
      last_activity_at: now,
    }])
    .select("*")
    .single();

  if (error || !data) return NextResponse.json({ error: error?.message || "Could not create prospect" }, { status: 500 });

  await admin.from("sales_activities").insert([{
    prospect_id: data.id,
    created_by: access.user.id,
    activity_type: "prospect_created",
    channel: "internal",
  }]).then(() => undefined, () => undefined);

  return NextResponse.json({ prospect: data });
}

export async function PATCH(req: Request) {
  const access = await requireInternalUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const parsed = PatchSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid update", details: parsed.error.flatten() }, { status: 400 });

  const admin = getServiceRoleClient();
  if (!admin) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  const input = parsed.data;
  const { data: current } = await admin
    .from("sales_prospects")
    .select("id, stage")
    .eq("id", input.id)
    .eq("created_by", access.user.id)
    .maybeSingle();

  if (!current) return NextResponse.json({ error: "Prospect not found" }, { status: 404 });

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (input.stage !== undefined) update.stage = input.stage;
  if (input.score !== undefined) update.score = input.score;
  if (input.notes !== undefined) update.notes = input.notes;
  if (input.nextActionAt !== undefined) update.next_action_at = input.nextActionAt;
  if (input.stage === "contacted") update.last_contacted_at = new Date().toISOString();
  if (input.stage && input.stage !== current.stage) update.last_activity_at = new Date().toISOString();

  const { data, error } = await admin
    .from("sales_prospects")
    .update(update)
    .eq("id", input.id)
    .eq("created_by", access.user.id)
    .select("*")
    .single();

  if (error || !data) return NextResponse.json({ error: error?.message || "Could not update prospect" }, { status: 500 });

  if (input.stage && input.stage !== current.stage) {
    const activityType =
      input.stage === "meeting" ? "meeting" :
      input.stage === "trial" ? "trial_started" :
      input.stage === "claimed" ? "claimed" :
      input.stage === "paid" ? "paid" :
      input.stage === "lost" ? "lost" :
      input.stage === "contacted" ? "email_sent" :
      "note";

    await admin.from("sales_activities").insert([{
      prospect_id: input.id,
      created_by: access.user.id,
      activity_type: activityType,
      channel: "internal",
      metadata: { from_stage: current.stage, to_stage: input.stage },
    }]).then(() => undefined, () => undefined);
  }

  return NextResponse.json({ prospect: data });
}
