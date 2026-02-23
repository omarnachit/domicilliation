'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PackCard } from './PackCard';
import { Gift } from 'lucide-react';
import { getPacksData } from '@/lib/packs-data';

export function PacksGrid() {
  const router = useRouter();
  const [packs, setPacks] = React.useState<any[]>([]);

  React.useEffect(() => {
    getPacksData().then(data => setPacks(data));
  }, []);
  return (
    <div className="w-full py-24 bg-gradient-to-b from-white to-zinc-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Nos Packs & Services
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Trouvez le pack qui correspond à vos besoins. Tous les packs incluent une
            réduction de <span className="font-semibold text-indigo-600">-25%</span> sur
            les salles de réunion et espaces de travail.
          </p>
        </div>

        {/* Discount Banner */}
        <div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <Gift className="w-6 h-6 text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-green-900">🎁 Bonus Tous les Packs</p>
            <p className="text-sm text-green-800">
              <strong>-25% de réduction</strong> sur salles de réunion, bureaux privatifs et partagés pour tous les clients
            </p>
          </div>
        </div>

        {/* Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {packs.map((pack) => (
            <PackCard
              key={pack.id}
              title={pack.title}
              description={pack.description}
              price={pack.price}
              period={pack.period}
              features={pack.features}
              popular={pack.popular}
              cta={pack.cta}
              discount={pack.discount}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-indigo-50 border border-indigo-200 rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-indigo-900 mb-4">
            Besoin de plus d'informations ?
          </h3>
          <p className="text-indigo-800 mb-4">
            Chaque pack est customizable selon vos besoins spécifiques. 
            Contactez notre équipe pour discuter de votre projet.
          </p>
          <button
            onClick={() => router.push('/booking')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Prendre rendez-vous
          </button>
        </div>
      </div>
    </div>
  );
}
