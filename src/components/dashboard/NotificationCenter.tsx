'use client';

import { useState, useMemo } from 'react';
import { Notification, NotificationType, notificationTypes } from '@/lib/notification-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Mail,
  FileText,
  CreditCard,
  Settings,
  AlertCircle,
  Trash2,
  CheckCircle,
} from 'lucide-react';

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onDelete,
}: NotificationCenterProps) {
  const [selectedFilter, setSelectedFilter] = useState<NotificationType | 'all'>('all');

  const filteredNotifications = useMemo(() => {
    if (selectedFilter === 'all') {
      return notifications;
    }
    return notifications.filter((n) => n.type === selectedFilter);
  }, [notifications, selectedFilter]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'mail':
        return <Mail className="h-5 w-5" />;
      case 'contract':
        return <FileText className="h-5 w-5" />;
      case 'billing':
        return <CreditCard className="h-5 w-5" />;
      case 'system':
        return <Settings className="h-5 w-5" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case 'mail':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contract':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'billing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'system':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'alert':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getTypeLabel = (type: NotificationType) => {
    return notificationTypes.find((t) => t.value === type)?.label || type;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}m`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Il y a ${diffInDays}j`;

    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-4">
      {/* Header with unread badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-zinc-900">Centre de Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-600 text-white">
              {unreadCount} non lu{unreadCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        {notificationTypes.map((type) => (
          <Button
            key={type.value}
            variant={selectedFilter === type.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter(type.value as NotificationType | 'all')}
            className="text-xs whitespace-nowrap"
          >
            {type.label}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-lg border p-4 transition-colors ${
                notification.isRead
                  ? 'bg-white border-zinc-200 hover:bg-zinc-50'
                  : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
              }`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getTypeColor(
                    notification.type
                  )}`}
                >
                  {getTypeIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-semibold ${
                            notification.isRead
                              ? 'text-zinc-900'
                              : 'text-blue-900 font-bold'
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={getTypeColor(notification.type)}
                        >
                          {getTypeLabel(notification.type)}
                        </Badge>
                      </div>
                      <p
                        className={`text-sm mt-1 ${
                          notification.isRead
                            ? 'text-zinc-600'
                            : 'text-blue-800 font-medium'
                        }`}
                      >
                        {notification.message}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <p className="text-xs text-zinc-500 mt-2">
                    {formatTime(notification.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-1 shrink-0">
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onMarkAsRead(notification.id)}
                      title="Marquer comme lu"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    onClick={() => onDelete(notification.id)}
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center">
            <p className="text-zinc-500">Aucune notification pour ce filtre.</p>
          </div>
        )}
      </div>

      {/* Mark All As Read */}
      {unreadCount > 0 && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              notifications
                .filter((n) => !n.isRead)
                .forEach((n) => onMarkAsRead(n.id));
            }}
          >
            Marquer tous comme lus
          </Button>
        </div>
      )}
    </div>
  );
}
