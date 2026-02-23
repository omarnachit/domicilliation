'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getComparisonData } from '@/lib/packs-data';

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    basique: boolean;
    gestion: boolean;
    creation: boolean;
    formalites: boolean;
  }[];
}

export function PacksComparison() {
  const [data, setData] = useState<ComparisonFeature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getComparisonData();
        setData(result);
      } catch (error) {
        console.error('Error loading comparison data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  return (
    <div className="w-full py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Comparaison Détaillée des Packs
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Comparez toutes les fonctionnalités et choisissez le pack idéal pour votre structure
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-zinc-600">Chargement des données...</p>
          </div>
        )}

        {/* Comparison Table */}
        {!loading && (
          <div className="overflow-x-auto max-w-6xl mx-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="px-6 py-4 text-left font-semibold text-zinc-900 min-w-[250px]">
                    Fonctionnalités
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-zinc-900 min-w-[120px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold">Adresse</span>
                      <span className="text-xs text-zinc-600 font-normal">Basique</span>
                      <span className="text-sm text-zinc-900">2-4K</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-indigo-600 min-w-[120px] bg-indigo-50 border-x border-indigo-200">
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded mb-1">
                        ⭐ POPULAIRE
                      </span>
                      <span className="font-bold">Adresse +</span>
                      <span className="text-xs text-indigo-600 font-normal">Gestion</span>
                      <span className="text-sm text-indigo-900">+2K</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-zinc-900 min-w-[120px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold">Création</span>
                      <span className="text-xs text-zinc-600 font-normal">Société</span>
                      <span className="text-sm text-zinc-900">5-10K</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-zinc-900 min-w-[120px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold">Formalités +</span>
                      <span className="text-xs text-zinc-600 font-normal">Expertise</span>
                      <span className="text-sm text-zinc-900">À la demande</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((section, sectionIndex) => (
                  <React.Fragment key={sectionIndex}>
                    {/* Category Header */}
                    <tr className="bg-zinc-100 border-b border-zinc-200">
                      <td colSpan={5} className="px-6 py-3">
                        <p className="font-semibold text-zinc-900">{section.category}</p>
                      </td>
                    </tr>

                    {/* Feature Rows */}
                    {section.features.map((feature, featureIndex) => (
                      <tr
                        key={featureIndex}
                        className={`border-b border-zinc-200 ${
                          featureIndex % 2 === 0 ? 'bg-white' : 'bg-zinc-50'
                        }`}
                      >
                        <td className="px-6 py-4 text-sm text-zinc-900 font-medium">
                          {feature.name}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {feature.basique ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-zinc-300 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-4 text-center bg-indigo-50 border-x border-indigo-200">
                          {feature.gestion ? (
                            <Check className="w-5 h-5 text-indigo-600 mx-auto font-bold" />
                          ) : (
                            <X className="w-5 h-5 text-zinc-300 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {feature.creation ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-zinc-300 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {feature.formalites ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-zinc-300 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Legend */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900">Inclus</span>
            </div>
            <p className="text-sm text-green-800">Cette fonctionnalité est incluse dans le pack</p>
          </div>
          <div className="p-4 bg-zinc-100 border border-zinc-300 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-zinc-400" />
              <span className="font-semibold text-zinc-900">Non inclus</span>
            </div>
            <p className="text-sm text-zinc-700">Disponible dans les packs supérieurs</p>
          </div>
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⭐</span>
              <span className="font-semibold text-indigo-900">Le plus populaire</span>
            </div>
            <p className="text-sm text-indigo-800">Le choix préféré de nos clients</p>
          </div>
        </div>
      </div>
    </div>
  );
}
