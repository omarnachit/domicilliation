export type NotificationType = 'mail' | 'contract' | 'billing' | 'system' | 'alert';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  icon?: string;
  link?: string;
}

export const notificationTypes = [
  { value: 'all', label: 'Tous', icon: 'Bell' },
  { value: 'mail', label: 'Courrier', icon: 'Mail' },
  { value: 'contract', label: 'Contrats', icon: 'FileText' },
  { value: 'billing', label: 'Facturation', icon: 'CreditCard' },
  { value: 'system', label: 'Système', icon: 'Settings' },
  { value: 'alert', label: 'Alertes', icon: 'AlertCircle' },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nouveau courrier reçu',
    message: 'Un courrier recommandé de la Direction Générale des Finances vous attend.',
    type: 'mail',
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60000), // 30 minutes ago
  },
  {
    id: '2',
    title: 'Facture disponible',
    message: 'Votre facture FAC-2026-003 est prête pour téléchargement.',
    type: 'billing',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
  },
  {
    id: '3',
    title: 'Contrat en cours d\'expiration',
    message: 'Votre contrat expire dans 30 jours. Pensez à le renouveler.',
    type: 'contract',
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
  },
  {
    id: '4',
    title: 'Mise à jour système',
    message: 'Une nouvelle version de l\'application est disponible.',
    type: 'system',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60000), // 2 days ago
  },
  {
    id: '5',
    title: 'Alerte: Paiement en retard',
    message: 'Vous avez une facture qui n\'a pas été payée à temps.',
    type: 'alert',
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60000), // 3 days ago
  },
  {
    id: '6',
    title: 'Courrier traité',
    message: 'Votre courrier du 15 février a été trié et est prêt pour retrait.',
    type: 'mail',
    isRead: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60000), // 4 days ago
  },
  {
    id: '7',
    title: 'Nouveau colis enregistré',
    message: 'Un colis de DHL (tracking: DHL123456) a été enregistré à votre nom.',
    type: 'mail',
    isRead: false,
    createdAt: new Date(Date.now() - 60 * 60000), // 1 hour ago
  },
  {
    id: '8',
    title: 'Contrat renouvelé',
    message: 'Votre contrat a été automatiquement renouvelé pour une autre année.',
    type: 'contract',
    isRead: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60000), // 5 days ago
  },
  {
    id: '9',
    title: 'Rappel: Mise à jour profile',
    message: 'Veuillez mettre à jour vos informations de contact.',
    type: 'system',
    isRead: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60000), // 12 hours ago
  },
];
