"use client";

const SESSION_KEY = "maplyo_guest_session";

function getSessionId() {
  if (typeof window === "undefined") return undefined;
  let id = window.sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `gs_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    window.sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function trackGuestEvent(input: {
  guideId?: string;
  eventName:
    | "upsells_block_view"
    | "service_view"
    | "service_cta"
    | "service_request"
    | "order_started"
    | "order_completed"
    | "review_clicked";
  serviceKey?: string;
  serviceId?: string;
  metadata?: Record<string, unknown>;
}) {
  if (!input.guideId || typeof window === "undefined") return;

  const body = JSON.stringify({
    guideId: input.guideId,
    eventName: input.eventName,
    sessionId: getSessionId(),
    serviceKey: input.serviceKey,
    serviceId: input.serviceId,
    metadata: input.metadata || {},
  });

  // Fire-and-forget: analytics must never slow navigation.
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/analytics/event", blob);
      return;
    }
  } catch {
    // Fallback below.
  }

  fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
