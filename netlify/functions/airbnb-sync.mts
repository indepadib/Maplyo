import { createClient } from "@supabase/supabase-js";
import { runAirbnbGuideSync } from "../../src/lib/integrations/airbnb-sync-engine";

export default async () => {
  const env = (globalThis as any).Netlify?.env;
  const supabaseUrl = env?.get("NEXT_PUBLIC_SUPABASE_URL") || "";
  const serviceRoleKey = env?.get("SUPABASE_SERVICE_ROLE_KEY") || "";

  if (!supabaseUrl || !serviceRoleKey) {
    console.log("[airbnb-sync] Supabase service configuration missing");
    return;
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: rows, error } = await admin
    .from("property_connections")
    .select("property_id, airbnb_ical_url, airbnb_last_sync_at")
    .not("airbnb_ical_url", "is", null)
    .limit(100);

  if (error) {
    console.log("[airbnb-sync] Could not load property connections", error.message);
    return;
  }

  const now = Date.now();
  const due = (rows || [])
    .filter((row: any) => {
      const last = row.airbnb_last_sync_at
        ? new Date(row.airbnb_last_sync_at).getTime()
        : 0;
      return !last || now - last >= 2.5 * 60 * 60 * 1000;
    })
    .slice(0, 8);

  const results = await Promise.allSettled(
    due.map(async (row: any) => {
      const { data: guide } = await admin
        .from("guides")
        .select("id, user_id, is_published, updated_at")
        .eq("property_id", row.property_id)
        .order("is_published", { ascending: false })
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!guide?.id || !guide?.user_id) throw new Error("No guide attached to property");

      return runAirbnbGuideSync({
        admin,
        userId: guide.user_id,
        guideId: guide.id,
      });
    })
  );

  const fulfilled = results.filter((result) => result.status === "fulfilled").length;
  const failed = results.length - fulfilled;

  console.log("[airbnb-sync]", JSON.stringify({
    due: due.length,
    synced: fulfilled,
    failed,
  }));
};

export const config = {
  schedule: "30 */3 * * *",
};
