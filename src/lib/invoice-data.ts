export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  amount: number; // Amount before VAT
  vat: number; // 20% VAT
  total: number; // Amount + VAT
  description: string;
  status: PaymentStatus;
  clientName: string;
}

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'FAC-2026-001',
    date: new Date('2026-02-01'),
    dueDate: new Date('2026-03-01'),
    amount: 1000,
    vat: 200,
    total: 1200,
    description: 'Pack Domiciliation Premium - Février 2026',
    status: 'paid',
    clientName: 'Plus Logiciels SARL',
  },
  {
    id: '2',
    invoiceNumber: 'FAC-2026-002',
    date: new Date('2026-02-05'),
    dueDate: new Date('2026-03-05'),
    amount: 500,
    vat: 100,
    total: 600,
    description: 'Services Complémentaires - Février 2026',
    status: 'paid',
    clientName: 'TechStart Solutions',
  },
  {
    id: '3',
    invoiceNumber: 'FAC-2026-003',
    date: new Date('2026-02-10'),
    dueDate: new Date('2026-03-10'),
    amount: 2500,
    vat: 500,
    total: 3000,
    description: 'Pack Domiciliation Premium + Services Additionnels',
    status: 'pending',
    clientName: 'Innovation Digital',
  },
  {
    id: '4',
    invoiceNumber: 'FAC-2026-004',
    date: new Date('2026-01-15'),
    dueDate: new Date('2026-02-15'),
    amount: 800,
    vat: 160,
    total: 960,
    description: 'Pack Domiciliation Standard - Janvier 2026',
    status: 'overdue',
    clientName: 'Conseil Stratégique',
  },
  {
    id: '5',
    invoiceNumber: 'FAC-2026-005',
    date: new Date('2026-02-12'),
    dueDate: new Date('2026-03-12'),
    amount: 1500,
    vat: 300,
    total: 1800,
    description: 'Pack Domiciliation Entreprise - Février 2026',
    status: 'pending',
    clientName: 'Groupe Commerce Export',
  },
  {
    id: '6',
    invoiceNumber: 'FAC-2026-006',
    date: new Date('2026-02-14'),
    dueDate: new Date('2026-03-14'),
    amount: 750,
    vat: 150,
    total: 900,
    description: 'Services Complémentaires - Secrétariat',
    status: 'pending',
    clientName: 'Startup Innovante',
  },
  {
    id: '7',
    invoiceNumber: 'FAC-2025-050',
    date: new Date('2025-12-01'),
    dueDate: new Date('2026-01-01'),
    amount: 1200,
    vat: 240,
    total: 1440,
    description: 'Pack Domiciliation Premium - Décembre 2025',
    status: 'overdue',
    clientName: 'Business Solutions',
  },
  {
    id: '8',
    invoiceNumber: 'FAC-2026-007',
    date: new Date('2026-02-15'),
    dueDate: new Date('2026-03-15'),
    amount: 600,
    vat: 120,
    total: 720,
    description: 'Services de Courrier - Février 2026',
    status: 'pending',
    clientName: 'Enterprise Plus',
  },
];
