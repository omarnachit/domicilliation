export type UserRole = 'admin' | 'staff' | 'manager' | 'accountant';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  joinDate: Date;
  lastLogin?: Date;
  avatar?: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const roleOptions = [
  { value: 'admin', label: 'Administrateur', color: 'bg-red-100 text-red-800 border-red-200' },
  { value: 'manager', label: 'Gestionnaire', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'staff', label: 'Personnel', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'accountant', label: 'Comptable', color: 'bg-purple-100 text-purple-800 border-purple-200' },
];

export const statusOptions = [
  { value: 'active', label: 'Actif', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'inactive', label: 'Inactif', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  { value: 'suspended', label: 'Suspendu', color: 'bg-red-100 text-red-800 border-red-200' },
];

export const permissionsList = [
  { id: 'view_clients', label: 'Voir les clients' },
  { id: 'manage_clients', label: 'Gérer les clients' },
  { id: 'view_contracts', label: 'Voir les contrats' },
  { id: 'manage_contracts', label: 'Gérer les contrats' },
  { id: 'view_payments', label: 'Voir les paiements' },
  { id: 'manage_payments', label: 'Gérer les paiements' },
  { id: 'view_reports', label: 'Voir les rapports' },
  { id: 'export_data', label: 'Exporter les données' },
  { id: 'manage_users', label: 'Gérer les utilisateurs' },
  { id: 'system_settings', label: 'Paramètres système' },
];

export const getRoleLabel = (role: UserRole) => {
  return roleOptions.find(r => r.value === role)?.label || role;
};

export const getRoleColor = (role: UserRole) => {
  return roleOptions.find(r => r.value === role)?.color || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getStatusLabel = (status: UserStatus) => {
  return statusOptions.find(s => s.value === status)?.label || status;
};

export const getStatusColor = (status: UserStatus) => {
  return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Admin Principal',
    email: 'admin@martech.ma',
    phone: '+212612345678',
    role: 'admin',
    status: 'active',
    department: 'Administration',
    joinDate: new Date('2024-01-15'),
    lastLogin: new Date(),
    permissions: ['view_clients', 'manage_clients', 'view_contracts', 'manage_contracts', 'view_payments', 'manage_payments', 'view_reports', 'export_data', 'manage_users', 'system_settings'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Gestionnaire Contrats',
    email: 'contracts@martech.ma',
    phone: '+212712345678',
    role: 'manager',
    status: 'active',
    department: 'Contrats',
    joinDate: new Date('2024-03-01'),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
    permissions: ['view_clients', 'view_contracts', 'manage_contracts', 'view_payments', 'view_reports', 'export_data'],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Comptable',
    email: 'comptable@martech.ma',
    phone: '+212812345678',
    role: 'accountant',
    status: 'active',
    department: 'Comptabilité',
    joinDate: new Date('2024-05-10'),
    lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
    permissions: ['view_payments', 'manage_payments', 'view_reports', 'export_data'],
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Assistant Support',
    email: 'support@martech.ma',
    phone: '+212912345678',
    role: 'staff',
    status: 'active',
    department: 'Support Client',
    joinDate: new Date('2024-06-20'),
    lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
    permissions: ['view_clients', 'view_contracts', 'view_payments'],
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Ancien Gestionnaire',
    email: 'old.manager@martech.ma',
    role: 'manager',
    status: 'inactive',
    department: 'Contrats',
    joinDate: new Date('2023-01-01'),
    permissions: [],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date(),
  },
];
