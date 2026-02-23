import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { adminMetrics } from "@/lib/admin-data";
import { Users, Mail, TrendingUp, Activity } from "lucide-react";
import { JSX } from "react";

export default function AdminDashboardPage(): JSX.Element {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenue = adminMetrics.monthlyRevenue.reduce(
    (sum, month) => sum + month.revenue,
    0
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Clients */}
        <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-900">
              Total Clients
            </CardTitle>
            <Users className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-900">
              {adminMetrics.totalClients}
            </div>
            <p className="text-xs text-indigo-700 mt-1">Clients actifs</p>
          </CardContent>
        </Card>

        {/* Total Mail Today */}
        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">
              Courrier du Jour
            </CardTitle>
            <Mail className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900">
              {adminMetrics.totalMailToday}
            </div>
            <p className="text-xs text-amber-700 mt-1">Arrivées aujourd'hui</p>
          </CardContent>
        </Card>

        {/* MRR */}
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              MRR
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">
              {formatCurrency(adminMetrics.mrr)}
            </div>
            <p className="text-xs text-green-700 mt-1">Revenue mensuel récurrent</p>
          </CardContent>
        </Card>

        {/* Total Annual Revenue */}
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Revenue Annuel
            </CardTitle>
            <Activity className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-blue-700 mt-1">Total cumulé</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-zinc-900">Graphique Revenu Mensuel</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart data={adminMetrics.monthlyRevenue} />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-600">
              Revenu Moyen / Mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">
              {formatCurrency(totalRevenue / 12)}
            </div>
            <p className="text-xs text-zinc-500 mt-1">Sur 12 mois</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-600">
              Clients Moyens / Mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">
              {Math.round(
                adminMetrics.monthlyRevenue.reduce((sum, m) => sum + m.clients, 0) / 12
              )}
            </div>
            <p className="text-xs text-zinc-500 mt-1">En moyenne</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-600">
              Revenu par Client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">
              {formatCurrency(adminMetrics.mrr / adminMetrics.totalClients)}
            </div>
            <p className="text-xs text-zinc-500 mt-1">Moyenne mensuelle</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
