'use client';

import { useState, useMemo } from 'react';
import { Invoice, PaymentStatus } from '@/lib/invoice-data';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, Download } from 'lucide-react';

interface InvoiceTableProps {
  invoices: Invoice[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus | 'all'>('all');

  const statuses: (PaymentStatus | 'all')[] = ['all', 'paid', 'pending', 'overdue'];

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        searchQuery === '' ||
        invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' || invoice.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, selectedStatus]);

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getStatusLabel = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'pending':
        return 'En attente';
      case 'overdue':
        return 'En retard';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);
  };

  const generatePDF = (invoice: Invoice) => {
    // Create a simple PDF content representation
    const content = `
FACTURE
========================================

Numéro: ${invoice.invoiceNumber}
Date: ${formatDate(invoice.date)}
Échéance: ${formatDate(invoice.dueDate)}

Client: ${invoice.clientName}
Description: ${invoice.description}

========================================
Montant HT:     ${formatCurrency(invoice.amount)}
TVA (20%):      ${formatCurrency(invoice.vat)}
========================================
TOTAL TTC:      ${formatCurrency(invoice.total)}
========================================

Statut: ${getStatusLabel(invoice.status)}
    `;

    // Create blob and download
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });;
    element.href = URL.createObjectURL(file);
    element.download = `${invoice.invoiceNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalVAT = filteredInvoices.reduce((sum, inv) => sum + inv.vat, 0);
  const totalTTC = filteredInvoices.reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          placeholder="Rechercher par numéro, client ou description..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <span className="text-sm font-medium text-zinc-600">Statut:</span>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className="text-xs"
            >
              {status === 'all'
                ? 'Tous'
                : status === 'paid'
                  ? 'Payées'
                  : status === 'pending'
                    ? 'En attente'
                    : 'En retard'}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div className="text-xs font-medium text-zinc-600 mb-1">Total HT</div>
          <div className="text-2xl font-bold text-zinc-900">
            {formatCurrency(totalAmount)}
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-amber-50 p-4">
          <div className="text-xs font-medium text-amber-700 mb-1">TVA (20%)</div>
          <div className="text-2xl font-bold text-amber-900">
            {formatCurrency(totalVAT)}
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-blue-50 p-4">
          <div className="text-xs font-medium text-blue-700 mb-1">Total TTC</div>
          <div className="text-2xl font-bold text-blue-900">
            {formatCurrency(totalTTC)}
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div className="text-xs font-medium text-zinc-600 mb-1">Factures</div>
          <div className="text-2xl font-bold text-zinc-900">
            {filteredInvoices.length}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-zinc-500">
        {filteredInvoices.length} facture{filteredInvoices.length !== 1 ? 's' : ''}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow className="border-zinc-200 hover:bg-zinc-50">
              <TableHead className="h-10 text-zinc-700">Numéro</TableHead>
              <TableHead className="h-10 text-zinc-700">Client</TableHead>
              <TableHead className="h-10 text-zinc-700">Date</TableHead>
              <TableHead className="h-10 text-zinc-700">Échéance</TableHead>
              <TableHead className="h-10 text-zinc-700 text-right">Montant HT</TableHead>
              <TableHead className="h-10 text-zinc-700 text-right">TVA</TableHead>
              <TableHead className="h-10 text-zinc-700 text-right">Total TTC</TableHead>
              <TableHead className="h-10 text-zinc-700">Statut</TableHead>
              <TableHead className="h-10 text-zinc-700">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="border-zinc-200 hover:bg-zinc-50 transition-colors"
                >
                  <TableCell className="text-sm font-medium text-zinc-900">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-900">
                    {invoice.clientName}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-700">
                    {formatDate(invoice.date)}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-700">
                    {formatDate(invoice.dueDate)}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-900 text-right font-medium">
                    {formatCurrency(invoice.amount)}
                  </TableCell>
                  <TableCell className="text-sm text-amber-700 text-right font-medium">
                    {formatCurrency(invoice.vat)}
                  </TableCell>
                  <TableCell className="text-sm text-blue-900 text-right font-bold">
                    {formatCurrency(invoice.total)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(invoice.status)}`}
                    >
                      {getStatusLabel(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generatePDF(invoice)}
                      className="h-8 w-8 p-0"
                      title="Télécharger PDF"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-zinc-50">
                <TableCell colSpan={9} className="py-8 text-center text-zinc-500">
                  Aucune facture trouvée according to your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary Footer */}
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <div>
            <span className="text-zinc-600">Total HT: </span>
            <span className="font-bold text-zinc-900">{formatCurrency(totalAmount)}</span>
          </div>
          <div>
            <span className="text-zinc-600">TVA (20%): </span>
            <span className="font-bold text-amber-900">{formatCurrency(totalVAT)}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total TTC: </span>
            <span className="font-bold text-blue-900">{formatCurrency(totalTTC)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
