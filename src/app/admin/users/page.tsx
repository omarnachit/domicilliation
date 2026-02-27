'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersTable } from "@/components/admin/UsersTable";
import { Users, Shield, LogIn, AlertCircle } from "lucide-react";
import { JSX } from "react";
import { User, sampleUsers } from "@/lib/users-data";

export default function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAdd = () => {
    setToastMessage('Fonctionnalité: Ajouter un nouvel utilisateur');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleEdit = (user: User) => {
    setToastMessage(`Édition de l'utilisateur: ${user.name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = (user: User) => {
    setUsers(users.filter(u => u.id !== user.id));
    setToastMessage(`Utilisateur ${user.name} supprimé`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSuspend = (user: User) => {
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, status: 'suspended' as const } : u
    );
    setUsers(updatedUsers);
    setToastMessage(`Utilisateur ${user.name} suspendu`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReactivate = (user: User) => {
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, status: 'active' as const } : u
    );
    setUsers(updatedUsers);
    setToastMessage(`Utilisateur ${user.name} réactivé`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeUsers = users.filter(u => u.status === 'active').length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const suspendedCount = users.filter(u => u.status === 'suspended').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
        <p className="text-gray-600 mt-2">Gérez les comptes et les permissions des utilisateurs</p>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-800 z-50">
          {toastMessage}
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Utilisateurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            <p className="text-xs text-gray-500 mt-1">comptes enregistrés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            <p className="text-xs text-gray-500 mt-1">connectés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Administrateurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{adminCount}</div>
            <p className="text-xs text-gray-500 mt-1">accès complet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Suspendus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{suspendedCount}</div>
            <p className="text-xs text-gray-500 mt-1">accès limité</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <UsersTable
        users={users}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSuspend={handleSuspend}
        onReactivate={handleReactivate}
      />
    </div>
  );
}
