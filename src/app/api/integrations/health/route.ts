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

  const guideIds = (guides || []).map((guide: any) => guide.id);
  const propertyIds = [...new Set((guides || []).map((guide: any) => guide.property_id).filter(Boolean))];

  const [guideIntegrationsResult, propertiesResult, tuyaResult] = await Promise.all([
    guideIds.length
      ? admin
          .from("guide_integrations")
          .select("guide_id, integration_id, config")
          .in("guide_id", guideIds)
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

  const guideIntegrations = guideIntegrationsResult.data || [];
  const properties = propertiesResult.data || [];
  const tuyaIntegrations = tuyaResult.data || [];
  const now = Date.now();

  const rows = (guides || []).map((guide: any) => {
    const link = guideIntegrations.find((row: any) => row.guide_id === guide.id);
    const config = link?.config || {};
    const property = properties.find((row: any) => row.id === guide.property_id) || null;
    const tuyaIntegration = tuyaIntegrations.find((row: any) => row.id === link?.integration_id) || null;

    const airbnbConnected = Boolean(config.icalUrl);
    const airbnbLastSyncAt = config.airbnbLastSyncAt || null;
    const airbnbAgeMs = airbnbLastSyncAt ? now - new Date(airbnbLastSyncAt).getTime() : null;
    const airbnbStale = Boolean(airbnbConnected && airbnbAgeMs !== null && airbnbAgeMs > 6 * 60 * 60 * 1000);
    const airbnbHealth = !airbnbConnected
      ? "disconnected"
      : config.airbnbSyncStatus === "error"
        ? "error"
        : airbnbStale
          ? "degraded"
          : "healthy";

    const tuyaAssigned = Boolean(config.tuyaDeviceId);
    const tuyaHealth = !tuyaAssigned
      ? "disconnected"
      : tuyaIntegration?.health_status || "degraded";

    const issues: string[] = [];
    if (airbnbHealth === "error") issues.push(config.airbnbLastError || "Airbnb calendar sync error");
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
        reservationCount: Number(config.airbnbReservationCount || 0),
      },
      tuya: {
        assigned: tuyaAssigned,
        health: tuyaHealth,
        deviceName: config.tuyaDeviceName || null,
        codeLength: Number(config.tuyaCodeLength || 6),
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
