'use client';

import { useMemo, useState } from 'react';
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
import { Download, Search } from 'lucide-react';

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

      const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;

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
        return 'Payee';
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

  const formatCurrencyForPdf = (amount: number) => {
    return `${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} MAD`;
  };

  const escapePdfText = (value: string) => {
    return value
      .normalize('NFKD')
      .replace(/[^\x20-\x7E]/g, '')
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  };

  const createPdfBlob = (lines: string[]) => {
    const startX = 50;
    const startY = 790;
    const lineHeight = 18;

    const textStream = [
      'BT',
      '/F1 12 Tf',
      `${startX} ${startY} Td`,
      ...lines.map((line, index) => {
        if (index === 0) {
          return `(${escapePdfText(line)}) Tj`;
        }

        return `0 -${lineHeight} Td (${escapePdfText(line)}) Tj`;
      }),
      'ET',
      '',
    ].join('\n');

    const streamLength = new TextEncoder().encode(textStream).length;

    const objects = [
      '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
      '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
      '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n',
      '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
      `5 0 obj\n<< /Length ${streamLength} >>\nstream\n${textStream}endstream\nendobj\n`,
    ];

    let pdf = '%PDF-1.4\n';
    const offsets: number[] = [0];

    for (const obj of objects) {
      offsets.push(pdf.length);
      pdf += obj;
    }

    const xrefStart = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += '0000000000 65535 f \n';

    for (let i = 1; i < offsets.length; i += 1) {
      pdf += `${offsets[i].toString().padStart(10, '0')} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

    return new Blob([pdf], { type: 'application/pdf' });
  };

  const generatePDF = (invoice: Invoice) => {
    const lines = [
      'FACTURE',
      '----------------------------------------',
      `Numero: ${invoice.invoiceNumber}`,
      `Date: ${formatDate(invoice.date)}`,
      `Echeance: ${formatDate(invoice.dueDate)}`,
      '',
      `Client: ${invoice.clientName}`,
      `Description: ${invoice.description}`,
      '',
      '----------------------------------------',
      `Montant HT: ${formatCurrencyForPdf(invoice.amount)}`,
      `TVA (20%): ${formatCurrencyForPdf(invoice.vat)}`,
      `Total TTC: ${formatCurrencyForPdf(invoice.total)}`,
      '----------------------------------------',
      `Statut: ${getStatusLabel(invoice.status)}`,
    ];

    const file = createPdfBlob(lines);
    const element = document.createElement('a');
    const url = URL.createObjectURL(file);

    element.href = url;
    element.download = `${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalVAT = filteredInvoices.reduce((sum, inv) => sum + inv.vat, 0);
  const totalTTC = filteredInvoices.reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          placeholder="Rechercher par numero, client ou description..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
                  ? 'Payees'
                  : status === 'pending'
                    ? 'En attente'
                    : 'En retard'}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div className="mb-1 text-xs font-medium text-zinc-600">Total HT</div>
          <div className="text-2xl font-bold text-zinc-900">{formatCurrency(totalAmount)}</div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-amber-50 p-4">
          <div className="mb-1 text-xs font-medium text-amber-700">TVA (20%)</div>
          <div className="text-2xl font-bold text-amber-900">{formatCurrency(totalVAT)}</div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-blue-50 p-4">
          <div className="mb-1 text-xs font-medium text-blue-700">Total TTC</div>
          <div className="text-2xl font-bold text-blue-900">{formatCurrency(totalTTC)}</div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div className="mb-1 text-xs font-medium text-zinc-600">Factures</div>
          <div className="text-2xl font-bold text-zinc-900">{filteredInvoices.length}</div>
        </div>
      </div>

      <div className="text-sm text-zinc-500">
        {filteredInvoices.length} facture{filteredInvoices.length !== 1 ? 's' : ''}
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow className="border-zinc-200 hover:bg-zinc-50">
              <TableHead className="h-10 text-zinc-700">Numero</TableHead>
              <TableHead className="h-10 text-zinc-700">Client</TableHead>
              <TableHead className="h-10 text-zinc-700">Date</TableHead>
              <TableHead className="h-10 text-zinc-700">Echeance</TableHead>
              <TableHead className="h-10 text-right text-zinc-700">Montant HT</TableHead>
              <TableHead className="h-10 text-right text-zinc-700">TVA</TableHead>
              <TableHead className="h-10 text-right text-zinc-700">Total TTC</TableHead>
              <TableHead className="h-10 text-zinc-700">Statut</TableHead>
              <TableHead className="h-10 text-zinc-700">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="border-zinc-200 transition-colors hover:bg-zinc-50">
                  <TableCell className="text-sm font-medium text-zinc-900">{invoice.invoiceNumber}</TableCell>
                  <TableCell className="text-sm text-zinc-900">{invoice.clientName}</TableCell>
                  <TableCell className="text-sm text-zinc-700">{formatDate(invoice.date)}</TableCell>
                  <TableCell className="text-sm text-zinc-700">{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell className="text-right text-sm font-medium text-zinc-900">{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell className="text-right text-sm font-medium text-amber-700">{formatCurrency(invoice.vat)}</TableCell>
                  <TableCell className="text-right text-sm font-bold text-blue-900">{formatCurrency(invoice.total)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(invoice.status)}`}>
                      {getStatusLabel(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generatePDF(invoice)}
                      className="h-8 w-8 p-0"
                      title="Telecharger PDF"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-zinc-50">
                <TableCell colSpan={9} className="py-8 text-center text-zinc-500">
                  Aucune facture trouvee selon vos filtres
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <div className="grid gap-4 text-sm md:grid-cols-3">
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
