import { randomInt } from "node:crypto";
import { parseAirbnbCalendar } from "@/lib/integrations/ical";
import { TuyaConnector, type TuyaRegion } from "@/lib/integrations/tuya";
import { decryptIntegrationSecret } from "@/lib/integrations/secrets";
import {
  getOwnedPropertyFromGuide,
  getPropertyConnection,
  getLegacyGuideConnection,
  saveLegacyGuideConnection,
  isSchemaCompatibilityError,
} from "@/lib/integrations/server";

async function findTuyaIntegration(admin: any, userId: string, integrationId?: string | null) {
  let query = admin.from("integrations").select("id, credentials, settings");
  query = query.eq("user_id", userId).eq("type", "tuya");
  if (integrationId) query = query.eq("id", integrationId);

  const { data } = await query
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle()
    .throwOnError();

  return data || null;
}

async function readTuyaSecret(admin: any, integration: any) {
  try {
    const { data: secret } = await admin
      .from("integration_secrets")
      .select("ciphertext, iv, auth_tag")
      .eq("integration_id", integration.id)
      .maybeSingle()
      .throwOnError();

    if (secret) {
      return decryptIntegrationSecret<{
        accessId: string;
        accessSecret: string;
        region: TuyaRegion;
      }>(secret);
    }
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;
  }

  const credentials = integration.credentials || {};
  if (credentials.encrypted_v1?.ciphertext) {
    return decryptIntegrationSecret<{
      accessId: string;
      accessSecret: string;
      region: TuyaRegion;
    }>({
      ciphertext: credentials.encrypted_v1.ciphertext,
      iv: credentials.encrypted_v1.iv,
      auth_tag: credentials.encrypted_v1.auth_tag,
    });
  }

  if (credentials.accessId && credentials.accessSecret) {
    return {
      accessId: String(credentials.accessId),
      accessSecret: String(credentials.accessSecret),
      region: (["eu","us","cn","in"].includes(credentials.region) ? credentials.region : "eu") as TuyaRegion,
    };
  }

  throw new Error("Tuya credentials are not connected");
}

async function getTuyaConnector(admin: any, userId: string, integrationId?: string | null) {
  const integration = await findTuyaIntegration(admin, userId, integrationId);
  if (!integration?.id) return { connector: null as TuyaConnector | null, integration: null };

  const credentials = await readTuyaSecret(admin, integration);
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
      .maybeSingle()
      .throwOnError();

    if (existingGuest?.id) {
      guestId = existingGuest.id;
    } else {
      const { data: createdGuest } = await admin
        .from("guests")
        .insert([{
          organization_id: args.organizationId,
          first_name: booking.guestName,
          marketing_consent: false,
          metadata: { source: "airbnb_ical", source_booking_uid: booking.uid },
        }])
        .select("id")
        .single()
        .throwOnError();
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
    .maybeSingle()
    .throwOnError();

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
    await admin.from("stays").update(payload).eq("id", existingStay.id).throwOnError();
    return existingStay.id;
  }

  const { data: created } = await admin
    .from("stays")
    .insert([payload])
    .select("id")
    .single()
    .throwOnError();

  if (!created?.id) throw new Error("Could not save stay");
  return created.id;
}

async function readAccessCode(admin: any, guideId: string, uid: string) {
  try {
    const { data } = await admin
      .from("access_codes")
      .select("id, code, provider_password_id")
      .eq("guide_id", guideId)
      .eq("external_uid", uid)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .throwOnError();
    return data || null;
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;
    const { data } = await admin
      .from("access_codes")
      .select("id, code")
      .eq("guide_id", guideId)
      .eq("external_uid", uid)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .throwOnError();
    return data ? { ...data, provider_password_id: null } : null;
  }
}

async function writeAccessCode(admin: any, existingId: string | null, payload: any) {
  try {
    if (existingId) {
      await admin.from("access_codes").update(payload).eq("id", existingId).throwOnError();
    } else {
      await admin.from("access_codes").insert([payload]).throwOnError();
    }
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;
    const { provider_password_id: _ignored, ...legacyPayload } = payload;
    if (existingId) {
      await admin.from("access_codes").update(legacyPayload).eq("id", existingId).throwOnError();
    } else {
      await admin.from("access_codes").insert([legacyPayload]).throwOnError();
    }
  }
}

