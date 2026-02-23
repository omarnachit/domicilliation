export type ParcelStatus = 'received' | 'pending' | 'withdrawn' | 'reshipped';

export interface Parcel {
  id: string;
  carrier: string;
  trackingNumber: string;
  weight: number; // en kg
  length: number; // en cm
  width: number; // en cm
  height: number; // en cm
  imageUrl?: string;
  status: ParcelStatus;
  clientName: string;
  createdAt: Date;
  updatedAt: Date;
}

export const parcelStatusOptions = [
  { value: 'received', label: 'Reçu', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'pending', label: 'En attente', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { value: 'withdrawn', label: 'Retiré', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'reshipped', label: 'Réexpédié', color: 'bg-purple-100 text-purple-800 border-purple-200' },
];

export const carriers = [
  'DHL',
  'FedEx',
  'UPS',
  'Aramex',
  'Maroc Poste',
  'TNT',
  'SMSA Express',
  'Autre',
];
