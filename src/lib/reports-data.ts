export type ReportType = 'revenue' | 'clients' | 'contracts' | 'payments' | 'users' | 'activity';

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  data: any;
  generatedAt: Date;
  generatedBy: string;
  period: string;
}

export interface ReportMetrics {
  totalRevenue: number;
  totalPayments: number;
  averageContractValue: number;
  clientCount: number;
  activeClients: number;
  contractsRenewalNeeded: number;
  paymentsPending: number;
  userLoginCount: number;
}

export const sampleMetrics: ReportMetrics = {
  totalRevenue: 13800,
  totalPayments: 13800,
  averageContractValue: 2760,
  clientCount: 5,
  activeClients: 4,
  contractsRenewalNeeded: 2,
  paymentsPending: 1,
  userLoginCount: 24,
};

export const sampleReports: Report[] = [
  {
    id: '1',
    name: 'Rapport de Revenu - Février 2026',
    type: 'revenue',
    description: 'Revenu total généré en février',
    data: {
      total: 13800,
      byType: {
        domiciliation: 9000,
        adresse: 2500,
        services: 1500,
        postal: 800,
      },
    },
    generatedAt: new Date(),
    generatedBy: 'Admin Principal',
    period: 'Février 2026',
  },
  {
    id: '2',
    name: 'Rapport des Clients',
    type: 'clients',
    description: 'Analyse des clients actifs et inactifs',
    data: {
      total: 5,
      active: 4,
      trial: 1,
      suspended: 0,
      cancelled: 0,
    },
    generatedAt: new Date(),
    generatedBy: 'Admin Principal',
    period: 'Février 2026',
  },
  {
    id: '3',
    name: 'Rapport des Contrats',
    type: 'contracts',
    description: 'État des contrats',
    data: {
      total: 5,
      active: 3,
      pending: 1,
      renewal: 1,
      expired: 0,
    },
    generatedAt: new Date(),
    generatedBy: 'Admin Principal',
    period: 'Février 2026',
  },
];

export const reportTypeLabels: Record<ReportType, string> = {
  revenue: 'Rapport de Revenu',
  clients: 'Rapport des Clients',
  contracts: 'Rapport des Contrats',
  payments: 'Rapport des Paiements',
  users: 'Rapport des Utilisateurs',
  activity: 'Rapport d\'Activité',
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'MAD',
  }).format(amount);
};
