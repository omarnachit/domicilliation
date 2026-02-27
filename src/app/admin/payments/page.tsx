'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentsTable } from "@/components/admin/PaymentsTable";
import { DollarSign, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { JSX } from "react";
import { Payment, samplePayments, formatCurrency } from "@/lib/payments-data";

export default function PaymentsPage(): JSX.Element {
  const [payments, setPayments] = useState<Payment[]>(samplePayments);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAdd = () => {
    setToastMessage('Fonctionnalité: Ajouter un nouveau paiement');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRetry = (payment: Payment) => {
    const updatedPayments = payments.map(p => 
      p.id === payment.id ? { ...p, status: 'completed' as const } : p
    );
    setPayments(updatedPayments);
    setToastMessage(`Paiement ${payment.invoiceNumber} retraité avec succès`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRefund = (payment: Payment) => {
    const updatedPayments = payments.map(p => 
      p.id === payment.id ? { ...p, status: 'refunded' as const } : p
    );
    setPayments(updatedPayments);
    setToastMessage(`Remboursement initié pour ${payment.invoiceNumber}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const completedPayments = payments.filter(p => p.status === 'completed');
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const failedPayments = payments.filter(p => p.status === 'failed');

  const totalCompleted = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalFailed = failedPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
        <p className="text-gray-600 mt-2">Suivi et gestion de tous les paiements reçus</p>
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
              <DollarSign className="h-4 w-4" />
              Complétés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalCompleted)}</div>
            <p className="text-xs text-gray-500 mt-1">{completedPayments.length} paiements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              En Attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</div>
            <p className="text-xs text-gray-500 mt-1">{pendingPayments.length} paiements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Échoués
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalFailed)}</div>
            <p className="text-xs text-gray-500 mt-1">{failedPayments.length} paiements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Taux Réussite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {payments.length > 0
                ? Math.round((completedPayments.length / payments.length) * 100)
                : 0}%
            </div>
            <p className="text-xs text-gray-500 mt-1">des paiements</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <PaymentsTable
        payments={payments}
        onAdd={handleAdd}
        onRetry={handleRetry}
        onRefund={handleRefund}
      />
    </div>
  );
}
