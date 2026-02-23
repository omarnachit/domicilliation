'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientsTable } from "@/components/admin/ClientsTable";
import { Users, TrendingUp, AlertCircle, Calendar } from "lucide-react";
import { JSX } from "react";
import { Client, formatCurrency } from "@/lib/clients-data";

export default function ClientsPage(): JSX.Element {
  const [clientsList, setClientsList] = useState<Client[]>([
    {
      id: '1',
      name: 'Tech Solutions SARL',
      email: 'contact@techsolutions.ma',
      company: 'Tech Solutions SARL',
      phone: '+212612345678',
      subscriptionPack: 'domiciliation-complete',
      status: 'active',
      expirationDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      monthlyRevenue: 5000,
      joinDate: new Date('2023-06-15'),
      lastActivityDate: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Commerce Express LLC',
      email: 'info@commerce-express.com',
      company: 'Commerce Express LLC',
      phone: '+212712345678',
      subscriptionPack: 'adresse-premium',
      status: 'active',
      expirationDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      monthlyRevenue: 2500,
      joinDate: new Date('2023-11-20'),
      lastActivityDate: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Cabinet Juridique Al-Khalil',
      email: 'cabinet@alkhalil.ma',
      company: 'Cabinet Juridique Al-Khalil',
      phone: '+212812345678',
      subscriptionPack: 'adresse-basique',
      status: 'trial',
      expirationDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      monthlyRevenue: 800,
      joinDate: new Date('2026-02-01'),
      lastActivityDate: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Import/Export Maghreb',
      email: 'contact@importexport.net',
      company: 'Import/Export Maghreb',
      phone: '+212612987654',
      subscriptionPack: 'domiciliation-complete',
      status: 'suspended',
      expirationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      monthlyRevenue: 3500,
      joinDate: new Date('2023-03-10'),
      lastActivityDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      id: '5',
      name: 'Consulting Plus',
      email: 'hello@consultingplus.ma',
      company: 'Consulting Plus',
      phone: '+212712987654',
      subscriptionPack: 'adresse-basique',
      status: 'active',
      expirationDate: new Date(Date.now() + 200 * 24 * 60 * 60 * 1000),
      monthlyRevenue: 1500,
      joinDate: new Date('2024-05-05'),
      lastActivityDate: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      name: 'Design Studio Maroc',
      email: 'studio@designmaroc.ma',
      company: 'Design Studio Maroc',
      phone: '+212812987654',
      subscriptionPack: 'essentiel',
      status: 'cancelled',
      expirationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      monthlyRevenue: 400,
      joinDate: new Date('2023-01-20'),
      lastActivityDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
    {
      id: '7',
      name: 'Logistique Casablanca',
      email: 'logistics@casablanca.ma',
      company: 'Logistique Casablanca',
      phone: '+212612654321',
      subscriptionPack: 'adresse-premium',
      status: 'active',
      expirationDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
      monthlyRevenue: 3200,
      joinDate: new Date('2023-09-12'),
      lastActivityDate: new Date(),
      updatedAt: new Date(),
    },
  ]);

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
            <p className="text-xs text-zinc-500 mt-1">{((activeClients / totalClients) * 100).toFixed(1)}% du total</p>
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
