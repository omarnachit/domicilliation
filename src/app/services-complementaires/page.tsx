import { JSX } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ServicesGrid } from '@/components/services/ServicesGrid';
import { getServicesData } from '@/lib/services-data';

export const metadata = {
  title: 'Services Complémentaires Internes - Domiciliation.ma',
  description: 'Découvrez nos services complémentaires : déclarations fiscales, gestion comptable, et annexes professionnelles pour votre domiciliation.',
};

export default async function ServicesComplementairesPage(): Promise<JSX.Element> {
  const services = await getServicesData();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6">
            Services Complémentaires Internes
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Complétez votre domiciliation avec nos services de gestion fiscal, 
            comptable et administratif, conçus pour accompagner la croissance de votre entreprise
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid services={services} />

      {/* Additional Info Section */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-indigo-600">✓</span>
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Automatisé et Conforme</h3>
              <p className="text-sm text-zinc-600">
                Télédéclarations automatiques conformes aux normes marocaines
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-green-600">✓</span>
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Services à la Carte</h3>
              <p className="text-sm text-zinc-600">
                Choisissez seulement les services dont vous avez besoin
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">✓</span>
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">Support Dédié</h3>
              <p className="text-sm text-zinc-600">
                Équipe d'experts disponible pour vous conseiller et assister
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à optimiser votre gestion administrative ?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Nos experts en domiciliation et gestion d'entreprise sont à votre disposition 
            pour créer un plan personnalisé adapté à votre structure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold px-8 py-3 rounded-lg transition-colors">
              Demander un Devis
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold px-8 py-3 rounded-lg transition-colors">
              Nous Contacter
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
