import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { z } from "zod";
import { generateGuide } from "@/lib/ai/guide-generator";
import { slugify } from "@/lib/utils/slugify";
import { requireInternalUser, getServiceRoleClient } from "@/lib/internal/admin-access";

const CreateSchema = z.object({
  sourceUrl: z.string().url(),
  propertyType: z.enum(["hotel", "guest_house", "other"]).default("hotel"),
  city: z.string().max(120).optional(),
  prospectName: z.string().max(160).optional(),
  prospectEmail: z.string().email().optional().or(z.literal("")),
  language: z.enum(["fr", "en"]).default("fr"),
  authorized: z.literal(true),
});

export async function GET(req: Request) {
  const access = await requireInternalUser(req.headers.get("authorization"));
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const admin = getServiceRoleClient();
  if (!admin) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  const { data, error } = await admin
    .from("magic_demos")
    .select("id, slug, prospect_name, prospect_email, property_name, property_type, source_url, city, status, view_count, last_viewed_at, expires_at, created_at")
    .eq("created_by", access.user.id)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({
      error: "Magic Demo storage is not active yet",
      detail: error.message,
    }, { status: 503 });
  }

  return NextResponse.json({ demos: data || [] });
}

export async function POST(req: Request) {
  const access = await requireInternalUser(req.headers.get("authorization"));
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const parsed = CreateSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid demo request", details: parsed.error.flatten() }, { status: 400 });
  }

  const input = parsed.data;
  const admin = getServiceRoleClient();
  if (!admin) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  try {
    const guide = await generateGuide({
      city: input.city || undefined,
      propertyUrl: input.sourceUrl,
      sourceOwnerConfirmed: input.authorized,
      type: input.propertyType,
      targetAudience: "everyone",
      language: input.language,
    });

    let prospectId: string | null = null;

    const prospectResult = await admin
      .from("sales_prospects")
      .insert([{
        created_by: access.user.id,
        property_name: guide.title || input.prospectName || "Hospitality Property",
        contact_name: input.prospectName || null,
        contact_email: input.prospectEmail || null,
        website_url: input.sourceUrl,
        city: input.city || null,
        property_type: input.propertyType,
        source: "magic_demo",
        score: 70,
        stage: "demo_ready",
        last_activity_at: new Date().toISOString(),
      }])
      .select("id")
      .single();

    if (!prospectResult.error && prospectResult.data) {
      prospectId = prospectResult.data.id;
    }

    const token = randomBytes(5).toString("hex");
    const baseSlug = slugify(guide.title || input.prospectName || "property").slice(0, 70) || "property";
    const slug = `${baseSlug}-${token}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await admin
      .from("magic_demos")
      .insert([{
        created_by: access.user.id,
        slug,
        prospect_name: input.prospectName || null,
        prospect_email: input.prospectEmail || null,
        property_name: guide.title || input.prospectName || "Hospitality Property",
        property_type: input.propertyType,
        source_url: input.sourceUrl,
        city: input.city || null,
        theme_id: guide.theme.themeId,
        content: { blocks: guide.blocks },
        status: "active",
        prospect_id: prospectId,
        expires_at: expiresAt,
      }])
      .select("id, slug, property_name, status, expires_at")
      .single();

    if (error || !data) {
      if (prospectId) await admin.from("sales_prospects").delete().eq("id", prospectId);
      return NextResponse.json({
        error: "Magic Demo storage is not active yet",
        detail: error?.message,
      }, { status: 503 });
    }

    if (prospectId) {
      await admin.from("sales_activities").insert([{
        prospect_id: prospectId,
        created_by: access.user.id,
        activity_type: "demo_created",
        channel: "maplyo",
        metadata: {
          magic_demo_id: data.id,
          magic_demo_slug: data.slug,
          source_url: input.sourceUrl,
        },
      }]).then(() => undefined, () => undefined);
    }

    const origin = new URL(req.url).origin;

    return NextResponse.json({
      demo: data,
      url: `${origin}/m/${data.slug}`,
    });
  } catch (error: any) {
    console.error("[magic-demo] creation failed", error);
    return NextResponse.json({ error: error?.message || "Could not create Magic Demo" }, { status: 500 });
  }
}
