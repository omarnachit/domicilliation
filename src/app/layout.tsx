import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { JSX } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Domiciliation.ma - Siège Social Premium Casablanca",
  description: "La première plateforme de domiciliation 100% digitale et conforme à la loi 89-17. Obtenez votre siège social en 5 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
