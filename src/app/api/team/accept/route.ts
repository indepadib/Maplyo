import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const Schema = z.object({ token: z.string().min(24).max(256) });

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const admin = getAdmin();

  if (!authHeader || !url || !anon || !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = Schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid invitation" }, { status: 400 });

  const auth = createClient(url, anon, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });

  const { data: { user } } = await auth.auth.getUser();
  if (!user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const hash = hashToken(parsed.data.token);

  const { data: invitation } = await admin
    .from("organization_invitations")
    .select("id, organization_id, email, role, expires_at, accepted_at, revoked_at, organizations(name)")
    .eq("token_hash", hash)
    .maybeSingle();

  if (!invitation || invitation.accepted_at || invitation.revoked_at) {
    return NextResponse.json({ error: "Invitation unavailable" }, { status: 404 });
  }

  if (new Date(invitation.expires_at).getTime() <= now.getTime()) {
    return NextResponse.json({ error: "Invitation expired" }, { status: 410 });
  }

  if (invitation.email.trim().toLowerCase() !== user.email.trim().toLowerCase()) {
    return NextResponse.json({
      error: "Sign in with the email address that received this invitation",
      expectedEmail: invitation.email,
    }, { status: 403 });
  }

  const { error: membershipError } = await admin
    .from("organization_members")
    .upsert({
      organization_id: invitation.organization_id,
      user_id: user.id,
      role: invitation.role,
    }, { onConflict: "organization_id,user_id" });

  if (membershipError) return NextResponse.json({ error: membershipError.message }, { status: 500 });

  await admin
    .from("organization_invitations")
    .update({ accepted_at: now.toISOString() })
    .eq("id", invitation.id);

  const orgValue = invitation.organizations as any;
  const organizationName = Array.isArray(orgValue) ? orgValue[0]?.name : orgValue?.name;

  return NextResponse.json({
    success: true,
    organizationId: invitation.organization_id,
    organizationName: organizationName || "Maplyo team",
    role: invitation.role,
  });
}
