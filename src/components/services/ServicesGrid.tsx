'use client';

import React from 'react';
import { FileText, Calculator, Package, AlertCircle } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  priceNote?: string;
  included?: boolean;
}

interface ServiceCategory {
  id: number;
  category: string;
  subtitle?: string;
  items: ServiceItem[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Déclarations Fiscales/Sociales': <FileText className="w-8 h-8 text-indigo-600" />,
  'Gestion Comptable': <Calculator className="w-8 h-8 text-green-600" />,
  'Annexes à la demande': <Package className="w-8 h-8 text-blue-600" />,
};

export function ServicesGrid({ services }: { services: ServiceCategory[] }) {
  return (
    <div className="w-full py-20 bg-gradient-to-b from-zinc-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Services Complémentaires Internes
          </h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
            Complétez votre offre avec nos services de gestion fiscal, comptable et administratif.
            Commencez par les déclarations obligatoires et activez ce que vous avez besoin.
          </p>
        </div>

        {/* Services by Category */}
        <div className="space-y-14 max-w-4xl mx-auto">
          {services.map((category) => (
            <div key={category.id} className="scroll-smooth">
              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    {CATEGORY_ICONS[category.category] || (
                      <AlertCircle className="w-8 h-8 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900">
                      {category.category}
                    </h3>
                    {category.subtitle && (
                      <p className="text-sm text-zinc-500 italic">
                        {category.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <ServiceCard
                      key={item.id}
                      item={item}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              {category.id !== services[services.length - 1].id && (
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent mb-8"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-8 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">
                Composition sur mesure
              </h3>
              <p className="text-indigo-800 mb-4">
                Chaque service peut être activé ou désactivé selon vos besoins. 
                Démarrez avec les déclarations obligatoires et ajoutez progressivement 
                la gestion comptable, les services numériques et les annexes.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Contactez-nous pour un devis personnalisé
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
