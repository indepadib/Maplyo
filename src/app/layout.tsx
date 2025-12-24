import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maplyo — Guides de voyage modernes",
  description: "Créez des guides numériques pour vos voyageurs, beaux, rapides, et faciles à maintenir.",
};


import { AuthProvider } from "@/components/auth/AuthProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
