import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const BodySchema = z.object({
  requestId: z.string().uuid(),
  status: z.enum(["acknowledged","in_progress","resolved","closed","cancelled"]),
});

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
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

    const { data: requestRow } = await admin
      .from("guest_requests")
      .select("id, organization_id, status")
      .eq("id", parsed.data.requestId)
      .maybeSingle();

    if (!requestRow) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const { data: membership } = await admin
      .from("organization_members")
      .select("role")
      .eq("organization_id", requestRow.organization_id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (!membership || !["owner","admin","manager","member"].includes(membership.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const now = new Date().toISOString();
    const payload: Record<string, unknown> = {
      status: parsed.data.status,
      updated_at: now,
    };
    if (parsed.data.status === "resolved") payload.resolved_at = now;

    const { error } = await admin
      .from("guest_requests")
      .update(payload)
      .eq("id", requestRow.id);

    if (error) return NextResponse.json({ error: "Could not update request" }, { status: 500 });

    return NextResponse.json({ success: true, status: parsed.data.status });
  } catch (error) {
    console.error("[guest-request-status] unexpected error", error);
    return NextResponse.json({ error: "Could not update request" }, { status: 500 });
  }
}
