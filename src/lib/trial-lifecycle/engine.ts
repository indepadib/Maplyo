import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import type { Language } from "@/lib/i18n/dictionary";
import { trialLifecycleCopy } from "@/lib/i18n/trial-lifecycle";

type Milestone = "activation_day_2" | "value_day_10" | "ending_3_days" | "ending_1_day";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function asLanguage(value: unknown): Language {
  return ["fr","en","es","ar","nl","zh","pt"].includes(String(value))
    ? String(value) as Language
    : "en";
}

function selectMilestone(trialStartedAt: Date, trialEndsAt: Date, now: Date): Milestone | null {
  const dayMs = 24 * 60 * 60 * 1000;
  const sinceStart = (now.getTime() - trialStartedAt.getTime()) / dayMs;
  const untilEnd = (trialEndsAt.getTime() - now.getTime()) / dayMs;

  if (untilEnd <= 1.25 && untilEnd > 0) return "ending_1_day";
  if (untilEnd <= 3.25 && untilEnd > 1.25) return "ending_3_days";
  if (sinceStart >= 9.5 && sinceStart < 11.5) return "value_day_10";
  if (sinceStart >= 1.5 && sinceStart < 3.5) return "activation_day_2";
  return null;
}

function renderEmail(args: {
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  footer: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;color:#18181b;max-width:620px;margin:0 auto;line-height:1.7">
      <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#7c3aed">
        Maplyo · Guest Experience & Revenue OS
      </div>
      <p style="font-size:16px;margin-top:22px">${escapeHtml(args.body)}</p>
      <p style="margin-top:28px">
        <a href="${escapeHtml(args.ctaUrl)}" style="display:inline-block;background:#111827;color:#fff;padding:12px 20px;text-decoration:none;border-radius:10px;font-weight:800">
          ${escapeHtml(args.ctaLabel)}
        </a>
      </p>
      <p style="margin-top:32px;font-size:12px;color:#71717a">${escapeHtml(args.footer)}</p>
    </div>
  `;
}

export async function runTrialLifecycle(options: {
  supabaseUrl: string;
  serviceRoleKey: string;
  resendApiKey?: string;
  origin?: string;
  now?: Date;
}) {
  if (!options.supabaseUrl || !options.serviceRoleKey) {
    return { ok: false, reason: "supabase_not_configured", sent: 0, skipped: 0, failed: 0 };
  }

  const admin = createClient(options.supabaseUrl, options.serviceRoleKey, {
    auth: { persistSession: false },
  });
  const resend = options.resendApiKey ? new Resend(options.resendApiKey) : null;
  const origin = options.origin || "https://maplyo.com";
  const now = options.now || new Date();

  const { data: profiles, error } = await admin
    .from("profiles")
    .select("id, subscription_status, plan_variant, trial_started_at, trial_ends_at")
    .not("trial_started_at", "is", null)
    .not("trial_ends_at", "is", null)
    .limit(500);

  if (error) {
    return { ok: false, reason: "profiles_unavailable", sent: 0, skipped: 0, failed: 0 };
  }

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const profile of profiles || []) {
    if (profile.subscription_status === "active" && profile.plan_variant === "pro") {
      skipped += 1;
      continue;
    }

    const start = new Date(profile.trial_started_at);
    const end = new Date(profile.trial_ends_at);
    if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= now) {
      skipped += 1;
      continue;
    }

    const milestone = selectMilestone(start, end, now);
    if (!milestone) {
      skipped += 1;
      continue;
    }

    const { data: existing } = await admin
      .from("trial_lifecycle_deliveries")
      .select("id, status")
      .eq("user_id", profile.id)
      .eq("milestone", milestone)
      .maybeSingle();

    if (existing?.status === "sent" || existing?.status === "processing") {
      skipped += 1;
      continue;
    }

    let deliveryId = existing?.id as string | undefined;
    if (!deliveryId) {
      const { data: created, error: createError } = await admin
        .from("trial_lifecycle_deliveries")
        .insert([{ user_id: profile.id, milestone, status: "pending" }])
        .select("id")
        .single();

      if (createError || !created?.id) {
        failed += 1;
        continue;
      }
      deliveryId = created.id;
    }

    const claimed = await admin
      .from("trial_lifecycle_deliveries")
      .update({ status: "processing", updated_at: new Date().toISOString() })
      .eq("id", deliveryId)
      .in("status", ["pending","failed"])
      .select("id")
      .maybeSingle();

    if (!claimed.data?.id) {
      skipped += 1;
      continue;
    }

    try {
      const [{ data: guides }, authResult] = await Promise.all([
        admin
          .from("guides")
          .select("id, is_published, slug")
          .eq("user_id", profile.id)
          .order("updated_at", { ascending: false })
          .limit(10),
        admin.auth.admin.getUserById(profile.id),
      ]);

      const user = authResult.data.user;
      if (!user?.email || !resend) {
        throw new Error(!user?.email ? "user_email_missing" : "email_provider_missing");
      }

      const lang = asLanguage(user.user_metadata?.preferred_language);
      const copy = trialLifecycleCopy(lang);
      const guideCount = guides?.length || 0;
      const publishedGuide = (guides || []).find((guide: any) => guide.is_published);

      let subject: string;
      let body: string;
      let ctaLabel: string;
      let ctaUrl: string;

      if (milestone === "activation_day_2") {
        subject = copy.activation.subject;
        if (guideCount === 0) {
          body = copy.activation.noGuide;
          ctaLabel = copy.cta.create;
          ctaUrl = origin + "/onboarding";
        } else if (!publishedGuide) {
          body = copy.activation.unpublished;
          ctaLabel = copy.cta.finish;
          ctaUrl = origin + "/dashboard";
        } else {
          body = copy.activation.published;
          ctaLabel = copy.cta.open;
          ctaUrl = origin + "/dashboard";
        }
      } else if (milestone === "value_day_10") {
        subject = copy.value.subject;
        if (guideCount === 0) {
          body = copy.value.noGuide;
          ctaLabel = copy.cta.create;
          ctaUrl = origin + "/onboarding";
        } else if (!publishedGuide) {
          body = copy.value.unpublished;
          ctaLabel = copy.cta.finish;
          ctaUrl = origin + "/dashboard";
        } else {
          body = copy.value.published;
          ctaLabel = copy.cta.open;
          ctaUrl = origin + "/dashboard";
        }
      } else if (milestone === "ending_3_days") {
        subject = copy.ending3.subject;
        body = copy.ending3.body;
        ctaLabel = copy.cta.upgrade;
        ctaUrl = origin + "/pricing?ref=trial-ending-3";
      } else {
        subject = copy.ending1.subject;
        body = copy.ending1.body;
        ctaLabel = copy.cta.upgrade;
        ctaUrl = origin + "/pricing?ref=trial-ending-1";
      }

      const result = await resend.emails.send({
        from: "Maplyo <contact@maplyo.com>",
        to: user.email,
        subject,
        html: renderEmail({ body, ctaLabel, ctaUrl, footer: copy.footer }),
      });

      await admin
        .from("trial_lifecycle_deliveries")
        .update({
          status: "sent",
          recipient: user.email,
          provider_message_id: (result as any)?.data?.id || null,
          sent_at: new Date().toISOString(),
          error_message: null,
          metadata: {
            guide_count: guideCount,
            published: Boolean(publishedGuide),
            language: lang,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", deliveryId);

      sent += 1;
    } catch (sendError: any) {
      await admin
        .from("trial_lifecycle_deliveries")
        .update({
          status: "failed",
          error_message: String(sendError?.message || "trial_lifecycle_failed").slice(0, 500),
          updated_at: new Date().toISOString(),
        })
        .eq("id", deliveryId);

      failed += 1;
    }
  }

  return { ok: true, sent, skipped, failed, scanned: profiles?.length || 0 };
}
