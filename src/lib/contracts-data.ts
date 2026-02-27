export type ContractStatus = 'active' | 'pending' | 'expired' | 'terminated' | 'renewal';
export type ContractType = 'domiciliation' | 'adresse' | 'services-complementaires' | 'postal';

export interface Contract {
  id: string;
  clientId: string;
  clientName: string;
  contractType: ContractType;
  contractNumber: string;
  status: ContractStatus;
  startDate: Date;
  endDate: Date;
  monthlyAmount: number;
  totalAmount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  renewalDate?: Date;
}

export const contractStatusOptions = [
  { value: 'active', label: 'Actif', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'pending', label: 'En attente', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'renewal', label: 'À renouveler', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { value: 'expired', label: 'Expiré', color: 'bg-red-100 text-red-800 border-red-200' },
  { value: 'terminated', label: 'Résilié', color: 'bg-gray-100 text-gray-800 border-gray-200' },
];

export const contractTypeOptions = [
  { value: 'domiciliation', label: 'Domiciliation' },
  { value: 'adresse', label: 'Adresse Virtuelle' },
  { value: 'services-complementaires', label: 'Services Complémentaires' },
  { value: 'postal', label: 'Service Postal' },
];

export const getContractStatusLabel = (status: ContractStatus) => {
  return contractStatusOptions.find(s => s.value === status)?.label || status;
};

export const getContractStatusColor = (status: ContractStatus) => {
  return contractStatusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getContractTypeLabel = (type: ContractType) => {
  return contractTypeOptions.find(t => t.value === type)?.label || type;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'MAD',
  }).format(amount);
};

export const isExpiringSoon = (endDate: Date): boolean => {
  const today = new Date();
  const daysUntilExpiration = Math.floor(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
};

export const isExpired = (endDate: Date): boolean => {
  return endDate < new Date();
};

export const getDaysUntilExpiration = (endDate: Date): number => {
  const today = new Date();
  return Math.floor(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
};

export const sampleContracts: Contract[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Tech Solutions SARL',
    contractType: 'domiciliation',
    contractNumber: 'CTR-2024-001',
    status: 'active',
    startDate: new Date('2024-01-15'),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    monthlyAmount: 5000,
    totalAmount: 60000,
    description: 'Contrat de domiciliation commerciale avec services additionnels',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    renewalDate: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Commerce Express LLC',
    contractType: 'adresse',
    contractNumber: 'CTR-2024-002',
    status: 'renewal',
    startDate: new Date('2024-06-01'),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    monthlyAmount: 2500,
    totalAmount: 30000,
    description: 'Adresse virtuelle pour correspondance',
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date(),
    renewalDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Cabinet Juridique Al-Khalil',
    contractType: 'services-complementaires',
    contractNumber: 'CTR-2024-003',
    status: 'active',
    startDate: new Date('2024-03-10'),
    endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    monthlyAmount: 1500,
    totalAmount: 18000,
    description: 'Service postal et forwarding de courrier',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date(),
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Agence Marketing Pro',
    contractType: 'postal',
    contractNumber: 'CTR-2024-004',
    status: 'pending',
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    monthlyAmount: 800,
    totalAmount: 9600,
    description: 'Service postal standard avec suivi',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    clientId: '5',
    clientName: 'Import Export Services',
    contractType: 'domiciliation',
    contractNumber: 'CTR-2024-005',
    status: 'expired',
    startDate: new Date('2023-01-10'),
    endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    monthlyAmount: 4000,
    totalAmount: 48000,
    description: 'Contrat expiré - nécessite renouvellement',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date(),
  },
];
