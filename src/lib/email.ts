
import { Resend } from 'resend';

// Initialize Resend with API key from environment
// If no key is present, it will throw an error when trying to send, which we catch.
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export const sendWelcomeEmail = async (email: string, name: string) => {
  if (!resend) {
    console.log(`[MOCK EMAIL] Sending welcome email to ${email} (No API Key found)`);
    return { success: true, mock: true };
  }

  try {
    const data = await resend.emails.send({
      from: 'Maplyo <onboarding@maplyo.com>',
      to: email,
      subject: 'Bienvenue sur Maplyo ! 🚀',
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h1>Bienvenue chez Maplyo, ${name} !</h1>
          <p>Nous sommes ravis de vous compter parmi nous. Votre premier guide voyageur est prêt à être créé.</p>
          <p>Voici quelques conseils pour démarrer :</p>
          <ul>
            <li>Ajoutez le code Wi-Fi (c'est ce que les voyageurs cherchent en premier !)</li>
            <li>Recommandez votre boulangerie préférée.</li>
            <li>Partagez le lien avec vos prochains invités.</li>
          </ul>
          <br/>
          <a href="https://maplyo.com/dashboard" style="background: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            Créer mon premier guide
          </a>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};
