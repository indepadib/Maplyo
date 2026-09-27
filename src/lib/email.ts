import { Resend } from "resend";

export const sendWelcomeEmail = async (email: string, name: string) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { success: false, error: "Email provider not configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const data = await resend.emails.send({
      from: "Maplyo <contact@maplyo.com>",
      to: email,
      subject: "Bienvenue sur Maplyo",
      html: `
        <div style="font-family:Arial,sans-serif;color:#18181b;max-width:600px;margin:0 auto;line-height:1.6">
          <h1 style="font-size:28px;margin-bottom:12px">Bienvenue sur Maplyo, ${name}.</h1>
          <p>Votre espace Maplyo est prêt pour construire votre première expérience voyageur.</p>
          <p>Commencez par l'essentiel&nbsp;:</p>
          <ul>
            <li>importez les informations de votre établissement ou de votre location&nbsp;;</li>
            <li>vérifiez les informations importantes comme le Wi-Fi et l'accès&nbsp;;</li>
            <li>ajoutez les services que vos voyageurs peuvent demander&nbsp;;</li>
            <li>publiez puis partagez le lien ou le QR code.</li>
          </ul>
          <p style="margin-top:28px">
            <a href="https://maplyo.com/dashboard" style="background:#111827;color:white;padding:12px 22px;text-decoration:none;border-radius:10px;font-weight:700">
              Ouvrir mon espace Maplyo
            </a>
          </p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, error: "Email delivery failed" };
  }
};
