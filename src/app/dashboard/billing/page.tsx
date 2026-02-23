import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceTable } from "@/components/dashboard/InvoiceTable";
import { mockInvoices } from "@/lib/invoice-data";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { JSX } from "react";

export default function BillingPage(): JSX.Element {
  const paidCount = mockInvoices.filter((inv) => inv.status === "paid").length;
  const pendingCount = mockInvoices.filter((inv) => inv.status === "pending").length;
  const overdueCount = mockInvoices.filter((inv) => inv.status === "overdue").length;

  const totalRevenue = mockInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);

  const pendingAmount = mockInvoices
    .filter((inv) => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.total, 0);

  const overdueAmount = mockInvoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Total Factures
            </CardTitle>
            <FileText className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{mockInvoices.length}</div>
            <p className="text-xs text-zinc-500">Toutes les factures</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Payées
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{paidCount}</div>
            <p className="text-xs text-zinc-500">{formatCurrency(totalRevenue)}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              En Attente
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{pendingCount}</div>
            <p className="text-xs text-zinc-500">{formatCurrency(pendingAmount)}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              En Retard
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{overdueCount}</div>
            <p className="text-xs text-zinc-500">{formatCurrency(overdueAmount)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Table */}
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-zinc-900">Gestion des Factures</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceTable invoices={mockInvoices} />
        </CardContent>
      </Card>
    </div>
  );
}
