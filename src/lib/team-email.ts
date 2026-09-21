import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendTeamInvitationEmail(input: {
  to: string;
  organizationName: string;
  inviterName?: string | null;
  role: string;
  inviteUrl?: string | null;
  alreadyAdded?: boolean;
}) {
  const resend = getResend();
  if (!resend) return { success: false, error: "Email provider not configured" };

  const action = input.alreadyAdded
    ? '<a href="https://maplyo.com/dashboard" style="display:inline-block;background:#111827;color:white;padding:12px 20px;text-decoration:none;border-radius:10px;font-weight:700">Open Maplyo</a>'
    : input.inviteUrl
      ? '<a href="' + escapeHtml(input.inviteUrl) + '" style="display:inline-block;background:#111827;color:white;padding:12px 20px;text-decoration:none;border-radius:10px;font-weight:700">Accept invitation</a>'
      : "";

  const html = [
    '<div style="font-family:Arial,sans-serif;color:#18181b;max-width:620px;margin:0 auto;line-height:1.7">',
    '<div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7c3aed">Maplyo · Team</div>',
    '<h1 style="font-size:26px;margin:10px 0 8px">You have been invited to ' + escapeHtml(input.organizationName) + '</h1>',
    '<p>' + (input.inviterName ? escapeHtml(input.inviterName) + ' invited you' : 'You were invited') + ' to collaborate in Maplyo as <strong>' + escapeHtml(input.role) + '</strong>.</p>',
    '<p>' + (input.alreadyAdded ? 'Your existing Maplyo account has been added to the team.' : 'Sign in or create your Maplyo account with this email address, then accept the invitation.') + '</p>',
    '<p style="margin-top:24px">' + action + '</p>',
    '<p style="font-size:12px;color:#71717a;margin-top:28px">If you were not expecting this invitation, you can ignore this email.</p>',
    '</div>',
  ].join("");

  try {
    const data = await resend.emails.send({
      from: "Maplyo <contact@maplyo.com>",
      to: input.to,
      subject: "Join " + input.organizationName + " on Maplyo",
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("[team-email] invitation delivery failed", error);
    return { success: false, error: "Email delivery failed" };
  }
}
