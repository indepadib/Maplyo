import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { createJourneyStayLink } from "../stays/stay-link";
import { renderJourneyTemplate } from "./templates";

type RuleRow = {
  id: string;
  organization_id: string;
  property_id: string;
  name: string;
  anchor: "check_in" | "check_out";
  offset_minutes: number;
  subject_template?: string | null;
  body_template: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function scheduledAt(anchorAt: string, offsetMinutes: number) {
  return new Date(new Date(anchorAt).getTime() + offsetMinutes * 60 * 1000);
}

export async function runGuestJourneyDispatch(options: {
  supabaseUrl: string;
  serviceRoleKey: string;
  resendApiKey?: string;
  now?: Date;
  origin?: string;
}) {
  if (!options.supabaseUrl || !options.serviceRoleKey) {
    return { ok: false, reason: "supabase_not_configured", sent: 0, failed: 0 };
  }

  const admin = createClient(options.supabaseUrl, options.serviceRoleKey, {
    auth: { persistSession: false },
  });
  const resend = options.resendApiKey ? new Resend(options.resendApiKey) : null;

  const now = options.now || new Date();
  const origin = options.origin || "https://maplyo.com";
  const windowStart = new Date(now.getTime() - 75 * 60 * 1000);
  const windowEnd = new Date(now.getTime() + 5 * 60 * 1000);

  const { data: rules, error: rulesError } = await admin
    .from("journey_rules")
    .select("id, organization_id, property_id, name, anchor, offset_minutes, subject_template, body_template")
    .eq("status", "active");

  if (rulesError) {
    return { ok: false, reason: "journey_rules_unavailable", sent: 0, failed: 0 };
  }

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const rule of (rules || []) as RuleRow[]) {
    const anchorColumn = rule.anchor === "check_out" ? "check_out_at" : "check_in_at";

    const anchorStart = new Date(windowStart.getTime() - rule.offset_minutes * 60 * 1000).toISOString();
    const anchorEnd = new Date(windowEnd.getTime() - rule.offset_minutes * 60 * 1000).toISOString();

    const { data: stays } = await admin
      .from("stays")
      .select("id, organization_id, property_id, primary_guest_id, check_in_at, check_out_at, status")
      .eq("property_id", rule.property_id)
      .gte(anchorColumn, anchorStart)
      .lte(anchorColumn, anchorEnd)
      .not("status", "in", '("cancelled","no_show")')
      .limit(250);

    for (const stay of stays || []) {
      const anchorAt = rule.anchor === "check_out" ? stay.check_out_at : stay.check_in_at;
      const scheduledFor = scheduledAt(anchorAt, rule.offset_minutes);

      const { data: existing } = await admin
        .from("journey_deliveries")
        .select("id, status")
        .eq("stay_id", stay.id)
        .eq("rule_id", rule.id)
        .maybeSingle();

      if (existing?.status === "sent" || existing?.status === "processing") {
        skipped += 1;
        continue;
      }

      let deliveryId = existing?.id as string | undefined;

      if (!deliveryId) {
        const { data: created, error: createError } = await admin
          .from("journey_deliveries")
          .insert([{
            organization_id: stay.organization_id,
            property_id: stay.property_id,
            stay_id: stay.id,
            rule_id: rule.id,
            channel: "email",
            scheduled_for: scheduledFor.toISOString(),
            status: "pending",
          }])
          .select("id")
          .single();

        if (createError || !created) {
          failed += 1;
          continue;
        }

        deliveryId = created.id;
      }

      const claimed = await admin
        .from("journey_deliveries")
        .update({ status: "processing", updated_at: new Date().toISOString() })
        .eq("id", deliveryId)
        .in("status", ["pending", "failed"])
        .select("id")
        .maybeSingle();

      if (!claimed.data?.id) {
        skipped += 1;
        continue;
      }

      try {
        const [{ data: guest }, { data: property }, { data: guide }] = await Promise.all([
          stay.primary_guest_id
            ? admin.from("guests").select("first_name, email").eq("id", stay.primary_guest_id).maybeSingle()
            : Promise.resolve({ data: null }),
          admin.from("properties").select("name").eq("id", stay.property_id).maybeSingle(),
          admin.from("guides").select("id").eq("property_id", stay.property_id).eq("is_published", true).limit(1).maybeSingle(),
        ]);

        if (!guest?.email || !guide?.id || !resend) {
          await admin
            .from("journey_deliveries")
            .update({
              status: "failed",
              error_message: !guest?.email ? "guest_email_missing" : !guide?.id ? "published_guide_missing" : "email_provider_missing",
              updated_at: new Date().toISOString(),
            })
            .eq("id", deliveryId);

          failed += 1;
          continue;
        }

        const stayLink = await createJourneyStayLink({
          admin,
          stay,
          guideId: guide.id,
          origin,
        });

        const variables = {
          guestFirstName: guest.first_name || "Guest",
          propertyName: property?.name || "your property",
          checkInDate: new Date(stay.check_in_at).toLocaleDateString("fr-FR"),
          checkOutDate: new Date(stay.check_out_at).toLocaleDateString("fr-FR"),
          stayLink: stayLink.url,
        };

        const subject = renderJourneyTemplate(rule.subject_template || rule.name, variables);
        const body = renderJourneyTemplate(rule.body_template, variables);

        const result = await resend.emails.send({
          from: "Maplyo <contact@maplyo.com>",
          to: guest.email,
          subject,
          html:
            '<div style="font-family:Arial,sans-serif;color:#18181b;max-width:620px;margin:0 auto;line-height:1.7">' +
            '<div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7c3aed">Maplyo · Guest Journey</div>' +
            '<p style="font-size:16px;white-space:pre-wrap">' + escapeHtml(body) + "</p>" +
            (stayLink.url
              ? '<p style="margin-top:24px"><a href="' + escapeHtml(stayLink.url) + '" style="display:inline-block;background:#111827;color:white;padding:12px 20px;text-decoration:none;border-radius:10px;font-weight:700">Ouvrir mon espace séjour</a></p>'
              : "") +
            "</div>",
        });

        const providerId = (result as any)?.data?.id || null;

        await admin
          .from("journey_deliveries")
          .update({
            status: "sent",
            recipient: guest.email,
            provider_message_id: providerId,
            sent_at: new Date().toISOString(),
            error_message: null,
            updated_at: new Date().toISOString(),
            metadata: { stay_link_id: stayLink.id },
          })
          .eq("id", deliveryId);

        sent += 1;
      } catch (error: any) {
        await admin
          .from("journey_deliveries")
          .update({
            status: "failed",
            error_message: String(error?.message || "journey_send_failed").slice(0, 500),
            updated_at: new Date().toISOString(),
          })
          .eq("id", deliveryId);

        failed += 1;
      }
    }
  }

  return { ok: true, sent, failed, skipped, rules: rules?.length || 0 };
}
