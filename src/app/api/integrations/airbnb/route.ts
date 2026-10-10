import { withIntegrationErrors } from "@/lib/integrations/route-errors";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { parseAirbnbCalendar, isAllowedAirbnbCalendarUrl } from "@/lib/integrations/ical";
import {
  getIntegrationAdmin,
  requireIntegrationUser,
  getOwnedPropertyFromGuide,
  getPropertyConnection,
  getLegacyGuideConnection,
  saveLegacyGuideConnection,
} from "@/lib/integrations/server";

const ConnectSchema = z.object({
  guideId: z.string().uuid(),
  icalUrl: z.string().url().max(2000),
});

function maskCalendarUrl(raw: string) {
  try {
    const url = new URL(raw);
    return `${url.origin}${url.pathname.slice(0, 28)}…`;
  } catch {
    return "Airbnb iCal";
  }
}

async function readState(admin: any, context: any) {
  if (context.mode === "property") {
    const row = await getPropertyConnection(admin, context.propertyId);
    return {
      icalUrl: row?.airbnb_ical_url || null,
      health: row?.airbnb_status || "disconnected",
      lastSyncAt: row?.airbnb_last_sync_at || null,
      lastValidatedAt: row?.airbnb_last_validated_at || null,
      reservationCount: Number(row?.airbnb_reservation_count || 0),
      error: row?.airbnb_last_error || null,
      tuyaDeviceId: row?.tuya_device_id || null,
      tuyaDeviceName: row?.tuya_device_name || null,
      tuyaCodeLength: Number(row?.tuya_code_length || 6),
    };
  }

  const row = await getLegacyGuideConnection(admin, context.guideId);
  const config = row?.config || {};
  return {
    icalUrl: config.icalUrl || null,
    health: config.airbnbSyncStatus || (config.icalUrl ? "degraded" : "disconnected"),
    lastSyncAt: config.airbnbLastSyncAt || null,
    lastValidatedAt: config.airbnbLastValidatedAt || null,
    reservationCount: Number(config.airbnbReservationCount || 0),
    error: config.airbnbLastError || null,
    tuyaDeviceId: config.tuyaDeviceId || row?.external_id || null,
    tuyaDeviceName: config.tuyaDeviceName || null,
    tuyaCodeLength: Number(config.tuyaCodeLength || 6),
  };
}

async function saveAirbnbState(admin: any, context: any, values: {
  icalUrl: string | null;
  health: string;
  lastValidatedAt?: string | null;
  lastSyncAt?: string | null;
  error?: string | null;
  reservationCount?: number;
}) {
  const now = new Date().toISOString();

  if (context.mode === "property") {
    await admin.from("property_connections").upsert({
      property_id: context.propertyId,
      airbnb_ical_url: values.icalUrl,
      airbnb_status: values.health,
      airbnb_last_validated_at: values.lastValidatedAt ?? null,
      airbnb_last_sync_at: values.lastSyncAt ?? null,
      airbnb_last_error: values.error ?? null,
      airbnb_reservation_count: values.reservationCount ?? 0,
      updated_at: now,
    }).throwOnError();
    return;
  }

  const existing = await getLegacyGuideConnection(admin, context.guideId);
  const config = {
    ...(existing?.config || {}),
    icalUrl: values.icalUrl,
    airbnbSyncStatus: values.health,
    airbnbLastValidatedAt: values.lastValidatedAt ?? null,
    airbnbLastSyncAt: values.lastSyncAt ?? null,
    airbnbLastError: values.error ?? null,
    airbnbReservationCount: values.reservationCount ?? 0,
  };

  await saveLegacyGuideConnection(admin, context.guideId, config);
}

async function handlePOST(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const parsed = ConnectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid Airbnb calendar configuration" }, { status: 400 });

  const { guideId, icalUrl } = parsed.data;
  const context = await getOwnedPropertyFromGuide(admin, access.user.id, guideId);
  if (!context) return NextResponse.json({ error: "Guide not found" }, { status: 404 });

  if (!isAllowedAirbnbCalendarUrl(icalUrl)) {
    return NextResponse.json({ error: "Use the Airbnb exported iCal URL ending in .ics" }, { status: 400 });
  }

  try {
    const bookings = await parseAirbnbCalendar(icalUrl);
    const now = new Date().toISOString();

    await saveAirbnbState(admin, context, {
      icalUrl,
      health: "healthy",
      lastValidatedAt: now,
      lastSyncAt: null,
      error: null,
      reservationCount: bookings.length,
    });

    return NextResponse.json({
      connected: true,
      storageMode: context.mode,
      propertyId: context.propertyId,
      propertyName: context.property?.name || null,
      health: "healthy",
      calendar: maskCalendarUrl(icalUrl),
      validatedAt: now,
      reservationCount: bookings.length,
      upcoming: bookings.slice(0, 5).map((booking) => ({
        uid: booking.uid,
        guestName: booking.guestName || null,
        checkInAt: booking.start.toISOString(),
        checkOutAt: booking.end.toISOString(),
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: String(error?.message || "Airbnb calendar validation failed").slice(0, 500) },
      { status: 400 }
    );
  }
}

async function handleGET(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const guideId = new URL(req.url).searchParams.get("guideId");
  if (!guideId) return NextResponse.json({ error: "Guide not found" }, { status: 404 });

  const context = await getOwnedPropertyFromGuide(admin, access.user.id, guideId);
  if (!context) return NextResponse.json({ error: "Guide not found" }, { status: 404 });

  const state = await readState(admin, context);
  const connected = Boolean(state.icalUrl);

  return NextResponse.json({
    connected,
    storageMode: context.mode,
    propertyAttached: context.mode === "property",
    propertyId: context.propertyId,
    propertyName: context.property?.name || null,
    health: connected ? state.health : "disconnected",
    calendar: connected ? maskCalendarUrl(state.icalUrl) : null,
    lastSyncAt: state.lastSyncAt,
    lastValidatedAt: state.lastValidatedAt,
    reservationCount: state.reservationCount,
    error: state.error,
    tuyaDeviceId: state.tuyaDeviceId,
    tuyaDeviceName: state.tuyaDeviceName,
    tuyaCodeLength: state.tuyaCodeLength,
  });
}

async function handleDELETE(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const guideId = new URL(req.url).searchParams.get("guideId");
  if (!guideId) return NextResponse.json({ error: "Guide not found" }, { status: 404 });

  const context = await getOwnedPropertyFromGuide(admin, access.user.id, guideId);
  if (!context) return NextResponse.json({ success: true });

  await saveAirbnbState(admin, context, {
    icalUrl: null,
    health: "disconnected",
    lastValidatedAt: null,
    lastSyncAt: null,
    error: null,
    reservationCount: 0,
  });

  return NextResponse.json({ success: true, storageMode: context.mode });
}

export const POST = withIntegrationErrors(handlePOST);
export const GET = withIntegrationErrors(handleGET);
export const DELETE = withIntegrationErrors(handleDELETE);
