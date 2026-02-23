import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Law8917Section } from "@/components/landing/Law8917";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/layout/Footer";
import { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <Hero />
      <Services />
      <Law8917Section />
      <Pricing />
      <Footer />
    </main>
  );
}
