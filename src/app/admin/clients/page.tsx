'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientsTable } from "@/components/admin/ClientsTable";
import { Users, TrendingUp, AlertCircle } from "lucide-react";
import { JSX } from "react";
import { Client, formatCurrency } from "@/lib/clients-data";

export default function ClientsPage(): JSX.Element {
  type ApiClient = Omit<Client, 'expirationDate' | 'joinDate' | 'lastActivityDate' | 'updatedAt'> & {
    expirationDate: string | Date;
    joinDate: string | Date;
    lastActivityDate: string | Date;
    updatedAt: string | Date;
  };

  const [clientsList, setClientsList] = useState<Client[]>([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const response = await fetch('/api/admin/clients');
        const payload = await response.json();

        if (!response.ok || !payload?.success) return;

        const mapped = (payload.clients || []).map((client: ApiClient) => ({
          ...client,
          expirationDate: new Date(client.expirationDate),
          joinDate: new Date(client.joinDate),
          lastActivityDate: new Date(client.lastActivityDate),
          updatedAt: new Date(client.updatedAt),
        }));

        setClientsList(mapped);
      } catch {
        // Keep empty list if the API fails.
      }
    };

    loadClients();
  }, []);

  const handleViewClient = (client: Client) => {
    console.log('View client:', client);
    // TODO: Implémenter la modal/page de détails du client
  };

  const handleSuspendClient = (id: string) => {
    setClientsList(
      clientsList.map(c =>
        c.id === id
          ? {
              ...c,
              status: c.status === 'suspended' ? 'active' : 'suspended',
              updatedAt: new Date(),
            }
          : c
      )
    );
  };

  const handleDeleteClient = (id: string) => {
    setClientsList(clientsList.filter(c => c.id !== id));
  };

  // Calculations
  const totalClients = clientsList.length;
  const activeClients = clientsList.filter(c => c.status === 'active').length;
  const totalMonthlyRevenue = clientsList
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + c.monthlyRevenue, 0);
  const expiringClients = clientsList.filter(c => {
    const daysUntilExpiration = Math.floor(
      (c.expirationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-zinc-900">Gestion des Clients</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Total Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{totalClients}</div>
            <p className="text-xs text-zinc-500 mt-1">Tous les statuts confondus</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeClients}</div>
            <p className="text-xs text-zinc-500 mt-1">
              {totalClients > 0 ? ((activeClients / totalClients) * 100).toFixed(1) : '0.0'}% du total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Revenu Mensuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalMonthlyRevenue)}
            </div>
            <p className="text-xs text-zinc-500 mt-1">Clients actifs uniquement</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              Expirant Bientôt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{expiringClients}</div>
            <p className="text-xs text-zinc-500 mt-1">Dans les 30 jours</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Liste des Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientsTable
            clients={clientsList}
            onViewClient={handleViewClient}
            onSuspendClient={handleSuspendClient}
            onDeleteClient={handleDeleteClient}
          />
        </CardContent>
      </Card>
    </div>
  );
}
