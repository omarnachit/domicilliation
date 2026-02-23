export type StaffRole = 'admin' | 'receptionist' | 'accountant' | 'jurist';

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: StaffRole;
  isActive: boolean;
  hireDate: Date;
  updatedAt: Date;
}

export const staffRoleOptions = [
  { value: 'admin', label: 'Admin', color: 'bg-red-100 text-red-800 border-red-200' },
  { value: 'receptionist', label: 'Réceptionniste', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'accountant', label: 'Comptable', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'jurist', label: 'Juriste', color: 'bg-purple-100 text-purple-800 border-purple-200' },
];

export const getRoleLabel = (role: StaffRole) => {
  return staffRoleOptions.find(r => r.value === role)?.label || role;
};

export const getRoleColor = (role: StaffRole) => {
  return staffRoleOptions.find(r => r.value === role)?.color || 'bg-gray-100 text-gray-800 border-gray-200';
};
