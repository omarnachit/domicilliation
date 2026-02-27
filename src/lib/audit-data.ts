export type AuditAction = 'create' | 'update' | 'delete' | 'login' | 'logout' | 'view' | 'export' | 'import';
export type AuditResourceType = 'client' | 'contract' | 'payment' | 'user' | 'settings' | 'parcel';

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: AuditAction;
  resourceType: AuditResourceType;
  resourceId: string;
  resourceName: string;
  description: string;
  ipAddress: string;
  timestamp: Date;
  changes?: Record<string, any>;
}

export const auditActionLabels: Record<AuditAction, string> = {
  create: 'Créer',
  update: 'Modifier',
  delete: 'Supprimer',
  login: 'Connexion',
  logout: 'Déconnexion',
  view: 'Consulter',
  export: 'Exporter',
  import: 'Importer',
};

export const auditResourceLabels: Record<AuditResourceType, string> = {
  client: 'Client',
  contract: 'Contrat',
  payment: 'Paiement',
  user: 'Utilisateur',
  settings: 'Paramètres',
  parcel: 'Colis',
};

export const sampleAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: 'user-1',
    userName: 'Admin Principal',
    action: 'update',
    resourceType: 'contract',
    resourceId: 'ctr-001',
    resourceName: 'CTR-2024-001',
    description: 'Renouvellement du contrat de Tech Solutions',
    ipAddress: '192.168.1.100',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    changes: { status: 'renewal -> active', endDate: '2025-12-31' },
  },
  {
    id: '2',
    userId: 'user-2',
    userName: 'Gestionnaire Contrats',
    action: 'create',
    resourceType: 'client',
    resourceId: 'client-123',
    resourceName: 'Nouveau Commerce',
    description: 'Ajout d\'un nouveau client',
    ipAddress: '192.168.1.105',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: '3',
    userId: 'user-1',
    userName: 'Admin Principal',
    action: 'login',
    resourceType: 'user',
    resourceId: 'user-1',
    resourceName: 'Admin Principal',
    description: 'Connexion au système',
    ipAddress: '192.168.1.100',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '4',
    userId: 'user-3',
    userName: 'Comptable',
    action: 'export',
    resourceType: 'payment',
    resourceId: 'report-pay-2026',
    resourceName: 'Rapport Paiements Février',
    description: 'Export des données de paiement en CSV',
    ipAddress: '192.168.1.110',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: '5',
    userId: 'user-1',
    userName: 'Admin Principal',
    action: 'update',
    resourceType: 'settings',
    resourceId: 'settings-main',
    resourceName: 'Paramètres Système',
    description: 'Modification des paramètres de notification',
    ipAddress: '192.168.1.100',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    changes: { notificationEmail: 'enabled' },
  },
  {
    id: '6',
    userId: 'user-2',
    userName: 'Gestionnaire Contrats',
    action: 'delete',
    resourceType: 'parcel',
    resourceId: 'parcel-456',
    resourceName: 'Colis #456',
    description: 'Suppression d\'un colis traité',
    ipAddress: '192.168.1.105',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
];

export const getActionLabel = (action: AuditAction) => auditActionLabels[action];
export const getResourceLabel = (type: AuditResourceType) => auditResourceLabels[type];

export const getActionColor = (action: AuditAction) => {
  switch (action) {
    case 'create': return 'bg-green-100 text-green-800';
    case 'update': return 'bg-blue-100 text-blue-800';
    case 'delete': return 'bg-red-100 text-red-800';
    case 'login': return 'bg-purple-100 text-purple-800';
    case 'logout': return 'bg-gray-100 text-gray-800';
    case 'view': return 'bg-cyan-100 text-cyan-800';
    case 'export': return 'bg-orange-100 text-orange-800';
    case 'import': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
