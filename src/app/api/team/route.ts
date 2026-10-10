import { NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { sendTeamInvitationEmail } from "@/lib/team-email";

const InviteSchema = z.object({
  organizationId: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(["admin","manager","member","viewer"]),
});

const PatchSchema = z.object({
  organizationId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(["admin","manager","member","viewer"]),
});

const DeleteSchema = z.object({
  organizationId: z.string().uuid(),
  userId: z.string().uuid(),
});

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function getAuthenticatedUser(req: Request) {
  const authHeader = req.headers.get("authorization");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!authHeader || !url || !anon) return null;

  const client = createClient(url, anon, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });

  const { data: { user } } = await client.auth.getUser();
  return user || null;
}

async function adminMembership(admin: any, organizationId: string, userId: string) {
  const { data } = await admin
    .from("organization_members")
    .select("role")
    .eq("organization_id", organizationId)
    .eq("user_id", userId)
    .maybeSingle();

  return data && ["owner","admin"].includes(data.role) ? data : null;
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function GET(req: Request) {
  const user = await getAuthenticatedUser(req);
  const admin = getAdmin();
  if (!user || !admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const organizationId = url.searchParams.get("organizationId");
  if (!organizationId) return NextResponse.json({ error: "organizationId required" }, { status: 400 });

  const { data: membership } = await admin
    .from("organization_members")
    .select("role")
    .eq("organization_id", organizationId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data: members, error } = await admin
    .from("organization_members")
    .select("user_id, role, created_at")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const ids = (members || []).map((member: any) => member.user_id);
  let profiles: any[] = [];

  if (ids.length) {
    const result = await admin
      .from("profiles")
      .select("id, email, full_name, avatar_url")
      .in("id", ids);
    if (!result.error) profiles = result.data || [];
  }

  const profileById = new Map(profiles.map((profile: any) => [profile.id, profile]));

  let invitations: any[] = [];
  if (["owner","admin"].includes(membership.role)) {
    const inviteResult = await admin
      .from("organization_invitations")
      .select("id, email, role, expires_at, accepted_at, revoked_at, created_at")
      .eq("organization_id", organizationId)
      .is("accepted_at", null)
      .is("revoked_at", null)
      .order("created_at", { ascending: false });

    if (!inviteResult.error) invitations = inviteResult.data || [];
  }

  return NextResponse.json({
    currentRole: membership.role,
    members: (members || []).map((member: any) => ({
      ...member,
      profile: profileById.get(member.user_id) || null,
    })),
    invitations,
  });
}

export async function POST(req: Request) {
  const user = await getAuthenticatedUser(req);
  const admin = getAdmin();
  if (!user || !admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = InviteSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid invitation" }, { status: 400 });

  const input = parsed.data;
  const actor = await adminMembership(admin, input.organizationId, user.id);
  if (!actor) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (actor.role === "admin" && input.role === "admin") {
    return NextResponse.json({ error: "Only the owner can invite another admin" }, { status: 403 });
  }

  const normalizedEmail = input.email.trim().toLowerCase();

  const [{ data: organization }, { data: inviterProfile }] = await Promise.all([
    admin.from("organizations").select("name").eq("id", input.organizationId).maybeSingle(),
    admin.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
  ]);

  if (!organization) return NextResponse.json({ error: "Organization not found" }, { status: 404 });

  const existingProfile = await admin
    .from("profiles")
    .select("id, email")
    .ilike("email", normalizedEmail)
    .limit(1)
    .maybeSingle();

  if (existingProfile.data?.id) {
    const existingMember = await admin
      .from("organization_members")
      .select("role")
      .eq("organization_id", input.organizationId)
      .eq("user_id", existingProfile.data.id)
      .maybeSingle();

    if (existingMember.data) {
      return NextResponse.json({ error: "This user is already a team member" }, { status: 409 });
    }

    const { error: membershipError } = await admin
      .from("organization_members")
      .insert([{
        organization_id: input.organizationId,
        user_id: existingProfile.data.id,
        role: input.role,
      }]);

    if (membershipError) return NextResponse.json({ error: membershipError.message }, { status: 500 });

    await sendTeamInvitationEmail({
      to: normalizedEmail,
      organizationName: organization.name,
      inviterName: inviterProfile?.full_name || null,
      role: input.role,
      alreadyAdded: true,
    });

    return NextResponse.json({ success: true, addedExistingUser: true });
  }

  const token = randomBytes(32).toString("base64url");
  const hash = tokenHash(token);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: invitation, error } = await admin
    .from("organization_invitations")
    .upsert({
      organization_id: input.organizationId,
      email: normalizedEmail,
      role: input.role,
      token_hash: hash,
      invited_by: user.id,
      expires_at: expiresAt,
      accepted_at: null,
      revoked_at: null,
    }, { onConflict: "organization_id,email" })
    .select("id")
    .single();

  if (error || !invitation) {
    return NextResponse.json({ error: error?.message || "Could not create invitation" }, { status: 500 });
  }

  const origin = new URL(req.url).origin;
  const inviteUrl = origin + "/team/accept?token=" + encodeURIComponent(token);

  await sendTeamInvitationEmail({
    to: normalizedEmail,
    organizationName: organization.name,
    inviterName: inviterProfile?.full_name || null,
    role: input.role,
    inviteUrl,
  });

  return NextResponse.json({
    success: true,
    invitationId: invitation.id,
    expiresAt,
  });
}

export async function PATCH(req: Request) {
  const user = await getAuthenticatedUser(req);
  const admin = getAdmin();
  if (!user || !admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = PatchSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid update" }, { status: 400 });

  const input = parsed.data;
  const actor = await adminMembership(admin, input.organizationId, user.id);
  if (!actor) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (actor.role === "admin" && input.role === "admin") {
    return NextResponse.json({ error: "Only the owner can assign admin access" }, { status: 403 });
  }

  const { data: target } = await admin
    .from("organization_members")
    .select("role")
    .eq("organization_id", input.organizationId)
    .eq("user_id", input.userId)
    .maybeSingle();

  if (!target) return NextResponse.json({ error: "Member not found" }, { status: 404 });
  if (target.role === "owner") return NextResponse.json({ error: "Owner role cannot be changed here" }, { status: 409 });

  const { error } = await admin
    .from("organization_members")
    .update({ role: input.role })
    .eq("organization_id", input.organizationId)
    .eq("user_id", input.userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const user = await getAuthenticatedUser(req);
  const admin = getAdmin();
  if (!user || !admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = DeleteSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const input = parsed.data;
  const actor = await adminMembership(admin, input.organizationId, user.id);
  if (!actor) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data: target } = await admin
    .from("organization_members")
    .select("role")
    .eq("organization_id", input.organizationId)
    .eq("user_id", input.userId)
    .maybeSingle();

  if (!target) return NextResponse.json({ error: "Member not found" }, { status: 404 });
  if (target.role === "owner") return NextResponse.json({ error: "Owner cannot be removed" }, { status: 409 });
  if (actor.role === "admin" && target.role === "admin") {
    return NextResponse.json({ error: "Only the owner can remove another admin" }, { status: 403 });
  }

  const { error } = await admin
    .from("organization_members")
    .delete()
    .eq("organization_id", input.organizationId)
    .eq("user_id", input.userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
