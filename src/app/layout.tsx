import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://maplyo.com'),
  title: {
    default: "Maplyo — Le Guide Numérique pour Hôtes Airbnb & Gîtes",
    template: "%s | Maplyo"
  },
  description: "Créez des livrets d'accueil numériques irrésistibles. Partagez codes Wi-Fi, digicodes et bonnes adresses par QR Code. Gratuit pour démarrer.",
  keywords: ["livret d'accueil numérique", "airbnb guide", "guide voyageur", "qr code wifi", "gestion locative", "conciergerie", "location saisonnière"],
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: "Maplyo — Sublimez l'accueil de vos voyageurs",
    description: "Le livret d'accueil nouvelle génération. QR Code Wi-Fi instantané, guide local interactif, et upsells pour augmenter vos revenus.",
    url: 'https://maplyo.com',
    siteName: 'Maplyo',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://maplyo.com/og-image.jpg', // Ensure this image exists eventually
        width: 1200,
        height: 630,
        alt: 'Maplyo Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maplyo — Votre Livret d'Accueil 2.0",
    description: "Fini les PDF moches. Passez au guide web interactif que vos voyageurs vont adorer.",
    creator: '@maplyo_app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // App-like feel
  themeColor: "#020617",
};



import { AuthProvider } from "@/components/auth/AuthProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { cookies } from "next/headers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('maplyo-lang')?.value || 'fr';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir}>
      <body>
       {/* Google tag (gtag.js) */}
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17994871567"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17994871567');
    `,
  }}
></script>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Maplyo",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: 0,
                highPrice: 20
              },
              description: "Plateforme de création de livrets d'accueil numériques pour hôtes Airbnb et gestionnaires immobiliers."
            })
          }}
        />
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
