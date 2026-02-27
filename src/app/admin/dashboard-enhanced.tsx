'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sampleContracts } from "@/lib/contracts-data";
import { samplePayments } from "@/lib/payments-data";
import { sampleMetrics } from "@/lib/reports-data";
import { sampleUsers } from "@/lib/users-data";
import { sampleAuditLogs } from "@/lib/audit-data";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Activity,
  Shield,
  CheckCircle,
  Clock,
} from "lucide-react";
import { JSX } from "react";

export default function AdminDashboardEnhanced(): JSX.Element {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
    }).format(amount);
  };

  // Chart data
  const revenueData = [
    { month: "Janvier", revenue: 12000, target: 15000 },
    { month: "Février", revenue: 13800, target: 15000 },
    { month: "Mars", revenue: 11500, target: 15000 },
  ];

  const contractStatusData = [
    { name: "Actifs", value: 3, fill: "#10b981" },
    { name: "En Attente", value: 1, fill: "#f59e0b" },
    { name: "À Renouveler", value: 1, fill: "#ef4444" },
  ];

  // Calculate metrics
  const activeContracts = sampleContracts.filter((c) => c.status === "active").length;
  const expiringContracts = sampleContracts.filter(
    (c) => c.status === "renewal" || c.status === "expired"
  ).length;
  const activeUsers = sampleUsers.filter((u) => u.status === "active").length;
  const completedPayments = samplePayments.filter((p) => p.status === "completed").length;
  const pendingPayments = samplePayments.filter((p) => p.status === "pending").length;
  const totalRevenue = sampleContracts
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + c.monthlyAmount, 0);

  // Recent activities
  const recentLogs = [...sampleAuditLogs].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble complète de votre système</p>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-900 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Utilisateurs Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-900">{activeUsers}</div>
            <p className="text-xs text-indigo-700 mt-1">connectés aujourd'hui</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contrats Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{activeContracts}</div>
            <p className="text-xs text-green-700 mt-1">sur {sampleContracts.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenu Mensuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-blue-700 mt-1">total actif</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-900 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              À Renouveler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900">{expiringContracts}</div>
            <p className="text-xs text-amber-700 mt-1">attention requise</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenu par Mois</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenu Réel" />
                <Bar dataKey="target" fill="#e5e7eb" name="Objectif" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Contract Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>État des Contrats</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={contractStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contractStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Paiements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Complétés:</span>
              <Badge className="bg-green-100 text-green-800 border-green-200 border">
                {completedPayments}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">En attente:</span>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 border">
                {pendingPayments}
              </Badge>
            </div>
            <Button asChild variant="outline" className="w-full mt-2">
              <Link href="/admin/payments">Voir tous les paiements</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Compte d'Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total:</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 border">
                {sampleUsers.length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Inactifs:</span>
              <Badge className="bg-gray-100 text-gray-800 border-gray-200 border">
                {sampleUsers.filter((u) => u.status === "inactive").length}
              </Badge>
            </div>
            <Button asChild variant="outline" className="w-full mt-2">
              <Link href="/admin/users">Gérer les utilisateurs</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Sécurité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Système sécurisé</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/security">Paramètres sécurité</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Activités Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <Activity className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{log.description}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {log.userName} • {log.timestamp.toLocaleTimeString("fr-FR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/admin/audit">Voir tous les logs</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Contrats Expirant Bientôt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sampleContracts
                .filter((c) => c.status === "renewal" || c.status === "expired")
                .slice(0, 5)
                .map((contract) => (
                  <div key={contract.id} className="flex justify-between items-center pb-3 border-b last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{contract.clientName}</p>
                      <p className="text-xs text-gray-500">{contract.contractNumber}</p>
                    </div>
                    <Badge
                      className={
                        contract.status === "expired"
                          ? "bg-red-100 text-red-800 border-red-200 border"
                          : "bg-amber-100 text-amber-800 border-amber-200 border"
                      }
                    >
                      {contract.status === "expired" ? "Expiré" : "À renouveler"}
                    </Badge>
                  </div>
                ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/admin/contracts">Voir tous les contrats</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Accès Rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/clients">Clients</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/contracts">Contrats</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/payments">Paiements</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/reports">Rapports</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/audit">Audit</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/security">Sécurité</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/users">Utilisateurs</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/admin/settings">Paramètres</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
