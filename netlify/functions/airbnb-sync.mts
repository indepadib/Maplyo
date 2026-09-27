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
    .from("guide_integrations")
    .select("guide_id, config")
    .limit(100);

  if (error) {
    console.log("[airbnb-sync] Could not load guide integrations", error.message);
    return;
  }

  const now = Date.now();
  const due = (rows || [])
    .filter((row: any) => Boolean(row.config?.icalUrl))
    .filter((row: any) => {
      const last = row.config?.airbnbLastSyncAt
        ? new Date(row.config.airbnbLastSyncAt).getTime()
        : 0;
      return !last || now - last >= 2.5 * 60 * 60 * 1000;
    })
    .slice(0, 8);

  const results = await Promise.allSettled(
    due.map(async (row: any) => {
      const { data: guide } = await admin
        .from("guides")
        .select("user_id")
        .eq("id", row.guide_id)
        .maybeSingle();

      if (!guide?.user_id) throw new Error("Guide owner unavailable");

      return runAirbnbGuideSync({
        admin,
        userId: guide.user_id,
        guideId: row.guide_id,
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
