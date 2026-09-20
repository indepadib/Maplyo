import type { SupabaseClient } from "@supabase/supabase-js";

type BootstrapInput = {
  userId: string;
  guideId: string;
  propertyName: string;
  propertyType: "airbnb" | "hotel" | "guest_house" | "other";
  city?: string;
  sourceUrl?: string;
};

function mapPropertyType(type: BootstrapInput["propertyType"]) {
  if (type === "airbnb") return "vacation_rental";
  if (type === "hotel") return "hotel";
  if (type === "guest_house") return "guest_house";
  return "other";
}

/**
 * Best-effort bridge from the legacy guide model to the Guest Experience OS model.
 *
 * It intentionally fails open: if the hospitality migration has not been applied yet,
 * guide creation still succeeds. Once the new tables exist, new guides are automatically
 * attached to an organization and property without changing the user flow.
 */
export async function bootstrapHospitalityWorkspace(
  supabase: SupabaseClient,
  input: BootstrapInput
): Promise<{ organizationId?: string; propertyId?: string; migrated: boolean }> {
  try {
    const { data: memberships, error: membershipError } = await supabase
      .from("organization_members")
      .select("organization_id, role")
      .eq("user_id", input.userId)
      .limit(1);

    if (membershipError) {
      console.info("[hospitality-bootstrap] Core tables not available yet; continuing in legacy mode.");
      return { migrated: false };
    }

    let organizationId = memberships?.[0]?.organization_id as string | undefined;

    if (!organizationId) {
      const { data: organization, error: organizationError } = await supabase
        .from("organizations")
        .insert([{
          name: input.propertyName ? `${input.propertyName} Workspace` : "My Maplyo Workspace",
          created_by: input.userId,
        }])
        .select("id")
        .single();

      if (organizationError || !organization) {
        console.warn("[hospitality-bootstrap] Could not create organization", organizationError);
        return { migrated: false };
      }

      organizationId = organization.id;

      const { error: memberError } = await supabase
        .from("organization_members")
        .insert([{
          organization_id: organizationId,
          user_id: input.userId,
          role: "owner",
        }]);

      if (memberError) {
        console.warn("[hospitality-bootstrap] Could not create organization membership", memberError);
        return { migrated: false };
      }
    }

    const { data: property, error: propertyError } = await supabase
      .from("properties")
      .insert([{
        organization_id: organizationId,
        name: input.propertyName || "My Property",
        property_type: mapPropertyType(input.propertyType),
        status: "active",
        city: input.city || null,
        source_type: input.sourceUrl ? "airbnb" : "manual",
        source_url: input.sourceUrl || null,
      }])
      .select("id")
      .single();

    if (propertyError || !property) {
      console.warn("[hospitality-bootstrap] Could not create property", propertyError);
      return { organizationId, migrated: false };
    }

    const { error: guideError } = await supabase
      .from("guides")
      .update({ property_id: property.id })
      .eq("id", input.guideId)
      .eq("user_id", input.userId);

    if (guideError) {
      console.warn("[hospitality-bootstrap] Property created but guide link failed", guideError);
      return { organizationId, propertyId: property.id, migrated: false };
    }

    return {
      organizationId,
      propertyId: property.id,
      migrated: true,
    };
  } catch (error) {
    console.warn("[hospitality-bootstrap] Legacy mode fallback", error);
    return { migrated: false };
  }
}
