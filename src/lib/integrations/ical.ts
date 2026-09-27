import crypto from "node:crypto";

function isAllowedAirbnbCalendarUrl(rawUrl: string): boolean {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:") return false;

    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    const isAirbnbHost = /^airbnb\.(com|[a-z]{2,3}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(hostname);
    if (!isAirbnbHost) return false;

    return url.pathname.includes("/calendar/ical/") && url.pathname.endsWith(".ics");
  } catch {
    return false;
  }
}

export interface BookingEvent {
  summary: string;
  start: Date;
  end: Date;
  uid: string;
  description?: string;
  guestName?: string | null;
}

function normalizeText(value: unknown) {
  return String(value || "").trim();
}

function isReservationSummary(summary: string) {
  const normalized = summary.toLowerCase();
  if (!normalized) return false;
  if (normalized.includes("not available")) return false;
  if (normalized.includes("unavailable")) return false;
  if (normalized.includes("blocked")) return false;
  return normalized.includes("reserved") || normalized.includes("reservation");
}

function extractGuestName(summary: string): string | null {
  const separators = [" - ", " – ", " — "];
  for (const separator of separators) {
    const parts = summary.split(separator).map((part) => part.trim()).filter(Boolean);
    if (parts.length >= 2 && /reserved|reservation/i.test(parts[0])) {
      const candidate = parts.slice(1).join(separator).trim();
      if (candidate && !/not available|blocked|unavailable/i.test(candidate)) return candidate;
    }
  }
  return null;
}

function stableUid(summary: string, start: Date, end: Date) {
  return crypto
    .createHash("sha256")
    .update([summary, start.toISOString(), end.toISOString()].join("|"))
    .digest("hex")
    .slice(0, 40);
}

async function fetchCalendar(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "error",
      signal: controller.signal,
      headers: {
        Accept: "text/calendar,text/plain;q=0.9,*/*;q=0.1",
        "User-Agent": "Maplyo-Calendar-Sync/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Airbnb calendar returned HTTP ${response.status}`);
    }

    const lengthHeader = Number(response.headers.get("content-length") || 0);
    if (lengthHeader > 2_000_000) {
      throw new Error("Airbnb calendar is unexpectedly large");
    }

    const payload = await response.text();
    if (!payload.includes("BEGIN:VCALENDAR")) {
      throw new Error("Airbnb calendar response is not an iCalendar feed");
    }
    if (payload.length > 2_000_000) {
      throw new Error("Airbnb calendar is unexpectedly large");
    }

    return payload;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Parse the exported Airbnb iCal feed.
 * Calendar feeds can include blocked/unavailable periods in addition to reservations,
 * so only reservation-like events are promoted into Maplyo stays.
 */
export async function parseAirbnbCalendar(url: string): Promise<BookingEvent[]> {
  if (!isAllowedAirbnbCalendarUrl(url)) {
    throw new Error("Invalid Airbnb calendar URL");
  }

  try {
    const payload = await fetchCalendar(url);
    const ical = await import("node-ical");
    const events = ical.sync.parseICS(payload);

    const now = new Date();
    const horizon = new Date(now.getTime() + 730 * 24 * 60 * 60 * 1000);

    return Object.values(events)
      .filter((event: any) => event && event.type === "VEVENT" && event.start && event.end)
      .map((event: any) => {
        const start = new Date(event.start);
        const end = new Date(event.end);
        const summary = normalizeText(event.summary);
        return { event, start, end, summary };
      })
      .filter(({ start, end }) =>
        Number.isFinite(start.getTime()) &&
        Number.isFinite(end.getTime()) &&
        end > now &&
        start < horizon &&
        end > start
      )
      .filter(({ summary }) => isReservationSummary(summary))
      .map(({ event, start, end, summary }) => ({
        summary,
        start,
        end,
        uid: normalizeText(event.uid) || stableUid(summary, start, end),
        description: normalizeText(event.description),
        guestName: extractGuestName(summary),
      }));
  } catch (error: any) {
    console.error("[iCal] Error parsing Airbnb feed:", error);
    throw new Error(error?.message || "Failed to parse Airbnb iCal feed");
  }
}

export { isAllowedAirbnbCalendarUrl, isReservationSummary };
