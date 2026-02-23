import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Law8917Section } from "@/components/landing/Law8917";
import { JSX } from "react";

export const metadata = {
  title: "Loi 89-17 - Conforme à la Réglementation Marocaine | Domiciliation.ma",
  description: "Découvrez comment notre service de domiciliation est conforme à la Loi 89-17 marocaine. Garanties légales, contrats, archivage et conformité administrative.",
};

export default function Law8917Page(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16" />
      <Law8917Section />
      <Footer />
    </main>
  );
}
