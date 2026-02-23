import { JSX } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PacksGrid } from '@/components/packs/PacksGrid';
import { PacksComparison } from '@/components/packs/PacksComparison';
import { PacksProcess } from '@/components/packs/PacksProcess';
import { PacksFAQ } from '@/components/packs/PacksFAQ';

export const metadata = {
  title: 'Nos Packs & Services - Domiciliation.ma',
  description: 'Découvrez nos packs de domiciliation: Essentiel, Adresse Basique, Adresse + Gestion, Création Société, Formalités Complètes',
};

export default function PacksPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6">
            Trouvez le pack idéal pour votre structure
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            De l'adresse prestige à la gestion administrative complète, 
            nous avons la solution pour chaque étape de votre développement
          </p>
        </div>
      </section>

      {/* Packs Grid */}
      <PacksGrid />

      {/* Comparison Table */}
      <PacksComparison />

      {/* Process Section */}
      <PacksProcess />

      {/* FAQ Section */}
      <PacksFAQ />

      <Footer />
    </main>
  );
}
