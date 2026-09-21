import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://maplyo.com'),
  title: {
    default: "Maplyo — AI Guest Experience & Revenue Platform",
    template: "%s | Maplyo"
  },
  description: "Maplyo centralise l’expérience voyageur, le concierge IA, les services additionnels, les demandes et les parcours de séjour pour locations, conciergeries, riads et hôtels.",
  keywords: ["guest experience platform", "digital guest guide", "AI concierge", "hotel guest experience", "property manager guest experience", "livret accueil numérique", "conciergerie", "riad", "hôtel", "upselling hôtelier"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Maplyo — Guest Experience & Revenue OS",
    description: "Moins de questions répétitives, plus de services vendus et une meilleure expérience voyageur — sans application à télécharger.",
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
    title: "Maplyo — Guest Experience & Revenue OS",
    description: "Créez une expérience voyageur multilingue avec concierge IA, services, requests et automatisations de séjour.",
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
  maximumScale: 5,
  userScalable: true
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
                highPrice: 9.9
              },
              description: "Guest Experience & Revenue platform for vacation rentals, property managers, riads and hotels."
            })
          }}
        />
        <LanguageProvider defaultLang={lang as any}>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
