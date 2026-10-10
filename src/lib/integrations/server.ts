import { createClient } from "@supabase/supabase-js";

export type IntegrationContext =
  | {
      mode: "property";
      guideId: string;
      propertyId: string;
      organizationId: string;
      property: any;
    }
  | {
      mode: "legacy";
      guideId: string;
      propertyId: null;
      organizationId: null;
      property: { id: null; name: string; city: null; property_type: "vacation_rental" };
    };

export function isSchemaCompatibilityError(error: any) {
  const code = String(error?.code || "");
  const message = String(error?.message || error || "");
  return (
    ["42P01", "42703", "42501", "PGRST204", "PGRST205"].includes(code) ||
    /permission denied/i.test(message) ||
    /row-level security/i.test(message) ||
    /relation .* does not exist/i.test(message) ||
    /column .* does not exist/i.test(message) ||
    /could not find the table/i.test(message) ||
    /schema cache/i.test(message)
  );
}

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

export function getIntegrationAdmin(authHeader?: string | null) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) return null;

  if (serviceRole) {
    return createClient(url, serviceRole, {
      auth: { persistSession: false },
    });
  }

  // Runtime fallback for older Netlify environments that were never given
  // the service-role key. The user's JWT keeps RLS enforced while allowing
  // the integration flow to keep working on the legacy tables.
  if (anon && authHeader) {
    return createClient(url, anon, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });
  }

  return null;
}

export async function requireOwnedGuide(admin: any, userId: string, guideId: string) {
  const { data } = await admin
    .from("guides")
    .select("id")
    .eq("id", guideId)
    .eq("user_id", userId)
    .maybeSingle()
    .throwOnError();

  return Boolean(data?.id);
}

function legacyContext(guide: any): IntegrationContext {
  return {
    mode: "legacy",
    guideId: guide.id as string,
    propertyId: null,
    organizationId: null,
    property: {
      id: null,
      name: guide.title || "Maplyo Property",
      city: null,
      property_type: "vacation_rental",
    },
  };
}

export async function getOwnedPropertyFromGuide(
  admin: any,
  userId: string,
  guideId: string
): Promise<IntegrationContext | null> {
  // Query only columns that existed in the earliest Maplyo schema first.
  const { data: baseGuide } = await admin
    .from("guides")
    .select("id, title")
    .eq("id", guideId)
    .eq("user_id", userId)
    .maybeSingle()
    .throwOnError();

  if (!baseGuide?.id) return null;

  let guide: any = baseGuide;
  try {
    const { data: enrichedGuide } = await admin
      .from("guides")
      .select("id, title, property_id")
      .eq("id", guideId)
      .eq("user_id", userId)
      .maybeSingle()
      .throwOnError();

    if (enrichedGuide) guide = enrichedGuide;
  } catch (error) {
    if (isSchemaCompatibilityError(error)) return legacyContext(baseGuide);
    throw error;
  }

  try {
    if (guide.property_id) {
      const { data: property } = await admin
        .from("properties")
        .select("id, organization_id, name, city, property_type")
        .eq("id", guide.property_id)
        .maybeSingle()
        .throwOnError();

      if (property?.id) {
        return {
          mode: "property",
          guideId: guide.id as string,
          propertyId: property.id as string,
          organizationId: property.organization_id as string,
          property,
        };
      }
    }

    // Legacy guides created before the hospitality core did not have a property.
    // Repair them lazily if the hospitality core is present.
    const { data: membership } = await admin
      .from("organization_members")
      .select("organization_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle()
      .throwOnError();

    let organizationId = membership?.organization_id as string | undefined;

    if (!organizationId) {
      const { data: organization } = await admin
        .from("organizations")
        .insert([{
          name: "Maplyo Workspace",
          created_by: userId,
        }])
        .select("id")
        .single()
        .throwOnError();

      if (!organization?.id) throw new Error("Could not create hospitality workspace");
      organizationId = organization.id;

      await admin
        .from("organization_members")
        .insert([{
          organization_id: organizationId,
          user_id: userId,
          role: "owner",
        }])
        .throwOnError();
    }

    const { data: existingLegacyProperty } = await admin
      .from("properties")
      .select("id, organization_id, name, city, property_type")
      .eq("organization_id", organizationId)
      .contains("metadata", { legacy_guide_id: guideId })
      .limit(1)
      .maybeSingle()
      .throwOnError();

    let property = existingLegacyProperty || null;

    if (!property?.id) {
      const { data: createdProperty } = await admin
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
        .single()
        .throwOnError();

      if (!createdProperty?.id) throw new Error("Could not create property");
      property = createdProperty;
    }

    const { data: linkedGuide } = await admin
      .from("guides")
      .update({ property_id: property.id })
      .eq("id", guideId)
      .eq("user_id", userId)
      .is("property_id", null)
      .select("id, property_id")
      .maybeSingle()
      .throwOnError();

    if (!linkedGuide?.property_id) {
      const { data: refreshedGuide } = await admin
        .from("guides")
        .select("property_id")
        .eq("id", guideId)
        .eq("user_id", userId)
        .maybeSingle()
        .throwOnError();

      if (!refreshedGuide?.property_id) throw new Error("Could not attach guide to property");

      if (refreshedGuide.property_id !== property.id) {
        const { data: existingProperty } = await admin
          .from("properties")
          .select("id, organization_id, name, city, property_type")
          .eq("id", refreshedGuide.property_id)
          .maybeSingle()
          .throwOnError();

        if (existingProperty?.id) {
          return {
            mode: "property",
            guideId: guide.id as string,
            propertyId: existingProperty.id as string,
            organizationId: existingProperty.organization_id as string,
            property: existingProperty,
          };
        }
      }
    }

    return {
      mode: "property",
      guideId: guide.id as string,
      propertyId: property.id as string,
      organizationId: property.organization_id as string,
      property,
    };
  } catch (error) {
    if (isSchemaCompatibilityError(error)) return legacyContext(baseGuide);
    throw error;
  }
}

export async function getPropertyConnection(admin: any, propertyId: string) {
  const { data } = await admin
    .from("property_connections")
    .select("*")
    .eq("property_id", propertyId)
    .maybeSingle()
    .throwOnError();

  return data || null;
}

export async function getLegacyGuideConnection(admin: any, guideId: string) {
  const { data } = await admin
    .from("guide_integrations")
    .select("id, guide_id, integration_id, external_id, config, created_at")
    .eq("guide_id", guideId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()
    .throwOnError();

  return data || null;
}

export async function saveLegacyGuideConnection(
  admin: any,
  guideId: string,
  config: Record<string, any>,
  options: { integrationId?: string | null; externalId?: string | null } = {}
) {
  const existing = await getLegacyGuideConnection(admin, guideId);

  if (existing?.id) {
    const payload: Record<string, any> = { config };
    if ("integrationId" in options) payload.integration_id = options.integrationId ?? null;
    if ("externalId" in options) payload.external_id = options.externalId ?? null;

    await admin
      .from("guide_integrations")
      .update(payload)
      .eq("id", existing.id)
      .throwOnError();

    return existing.id as string;
  }

  const { data } = await admin
    .from("guide_integrations")
    .insert([{
      guide_id: guideId,
      integration_id: options.integrationId ?? null,
      external_id: options.externalId ?? null,
      config,
    }])
    .select("id")
    .single()
    .throwOnError();

  if (!data?.id) throw new Error("Could not save legacy guide integration");
  return data.id as string;
}
