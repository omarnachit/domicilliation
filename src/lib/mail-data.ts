export type MailCategory = 'Fiscal' | 'Recommandé' | 'Commercial' | 'Administratif';
export type MailStatus = 'unread' | 'read' | 'archived';

export interface Mail {
  id: string;
  date: Date;
  sender: string;
  category: MailCategory;
  subject: string;
  status: MailStatus;
}

export const mockMails: Mail[] = [
  {
    id: '1',
    date: new Date('2026-02-15'),
    sender: 'Direction Générale des Finances',
    category: 'Fiscal',
    subject: 'Avis d\'imposition 2025',
    status: 'unread',
  },
  {
    id: '2',
    date: new Date('2026-02-14'),
    sender: 'La Poste - Recommandé',
    category: 'Recommandé',
    subject: 'Lettre recommandée - Contrat signé',
    status: 'read',
  },
  {
    id: '3',
    date: new Date('2026-02-13'),
    sender: 'Fournisseur XYZ',
    category: 'Commercial',
    subject: 'Nouveau devis produit',
    status: 'read',
  },
  {
    id: '4',
    date: new Date('2026-02-12'),
    sender: 'Service Administratif',
    category: 'Administratif',
    subject: 'Mise à jour des documents demandée',
    status: 'unread',
  },
  {
    id: '5',
    date: new Date('2026-02-10'),
    sender: 'Banque Nationale',
    category: 'Fiscal',
    subject: 'Relevé d\'activité mensuel',
    status: 'read',
  },
  {
    id: '6',
    date: new Date('2026-02-09'),
    sender: 'Partenaire Commercial',
    category: 'Commercial',
    subject: 'Proposition de collaboration',
    status: 'archived',
  },
  {
    id: '7',
    date: new Date('2026-02-08'),
    sender: 'Tribunal de Commerce',
    category: 'Administratif',
    subject: 'Avis de renouvellement immatriculation',
    status: 'read',
  },
  {
    id: '8',
    date: new Date('2026-02-07'),
    sender: 'Inspection Fiscale',
    category: 'Fiscal',
    subject: 'Demande de pièces justificatives',
    status: 'unread',
  },
  {
    id: '9',
    date: new Date('2026-02-05'),
    sender: 'Coursier Express',
    category: 'Recommandé',
    subject: 'Signature requise - Documents importants',
    status: 'read',
  },
  {
    id: '10',
    date: new Date('2026-02-03'),
    sender: 'Fournisseur ABC',
    category: 'Commercial',
    subject: 'Facture et conditions de paiement',
    status: 'archived',
  },
];
