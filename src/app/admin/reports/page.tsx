'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { sampleMetrics, sampleReports, formatCurrency, reportTypeLabels } from "@/lib/reports-data";
import { Download, TrendingUp, Users, FileText, DollarSign } from "lucide-react";
import { JSX } from "react";

type ReportTab = 'revenue' | 'clients' | 'contracts' | 'summary';
type ReportPeriod = 'week' | 'month' | 'quarter' | 'year';

const periodLabels: Record<ReportPeriod, string> = {
  week: 'Cette semaine',
  month: 'Ce mois',
  quarter: 'Ce trimestre',
  year: 'Cette annee',
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export default function ReportsPage(): JSX.Element {
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>('month');
  const [selectedReport, setSelectedReport] = useState<ReportTab>('revenue');

  const revenueData = [
    { month: 'Janvier', revenue: 12000, target: 15000 },
    { month: 'Fevrier', revenue: 13800, target: 15000 },
    { month: 'Mars', revenue: 11500, target: 15000 },
    { month: 'Avril', revenue: 14200, target: 15000 },
  ];

  const clientsData = [
    { name: 'Active', value: 4, fill: '#10b981' },
    { name: 'Trial', value: 1, fill: '#f59e0b' },
  ];

  const contractsData = [
    { month: 'Janvier', active: 5, pending: 1, renewal: 0 },
    { month: 'Fevrier', active: 3, pending: 1, renewal: 1 },
    { month: 'Mars', active: 4, pending: 1, renewal: 0 },
  ];

  const exportAsPdf = () => {
    const reportLabel =
      selectedReport === 'summary'
        ? 'Resume global'
        : reportTypeLabels[selectedReport];

    const reportMeta = sampleReports.find((report) => report.type === selectedReport);
    const generatedAt = new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date());

    const reportHtml = `
      <!doctype html>
      <html lang="fr">
        <head>
          <meta charset="utf-8" />
          <title>${escapeHtml(reportLabel)} - ${escapeHtml(periodLabels[selectedPeriod])}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 32px; color: #111827; }
            h1 { margin: 0 0 8px; font-size: 24px; }
            .muted { color: #6b7280; font-size: 12px; }
            .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 20px; }
            .card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; }
            .label { font-size: 12px; color: #6b7280; margin-bottom: 6px; }
            .value { font-size: 18px; font-weight: 700; }
            .section { margin-top: 24px; }
            .section h2 { font-size: 16px; margin: 0 0 10px; }
            ul { margin: 0; padding-left: 20px; }
            li { margin-bottom: 6px; }
          </style>
        </head>
        <body>
          <h1>Rapport Admin</h1>
          <p class="muted">Type: ${escapeHtml(reportLabel)}</p>
          <p class="muted">Periode: ${escapeHtml(periodLabels[selectedPeriod])}</p>
          <p class="muted">Genere le: ${escapeHtml(generatedAt)}</p>

          <div class="grid">
            <div class="card">
              <div class="label">Revenu total</div>
              <div class="value">${escapeHtml(formatCurrency(sampleMetrics.totalRevenue))}</div>
            </div>
            <div class="card">
              <div class="label">Paiements recus</div>
              <div class="value">${escapeHtml(formatCurrency(sampleMetrics.totalPayments))}</div>
            </div>
            <div class="card">
              <div class="label">Clients actifs</div>
              <div class="value">${sampleMetrics.activeClients}</div>
            </div>
            <div class="card">
              <div class="label">Contrats a renouveler</div>
              <div class="value">${sampleMetrics.contractsRenewalNeeded}</div>
            </div>
          </div>

          <div class="section">
            <h2>Description</h2>
            <p>${escapeHtml(reportMeta?.description ?? 'Resume consolide des indicateurs principaux.')}</p>
          </div>

          <div class="section">
            <h2>Observations cles</h2>
            <ul>
              <li>Taux de completion des paiements: 80%</li>
              <li>2 contrats expirent dans 30 jours</li>
              <li>Valeur moyenne par contrat: ${escapeHtml(formatCurrency(sampleMetrics.averageContractValue))}</li>
            </ul>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'noopener,noreferrer');

    if (!printWindow) {
      alert('Impossible d ouvrir la fenetre d export PDF. Verifiez le bloqueur de pop-up.');
      return;
    }

    printWindow.document.open();
    printWindow.document.write(reportHtml);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    if (format === 'pdf') {
      exportAsPdf();
      return;
    }

    alert(`Export en ${format.toUpperCase()} - fonctionnalite en attente`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapports et Statistiques</h1>
          <p className="mt-2 text-gray-600">Analysez les performances et les donnees de votre entreprise</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="report-period" className="text-sm text-gray-600">Periode</label>
          <select
            id="report-period"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as ReportPeriod)}
            className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette annee</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <DollarSign className="h-4 w-4" />
              Revenu Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(sampleMetrics.totalRevenue)}</div>
            <p className="mt-1 text-xs text-gray-500">Fevrier 2026</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Users className="h-4 w-4" />
              Clients Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{sampleMetrics.activeClients}/5</div>
            <p className="mt-1 text-xs text-gray-500">taux de 80%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <TrendingUp className="h-4 w-4" />
              Valeur Contrat Moyenne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(sampleMetrics.averageContractValue)}</div>
            <p className="mt-1 text-xs text-gray-500">par contrat</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedReport} onValueChange={(value) => setSelectedReport(value as ReportTab)} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 rounded-lg border border-gray-200 bg-white p-1">
          <TabsTrigger value="revenue">Revenu</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="contracts">Contrats</TabsTrigger>
          <TabsTrigger value="summary">Resume</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Graphique des Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenu Reel" />
                  <Bar dataKey="target" fill="#e5e7eb" name="Objectif" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repartition par Type de Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Domiciliation</span>
                  <span className="font-bold">{formatCurrency(9000)}</span>
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div className="h-2 w-[65%] rounded-full bg-blue-600"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Adresse Virtuelle</span>
                  <span className="font-bold">{formatCurrency(2500)}</span>
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div className="h-2 w-[18%] rounded-full bg-green-600"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Services Complementaires</span>
                  <span className="font-bold">{formatCurrency(1500)}</span>
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div className="h-2 w-[11%] rounded-full bg-purple-600"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Service Postal</span>
                  <span className="font-bold">{formatCurrency(800)}</span>
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div className="h-2 w-[6%] rounded-full bg-orange-600"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution des Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={clientsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {clientsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Details des Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div>
                    <p className="font-medium">Clients Actifs</p>
                    <p className="text-sm text-gray-600">En contrat actif</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{sampleMetrics.activeClients}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div>
                    <p className="font-medium">Clients en Essai</p>
                    <p className="text-sm text-gray-600">Periode d essai</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div>
                    <p className="font-medium">Clients Potentiels</p>
                    <p className="text-sm text-gray-600">A contacter</p>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolution des Contrats</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={contractsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="active" stroke="#10b981" name="Actifs" />
                  <Line type="monotone" dataKey="pending" stroke="#f59e0b" name="En Attente" />
                  <Line type="monotone" dataKey="renewal" stroke="#ef4444" name="A Renouveler" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resume du Rapport - Fevrier 2026</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-600">Revenus Generes</p>
                  <p className="text-2xl font-bold text-blue-900">{formatCurrency(sampleMetrics.totalRevenue)}</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-600">Paiements recus</p>
                  <p className="text-2xl font-bold text-green-900">{formatCurrency(sampleMetrics.totalPayments)}</p>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <p className="text-sm font-medium text-purple-600">Contrats Actifs</p>
                  <p className="text-2xl font-bold text-purple-900">3</p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <p className="text-sm font-medium text-orange-600">A Renouveler</p>
                  <p className="text-2xl font-bold text-orange-900">{sampleMetrics.contractsRenewalNeeded}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="mb-3 text-sm font-medium text-gray-700">Observations Cles:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-green-600">OK</span>
                    <span>Taux de completion des paiements: 80%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-600">ALERT</span>
                    <span>2 contrats expirant dans 30 jours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">INFO</span>
                    <span>Revenu moyen par contrat: {formatCurrency(sampleMetrics.averageContractValue)}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Options d Export</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={() => handleExport('pdf')} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter en PDF
          </Button>
          <Button onClick={() => handleExport('csv')} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter en CSV
          </Button>
          <Button onClick={() => handleExport('excel')} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter en Excel
          </Button>
          <Button onClick={handlePrint} variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
