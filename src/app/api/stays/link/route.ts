import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash, randomBytes } from "node:crypto";
import { z } from "zod";

const BodySchema = z.object({
  stayId: z.string().uuid(),
  guideId: z.string().uuid(),
});

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const parsed = BodySchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const admin = adminClient();
    if (!url || !anonKey || !admin) return NextResponse.json({ error: "Unavailable" }, { status: 503 });

    const auth = createClient(url, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });

    const { data: { user } } = await auth.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: stay } = await admin
      .from("stays")
      .select("id, organization_id, property_id, check_out_at")
      .eq("id", parsed.data.stayId)
      .maybeSingle();

    if (!stay) return NextResponse.json({ error: "Stay not found" }, { status: 404 });

    const { data: membership } = await admin
      .from("organization_members")
      .select("role")
      .eq("organization_id", stay.organization_id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (!membership || !["owner","admin","manager","member"].includes(membership.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: guide } = await admin
      .from("guides")
      .select("id, property_id")
      .eq("id", parsed.data.guideId)
      .eq("property_id", stay.property_id)
      .maybeSingle();

    if (!guide) return NextResponse.json({ error: "Guide does not belong to this property" }, { status: 409 });

    const token = randomBytes(32).toString("base64url");
    const tokenHash = hashToken(token);

    const checkout = new Date(stay.check_out_at).getTime();
    const fallbackExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const expiresAt = new Date(Math.max(checkout + 48 * 60 * 60 * 1000, Date.now() + 24 * 60 * 60 * 1000));
    if (!Number.isFinite(expiresAt.getTime())) expiresAt.setTime(fallbackExpiry);

    await admin
      .from("stay_links")
      .update({ revoked_at: new Date().toISOString() })
      .eq("stay_id", stay.id)
      .is("revoked_at", null);

    const { data: created, error } = await admin
      .from("stay_links")
      .insert([{
        organization_id: stay.organization_id,
        property_id: stay.property_id,
        stay_id: stay.id,
        guide_id: guide.id,
        token_hash: tokenHash,
        expires_at: expiresAt.toISOString(),
        created_by: user.id,
      }])
      .select("id, expires_at")
      .single();

    if (error || !created) {
      console.error("[stay-link] creation failed", error);
      return NextResponse.json({ error: "Could not create stay link" }, { status: 500 });
    }

    const origin = new URL(req.url).origin;
    return NextResponse.json({
      success: true,
      linkId: created.id,
      url: origin + "/s/" + token,
      expiresAt: created.expires_at,
    });
  } catch (error) {
    console.error("[stay-link] unexpected error", error);
    return NextResponse.json({ error: "Could not create stay link" }, { status: 500 });
  }
}
