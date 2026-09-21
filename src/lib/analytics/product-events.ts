"use client";

import { supabase } from "@/lib/supabase";

export type ProductEventName =
  | "onboarding_viewed"
  | "generation_started"
  | "generation_completed"
  | "property_created"
  | "experience_published"
  | "revenue_service_created"
  | "pricing_viewed"
  | "checkout_started";

export async function trackProductEvent(
  eventName: ProductEventName,
  input?: {
    guideId?: string;
    propertyId?: string;
    metadata?: Record<string, unknown>;
  }
) {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return;

    await fetch("/api/analytics/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        eventName,
        guideId: input?.guideId,
        propertyId: input?.propertyId,
        metadata: input?.metadata || {},
      }),
      keepalive: true,
    });
  } catch {
    // Analytics never blocks product actions.
  }
}
