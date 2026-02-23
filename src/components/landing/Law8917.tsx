'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle,
  Lock,
  FileCheck,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JSX } from 'react';

export function Law8917Section(): JSX.Element {
  const guarantees = [
    {
      icon: FileCheck,
      title: 'Contrat Légal',
      description: 'Contrat de domiciliation établi conformément au droit marocain',
    },
    {
      icon: Lock,
      title: 'Rétention 5 ans',
      description: 'Archivage légal de tous vos documents pendant 5 ans minimum',
    },
    {
      icon: Shield,
      title: 'Vérification d\'Identité',
      description: 'Processus de vérification rigoureux pour la conformité légale',
    },
    {
      icon: CheckCircle,
      title: 'Conformité Admin',
      description: 'Respect complet des obligations administratives marocaines',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="compliance" className="relative py-24 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <Award className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  100% Légal au Maroc
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                Conforme à la{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Loi 89-17
                </span>
              </h2>
              <p className="text-xl text-zinc-600 leading-relaxed">
                La Loi 89-17 relative aux établissements bancaires et similaires impose des normes strictes de domiciliation légale pour toute activité commerciale au Maroc. Nous garantissons une conformité totale avec tous les registres légaux, documents officiels et obligations administratives.
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-zinc-600 leading-relaxed"
            >
              Votre domiciliation est reconnue par tous les organismes marocains : Ministère du Commerce, Administration Fiscale, Organismes de Protection Sociale, et Collectivités Territoriales. Opérez en toute confiance.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/register">
                <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-6 text-base font-semibold rounded-lg shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-200">
                  Créer mon entreprise
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/booking">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-6 text-base font-semibold rounded-lg border-zinc-300 hover:bg-zinc-50"
                >
                  Transférer mon siège
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Guarantees */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative p-6 rounded-xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 transition-colors duration-300">
                        <Icon className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                        {guarantee.title}
                      </h3>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {guarantee.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Trust statement */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200"
            >
              <p className="text-sm text-blue-900 font-medium">
                ✓ {' '}
                <span className="font-semibold">
                  Certifiés et reconnus par l'État marocain
                </span>
              </p>
              <p className="text-xs text-blue-800 mt-1">
                Tous nos services respectent la réglementation en vigueur et les normes légales marocaines.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 border border-indigo-400/20 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-white">
              <div className="text-2xl font-bold mb-1">Depuis 2020</div>
              <p className="text-indigo-100 text-sm">Experts en conformité légale</p>
            </div>
            <div className="text-white border-l border-indigo-400/30 pl-8">
              <div className="text-2xl font-bold mb-1">5000+</div>
              <p className="text-indigo-100 text-sm">Entreprises domiciliées</p>
            </div>
            <div className="text-white border-l border-indigo-400/30 pl-8">
              <div className="text-2xl font-bold mb-1">0 Recalage</div>
              <p className="text-indigo-100 text-sm">Taux de conformité 100%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
