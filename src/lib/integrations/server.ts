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
  const { data: guide, error: guideError } = await admin
    .from("guides")
    .select("id, title, property_id")
    .eq("id", guideId)
    .eq("user_id", userId)
    .maybeSingle();

  if (guideError || !guide?.id) return null;

  if (guide.property_id) {
    const { data: property } = await admin
      .from("properties")
      .select("id, organization_id, name, city, property_type")
      .eq("id", guide.property_id)
      .maybeSingle();

    if (property?.id) {
      return {
        guideId: guide.id as string,
        propertyId: property.id as string,
        organizationId: property.organization_id as string,
        property,
      };
    }
  }

  // Legacy guides created before the hospitality core did not have a property.
  // Repair them lazily the first time an integration is opened.
  const { data: membership } = await admin
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  let organizationId = membership?.organization_id as string | undefined;

  if (!organizationId) {
    const { data: organization, error: organizationError } = await admin
      .from("organizations")
      .insert([{
        name: "Maplyo Workspace",
        created_by: userId,
      }])
      .select("id")
      .single();

    if (organizationError || !organization?.id) return null;
    organizationId = organization.id;

    const { error: membershipError } = await admin
      .from("organization_members")
      .insert([{
        organization_id: organizationId,
        user_id: userId,
        role: "owner",
      }]);

    if (membershipError) return null;
  }

  const { data: existingLegacyProperty } = await admin
    .from("properties")
    .select("id, organization_id, name, city, property_type")
    .eq("organization_id", organizationId)
    .contains("metadata", { legacy_guide_id: guideId })
    .limit(1)
    .maybeSingle();

  let property = existingLegacyProperty || null;

  if (!property?.id) {
    const { data: createdProperty, error: propertyError } = await admin
      .from("properties")
      .insert([{
        organization_id: organizationId,
        name: guide.title || "Maplyo Property",
        property_type: "vacation_rental",
        status: "active",
        source_type: "legacy_guide",
        metadata: { legacy_guide_id: guideId },
      }])
      .select("id, organization_id, name, city, property_type")
      .single();

    if (propertyError || !createdProperty?.id) return null;
    property = createdProperty;
  }

  const { data: linkedGuide } = await admin
    .from("guides")
    .update({ property_id: property.id })
    .eq("id", guideId)
    .eq("user_id", userId)
    .is("property_id", null)
    .select("id, property_id")
    .maybeSingle();

  if (!linkedGuide?.property_id) {
    const { data: refreshedGuide } = await admin
      .from("guides")
      .select("property_id")
      .eq("id", guideId)
      .eq("user_id", userId)
      .maybeSingle();

    if (refreshedGuide?.property_id && refreshedGuide.property_id !== property.id) {
      const { data: existingProperty } = await admin
        .from("properties")
        .select("id, organization_id, name, city, property_type")
        .eq("id", refreshedGuide.property_id)
        .maybeSingle();

      if (existingProperty?.id) {
        return {
          guideId: guide.id as string,
          propertyId: existingProperty.id as string,
          organizationId: existingProperty.organization_id as string,
          property: existingProperty,
        };
      }
    }
  }

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
