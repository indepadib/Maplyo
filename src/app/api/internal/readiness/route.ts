import { NextResponse } from "next/server";
import { requireInternalUser, getServiceRoleClient } from "@/lib/internal/admin-access";

type Check = {
  key: string;
  label: string;
  group: "environment" | "database" | "payments" | "ai";
  ok: boolean;
  detail: string;
  blocking: boolean;
};

function configured(value: string | undefined, placeholders: string[] = []) {
  if (!value) return false;
  const normalized = value.trim();
  if (!normalized) return false;
  return !placeholders.some((placeholder) => normalized.includes(placeholder));
}

async function tableCheck(admin: any, table: string, label: string, blocking = true): Promise<Check> {
  if (!admin) {
    return {
      key: `table_${table}`,
      label,
      group: "database",
      ok: false,
      detail: "Supabase service role is not configured.",
      blocking,
    };
  }

  const result = await admin.from(table).select("*", { count: "exact", head: true }).limit(1);

  return {
    key: `table_${table}`,
    label,
    group: "database",
    ok: !result.error,
    detail: result.error
      ? `Missing/unavailable: ${result.error.message}`
      : `Available${typeof result.count === "number" ? ` · ${result.count} rows` : ""}`,
    blocking,
  };
}

export async function GET(req: Request) {
  const access = await requireInternalUser(req.headers.get("authorization"));
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const envChecks: Check[] = [
    {
      key: "supabase_url",
      label: "Supabase project URL",
      group: "environment",
      ok: configured(process.env.NEXT_PUBLIC_SUPABASE_URL, ["example.supabase.co", "placeholder"]),
      detail: configured(process.env.NEXT_PUBLIC_SUPABASE_URL, ["example.supabase.co", "placeholder"]) ? "Configured" : "Missing",
      blocking: true,
    },
    {
      key: "supabase_anon",
      label: "Supabase public key",
      group: "environment",
      ok: configured(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, ["placeholder"]),
      detail: configured(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, ["placeholder"]) ? "Configured" : "Missing",
      blocking: true,
    },
    {
      key: "supabase_service",
      label: "Supabase service role",
      group: "environment",
      ok: configured(process.env.SUPABASE_SERVICE_ROLE_KEY, ["placeholder"]),
      detail: configured(process.env.SUPABASE_SERVICE_ROLE_KEY, ["placeholder"]) ? "Configured server-side" : "Missing",
      blocking: true,
    },
    {
      key: "admin_allowlist",
      label: "Internal admin allowlist",
      group: "environment",
      ok: configured(process.env.MAPLYO_ADMIN_EMAILS),
      detail: configured(process.env.MAPLYO_ADMIN_EMAILS) ? "Configured" : "Set MAPLYO_ADMIN_EMAILS before using internal tools",
      blocking: true,
    },
  ];

  const aiChecks: Check[] = [
    {
      key: "openai",
      label: "OpenAI generation & concierge",
      group: "ai",
      ok: configured(process.env.OPENAI_API_KEY, ["placeholder"]),
      detail: configured(process.env.OPENAI_API_KEY, ["placeholder"]) ? "Configured" : "OPENAI_API_KEY missing",
      blocking: true,
    },
    {
      key: "resend",
      label: "Sales email notifications",
      group: "environment",
      ok: configured(process.env.RESEND_API_KEY, ["placeholder", "mock"]),
      detail: configured(process.env.RESEND_API_KEY, ["placeholder", "mock"])
        ? "Resend configured"
        : "Optional: inquiries are still stored in the Sales Engine without email notification",
      blocking: false,
    },
    {
      key: "ai_rate_salt",
      label: "AI abuse protection salt",
      group: "ai",
      ok: configured(process.env.AI_CHAT_RATE_LIMIT_SALT),
      detail: configured(process.env.AI_CHAT_RATE_LIMIT_SALT)
        ? "Dedicated salt configured"
        : "Optional: currently falls back to a server secret",
      blocking: false,
    },
  ];

  const paymentChecks: Check[] = [
    {
      key: "stripe_secret",
      label: "Stripe server key",
      group: "payments",
      ok: configured(process.env.STRIPE_SECRET_KEY, ["placeholder"]),
      detail: configured(process.env.STRIPE_SECRET_KEY, ["placeholder"]) ? "Configured" : "Missing",
      blocking: true,
    },
    {
      key: "stripe_webhook",
      label: "Stripe webhook verification",
      group: "payments",
      ok: configured(process.env.STRIPE_WEBHOOK_SECRET, ["placeholder"]),
      detail: configured(process.env.STRIPE_WEBHOOK_SECRET, ["placeholder"]) ? "Configured" : "Missing",
      blocking: true,
    },
    {
      key: "stripe_basic",
      label: "Basic plan price",
      group: "payments",
      ok: configured(process.env.STRIPE_BASIC_PRICE_ID, ["placeholder"]),
      detail: configured(process.env.STRIPE_BASIC_PRICE_ID, ["placeholder"]) ? "Configured" : "Missing",
      blocking: true,
    },
    {
      key: "stripe_pro",
      label: "Pro plan price",
      group: "payments",
      ok: configured(process.env.STRIPE_PRO_PRICE_ID, ["placeholder"]),
      detail: configured(process.env.STRIPE_PRO_PRICE_ID, ["placeholder"]) ? "Configured" : "Missing",
      blocking: true,
    },
  ];

  const admin = getServiceRoleClient();

  const dbChecks = await Promise.all([
    tableCheck(admin, "organizations", "Hospitality Core · organizations"),
    tableCheck(admin, "properties", "Hospitality Core · properties"),
    tableCheck(admin, "stays", "Hospitality Core · stays"),
    tableCheck(admin, "services", "Revenue · services"),
    tableCheck(admin, "orders", "Revenue · orders"),
    tableCheck(admin, "guest_events", "Revenue · guest events"),
    tableCheck(admin, "product_events", "Activation · product events"),
    tableCheck(admin, "magic_demos", "Growth · Magic Demos"),
    tableCheck(admin, "sales_prospects", "Growth · sales prospects"),
    tableCheck(admin, "sales_activities", "Growth · sales activities"),
    tableCheck(admin, "sales_inquiries", "Growth · inbound sales inquiries"),
    tableCheck(admin, "magic_demo_views", "Growth · human Magic Demo views"),
    tableCheck(admin, "ai_chat_usage", "AI · concierge usage"),
  ]);

  const checks = [...envChecks, ...dbChecks, ...paymentChecks, ...aiChecks];
  const blocking = checks.filter((check) => check.blocking);
  const blockers = blocking.filter((check) => !check.ok);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    ready: blockers.length === 0,
    score: blocking.length ? Math.round(((blocking.length - blockers.length) / blocking.length) * 100) : 0,
    blockerCount: blockers.length,
    checks,
  });
}
