'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NotificationCenter } from '@/components/dashboard/NotificationCenter';
import { mockNotifications } from '@/lib/notification-data';
import { Bell } from 'lucide-react';
import { JSX } from 'react';

export default function NotificationsPage(): JSX.Element {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Total Notifications</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">
                  {notifications.length}
                </p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-white border-red-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">Non Lues</p>
                <p className="text-3xl font-bold text-red-900 mt-1">
                  {unreadCount}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold">
                {unreadCount}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Lues</p>
                <p className="text-3xl font-bold text-green-900 mt-1">
                  {notifications.filter((n) => n.isRead).length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">
                ✓
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Card */}
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardContent className="pt-6">
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
