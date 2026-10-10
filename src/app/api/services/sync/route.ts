import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const ServiceSchema = z.object({
  key: z.string().min(1).max(160),
  title: z.string().min(1).max(160),
  description: z.string().max(2000).optional().default(""),
  category: z.string().max(80).optional().default("other"),
  priceAmount: z.union([z.number(), z.string()]).optional(),
  currency: z.enum(["MAD", "EUR", "USD", "GBP"]).optional().default("MAD"),
  pricingType: z.enum(["fixed", "per_guest", "per_night", "quote"]).optional().default("fixed"),
  fulfillmentType: z.enum(["property", "partner", "maplyo_marketplace"]).optional().default("property"),
  providerName: z.string().max(160).optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  externalUrl: z.string().url().optional().or(z.literal("")),
});

const BodySchema = z.object({
  guideId: z.string().uuid(),
  services: z.array(ServiceSchema).max(100),
});

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const parsed = BodySchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid services payload" }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const admin = adminClient();
    if (!url || !anonKey || !admin) {
      return NextResponse.json({ active: false, synced: 0 });
    }

    const auth = createClient(url, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });

    const { data: { user }, error: authError } = await auth.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: guide, error: guideError } = await admin
      .from("guides")
      .select("id, user_id, property_id")
      .eq("id", parsed.data.guideId)
      .maybeSingle();

    if (guideError || !guide || guide.user_id !== user.id) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    if (!guide.property_id) {
      return NextResponse.json({ active: false, synced: 0, reason: "hospitality_core_inactive" });
    }

    const { data: property, error: propertyError } = await admin
      .from("properties")
      .select("id, organization_id")
      .eq("id", guide.property_id)
      .single();

    if (propertyError || !property) {
      return NextResponse.json({ active: false, synced: 0, reason: "property_not_found" });
    }

    const sourceGuideId = parsed.data.guideId;
    const incomingKeys = new Set(parsed.data.services.map((service) => service.key));

    const { data: existingRows } = await admin
      .from("services")
      .select("id, metadata")
      .eq("property_id", property.id)
      .contains("metadata", { source_guide_id: sourceGuideId });

    const existingByKey = new Map<string, any>();
    for (const row of existingRows || []) {
      const key = row.metadata?.source_key;
      if (key) existingByKey.set(key, row);
    }

    let synced = 0;
    const mappings: Array<{ key: string; serviceId: string }> = [];

    for (const service of parsed.data.services) {
      const numericAmount =
        service.priceAmount === undefined || service.priceAmount === ""
          ? null
          : Number(service.priceAmount);
      const priceAmount = numericAmount !== null && Number.isFinite(numericAmount)
        ? numericAmount
        : null;

      const payload = {
        organization_id: property.organization_id,
        property_id: property.id,
        name: service.title,
        description: service.description || null,
        category: service.category || "other",
        status: "active",
        price_amount: priceAmount,
        currency: service.currency || "MAD",
        pricing_type: priceAmount === null ? "quote" : (service.pricingType || "fixed"),
        fulfillment_type: service.fulfillmentType || "property",
        provider_name: service.providerName || null,
        metadata: {
          source: "guide_revenue_block",
          source_guide_id: sourceGuideId,
          source_key: service.key,
          image_url: service.imageUrl || null,
          external_url: service.externalUrl || null,
        },
        updated_at: new Date().toISOString(),
      };

      const existing = existingByKey.get(service.key);
      let serviceId: string | null = null;

      if (existing?.id) {
        const { data: updated, error } = await admin
          .from("services")
          .update(payload)
          .eq("id", existing.id)
          .select("id")
          .single();

        if (!error && updated) serviceId = updated.id;
      } else {
        const { data: created, error } = await admin
          .from("services")
          .insert([{ ...payload, created_at: new Date().toISOString() }])
          .select("id")
          .single();

        if (!error && created) serviceId = created.id;
      }

      if (serviceId) {
        synced += 1;
        mappings.push({ key: service.key, serviceId });
      }
    }

    // Services removed from the guide are archived, not deleted, so order history remains intact.
    for (const row of existingRows || []) {
      const key = row.metadata?.source_key;
      if (key && !incomingKeys.has(key)) {
        await admin
          .from("services")
          .update({ status: "archived", updated_at: new Date().toISOString() })
          .eq("id", row.id);
      }
    }

    return NextResponse.json({ active: true, synced, mappings });
  } catch (error) {
    console.error("[services-sync] unexpected error", error);
    return NextResponse.json({ active: false, synced: 0 });
  }
}
