'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Payment, formatCurrency, getPaymentStatusColor, getPaymentStatusLabel, getPaymentMethodLabel } from '@/lib/payments-data';
import { MoreHorizontal, Plus, Eye, Download, RefreshCw } from 'lucide-react';
import { JSX } from 'react';

interface PaymentsTableProps {
  payments: Payment[];
  onAdd?: () => void;
  onRetry?: (payment: Payment) => void;
  onRefund?: (payment: Payment) => void;
}

export function PaymentsTable({ payments, onAdd, onRetry, onRefund }: PaymentsTableProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  const filteredPayments = payments.filter(
    payment =>
      (payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterStatus || payment.status === filterStatus)
  );

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = filteredPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</div>
            <p className="text-xs text-gray-500 mt-1">{filteredPayments.length} paiements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Complétés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(completedAmount)}</div>
            <p className="text-xs text-gray-500 mt-1">
              {filteredPayments.filter(p => p.status === 'completed').length} paiements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">En Attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingAmount)}</div>
            <p className="text-xs text-gray-500 mt-1">
              {filteredPayments.filter(p => p.status === 'pending').length} paiements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taux Complétion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {filteredPayments.length > 0
                ? Math.round((filteredPayments.filter(p => p.status === 'completed').length / filteredPayments.length) * 100)
                : 0}%
            </div>
            <p className="text-xs text-gray-500 mt-1">des paiements</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Rechercher par client ou numéro de facture..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
        >
          <option value="">Tous les statuts</option>
          <option value="completed">Complété</option>
          <option value="pending">En attente</option>
          <option value="failed">Échoué</option>
          <option value="refunded">Remboursé</option>
        </select>
        {onAdd && (
          <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Paiement
          </Button>
        )}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facture</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                      Aucun paiement trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map(payment => (
                    <TableRow key={payment.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {payment.invoiceNumber}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {payment.clientName}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {formatCurrency(payment.amount)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {getPaymentMethodLabel(payment.method)}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getPaymentStatusColor(payment.status)} border`}>
                          {getPaymentStatusLabel(payment.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <div>{payment.paidDate.toLocaleDateString('fr-FR')}</div>
                        <div className="text-xs text-gray-500">Échéance: {payment.dueDate.toLocaleDateString('fr-FR')}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger reçu
                            </DropdownMenuItem>
                            {payment.status === 'failed' && onRetry && (
                              <DropdownMenuItem onClick={() => onRetry(payment)}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Réessayer
                              </DropdownMenuItem>
                            )}
                            {payment.status === 'completed' && onRefund && (
                              <DropdownMenuItem
                                onClick={() => onRefund(payment)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Rembourser
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
