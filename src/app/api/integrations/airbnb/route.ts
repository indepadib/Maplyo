export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { parseAirbnbCalendar, isAllowedAirbnbCalendarUrl } from "@/lib/integrations/ical";
import { getIntegrationAdmin, requireIntegrationUser, requireOwnedGuide } from "@/lib/integrations/server";

const ConnectSchema = z.object({
  guideId: z.string().uuid(),
  icalUrl: z.string().url().max(2000),
});

async function getGuideIntegration(admin: any, guideId: string) {
  const { data } = await admin
    .from("guide_integrations")
    .select("id, config")
    .eq("guide_id", guideId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data || null;
}

function maskCalendarUrl(raw: string) {
  try {
    const url = new URL(raw);
    const path = url.pathname;
    return `${url.origin}${path.slice(0, 28)}…`;
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
  if (!(await requireOwnedGuide(admin, access.user.id, guideId))) {
    return NextResponse.json({ error: "Guide not found" }, { status: 404 });
  }

  if (!isAllowedAirbnbCalendarUrl(icalUrl)) {
    return NextResponse.json({ error: "Use the Airbnb exported iCal URL ending in .ics" }, { status: 400 });
  }

  try {
    const bookings = await parseAirbnbCalendar(icalUrl);
    const existing = await getGuideIntegration(admin, guideId);
    const now = new Date().toISOString();

    const config = {
      ...(existing?.config || {}),
      icalUrl,
      airbnbConnectedAt: existing?.config?.airbnbConnectedAt || now,
      airbnbLastValidatedAt: now,
      airbnbSyncStatus: "healthy",
      airbnbLastError: null,
      airbnbReservationCount: bookings.length,
    };

    if (existing?.id) {
      await admin.from("guide_integrations").update({ config }).eq("id", existing.id);
    } else {
      await admin.from("guide_integrations").insert([{ guide_id: guideId, config }]);
    }

    return NextResponse.json({
      connected: true,
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
    const existing = await getGuideIntegration(admin, guideId);

    if (existing?.id) {
      await admin.from("guide_integrations").update({
        config: {
          ...(existing.config || {}),
          icalUrl,
          airbnbSyncStatus: "error",
          airbnbLastError: message,
          airbnbLastValidatedAt: new Date().toISOString(),
        },
      }).eq("id", existing.id);
    }

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const guideId = new URL(req.url).searchParams.get("guideId");
  if (!guideId || !(await requireOwnedGuide(admin, access.user.id, guideId))) {
    return NextResponse.json({ error: "Guide not found" }, { status: 404 });
  }

  const row = await getGuideIntegration(admin, guideId);
  const config = row?.config || {};
  const connected = Boolean(config.icalUrl);

  return NextResponse.json({
    connected,
    health: connected ? (config.airbnbSyncStatus || "degraded") : "disconnected",
    calendar: connected ? maskCalendarUrl(config.icalUrl) : null,
    lastSyncAt: config.airbnbLastSyncAt || null,
    lastValidatedAt: config.airbnbLastValidatedAt || null,
    reservationCount: Number(config.airbnbReservationCount || 0),
    error: config.airbnbLastError || null,
    tuyaDeviceId: config.tuyaDeviceId || null,
    tuyaDeviceName: config.tuyaDeviceName || null,
    tuyaCodeLength: Number(config.tuyaCodeLength || 6),
  });
}

export async function DELETE(req: Request) {
  const access = await requireIntegrationUser(req.headers.get("authorization"));
  if (!access.ok) return NextResponse.json({ error: access.error }, { status: access.status });

  const admin = getIntegrationAdmin();
  if (!admin) return NextResponse.json({ error: "Integration service unavailable" }, { status: 503 });

  const guideId = new URL(req.url).searchParams.get("guideId");
  if (!guideId || !(await requireOwnedGuide(admin, access.user.id, guideId))) {
    return NextResponse.json({ error: "Guide not found" }, { status: 404 });
  }

  const row = await getGuideIntegration(admin, guideId);
  if (!row?.id) return NextResponse.json({ success: true });

  const config = { ...(row.config || {}) };
  for (const key of [
    "icalUrl",
    "airbnbConnectedAt",
    "airbnbLastValidatedAt",
    "airbnbLastSyncAt",
    "airbnbSyncStatus",
    "airbnbLastError",
    "airbnbReservationCount",
  ]) {
    delete config[key];
  }

  await admin.from("guide_integrations").update({ config }).eq("id", row.id);
  return NextResponse.json({ success: true });
}
