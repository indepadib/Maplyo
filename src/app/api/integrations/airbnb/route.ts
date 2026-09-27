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

export async function POST(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const parsed = ConnectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid Airbnb calendar configuration" }, { status: 400 });

  const { guideId, icalUrl } = parsed.data;
  const context = await getOwnedPropertyFromGuide(admin, access.user.id, guideId);
  if (!context) {
    return NextResponse.json({ error: "This guide is not attached to a property yet" }, { status: 400 });
  }

  if (!isAllowedAirbnbCalendarUrl(icalUrl)) {
    return NextResponse.json({ error: "Use the Airbnb exported iCal URL ending in .ics" }, { status: 400 });
  }

  try {
    const bookings = await parseAirbnbCalendar(icalUrl);
    const now = new Date().toISOString();

    await admin.from("property_connections").upsert({
      property_id: context.propertyId,
      airbnb_ical_url: icalUrl,
      airbnb_status: "healthy",
      airbnb_last_validated_at: now,
      airbnb_last_error: null,
      airbnb_reservation_count: bookings.length,
      updated_at: now,
    });

    return NextResponse.json({
      connected: true,
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
    const message = String(error?.message || "Airbnb calendar validation failed").slice(0, 500);
    const now = new Date().toISOString();

    await admin.from("property_connections").upsert({
      property_id: context.propertyId,
      airbnb_ical_url: icalUrl,
      airbnb_status: "error",
      airbnb_last_validated_at: now,
      airbnb_last_error: message,
      updated_at: now,
    });

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const guideId = new URL(req.url).searchParams.get("guideId");
  if (!guideId) return NextResponse.json({ error: "Guide not found" }, { status: 404 });

  const context = await getOwnedPropertyFromGuide(admin, access.user.id, guideId);
  if (!context) {
    return NextResponse.json({
      connected: false,
      health: "disconnected",
      propertyAttached: false,
    });
  }

  const connection = await getPropertyConnection(admin, context.propertyId);
  const connected = Boolean(connection?.airbnb_ical_url);

  return NextResponse.json({
    connected,
    propertyAttached: true,
    propertyId: context.propertyId,
    propertyName: context.property?.name || null,
    health: connected ? (connection?.airbnb_status || "degraded") : "disconnected",
    calendar: connected ? maskCalendarUrl(connection.airbnb_ical_url) : null,
    lastSyncAt: connection?.airbnb_last_sync_at || null,
    lastValidatedAt: connection?.airbnb_last_validated_at || null,
    reservationCount: Number(connection?.airbnb_reservation_count || 0),
    error: connection?.airbnb_last_error || null,
    tuyaDeviceId: connection?.tuya_device_id || null,
    tuyaDeviceName: connection?.tuya_device_name || null,
    tuyaCodeLength: Number(connection?.tuya_code_length || 6),
  });
}

export async function DELETE(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const guideId = new URL(req.url).searchParams.get("guideId");
  if (!guideId) return NextResponse.json({ error: "Guide not found" }, { status: 404 });

  const context = await getOwnedPropertyFromGuide(admin, access.user.id, guideId);
  if (!context) return NextResponse.json({ success: true });

  await admin.from("property_connections").upsert({
    property_id: context.propertyId,
    airbnb_ical_url: null,
    airbnb_status: "disconnected",
    airbnb_last_validated_at: null,
    airbnb_last_sync_at: null,
    airbnb_last_error: null,
    airbnb_reservation_count: 0,
    updated_at: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
