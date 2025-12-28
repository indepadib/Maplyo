import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://maplyo.com'), // Replace with actual domain
  title: {
    default: "Maplyo — Guides de voyage modernes",
    template: "%s | Maplyo"
  },
  description: "Créez des guides numériques pour vos voyageurs. Beaux, rapides, et faciles à maintenir. Augmentez vos revenus directs.",
  openGraph: {
    title: "Maplyo — Guides de voyage modernes",
    description: "Créez des guides numériques pour vos voyageurs. Beaux, rapides, et faciles à maintenir.",
    url: 'https://maplyo.com',
    siteName: 'Maplyo',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maplyo — Guides de voyage modernes",
    description: "Créez des guides numériques pour vos voyageurs.",
    creator: '@maplyo_app',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // App-like feel
};


import { AuthProvider } from "@/components/auth/AuthProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
