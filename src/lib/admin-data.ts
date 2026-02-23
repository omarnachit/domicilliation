export interface AdminMetrics {
  totalClients: number;
  totalMailToday: number;
  mrr: number;
  monthlyRevenue: MonthlyRevenueData[];
}

export interface MonthlyRevenueData {
  month: string;
  revenue: number;
  clients: number;
}

export const adminMetrics: AdminMetrics = {
  totalClients: 45,
  totalMailToday: 127,
  mrr: 18500,
  monthlyRevenue: [
    { month: 'Jan', revenue: 14200, clients: 32 },
    { month: 'Fév', revenue: 16100, clients: 38 },
    { month: 'Mar', revenue: 15800, clients: 39 },
    { month: 'Avr', revenue: 17300, clients: 41 },
    { month: 'Mai', revenue: 18500, clients: 43 },
    { month: 'Juin', revenue: 19200, clients: 45 },
    { month: 'Juil', revenue: 18800, clients: 44 },
    { month: 'Août', revenue: 17900, clients: 42 },
    { month: 'Sep', revenue: 19100, clients: 45 },
    { month: 'Oct', revenue: 20300, clients: 47 },
    { month: 'Nov', revenue: 21500, clients: 50 },
    { month: 'Déc', revenue: 22100, clients: 52 },
  ],
};
