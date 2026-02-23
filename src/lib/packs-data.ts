'use server';

import { createClient } from '@/lib/supabase/server';

// Fallback data for development/demo
const DEFAULT_PACKS_DATA = [
  {
    id: 0,
    title: 'Essentiel',
    description: 'Pour démarrer votre activité en toute légalité.',
    price: '150',
    period: 'mois',
    popular: false,
    cta: 'Choisir ce pack',
    discount: null,
    features: [
      { name: 'Siège social prestige', included: true },
      { name: 'Contrat 12 mois', included: true },
      { name: 'Réception courrier', included: true },
      { name: 'Scans quotidiens du courrier', included: false },
      { name: 'Accès portail client 24/7', included: false },
      { name: 'Stockage sécurisé', included: false },
      { name: 'Notifications Email', included: false },
      { name: 'Accès physique 6j/7 (8h30-18h30)', included: false },
      { name: 'OCR & Recherche full-text', included: false },
      { name: 'Notifications SMS/WhatsApp', included: false },
    ],
  },
  {
    id: 1,
    title: 'Adresse Basique',
    description: 'Siège social prestige avec accès numérique basique',
    price: '2 000 - 4 000',
    period: null,
    popular: false,
    cta: 'Démarrer',
    discount: null,
    features: [
      { name: 'Siège social prestige (Casablanca/Marrakech/Fès/Rabat)', included: true },
      { name: 'Scans quotidiens du courrier', included: true },
      { name: 'Accès portail client 24/7', included: true },
      { name: 'Stockage sécurisé 30 jours', included: true },
      { name: 'Notifications Email', included: true },
      { name: 'Accès physique 6j/7 (8h30-18h30)', included: false },
      { name: 'OCR & Recherche full-text', included: false },
      { name: 'Notifications SMS/WhatsApp', included: false },
      { name: 'Réexpédition mensuelle', included: false },
      { name: 'Tri automatique par catégorie', included: false },
    ],
  },
  {
    id: 2,
    title: 'Adresse + Gestion',
    description: 'Portail client complet avec gestion intelligente du courrier',
    price: '+2 000',
    period: 'an',
    popular: true,
    cta: 'Choisir ce pack',
    discount: '-25% salles & bureaux',
    features: [
      { name: 'Siège social prestige', included: true },
      { name: 'Scans quotidiens & tri automatique (Fiscal/Recommandé/Commercial)', included: true },
      { name: 'Historique infini (rétention légale 5 ans)', included: true },
      { name: 'OCR & Recherche full-text par document', included: true },
      { name: 'Notifications Email + SMS + WhatsApp personnalisables', included: true },
      { name: 'Digest quotidien/hebdomadaire configurable', included: true },
      { name: 'Téléchargement sécurisé (chiffrement AES-256)', included: true },
      { name: 'Réexpédition mensuelle ou à la demande (Maroc/International)', included: true },
      { name: 'Accès physique 6j/7 avec retrait par QR code', included: true },
      { name: 'Gestion des personnes autorisées', included: true },
      { name: 'Réception colis avec photos et suivi', included: true },
      { name: 'Support prioritaire par email/chat', included: true },
    ],
  },
  {
    id: 3,
    title: 'Création Société',
    description: 'Services de création + gestion administrative',
    price: '5 000 - 10 000',
    period: 'prestation',
    popular: false,
    cta: 'Demander un devis',
    discount: '-25% salles & bureaux',
    features: [
      { name: 'Adresse + Gestion inclus', included: true },
      { name: 'Certificat négatif & rédaction statuts', included: true },
      { name: 'Immatriculation complète RC/IF/CNSS/ICE', included: true },
      { name: 'Publication Bulletin Officiel (500-1 500 MAD)', included: true },
      { name: 'Traitement 7-14 jours', included: true },
      { name: 'Déclarations TVA/IR mensuels ou trimestriels', included: true },
      { name: 'Déclarations IS annuel', included: true },
      { name: 'Rappels d\'échéances (15/30/60 jours)', included: true },
      { name: 'Télédéclarations automatiques', included: true },
      { name: 'Support prioritaire par téléphone', included: true },
    ],
  },
  {
    id: 4,
    title: 'Formalités + Expertise',
    description: 'Gestion administrative, comptable et services avancés',
    price: 'À partir de 500 MAD/mois',
    period: 'mois',
    popular: false,
    cta: 'Nous contacter',
    discount: '-25% salles & bureaux',
    features: [
      { name: 'Tous les services Création Société', included: true },
      { name: 'Gestion comptable complète (saisie pièces, paie)', included: true },
      { name: 'Rapprochements bancaires mensuels', included: true },
      { name: 'Liasses fiscales automatiques', included: true },
      { name: 'États financiers (Bilan/CPC/Trésorerie)', included: true },
      { name: 'Modifications statuts, transfert siège, cession parts', included: true },
      { name: 'Gestion CNSS/DAMANCOM', included: true },
      { name: 'Annexes : Cachet (200-500 MAD), Marque OMPIC (2-4K MAD)', included: true },
      { name: 'Site web vitrine (3-8K) ou e-commerce (10-25K)', included: true },
      { name: 'Support 24/7 + Consultant dédié', included: true },
    ],
  },
];

