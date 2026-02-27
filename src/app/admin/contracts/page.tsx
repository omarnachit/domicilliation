'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractsTable } from "@/components/admin/ContractsTable";
import { FileText, TrendingUp, AlertTriangle, Calendar } from "lucide-react";
import { JSX } from "react";
import { Contract, sampleContracts, formatCurrency } from "@/lib/contracts-data";

export default function ContractsPage(): JSX.Element {
  const [contracts, setContracts] = useState<Contract[]>(sampleContracts);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAdd = () => {
    setToastMessage('Fonctionnalité: Ajouter un nouveau contrat');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleEdit = (contract: Contract) => {
    setToastMessage(`Édition du contrat: ${contract.contractNumber}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRenew = (contract: Contract) => {
    const newContract = { ...contract, status: 'active' as const, id: Date.now().toString() };
    setContracts([...contracts, newContract]);
    setToastMessage(`Contrat ${contract.contractNumber} renouvelé avec succès`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = (contract: Contract) => {
    setContracts(contracts.filter(c => c.id !== contract.id));
    setToastMessage(`Contrat ${contract.contractNumber} supprimé`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalRevenue = contracts
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + c.monthlyAmount, 0);

  const activeCount = contracts.filter(c => c.status === 'active').length;
  const expiredCount = contracts.filter(c => c.status === 'expired').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Contrats</h1>
        <p className="text-gray-600 mt-2">Gérez tous les contrats de domiciliation et services</p>
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
              <FileText className="h-4 w-4" />
              Total Contrats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{contracts.length}</div>
            <p className="text-xs text-gray-500 mt-1">contrats enregistrés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Contrats Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            <p className="text-xs text-gray-500 mt-1">générant des revenus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Contrats Expirés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredCount}</div>
            <p className="text-xs text-gray-500 mt-1">nécessitent renouvellement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Revenu Actif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-gray-500 mt-1">par mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <ContractsTable
        contracts={contracts}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onRenew={handleRenew}
        onDelete={handleDelete}
      />
    </div>
  );
}
