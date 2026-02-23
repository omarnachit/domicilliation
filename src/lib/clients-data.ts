export type ClientStatus = 'active' | 'suspended' | 'cancelled' | 'trial';
export type SubscriptionPack = 'essentiel' | 'adresse-basique' | 'adresse-premium' | 'domiciliation-complete';

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  subscriptionPack: SubscriptionPack;
  status: ClientStatus;
  expirationDate: Date;
  monthlyRevenue: number;
  joinDate: Date;
  lastActivityDate: Date;
  updatedAt: Date;
}

export const statusOptions = [
  { value: 'active', label: 'Actif', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'trial', label: 'Essai', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'suspended', label: 'Suspendu', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { value: 'cancelled', label: 'Annulé', color: 'bg-red-100 text-red-800 border-red-200' },
];

export const packOptions: { value: SubscriptionPack; label: string }[] = [
  { value: 'essentiel', label: 'Essentiel' },
  { value: 'adresse-basique', label: 'Adresse Basique' },
  { value: 'adresse-premium', label: 'Adresse Premium' },
  { value: 'domiciliation-complete', label: 'Domiciliation Complète' },
];

export const getStatusLabel = (status: ClientStatus) => {
  return statusOptions.find(s => s.value === status)?.label || status;
};

export const getStatusColor = (status: ClientStatus) => {
  return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getPackLabel = (pack: SubscriptionPack) => {
  return packOptions.find(p => p.value === pack)?.label || pack;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'MAD',
  }).format(amount);
};

export const isExpiringSoon = (expirationDate: Date): boolean => {
  const today = new Date();
  const daysUntilExpiration = Math.floor(
    (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
};

export const isExpired = (expirationDate: Date): boolean => {
  return expirationDate < new Date();
};