async function readFutureCodes(admin: any, guideId: string) {
  try {
    const { data } = await admin
      .from("access_codes")
      .select("id, external_uid, provider_password_id")
      .eq("guide_id", guideId)
      .eq("source", "airbnb")
      .eq("status", "active")
      .gte("valid_until", new Date().toISOString())
      .throwOnError();
    return data || [];
  } catch (error) {
    if (!isSchemaCompatibilityError(error)) throw error;
    const { data } = await admin
      .from("access_codes")
      .select("id, external_uid")
      .eq("guide_id", guideId)
      .eq("source", "airbnb")
      .eq("status", "active")
      .gte("valid_until", new Date().toISOString())
      .throwOnError();
    return (data || []).map((row: any) => ({ ...row, provider_password_id: null }));
  }
}

async function readOperationalConnection(admin: any, context: any) {
  if (context.mode === "property") {
    const row = await getPropertyConnection(admin, context.propertyId);
    return {
      icalUrl: row?.airbnb_ical_url || null,
      deviceId: row?.tuya_device_id || null,
      deviceName: row?.tuya_device_name || null,
      codeLength: Number(row?.tuya_code_length || 6) === 7 ? 7 : 6,
      integrationId: row?.tuya_integration_id || null,
      raw: row,
    };
  }

  const row = await getLegacyGuideConnection(admin, context.guideId);
  const config = row?.config || {};
  return {
    icalUrl: config.icalUrl || null,
    deviceId: config.tuyaDeviceId || row?.external_id || null,
    deviceName: config.tuyaDeviceName || null,
    codeLength: Number(config.tuyaCodeLength || 6) === 7 ? 7 : 6,
    integrationId: row?.integration_id || null,
    raw: row,
  };
}

async function saveSyncHealth(admin: any, context: any, values: {
  status: "healthy" | "error";
  syncedAt: string;
  error: string | null;
  reservationCount?: number;
}) {
  if (context.mode === "property") {
    await admin.from("property_connections").upsert({
      property_id: context.propertyId,
      airbnb_status: values.status,
      airbnb_last_sync_at: values.syncedAt,
      airbnb_last_error: values.error,
      ...(values.reservationCount !== undefined ? { airbnb_reservation_count: values.reservationCount } : {}),
      updated_at: values.syncedAt,
    }).throwOnError();
    return;
  }

  const existing = await getLegacyGuideConnection(admin, context.guideId);
  if (!existing?.id) return;

  const config = {
    ...(existing.config || {}),
    airbnbSyncStatus: values.status,
    airbnbLastSyncAt: values.syncedAt,
    airbnbLastError: values.error,
    ...(values.reservationCount !== undefined ? { airbnbReservationCount: values.reservationCount } : {}),
  };

  await saveLegacyGuideConnection(admin, context.guideId, config);
}

async function updateTuyaHealth(admin: any, integrationId: string | null, error: string | null, syncedAt: string) {
  if (!integrationId) return;
  try {
    await admin.from("integrations").update({
      health_status: error ? "degraded" : "healthy",
      last_sync_at: syncedAt,
      last_error: error,
      updated_at: syncedAt,
    }).eq("id", integrationId).throwOnError();
  } catch (updateError) {
    if (!isSchemaCompatibilityError(updateError)) throw updateError;
    await admin.from("integrations").update({
      status: "active",
      updated_at: syncedAt,
    }).eq("id", integrationId).throwOnError();
  }
}

