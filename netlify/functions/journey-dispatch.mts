import { runGuestJourneyDispatch } from "../../src/lib/journey/engine";

export default async () => {
  const netlify = (globalThis as any).Netlify;
  const env = netlify?.env;

  const supabaseUrl = env?.get("NEXT_PUBLIC_SUPABASE_URL") || "";
  const serviceRoleKey = env?.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const resendApiKey = env?.get("RESEND_API_KEY") || "";
  const origin = env?.get("URL") || "https://maplyo.com";

  const result = await runGuestJourneyDispatch({
    supabaseUrl,
    serviceRoleKey,
    resendApiKey,
    origin,
  });

  console.log("[journey-dispatch]", JSON.stringify(result));
};

export const config = {
  schedule: "0 * * * *",
};
