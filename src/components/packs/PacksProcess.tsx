'use client';

import React from 'react';
import {
  CheckCircle,
  Clock,
  FileText,
  Building,
  Users,
  Shield,
} from 'lucide-react';

interface ProcessStep {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
  timeline?: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: <FileText className="w-8 h-8" />,
    number: '01',
    title: 'Choisir votre pack',
    description: 'Sélectionnez le pack qui correspond à vos besoins parmi nos 4 options.',
    timeline: 'Immédiat'
  },
  {
    icon: <FileText className="w-8 h-8" />,
    number: '02',
    title: 'Compléter votre inscription',
    description:
      'Remplissez le formulaire avec vos informations personnelles et professionnelles.',
    timeline: '5 minutes'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    number: '03',
    title: 'Vérification & activation',
    description:
      'Notre équipe vérifie vos informations et active votre compte dans les 24h.',
    timeline: '24 heures'
  },
  {
    icon: <Building className="w-8 h-8" />,
    number: '04',
    title: 'Démarrage du service',
    description:
      'Recevez votre package complet: siège social, documents, accès plateforme.',
    timeline: 'J+1'
  },
  {
    icon: <Users className="w-8 h-8" />,
    number: '05',
    title: 'Support & suivi',
    description:
      'Équipe dédiée prête à vous assister pour tous vos besoins additionnels.',
    timeline: 'Continu'
  },
];

const BENEFITS = [
  { icon: <CheckCircle className="w-6 h-6" />, text: '100% conforme Loi 89-17' },
  { icon: <CheckCircle className="w-6 h-6" />, text: 'Sans engagement initial' },
  { icon: <ShieldIcon className="w-6 h-6" />, text: 'Données sécurisées & confidentielles' },
  { icon: <CheckCircle className="w-6 h-6" />, text: 'Support multilingue disponible' },
  { icon: <CheckCircle className="w-6 h-6" />, text: 'Annulation possible à tout moment' },
  { icon: <CheckCircle className="w-6 h-6" />, text: 'Tarifs transparents sans frais cachés' },
];

function ShieldIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m7.784-4.817a.5.5 0 00-.596-.736A9.021 9.021 0 0112 2c-5.052 0-9.153 3.948-9.5 9m19 0a.5.5 0 00-.596-.736A9.021 9.021 0 0112 2c-5.052 0-9.153 3.948-9.5 9"
      />
    </svg>
  );
}

export function PacksProcess() {
  return (
    <div className="w-full py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Comment ça fonctionne?
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Découvrez notre processus simple et rapide pour démarrer avec domiciliation.ma
          </p>
        </div>

        {/* Process Timeline */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Step Card */}
                <div className="relative w-full mb-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-6 text-center h-full flex flex-col items-center justify-center">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="text-indigo-600 mb-3 mt-2">
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-zinc-900 mb-2 text-sm min-h-[2.5rem] flex items-center">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-600 mb-3">
                      {step.description}
                    </p>
                    {step.timeline && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        {step.timeline}
                      </div>
                    )}
                  </div>

                  {/* Connector Line */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-0.5 bg-gradient-to-r from-indigo-400 to-transparent" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-4">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="w-0.5 h-12 bg-indigo-200 my-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-bold text-zinc-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-600 mb-2">
                    {step.description}
                  </p>
                  {step.timeline && (
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded inline-block">
                      {step.timeline}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-zinc-900 mb-8 text-center">
            Nos Avantages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-green-600 shrink-0">{benefit.icon}</div>
                <span className="font-medium text-zinc-800">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-zinc-900 mb-4">
            Prêt à démarrer?
          </h3>
          <p className="text-zinc-600 mb-6">
            Rejoignez des centaines d'entreprises qui nous font déjà confiance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl">
              Choisir mon pack
            </button>
            <button className="px-8 py-4 border-2 border-zinc-300 text-zinc-900 hover:bg-zinc-50 font-semibold rounded-lg transition-colors">
              Demander une démo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
