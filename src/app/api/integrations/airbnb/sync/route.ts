export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { randomInt } from "node:crypto";
import { parseAirbnbCalendar } from "@/lib/integrations/ical";
import { TuyaConnector, type TuyaRegion } from "@/lib/integrations/tuya";
import { decryptIntegrationSecret } from "@/lib/integrations/secrets";
import { getIntegrationAdmin, requireIntegrationUser, requireOwnedGuide } from "@/lib/integrations/server";

async function getGuideIntegration(admin: any, guideId: string) {
  const { data } = await admin
    .from("guide_integrations")
    .select("id, integration_id, config")
    .eq("guide_id", guideId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data || null;
}

async function getTuyaConnector(admin: any, userId: string, integrationId?: string | null) {
  let query = admin
    .from("integrations")
    .select("id, credentials, settings")
    .eq("user_id", userId)
    .eq("type", "tuya");

  if (integrationId) query = query.eq("id", integrationId);

  const { data: integration } = await query
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!integration?.id) return { connector: null, integration: null };

  const { data: secret } = await admin
    .from("integration_secrets")
    .select("ciphertext, iv, auth_tag")
    .eq("integration_id", integration.id)
    .maybeSingle();

  if (!secret) return { connector: null, integration };

  const credentials = decryptIntegrationSecret<{
    accessId: string;
    accessSecret: string;
    region: TuyaRegion;
  }>(secret);

  return {
    connector: new TuyaConnector(credentials.accessId, credentials.accessSecret, credentials.region),
    integration,
  };
}

async function syncStay(admin: any, args: {
  organizationId: string;
  propertyId: string;
  guideId: string;
  booking: any;
}) {
  const { booking } = args;
  let guestId: string | null = null;

  if (booking.guestName) {
    const { data: existingGuest } = await admin
      .from("guests")
      .select("id")
      .eq("organization_id", args.organizationId)
      .contains("metadata", { source_booking_uid: booking.uid })
      .limit(1)
      .maybeSingle();

    if (existingGuest?.id) {
      guestId = existingGuest.id;
    } else {
      const { data: createdGuest } = await admin
        .from("guests")
        .insert([{
          organization_id: args.organizationId,
          first_name: booking.guestName,
          marketing_consent: false,
          metadata: {
            source: "airbnb_ical",
            source_booking_uid: booking.uid,
          },
        }])
        .select("id")
        .single();

      guestId = createdGuest?.id || null;
    }
  }

  const { data: existingStay } = await admin
    .from("stays")
    .select("id")
    .eq("property_id", args.propertyId)
    .eq("source", "airbnb_ical")
    .eq("external_reservation_id", booking.uid)
    .limit(1)
    .maybeSingle();

  const payload = {
    organization_id: args.organizationId,
    property_id: args.propertyId,
    primary_guest_id: guestId,
    source: "airbnb_ical",
    external_reservation_id: booking.uid,
    check_in_at: booking.start.toISOString(),
    check_out_at: booking.end.toISOString(),
    status: "confirmed",
    metadata: {
      guest_name: booking.guestName || null,
      source_guide_id: args.guideId,
      ical_summary: booking.summary,
    },
    updated_at: new Date().toISOString(),
  };

  if (existingStay?.id) {
    await admin.from("stays").update(payload).eq("id", existingStay.id);
    return existingStay.id;
  }

  const { data: created } = await admin
    .from("stays")
    .insert([payload])
    .select("id")
    .single();

  return created?.id || null;
}

