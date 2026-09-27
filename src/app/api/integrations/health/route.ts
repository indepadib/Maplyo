export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getIntegrationAdmin, requireIntegrationUser } from "@/lib/integrations/server";

export async function GET(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const { data: guides, error: guideError } = await admin
    .from("guides")
    .select("id, title, slug, property_id, is_published")
    .eq("user_id", access.user.id)
    .order("updated_at", { ascending: false });

  if (guideError) return NextResponse.json({ error: guideError.message }, { status: 500 });

  const propertyIds = [...new Set((guides || []).map((guide: any) => guide.property_id).filter(Boolean))];

  const [propertyConnectionsResult, propertiesResult, tuyaResult] = await Promise.all([
    propertyIds.length
      ? admin
          .from("property_connections")
          .select("*")
          .in("property_id", propertyIds)
      : Promise.resolve({ data: [], error: null }),
    propertyIds.length
      ? admin
          .from("properties")
          .select("id, name, city, property_type")
          .in("id", propertyIds)
      : Promise.resolve({ data: [], error: null }),
    admin
      .from("integrations")
      .select("id, health_status, last_tested_at, last_sync_at, last_error, settings")
      .eq("user_id", access.user.id)
      .eq("type", "tuya"),
  ]);

  const propertyConnections = propertyConnectionsResult.data || [];
  const properties = propertiesResult.data || [];
  const tuyaIntegrations = tuyaResult.data || [];
  const now = Date.now();

  // One operational row per property. Prefer a published guide as the deep-link target.
  const primaryGuides = Array.from(
    (guides || []).reduce((map: Map<string, any>, guide: any) => {
      if (!guide.property_id) return map;
      const current = map.get(guide.property_id);
      if (!current || (!current.is_published && guide.is_published)) {
        map.set(guide.property_id, guide);
      }
      return map;
    }, new Map<string, any>()).values()
  );

  const rows = primaryGuides.map((guide: any) => {
    const connection = propertyConnections.find((row: any) => row.property_id === guide.property_id) || null;
    const property = properties.find((row: any) => row.id === guide.property_id) || null;
    const tuyaIntegration = tuyaIntegrations.find((row: any) => row.id === connection?.tuya_integration_id) || null;

    const airbnbConnected = Boolean(connection?.airbnb_ical_url);
    const airbnbLastSyncAt = connection?.airbnb_last_sync_at || null;
    const airbnbAgeMs = airbnbLastSyncAt ? now - new Date(airbnbLastSyncAt).getTime() : null;
    const airbnbStale = Boolean(airbnbConnected && airbnbAgeMs !== null && airbnbAgeMs > 6 * 60 * 60 * 1000);
    const airbnbHealth = !airbnbConnected
      ? "disconnected"
      : connection?.airbnb_status === "error"
        ? "error"
        : airbnbStale
          ? "degraded"
          : "healthy";

    const tuyaAssigned = Boolean(connection?.tuya_device_id);
    const tuyaHealth = !tuyaAssigned
      ? "disconnected"
      : tuyaIntegration?.health_status || "degraded";

    const issues: string[] = [];
    if (airbnbHealth === "error") issues.push(connection?.airbnb_last_error || "Airbnb calendar sync error");
    if (airbnbHealth === "degraded") issues.push("Airbnb calendar has not synced in more than 6 hours");
    if (tuyaAssigned && tuyaHealth === "error") issues.push(tuyaIntegration?.last_error || "Tuya connection error");
    if (tuyaAssigned && !tuyaIntegration) issues.push("Tuya lock assigned but account connection is unavailable");

    const overall = issues.length
      ? (airbnbHealth === "error" || tuyaHealth === "error" ? "error" : "degraded")
      : (airbnbConnected || tuyaAssigned ? "healthy" : "disconnected");

    return {
      guideId: guide.id,
      guideTitle: guide.title,
      guideSlug: guide.slug,
      published: Boolean(guide.is_published),
      property: property ? {
        id: property.id,
        name: property.name,
        city: property.city,
        type: property.property_type,
      } : null,
      overall,
      issues,
      airbnb: {
        connected: airbnbConnected,
        health: airbnbHealth,
        lastSyncAt: airbnbLastSyncAt,
        reservationCount: Number(connection?.airbnb_reservation_count || 0),
      },
      tuya: {
        assigned: tuyaAssigned,
        health: tuyaHealth,
        deviceName: connection?.tuya_device_name || null,
        codeLength: Number(connection?.tuya_code_length || 6),
        lastTestedAt: tuyaIntegration?.last_tested_at || null,
        lastSyncAt: tuyaIntegration?.last_sync_at || null,
      },
    };
  });

  return NextResponse.json({
    summary: {
      total: rows.length,
      connected: rows.filter((row: any) => row.overall !== "disconnected").length,
      healthy: rows.filter((row: any) => row.overall === "healthy").length,
      attention: rows.filter((row: any) => row.overall === "degraded" || row.overall === "error").length,
      airbnbConnected: rows.filter((row: any) => row.airbnb.connected).length,
      tuyaAssigned: rows.filter((row: any) => row.tuya.assigned).length,
    },
    rows,
  });
}
