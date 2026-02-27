'use client';

import { useMemo, useState } from 'react';
import {
  BellRing,
  CheckCircle2,
  CircleX,
  Info,
  Trash2,
  TriangleAlert,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { JSX } from 'react';

type NotificationType = 'info' | 'warning' | 'success' | 'error';
type NotificationStatus = 'read' | 'unread';

interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  status: NotificationStatus;
}

const initialNotifications: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'Nouvel abonnement actif',
    message: 'Le client Atlas Logistics a active le pack Premium.',
    type: 'success',
    createdAt: '2026-02-24T09:15:00.000Z',
    status: 'unread',
  },
  {
    id: 'notif-2',
    title: 'Echec de paiement detecte',
    message: 'Une tentative de paiement Stripe a echoue pour la facture INV-4382.',
    type: 'error',
    createdAt: '2026-02-24T08:42:00.000Z',
    status: 'unread',
  },
  {
    id: 'notif-3',
    title: 'Mise a jour de securite',
    message: 'Une nouvelle politique de mot de passe est disponible pour les comptes admin.',
    type: 'warning',
    createdAt: '2026-02-23T17:10:00.000Z',
    status: 'read',
  },
  {
    id: 'notif-4',
    title: 'Rapport hebdomadaire genere',
    message: 'Le rapport des performances commerciales est pret au telechargement.',
    type: 'info',
    createdAt: '2026-02-23T10:05:00.000Z',
    status: 'read',
  },
];

const typeStyles: Record<
  NotificationType,
  {
    icon: typeof Info;
    iconClass: string;
    badgeClass: string;
    cardAccent: string;
  }
> = {
  info: {
    icon: Info,
    iconClass: 'text-sky-600',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    cardAccent: 'border-l-sky-400',
  },
  warning: {
    icon: TriangleAlert,
    iconClass: 'text-amber-600',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    cardAccent: 'border-l-amber-400',
  },
  success: {
    icon: CheckCircle2,
    iconClass: 'text-emerald-600',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cardAccent: 'border-l-emerald-400',
  },
  error: {
    icon: CircleX,
    iconClass: 'text-rose-600',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    cardAccent: 'border-l-rose-400',
  },
};

function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

interface NotificationCardProps {
  notification: AdminNotification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationCardProps): JSX.Element {
  const style = typeStyles[notification.type];
  const TypeIcon = style.icon;
  const isUnread = notification.status === 'unread';

  return (
    <Card
      className={`border-l-4 ${style.cardAccent} border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TypeIcon className={`h-4 w-4 ${style.iconClass}`} />
              <CardTitle className="text-base font-semibold text-zinc-900">{notification.title}</CardTitle>
              {isUnread && <span className="h-2 w-2 rounded-full bg-indigo-500" aria-hidden="true" />}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={style.badgeClass}>{notification.type}</Badge>
              <Badge
                variant="outline"
                className={
                  isUnread
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                    : 'border-zinc-200 bg-zinc-100 text-zinc-600'
                }
              >
                {notification.status}
              </Badge>
            </div>
          </div>
          <span className="text-xs text-zinc-500">{formatDate(notification.createdAt)}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-zinc-600">{notification.message}</p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onMarkAsRead(notification.id)}
            disabled={!isUnread}
            className="transition-colors"
          >
            Mark as read
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(notification.id)}
            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          >
            <Trash2 className="h-4 w-4" />
            Delete notification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminNotificationsPage(): JSX.Element {
  const [notifications, setNotifications] = useState<AdminNotification[]>(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.status === 'unread').length,
    [notifications]
  );

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id && item.status === 'unread' ? { ...item, status: 'read' } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-full space-y-6">
      <Card className="border-zinc-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900">
                  Notifications Admin
                </CardTitle>
              </div>
              <p className="text-sm text-zinc-600">
                Suivez les alertes de la plateforme et traitez les actions prioritaires.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="border-indigo-200 bg-indigo-50 text-indigo-700">
                {unreadCount} unread
              </Badge>
              <Button
                variant="outline"
                onClick={handleClearAll}
                disabled={notifications.length === 0}
                className="transition-colors hover:bg-zinc-100"
              >
                Clear all
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {notifications.length === 0 ? (
        <Card className="border border-dashed border-zinc-300 bg-white/80 shadow-sm">
          <CardContent className="py-14 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <BellRing className="h-6 w-6 text-zinc-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">No notifications</h3>
            <p className="mt-1 text-sm text-zinc-600">
              You are all caught up. New platform events will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