export async function getPacksData() {
  const supabase = await createClient();

  const { data: packs, error } = await supabase
    .from('packs')
    .select(`
      id,
      title,
      description,
      price,
      period,
      popular,
      cta,
      discount
    `)
    .order('id', { ascending: true });

  // If tables don't exist yet, use fallback data
  if (error) {
    console.warn('⚠️ Database tables not initialized. Using fallback data.');
    console.warn('📌 To use live data, run migrations on Supabase:');
    console.warn('📄 File: supabase/migrations/20260213120000_create_packs_tables.sql');
    return DEFAULT_PACKS_DATA;
  }

  // Fetch features for each pack
  const packsWithFeatures = await Promise.all(
    packs.map(async (pack) => {
      const { data: features } = await supabase
        .from('pack_features')
        .select('name, included')
        .eq('pack_id', pack.id)
        .order('id', { ascending: true });

      return {
        ...pack,
        features: features?.map((f) => ({ name: f.name, included: f.included })) || [],
      };
    })
  );

  return packsWithFeatures;
}

export async function getComparisonData() {
  const supabase = await createClient();

  const { data: categories, error: categoriesError } = await supabase
    .from('pack_comparison_categories')
    .select('id, category_name')
    .order('sort_order', { ascending: true });

  if (categoriesError) {
    console.warn('⚠️ Comparison tables not initialized. Using fallback data.');
    return [
      {
        category: 'Siège Social & Courrier',
        features: [
          { name: 'Siège social prestige (4 villes)', basique: true, gestion: true, creation: true, formalites: true },
          { name: 'Scans quotidiens du courrier', basique: true, gestion: true, creation: true, formalites: true },
          { name: 'Accès portail 24/7', basique: true, gestion: true, creation: true, formalites: true },
          { name: 'Tri automatique par catégorie', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Historique 5 ans illimité', basique: false, gestion: true, creation: true, formalites: true },
        ]
      },
      {
        category: 'Portail Client Avancé',
        features: [
          { name: 'OCR & Recherche full-text', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Téléchargement sécurisé AES-256', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Archives mensuelles (ZIP)', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Stockage rétention légale 5 ans', basique: false, gestion: true, creation: true, formalites: true },
        ]
      },
      {
        category: 'Notifications & Alertes',
        features: [
          { name: 'Notifications Email', basique: true, gestion: true, creation: true, formalites: true },
          { name: 'SMS/WhatsApp illimités', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Alertes prioritaires (Fiscal/Recommandé)', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Digest quotidien/hebdomadaire', basique: false, gestion: true, creation: true, formalites: true },
        ]
      },
      {
        category: 'Réexpédition & Colis',
        features: [
          { name: 'Réexpédition mensuelle/à la demande', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Destinations Maroc & International', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Numéros de suivi pour envois', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Gestion colis avec photos', basique: false, gestion: true, creation: true, formalites: true },
        ]
      },
      {
        category: 'Accès Physique',
        features: [
          { name: 'Accès 6j/7 (8h30-18h30)', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Retrait par QR code', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Gestion personnes autorisées', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Registre visiteurs & signatures', basique: false, gestion: true, creation: true, formalites: true },
        ]
      },
      {
        category: 'Services Juridiques & Création',
        features: [
          { name: 'Certificat négatif & Statuts', basique: false, gestion: false, creation: true, formalites: true },
          { name: 'Immatriculation RC/IF/CNSS/ICE', basique: false, gestion: false, creation: true, formalites: true },
          { name: 'Publication Bulletin Officiel', basique: false, gestion: false, creation: true, formalites: true },
          { name: 'Modifications statuts/Cession/Transfert', basique: false, gestion: false, creation: false, formalites: true },
        ]
      },
      {
        category: 'Déclarations Fiscales & Paie',
        features: [
          { name: 'TVA/IR mensuels ou trimestriels', basique: false, gestion: false, creation: true, formalites: true },
          { name: 'Déclarations IS annuel', basique: false, gestion: false, creation: true, formalites: true },
          { name: 'Gestion CNSS/DAMANCOM', basique: false, gestion: false, creation: true, formalites: true },
          { name: 'Télédéclarations automatiques', basique: false, gestion: false, creation: true, formalites: true },
        ]
      },
      {
        category: 'Gestion Comptable',
        features: [
          { name: 'Saisie pièces comptables', basique: false, gestion: false, creation: false, formalites: true },
          { name: 'Rapprochements bancaires', basique: false, gestion: false, creation: false, formalites: true },
          { name: 'Gestion paie & CNSS', basique: false, gestion: false, creation: false, formalites: true },
          { name: 'États financiers (Bilan/CPC)', basique: false, gestion: false, creation: false, formalites: true },
        ]
      },
      {
        category: 'Services Additionnels',
        features: [
          { name: 'Cachet entreprise (200-500 MAD)', basique: false, gestion: false, creation: false, formalites: true },
          { name: 'Marque OMPIC (2-4K MAD)', basique: false, gestion: false, creation: false, formalites: true },
          { name: 'Site web vitrine (3-8K MAD)', basique: false, gestion: false, creation: false, formalites: true },
          { name: 'E-commerce (10-25K MAD)', basique: false, gestion: false, creation: false, formalites: true },
        ]
      },
      {
        category: 'Espaces de Travail',
        features: [
          { name: 'Salles réunion (-25%)', basique: true, gestion: true, creation: true, formalites: true },
          { name: 'Bureaux privatifs (-25%)', basique: true, gestion: true, creation: true, formalites: true },
          { name: 'Espaces partagés (-25%)', basique: true, gestion: true, creation: true, formalites: true },
        ]
      },
      {
        category: 'Support Client',
        features: [
          { name: 'Support Email', basique: true, gestion: true, creation: true, formalites: true },
          { name: 'Support Chat prioritaire', basique: false, gestion: true, creation: true, formalites: true },
          { name: 'Support Téléphone', basique: false, gestion: false, creation: true, formalites: true },
          { name: 'Support 24/7 + Consultant dédié', basique: false, gestion: false, creation: false, formalites: true },
        ]
      },
    ];
  }

  // Fetch features for each category
  const comparisonData = await Promise.all(
    categories.map(async (category) => {
      const { data: features } = await supabase
        .from('pack_comparison_features')
        .select(`
          feature_name,
          pack_basique,
          pack_gestion,
          pack_creation,
          pack_formalites
        `)
        .eq('category_id', category.id)
        .order('sort_order', { ascending: true });

      return {
        category: category.category_name,
        features:
          features?.map((f) => ({
            name: f.feature_name,
            basique: f.pack_basique,
            gestion: f.pack_gestion,
            creation: f.pack_creation,
            formalites: f.pack_formalites,
          })) || [],
      };
    })
  );

  return comparisonData;
}

export async function getFAQsData() {
  const supabase = await createClient();

  const { data: faqs, error } = await supabase
    .from('pack_faqs')
    .select('category, question, answer')
    .order('sort_order', { ascending: true });

  if (error) {
    console.warn('⚠️ FAQ tables not initialized. Using fallback data.');
    return [
      { category: 'Portail Client & Courrier', question: 'Comment fonctionne le portail client 24/7?', answer: 'Le portail client vous donne accès 24h/24 à tous vos documents numérisés. Vous pouvez consulter, télécharger et gérer votre courrier depuis n\'importe où. Chaque document est sécurisé avec un chiffrement AES-256.' },
      { category: 'Portail Client & Courrier', question: 'Qu\'est-ce que l\'OCR et la recherche full-text?', answer: 'L\'OCR (Reconnaissance Optique de Caractères) analyse le contenu de vos documents scannés. Cela vous permet de rechercher des mots-clés spécifiques dans tous vos documents historiques, même ceux datant d\'années. Par exemple, recherchez "impôt" pour trouver tous les documents fiscaux.' },
      { category: 'Portail Client & Courrier', question: 'Combien de temps mes documents sont-ils archivés?', answer: 'Tous les documents sont archivés pendant 5 ans minimum, conformément à la réglementation légale marocaine. Vous pouvez accéder à tout l\'historique via le portail à tout moment.' },
      { category: 'Notifications & Alertes', question: 'Quels types de notifications puis-je recevoir?', answer: 'Vous pouvez recevoir des notifications par Email, SMS et WhatsApp à chaque arrivée de courrier ou colis. Les packs Gestion et supérieurs permettent de configurer des alertes prioritaires pour les courriers fiscaux et recommandés, et de choisir un digest quotidien/hebdomadaire.' },
      { category: 'Notifications & Alertes', question: 'Puis-je personnaliser mes préférences de notifications?', answer: 'Absolument! Dans le pack Adresse + Gestion, vous pouvez personnaliser les notifications par catégorie de courrier (Fiscal, Recommandé, Commercial, Administratif), choisir les canaux (Email/SMS/WhatsApp), et configurer un digest quotidien ou hebdomadaire selon vos préférences.' },
      { category: 'Réexpédition & Accès Physique', question: 'Comment fonctionne la réexpédition?', answer: 'La réexpédition mensuelle redistribue votre courrier à l\'adresse de votre choix au Maroc ou à l\'international. Vous pouvez aussi demander une réexpédition à la demande. Tous les envois incluent un numéro de suivi. L\'affranchissement peut être à votre charge ou prépayé.' },
      { category: 'Réexpédition & Accès Physique', question: 'Puis-je accéder physiquement aux locaux?', answer: 'Oui, les clients du pack Adresse + Gestion et supérieurs ont accès aux locaux 6 jours par semaine de 8h30 à 18h30. Vous pouvez retirer votre courrier via un système de QR code sécurisé, avec des créneaux horaires disponibles. Un registre visiteurs est maintenu à titre de sécurité.' },
      { category: 'Création Société', question: 'Quels documents sont fournis pour la création?', answer: 'Le pack Création Société inclut : Certificat négatif, Statuts signés, Immatriculation au Registre de Commerce (RC), Inscription à l\'administration fiscale (IF), Affiliation à la CNSS, Obtention du numéro ICE, et Publication au Bulletin Officiel. Délai : 7-14 jours.' },
      { category: 'Création Société', question: 'Quels sont les coûts additionnels pour la création?', answer: 'Le prix du pack couvre les services de création. Les coûts officiels (droits RC, impôts, etc.) sont inclus. Le seul coût additionnel optionnel est la publication au Bulletin Officiel (500-1 500 MAD).' },
      { category: 'Services Comptables & Fiscaux', question: 'Comment fonctionne la gestion comptable?', answer: 'Le pack Formalités + Expertise inclut la saisie de vos pièces comptables, les rapprochements bancaires mensuels, la génération automatique de liasses fiscales, et les états financiers (Bilan, CPC, Trésorerie). Votre consultant dédié vous guide dans tout le processus.' },
      { category: 'Services Comptables & Fiscaux', question: 'Quand dois-je déclarer mes impôts?', answer: 'Le pack Création Société inclut les déclarations TVA/IR (mensuelles ou trimestriels) et l\'IS annuel. Le pack Formalités + Expertise gère les télédéclarations automatiques. Vous recevrez des rappels d\'échéances 15, 30 et 60 jours avant.' },
      { category: 'Services Additionnels', question: 'Quels services additionnels sont disponibles?', answer: 'Le pack Formalités + Expertise propose : Cachet entreprise (200-500 MAD), Dépôt de marque OMPIC (2-4K MAD), Site web vitrine (3-8K MAD), Site e-commerce (10-25K MAD). Chaque service peut être commandé indépendamment.' },
      { category: 'Support & Avantages', question: 'Comment bénéficier de la réduction -25% sur les espaces?', answer: 'Tous nos clients bénéficient automatiquement de -25% sur les salles de réunion, bureaux privatifs et espaces partagés. Vous recevrez un code de réduction automatiquement lors de votre inscription.' },
      { category: 'Support & Avantages', question: 'Quel niveau de support est inclus?', answer: 'Adresse Basique : Support email. Adresse + Gestion : Chat prioritaire. Création Société : Téléphone. Formalités + Expertise : Support 24/7 + Consultant dédié. Tous les clients ont accès à une base de connaissances complète.' },
      { category: 'Modifications & Upgrades', question: 'Puis-je changer de pack ou résilier?', answer: 'Oui, vous pouvez upgrader ou downgrader à tout moment. Les modifications prennent effet le mois suivant avec ajustement de votre facture. La résiliation est possible sans pénalité.' },
    ];
  }

  // Group FAQs by category
  const groupedFAQs = faqs.reduce(
    (acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push({
        category: faq.category,
        question: faq.question,
        answer: faq.answer,
      });
      return acc;
    },
    {} as Record<string, Array<{ category: string; question: string; answer: string }>>
  );

  return Object.values(groupedFAQs).flat();
}
