import { runTrialLifecycle } from "../../src/lib/trial-lifecycle/engine";

export default async () => {
  const env = (globalThis as any).Netlify?.env;

  const result = await runTrialLifecycle({
    supabaseUrl: env?.get("NEXT_PUBLIC_SUPABASE_URL") || "",
    serviceRoleKey: env?.get("SUPABASE_SERVICE_ROLE_KEY") || "",
    resendApiKey: env?.get("RESEND_API_KEY") || "",
    origin: env?.get("URL") || "https://maplyo.com",
  });

  console.log("[trial-lifecycle]", JSON.stringify(result));
};

export const config = {
  schedule: "0 */6 * * *",
};