export async function POST(request: Request) {
  const access = await requireIntegrationUser(request.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const body = await request.json().catch(() => null);
  const guideId = body?.guideId;
  if (!guideId || !(await requireOwnedGuide(admin, access.user.id, guideId))) {
    return NextResponse.json({ error: "Guide not found" }, { status: 404 });
  }

  const guideIntegration = await getGuideIntegration(admin, guideId);
  const config = guideIntegration?.config || {};
  const icalUrl = config.icalUrl;

  if (!icalUrl) {
    return NextResponse.json({ error: "Connect the Airbnb iCal calendar first" }, { status: 400 });
  }

  const syncStartedAt = new Date();

  try {
    const bookings = await parseAirbnbCalendar(icalUrl);
    const currentUids = new Set(bookings.map((booking) => booking.uid));

    const { data: guide } = await admin
      .from("guides")
      .select("property_id")
      .eq("id", guideId)
      .maybeSingle();

    let propertyContext: { id: string; organization_id: string } | null = null;
    if (guide?.property_id) {
      const { data: property } = await admin
        .from("properties")
        .select("id, organization_id")
        .eq("id", guide.property_id)
        .maybeSingle();
      if (property?.id && property?.organization_id) propertyContext = property;
    }

    const deviceId = config.tuyaDeviceId ? String(config.tuyaDeviceId) : null;
    const codeLength = Number(config.tuyaCodeLength) === 7 ? 7 : 6;
    const startOffsetMinutes = Number.isFinite(Number(config.tuyaStartOffsetMinutes))
      ? Number(config.tuyaStartOffsetMinutes)
      : -60;
    const endOffsetMinutes = Number.isFinite(Number(config.tuyaEndOffsetMinutes))
      ? Number(config.tuyaEndOffsetMinutes)
      : 60;

    let tuyaConnector: TuyaConnector | null = null;
    let tuyaIntegration: any = null;
    let tuyaError: string | null = null;

    if (deviceId) {
      try {
        const tuya = await getTuyaConnector(admin, access.user.id, guideIntegration?.integration_id);
        tuyaConnector = tuya.connector;
        tuyaIntegration = tuya.integration;
        if (tuyaConnector) await tuyaConnector.testConnection();
        else tuyaError = "Tuya credentials are not connected";
      } catch (error: any) {
        tuyaError = String(error?.message || "Tuya connection failed").slice(0, 500);
      }
    }

    let stayCount = 0;
    let codeCount = 0;
    let generatedCodeCount = 0;
    let codeFailures = 0;

    for (const booking of bookings) {
      if (propertyContext) {
        try {
          await syncStay(admin, {
            organizationId: propertyContext.organization_id,
            propertyId: propertyContext.id,
            guideId,
            booking,
          });
          stayCount += 1;
        } catch (error) {
          console.info("[Airbnb sync] stay sync skipped:", error);
        }
      }

      const { data: existingCode } = await admin
        .from("access_codes")
        .select("id, code, provider_password_id")
        .eq("guide_id", guideId)
        .eq("external_uid", booking.uid)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      let code = existingCode?.code || null;
      let providerPasswordId = existingCode?.provider_password_id || null;

      if (deviceId && tuyaConnector && (!code || !providerPasswordId)) {
        try {
          const min = codeLength === 7 ? 1_000_000 : 100_000;
          const max = codeLength === 7 ? 10_000_000 : 1_000_000;
          const password = randomInt(min, max).toString();

          const validFrom = new Date(booking.start.getTime() + startOffsetMinutes * 60 * 1000);
          const validUntil = new Date(booking.end.getTime() + endOffsetMinutes * 60 * 1000);

          const result = await tuyaConnector.generateTempCode(
            deviceId,
            password,
            booking.guestName || "Airbnb guest",
            validFrom,
            validUntil
          );

          code = password;
          providerPasswordId = result.providerPasswordId ? String(result.providerPasswordId) : null;
          generatedCodeCount += 1;
        } catch (error: any) {
          codeFailures += 1;
          tuyaError = String(error?.message || "Tuya code generation failed").slice(0, 500);
        }
      }

      const codePayload = {
        guide_id: guideId,
        guest_name: booking.guestName || null,
        valid_from: booking.start.toISOString(),
        valid_until: booking.end.toISOString(),
        source: "airbnb",
        external_uid: booking.uid,
        code,
        provider_password_id: providerPasswordId,
        status: "active",
      };

      if (existingCode?.id) {
        await admin.from("access_codes").update(codePayload).eq("id", existingCode.id);
      } else {
        await admin.from("access_codes").insert([codePayload]);
      }

      codeCount += 1;
    }

    // Reconcile cancellations / removed reservations.
    let cancelledCodes = 0;
    const { data: futureCodes } = await admin
      .from("access_codes")
      .select("id, external_uid, provider_password_id")
      .eq("guide_id", guideId)
      .eq("source", "airbnb")
      .eq("status", "active")
      .gte("valid_until", new Date().toISOString());

    for (const stale of futureCodes || []) {
      if (!stale.external_uid || currentUids.has(stale.external_uid)) continue;

      if (deviceId && tuyaConnector && stale.provider_password_id) {
        try {
          await tuyaConnector.deleteTemporaryPassword(deviceId, stale.provider_password_id);
        } catch (error) {
          console.info("[Airbnb sync] could not delete stale Tuya password:", error);
        }
      }

      await admin.from("access_codes").update({ status: "cancelled" }).eq("id", stale.id);
      cancelledCodes += 1;
    }

    let cancelledStays = 0;
    if (propertyContext) {
      const { data: futureStays } = await admin
        .from("stays")
        .select("id, external_reservation_id")
        .eq("property_id", propertyContext.id)
        .eq("source", "airbnb_ical")
        .eq("status", "confirmed")
        .gte("check_out_at", new Date().toISOString());

      for (const stale of futureStays || []) {
        if (!stale.external_reservation_id || currentUids.has(stale.external_reservation_id)) continue;
        await admin.from("stays").update({
          status: "cancelled",
          updated_at: new Date().toISOString(),
        }).eq("id", stale.id);
        cancelledStays += 1;
      }
    }

    const syncedAt = new Date().toISOString();
    if (guideIntegration?.id) {
      await admin.from("guide_integrations").update({
        config: {
          ...config,
          airbnbLastSyncAt: syncedAt,
          airbnbSyncStatus: "healthy",
          airbnbLastError: null,
          airbnbReservationCount: bookings.length,
        },
      }).eq("id", guideIntegration.id);
    }

    if (tuyaIntegration?.id) {
      await admin.from("integrations").update({
        health_status: tuyaError ? "degraded" : "healthy",
        last_sync_at: syncedAt,
        last_error: tuyaError,
        updated_at: syncedAt,
      }).eq("id", tuyaIntegration.id);
    }

    return NextResponse.json({
      success: true,
      reservations: bookings.length,
      staysSynced: stayCount,
      accessCodesSynced: codeCount,
      codesGenerated: generatedCodeCount,
      codeFailures,
      cancelledCodes,
      cancelledStays,
      tuya: deviceId ? {
        configured: true,
        healthy: Boolean(tuyaConnector) && !tuyaError,
        error: tuyaError,
      } : {
        configured: false,
        healthy: false,
        error: null,
      },
      durationMs: Date.now() - syncStartedAt.getTime(),
      syncedAt,
    });
  } catch (error: any) {
    const message = String(error?.message || "Airbnb sync failed").slice(0, 500);

    if (guideIntegration?.id) {
      await admin.from("guide_integrations").update({
        config: {
          ...config,
          airbnbSyncStatus: "error",
          airbnbLastError: message,
          airbnbLastSyncAt: new Date().toISOString(),
        },
      }).eq("id", guideIntegration.id);
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
