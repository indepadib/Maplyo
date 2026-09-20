import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { slugify } from "@/lib/utils/slugify";
import { bootstrapHospitalityWorkspace } from "@/lib/hospitality/bootstrap";
import { getServiceRoleClient } from "@/lib/internal/admin-access";

const ClaimSchema = z.object({
  slug: z.string().min(3).max(180),
});

async function authenticatedUser(authHeader: string | null) {
  if (!authHeader) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const client = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });

  const { data: { user } } = await client.auth.getUser();
  return user || null;
}

export async function POST(req: Request) {
  try {
    const user = await authenticatedUser(req.headers.get("authorization"));
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const parsed = ClaimSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) return NextResponse.json({ error: "Invalid claim" }, { status: 400 });

    const admin = getServiceRoleClient();
    if (!admin) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

    const { data: demo, error } = await admin
      .from("magic_demos")
      .select("id, slug, property_name, property_type, source_url, city, theme_id, content, status, expires_at, claimed_by, claimed_guide_id, prospect_id")
      .eq("slug", parsed.data.slug)
      .maybeSingle();

    if (error || !demo) return NextResponse.json({ error: "Magic Demo not found" }, { status: 404 });
    if (demo.expires_at && new Date(demo.expires_at).getTime() < Date.now()) {
      return NextResponse.json({ error: "This Magic Demo has expired" }, { status: 410 });
    }

    if (demo.claimed_by && demo.claimed_by !== user.id) {
      return NextResponse.json({ error: "This Magic Demo has already been claimed" }, { status: 409 });
    }

    if (demo.claimed_by === user.id && demo.claimed_guide_id) {
      return NextResponse.json({ success: true, guideId: demo.claimed_guide_id, alreadyClaimed: true });
    }

    const { data: profile } = await admin
      .from("profiles")
      .select("plan_variant, extra_guides")
      .eq("id", user.id)
      .maybeSingle();

    const { count } = await admin
      .from("guides")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    const isPro = profile?.plan_variant === "pro";
    const guideLimit = (isPro ? 2 : 1) + Number(profile?.extra_guides || 0);

    if ((count || 0) >= guideLimit) {
      return NextResponse.json({
        error: "Your current plan has no available property slot for this demo.",
        code: "LIMIT_REACHED",
      }, { status: 403 });
    }

    const guideSlug = `${slugify(demo.property_name).slice(0, 70) || "property"}-${Math.floor(Math.random() * 100000)}`;

    const { data: guide, error: guideError } = await admin
      .from("guides")
      .insert([{
        user_id: user.id,
        title: demo.property_name,
        slug: guideSlug,
        theme_id: demo.theme_id || "minimal-white",
        content: demo.content || { blocks: [] },
        is_published: false,
      }])
      .select("id")
      .single();

    if (guideError || !guide) {
      console.error("[magic-claim] guide creation failed", guideError);
      return NextResponse.json({ error: "Could not create your property experience" }, { status: 500 });
    }

    const propertyType = demo.property_type === "hotel"
      ? "hotel"
      : demo.property_type === "guest_house"
        ? "guest_house"
        : "other";

    const workspace = await bootstrapHospitalityWorkspace(admin as any, {
      userId: user.id,
      guideId: guide.id,
      propertyName: demo.property_name,
      propertyType,
      city: demo.city || undefined,
      sourceUrl: demo.source_url || undefined,
    });

    const { error: claimError } = await admin
      .from("magic_demos")
      .update({
        status: "claimed",
        claimed_by: user.id,
        claimed_guide_id: guide.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", demo.id)
      .is("claimed_by", null);

    if (claimError) {
      console.error("[magic-claim] claim marker failed", claimError);
      await admin.from("guides").delete().eq("id", guide.id);
      return NextResponse.json({ error: "Could not finalize claim" }, { status: 409 });
    }

    if (demo.prospect_id) {
      const claimedAt = new Date().toISOString();
      await admin
        .from("sales_prospects")
        .update({
          stage: "claimed",
          last_activity_at: claimedAt,
          updated_at: claimedAt,
        })
        .eq("id", demo.prospect_id);

      await admin.from("sales_activities").insert([{
        prospect_id: demo.prospect_id,
        activity_type: "claimed",
        channel: "magic_demo",
        metadata: {
          user_id: user.id,
          guide_id: guide.id,
          magic_demo_id: demo.id,
        },
      }]).then(() => undefined, () => undefined);
    }

    // Best-effort activation event.
    await admin.from("product_events").insert([{
      user_id: user.id,
      guide_id: guide.id,
      property_id: workspace.propertyId || null,
      event_name: "property_created",
      metadata: {
        source: "magic_demo_claim",
        magic_demo_id: demo.id,
      },
    }]).then(() => undefined, () => undefined);

    return NextResponse.json({ success: true, guideId: guide.id });
  } catch (error) {
    console.error("[magic-claim] unexpected error", error);
    return NextResponse.json({ error: "Could not claim this experience" }, { status: 500 });
  }
}
