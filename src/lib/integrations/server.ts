import { createClient } from "@supabase/supabase-js";

export async function requireIntegrationUser(authHeader: string | null) {
  if (!authHeader) return { ok: false as const, status: 401, error: "Unauthorized" };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return { ok: false as const, status: 503, error: "Auth unavailable" };

  const client = createClient(url, anon, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });

  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user) return { ok: false as const, status: 401, error: "Unauthorized" };

  return { ok: true as const, user };
}

export function getIntegrationAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) return null;

  return createClient(url, serviceRole, {
    auth: { persistSession: false },
  });
}

export async function requireOwnedGuide(admin: any, userId: string, guideId: string) {
  const { data } = await admin
    .from("guides")
    .select("id")
    .eq("id", guideId)
    .eq("user_id", userId)
    .maybeSingle();

  return Boolean(data?.id);
}


export async function getOwnedPropertyFromGuide(admin: any, userId: string, guideId: string) {
  const { data: guide } = await admin
    .from("guides")
    .select("id, property_id")
    .eq("id", guideId)
    .eq("user_id", userId)
    .maybeSingle();

  if (!guide?.property_id) return null;

  const { data: property } = await admin
    .from("properties")
    .select("id, organization_id, name, city, property_type")
    .eq("id", guide.property_id)
    .maybeSingle();

  if (!property?.id) return null;

  return {
    guideId: guide.id as string,
    propertyId: property.id as string,
    organizationId: property.organization_id as string,
    property,
  };
}

export async function getPropertyConnection(admin: any, propertyId: string) {
  const { data } = await admin
    .from("property_connections")
    .select("*")
    .eq("property_id", propertyId)
    .maybeSingle();

  return data || null;
}
