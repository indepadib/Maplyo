import { createClient } from "@supabase/supabase-js";

export async function requireInternalUser(authHeader: string | null) {
  if (!authHeader) return { ok: false as const, status: 401, error: "Unauthorized" };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return { ok: false as const, status: 503, error: "Auth unavailable" };

  const authClient = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });

  const { data: { user }, error } = await authClient.auth.getUser();
  if (error || !user?.email) return { ok: false as const, status: 401, error: "Unauthorized" };

  const allowed = (process.env.MAPLYO_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!allowed.length) {
    return {
      ok: false as const,
      status: 503,
      error: "Internal access is not configured. Set MAPLYO_ADMIN_EMAILS.",
    };
  }

  if (!allowed.includes(user.email.toLowerCase())) {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }

  return { ok: true as const, user };
}

export function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