export async function runAirbnbGuideSync(options: {
  admin: any;
  userId: string;
  guideId: string;
}) {
  const { admin, userId, guideId } = options;
  const startedAt = Date.now();
  const context = await getOwnedPropertyFromGuide(admin, userId, guideId);
  if (!context) throw new Error("Guide not found");

  const connection = await readOperationalConnection(admin, context);
  if (!connection.icalUrl) {
    throw new Error(
      context.mode === "property"
        ? "Airbnb iCal is not connected for this property"
        : "Airbnb iCal is not connected for this guide"
    );
  }

  try {
    const bookings = await parseAirbnbCalendar(connection.icalUrl);
    const currentUids = new Set(bookings.map((booking) => booking.uid));

    const deviceId = connection.deviceId ? String(connection.deviceId) : null;
    const codeLength: 6 | 7 = connection.codeLength === 7 ? 7 : 6;
    const startOffsetMinutes = -60;
    const endOffsetMinutes = 60;

    let tuyaConnector: TuyaConnector | null = null;
    let tuyaError: string | null = null;

    if (deviceId) {
      try {
        const tuya = await getTuyaConnector(admin, userId, connection.integrationId);
        tuyaConnector = tuya.connector;
        if (tuyaConnector) await tuyaConnector.testConnection();
        else tuyaError = "Tuya credentials are not connected";
      } catch (error: any) {
        tuyaError = String(error?.message || "Tuya connection failed").slice(0, 500);
      }
    }

    let staysSynced = 0;
    let accessCodesSynced = 0;
    let codesGenerated = 0;
    let codeFailures = 0;

    for (const booking of bookings) {
      if (context.mode === "property") {
        await syncStay(admin, {
          organizationId: context.organizationId,
          propertyId: context.propertyId,
          guideId,
          booking,
        });
        staysSynced += 1;
      }

      const existingCode = await readAccessCode(admin, guideId, booking.uid);
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
          codesGenerated += 1;
        } catch (error: any) {
          codeFailures += 1;
          tuyaError = String(error?.message || "Tuya code generation failed").slice(0, 500);
        }
      }

      await writeAccessCode(admin, existingCode?.id || null, {
        guide_id: guideId,
        guest_name: booking.guestName || null,
        valid_from: booking.start.toISOString(),
        valid_until: booking.end.toISOString(),
        source: "airbnb",
        external_uid: booking.uid,
        code,
        provider_password_id: providerPasswordId,
        status: "active",
      });
      accessCodesSynced += 1;
    }

    let cancelledCodes = 0;
    const futureCodes = await readFutureCodes(admin, guideId);

    for (const stale of futureCodes) {
      if (!stale.external_uid || currentUids.has(stale.external_uid)) continue;

      if (stale.provider_password_id && (!deviceId || !tuyaConnector)) {
        codeFailures += 1;
        tuyaError = "Tuya connection required to revoke a cancelled reservation lock code";
        continue;
      }

      if (deviceId && tuyaConnector && stale.provider_password_id) {
        try {
          await tuyaConnector.deleteTemporaryPassword(deviceId, stale.provider_password_id);
        } catch {
          codeFailures += 1;
          tuyaError = "Could not revoke a cancelled reservation lock code";
          continue;
        }
      }

      await admin.from("access_codes").update({ status: "cancelled" }).eq("id", stale.id).throwOnError();
      cancelledCodes += 1;
    }

    let cancelledStays = 0;
    if (context.mode === "property") {
      const { data: futureStays } = await admin
        .from("stays")
        .select("id, external_reservation_id")
        .eq("property_id", context.propertyId)
        .eq("source", "airbnb_ical")
        .eq("status", "confirmed")
        .gte("check_out_at", new Date().toISOString())
        .throwOnError();

      for (const stale of futureStays || []) {
        if (!stale.external_reservation_id || currentUids.has(stale.external_reservation_id)) continue;
        await admin.from("stays").update({
          status: "cancelled",
          updated_at: new Date().toISOString(),
        }).eq("id", stale.id).throwOnError();
        cancelledStays += 1;
      }
    }

    const syncedAt = new Date().toISOString();
    await saveSyncHealth(admin, context, {
      status: "healthy",
      syncedAt,
      error: null,
      reservationCount: bookings.length,
    });
    await updateTuyaHealth(admin, connection.integrationId, tuyaError, syncedAt);

    return {
      success: true,
      storageMode: context.mode,
      reservations: bookings.length,
      staysSynced,
      accessCodesSynced,
      codesGenerated,
      codeFailures,
      cancelledCodes,
      cancelledStays,
      tuya: deviceId
        ? { configured: true, healthy: Boolean(tuyaConnector) && !tuyaError, error: tuyaError }
        : { configured: false, healthy: false, error: null },
      durationMs: Date.now() - startedAt,
      syncedAt,
    };
  } catch (error: any) {
    const message = String(error?.message || "Airbnb sync failed").slice(0, 500);
    const syncedAt = new Date().toISOString();

    try {
      await saveSyncHealth(admin, context, {
        status: "error",
        syncedAt,
        error: message,
      });
    } catch {
      // Preserve the original sync error.
    }

    throw new Error(message);
  }
}
