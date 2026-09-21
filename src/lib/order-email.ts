import { Resend } from "resend";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

export async function sendServiceRequestNotification(input: {
  to: string[];
  propertyName: string;
  serviceTitle: string;
  guestName: string;
  guestEmail?: string | null;
  guestPhone?: string | null;
  amount?: number | null;
  currency?: string | null;
  notes?: string | null;
  orderId: string;
}) {
  const resend = getResend();
  if (!resend || input.to.length === 0) return { success: false, error: "Email provider not configured" };

  const amountLine = input.amount && input.amount > 0
    ? "<p><strong>Montant :</strong> " + escapeHtml(String(input.amount)) + " " + escapeHtml(input.currency || "MAD") + "</p>"
    : "";

  const html = [
    '<div style="font-family:Arial,sans-serif;color:#18181b;max-width:620px;margin:0 auto;line-height:1.6">',
    '<div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#059669">Maplyo · Revenue Center</div>',
    '<h1 style="font-size:26px;margin:10px 0 8px">Nouvelle demande de service</h1>',
    "<p>Une demande vient d’être envoyée pour <strong>" + escapeHtml(input.propertyName) + "</strong>.</p>",
    '<div style="background:#f4f4f5;border-radius:14px;padding:18px;margin:22px 0">',
    "<p><strong>Service :</strong> " + escapeHtml(input.serviceTitle) + "</p>",
    "<p><strong>Voyageur :</strong> " + escapeHtml(input.guestName) + "</p>",
    input.guestEmail ? "<p><strong>Email :</strong> " + escapeHtml(input.guestEmail) + "</p>" : "",
    input.guestPhone ? "<p><strong>Téléphone :</strong> " + escapeHtml(input.guestPhone) + "</p>" : "",
    amountLine,
    input.notes ? "<p><strong>Note :</strong> " + escapeHtml(input.notes) + "</p>" : "",
    "</div>",
    '<p><a href="https://maplyo.com/dashboard/revenue" style="display:inline-block;background:#111827;color:white;padding:12px 20px;text-decoration:none;border-radius:10px;font-weight:700">Traiter la demande</a></p>',
    '<p style="font-size:12px;color:#71717a;margin-top:24px">Référence : ' + escapeHtml(input.orderId) + "</p>",
    "</div>",
  ].join("");

  try {
    const data = await resend.emails.send({
      from: "Maplyo <contact@maplyo.com>",
      to: [...new Set(input.to.filter(Boolean))],
      subject: "Nouvelle demande voyageur — " + input.serviceTitle,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send service request notification:", error);
    return { success: false, error: "Email delivery failed" };
  }
}

export async function sendGuestOrderStatusEmail(input: {
  to: string;
  guestName: string;
  propertyName: string;
  serviceTitle: string;
  status: "confirmed" | "fulfilled" | "cancelled";
  orderId: string;
}) {
  const resend = getResend();
  if (!resend) return { success: false, error: "Email provider not configured" };

  const copy = input.status === "confirmed"
    ? { subject: "Demande confirmée — " + input.serviceTitle, title: "Votre demande est confirmée", text: input.propertyName + " a confirmé votre demande pour " + input.serviceTitle + "." }
    : input.status === "fulfilled"
      ? { subject: "Service réalisé — " + input.serviceTitle, title: "Service marqué comme réalisé", text: input.propertyName + " a marqué votre service " + input.serviceTitle + " comme réalisé." }
      : { subject: "Mise à jour de votre demande — " + input.serviceTitle, title: "Votre demande n’a pas été confirmée", text: input.propertyName + " n’a pas pu confirmer votre demande pour " + input.serviceTitle + "." };

  const html = [
    '<div style="font-family:Arial,sans-serif;color:#18181b;max-width:600px;margin:0 auto;line-height:1.6">',
    '<div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7c3aed">Maplyo</div>',
    '<h1 style="font-size:26px;margin:10px 0 8px">' + escapeHtml(copy.title) + "</h1>",
    "<p>Bonjour " + escapeHtml(input.guestName || "there") + ",</p>",
    "<p>" + escapeHtml(copy.text) + "</p>",
    '<p style="font-size:12px;color:#71717a;margin-top:24px">Référence : ' + escapeHtml(input.orderId) + "</p>",
    "</div>",
  ].join("");

  try {
    const data = await resend.emails.send({
      from: "Maplyo <contact@maplyo.com>",
      to: input.to,
      subject: copy.subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send guest order status email:", error);
    return { success: false, error: "Email delivery failed" };
  }
}

export async function sendGuestSupportNotification(input: {
  to: string[];
  propertyName: string;
  requestTitle: string;
  category: string;
  priority: string;
  guestName: string;
  guestEmail?: string | null;
  guestPhone?: string | null;
  message?: string | null;
  requestId: string;
}) {
  const resend = getResend();
  if (!resend || input.to.length === 0) return { success: false, error: "Email provider not configured" };

  const urgent = input.priority === "urgent";
  const html = [
    '<div style="font-family:Arial,sans-serif;color:#18181b;max-width:620px;margin:0 auto;line-height:1.6">',
    '<div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7c3aed">Maplyo · Guest Operations</div>',
    '<h1 style="font-size:26px;margin:10px 0 8px">' + (urgent ? 'Demande urgente' : 'Nouvelle demande voyageur') + '</h1>',
    '<p><strong>' + escapeHtml(input.propertyName) + '</strong> a reçu une nouvelle demande.</p>',
    '<div style="background:#f4f4f5;border-radius:14px;padding:18px;margin:22px 0">',
    '<p><strong>Sujet :</strong> ' + escapeHtml(input.requestTitle) + '</p>',
    '<p><strong>Catégorie :</strong> ' + escapeHtml(input.category.replaceAll("_", " ")) + '</p>',
    '<p><strong>Priorité :</strong> ' + escapeHtml(input.priority) + '</p>',
    '<p><strong>Voyageur :</strong> ' + escapeHtml(input.guestName) + '</p>',
    input.guestEmail ? '<p><strong>Email :</strong> ' + escapeHtml(input.guestEmail) + '</p>' : '',
    input.guestPhone ? '<p><strong>Téléphone :</strong> ' + escapeHtml(input.guestPhone) + '</p>' : '',
    input.message ? '<p><strong>Message :</strong> ' + escapeHtml(input.message) + '</p>' : '',
    '</div>',
    '<p><a href="https://maplyo.com/dashboard/requests" style="display:inline-block;background:#111827;color:white;padding:12px 20px;text-decoration:none;border-radius:10px;font-weight:700">Ouvrir Requests Center</a></p>',
    '<p style="font-size:12px;color:#71717a;margin-top:24px">Référence : ' + escapeHtml(input.requestId) + '</p>',
    '</div>',
  ].join("");

  try {
    const data = await resend.emails.send({
      from: "Maplyo <contact@maplyo.com>",
      to: [...new Set(input.to.filter(Boolean))],
      subject: (urgent ? "URGENT — " : "") + input.requestTitle + " · " + input.propertyName,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send guest support notification:", error);
    return { success: false, error: "Email delivery failed" };
  }
}
