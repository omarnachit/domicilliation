// Services Complémentaires Internes Data
export const SERVICES_COMPLEMENTAIRES = [
  {
    id: 1,
    category: 'Déclarations Fiscales/Sociales',
    items: [
      {
        id: 'tva-ir',
        title: 'TVA/IR mensuel ou trimestriel',
        description: 'Déclarations TVA et impôt sur le revenu mensuelles ou trimestrielles',
        included: true,
      },
      {
        id: 'is',
        title: 'IS annuel',
        description: 'Déclaration de l\'impôt sur les sociétés annuelle',
        included: true,
      },
      {
        id: 'cnss',
        title: 'CNSS/DAMANCOM',
        description: 'Gestion des cotisations sociales et assurance maladie',
        included: true,
      },
      {
        id: 'teledecarations',
        title: 'Télédéclarations automatiques',
        description: 'Soumission automatique de vos déclarations aux autorités fiscales',
        included: true,
      },
      {
        id: 'rappels',
        title: 'Rappels d\'échéances (15/30/60 jours avant)',
        description: 'Notifications automatiques pour ne manquer aucune deadline',
        included: true,
      },
    ],
  },
  {
    id: 2,
    category: 'Gestion Comptable',
    subtitle: '(Activable)',
    items: [
      {
        id: 'saisie-pieces',
        title: 'Saisie des pièces comptables',
        description: 'Entrée et classement des factures, devis et documents comptables',
        included: true,
        price: 'À partir de 500 MAD/mois',
      },
      {
        id: 'rapprochements',
        title: 'Rapprochements bancaires',
        description: 'Réconciliation mensuelle des comptes bancaires avec vos registres',
        included: true,
        price: 'Inclus',
      },
      {
        id: 'liasses',
        title: 'Liasses fiscales',
        description: 'Préparation complète de vos liasses fiscales',
        included: true,
        price: 'Inclus',
      },
      {
        id: 'inventaires',
        title: 'Inventaires',
        description: 'Gestion et valorisation des inventaires annuels',
        included: true,
        price: 'À la demande',
      },
      {
        id: 'etats-financiers',
        title: 'États financiers (Bilan, CPC, Trésorerie)',
        description: 'Préparation du Bilan, Compte de Produits et Charges, et tableaux de trésorerie',
        included: true,
        price: 'Inclus',
      },
    ],
  },
  {
    id: 3,
    category: 'Gestion de Courrier et Documents',
    items: [
      {
        id: 'scans-quotidiens',
        title: 'Scans quotidiens de tout le courrier reçu',
        description: 'Numérisation complète et quotidienne de tous vos courriers',
        included: true,
      },
      {
        id: 'tri-categorise',
        title: 'Tri catégorisé automatique',
        description: 'Classification automatique : Fiscal, Recommandé, Commercial, Administratif',
        included: true,
      },
      {
        id: 'telechargement-securise',
        title: 'Téléchargement sécurisé des documents (AES-256)',
        description: 'Téléchargement des documents en PDF avec chiffrement AES-256',
        included: true,
      },
      {
        id: 'historique-infini',
        title: 'Historique infini avec rétention légale',
        description: 'Accès complet à tous les documents avec rétention légale de 5 ans',
        included: true,
      },
      {
        id: 'recherche-ocr',
        title: 'Recherche full-text par OCR',
        description: 'Recherche avancée dans tous les documents scannés via reconnaissance optique',
        included: true,
      },
      {
        id: 'telechargement-groupe',
        title: 'Téléchargement groupé (archives mensuelles)',
        description: 'Téléchargement par lot de tous les documents d\'un mois en une seule archive',
        included: true,
      },
    ],
  },
  {
    id: 4,
    category: 'Annexes à la demande',
    items: [
      {
        id: 'cachet',
        title: 'Cachet entreprise',
        description: 'Création et fourniture de votre cachet/tampon professionnel',
        price: '200 - 500 MAD',
        priceNote: 'Frais uniques',
      },
      {
        id: 'marque-ompic',
        title: 'Dépôt marque OMPIC',
        description: 'Démarches complètes pour l\'enregistrement de votre marque',
        price: '2000 - 4000 MAD',
        priceNote: 'Prestation complète',
      },
      {
        id: 'site-vitrine',
        title: 'Site web vitrine',
        description: 'Création d\'un site web vitrine professionnel pour votre entreprise',
        price: '3000 - 8000 MAD',
        priceNote: 'Frais de création',
      },
      {
        id: 'site-ecommerce',
        title: 'Site e-commerce',
        description: 'Développement complet d\'une boutique en ligne fonctionnelle',
        price: '10000 - 25000 MAD',
        priceNote: 'Frais de création',
      },
      {
        id: 'bulletin-officiel',
        title: 'Annonces Bulletin Officiel',
        description: 'Publication de vos avis légaux au Bulletin Officiel',
        price: '500 - 1500 MAD',
        priceNote: 'Par annonce',
      },
    ],
  },
];

export async function getServicesData() {
  // Retourne les données locales (peuvent être remplacées par une requête Supabase)
  return SERVICES_COMPLEMENTAIRES;
}
