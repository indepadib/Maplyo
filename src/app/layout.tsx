import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maplyo — Guides de voyage modernes",
  description: "Créez des guides numériques pour vos voyageurs, beaux, rapides, et faciles à maintenir.",
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
