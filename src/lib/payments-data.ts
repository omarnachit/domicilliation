export type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded' | 'cancelled';
export type PaymentMethod = 'card' | 'bank_transfer' | 'cash' | 'cheque';

export interface Payment {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  invoiceNumber: string;
  contractId: string;
  description: string;
  paidDate: Date;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  reference?: string;
}

export const paymentStatusOptions = [
  { value: 'completed', label: 'Complété', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'pending', label: 'En attente', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'failed', label: 'Échoué', color: 'bg-red-100 text-red-800 border-red-200' },
  { value: 'refunded', label: 'Remboursé', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'cancelled', label: 'Annulé', color: 'bg-gray-100 text-gray-800 border-gray-200' },
];

export const paymentMethodOptions = [
  { value: 'card', label: 'Carte Bancaire' },
  { value: 'bank_transfer', label: 'Virement Bancaire' },
  { value: 'cash', label: 'Espèces' },
  { value: 'cheque', label: 'Chèque' },
];

export const getPaymentStatusLabel = (status: PaymentStatus) => {
  return paymentStatusOptions.find(s => s.value === status)?.label || status;
};

export const getPaymentStatusColor = (status: PaymentStatus) => {
  return paymentStatusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getPaymentMethodLabel = (method: PaymentMethod) => {
  return paymentMethodOptions.find(m => m.value === method)?.label || method;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'MAD',
  }).format(amount);
};

export const samplePayments: Payment[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Tech Solutions SARL',
    amount: 5000,
    currency: 'MAD',
    method: 'bank_transfer',
    status: 'completed',
    invoiceNumber: 'INV-2026-0001',
    contractId: 'ctr-001',
    description: 'Paiement contrat domiciliation - Février',
    paidDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    reference: 'RIB-123456789',
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Commerce Express LLC',
    amount: 2500,
    currency: 'MAD',
    method: 'card',
    status: 'completed',
    invoiceNumber: 'INV-2026-0002',
    contractId: 'ctr-002',
    description: 'Paiement adresse virtuelle - Février',
    paidDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Cabinet Juridique Al-Khalil',
    amount: 1500,
    currency: 'MAD',
    method: 'cheque',
    status: 'pending',
    invoiceNumber: 'INV-2026-0003',
    contractId: 'ctr-003',
    description: 'Paiement services complémentaires - Février',
    paidDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Agence Marketing Pro',
    amount: 800,
    currency: 'MAD',
    method: 'bank_transfer',
    status: 'failed',
    invoiceNumber: 'INV-2026-0004',
    contractId: 'ctr-004',
    description: 'Paiement service postal - Février',
    paidDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  },
  {
    id: '5',
    clientId: '5',
    clientName: 'Import Export Services',
    amount: 4000,
    currency: 'MAD',
    method: 'card',
    status: 'refunded',
    invoiceNumber: 'INV-2026-0005',
    contractId: 'ctr-005',
    description: 'Paiement contrat expiré - remboursé',
    paidDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];
