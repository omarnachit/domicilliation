'use client';

import { useState, useMemo } from 'react';
import { Client, statusOptions, packOptions, getStatusColor, getStatusLabel, getPackLabel, formatCurrency, isExpiringSoon, isExpired } from '@/lib/clients-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Eye, Pause, AlertCircle, Search, Filter, X } from 'lucide-react';

interface ClientTableProps {
  clients: Client[];
  onViewClient: (client: Client) => void;
  onSuspendClient: (id: string) => void;
  onDeleteClient: (id: string) => void;
}

export function ClientsTable({
  clients,
  onViewClient,
  onSuspendClient,
  onDeleteClient,
}: ClientTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPack, setFilterPack] = useState<string>('all');

  // Filter and search logic
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      // Search filter
      const searchMatch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const statusMatch = filterStatus === 'all' || client.status === filterStatus;

      // Pack filter
      const packMatch = filterPack === 'all' || client.subscriptionPack === filterPack;

      return searchMatch && statusMatch && packMatch;
    });
  }, [clients, searchTerm, filterStatus, filterPack]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterPack('all');
  };

  const hasActiveFilters = searchTerm || filterStatus !== 'all' || filterPack !== 'all';

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex gap-4 flex-col md:flex-row md:items-end">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Rechercher par nom, email ou entreprise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          <Filter className="h-4 w-4 text-zinc-500 mt-0.5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 rounded-md border border-zinc-200 px-3 text-sm bg-white text-zinc-900"
          >
            <option value="all">Tous les statuts</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Pack Filter */}
        <div>
          <select
            value={filterPack}
            onChange={(e) => setFilterPack(e.target.value)}
            className="h-9 rounded-md border border-zinc-200 px-3 text-sm bg-white text-zinc-900"
          >
            <option value="all">Tous les packs</option>
            {packOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            onClick={handleClearFilters}
            className="h-9 px-3 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200 gap-1"
          >
            <X className="h-4 w-4" />
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Results count */}
      <div className="text-sm text-zinc-600">
        {filteredClients.length} client{filteredClients.length > 1 ? 's' : ''} trouvé{filteredClients.length > 1 ? 's' : ''}
        {hasActiveFilters && ' (filtré)'}
      </div>

      {/* Table */}
      <div className="border border-zinc-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow className="border-b border-zinc-200">
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Nom du Client
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Email
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Entreprise
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Pack
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Statut
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Expiration
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700 text-right">
                Revenu Mensuel
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-12 text-center text-sm text-zinc-500"
                >
                  {clients.length === 0 ? 'Aucun client' : 'Aucun client ne correspond aux critères de recherche'}
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => {
                const isExpiring = isExpiringSoon(client.expirationDate);
                const hasExpired = isExpired(client.expirationDate);
                const daysUntilExpiration = Math.floor(
                  (client.expirationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <TableRow
                    key={client.id}
                    className="border-b border-zinc-200 hover:bg-zinc-50 transition-colors"
                  >
                    <TableCell className="h-12 px-4 text-sm">
                      <div className="font-medium text-zinc-900">{client.name}</div>
                      <div className="text-xs text-zinc-500">
                        Depuis {new Date(client.joinDate).toLocaleDateString('fr-FR')}
                      </div>
                    </TableCell>
                    <TableCell className="h-12 px-4 text-sm text-zinc-700">
                      {client.email}
                    </TableCell>
                    <TableCell className="h-12 px-4 text-sm text-zinc-700">
                      {client.company}
                    </TableCell>
                    <TableCell className="h-12 px-4">
                      <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-medium">
                        {getPackLabel(client.subscriptionPack)}
                      </Badge>
                    </TableCell>
                    <TableCell className="h-12 px-4">
                      <Badge
                        className={`${getStatusColor(
                          client.status
                        )} border text-xs font-medium`}
                      >
                        {getStatusLabel(client.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="h-12 px-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          <div className={`font-medium ${
                            hasExpired ? 'text-red-700' : isExpiring ? 'text-amber-700' : 'text-zinc-900'
                          }`}>
                            {client.expirationDate.toLocaleDateString('fr-FR')}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {hasExpired ? (
                              <span className="text-red-600">Expiré</span>
                            ) : isExpiring ? (
                              <span className="text-amber-600">{daysUntilExpiration} jours</span>
                            ) : (
                              <span>{daysUntilExpiration} jours</span>
                            )}
                          </div>
                        </div>
                        {isExpiring && !hasExpired && (
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                        )}
                        {hasExpired && (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="h-12 px-4 text-right">
                      <div className="font-semibold text-zinc-900">
                        {formatCurrency(client.monthlyRevenue)}
                      </div>
                    </TableCell>
                    <TableCell className="h-12 px-4">
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => onViewClient(client)}
                          className="p-1 text-zinc-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                client.status === 'suspended'
                                  ? 'Êtes-vous sûr de vouloir réactiver ce client ?'
                                  : 'Êtes-vous sûr de vouloir suspendre ce client ?'
                              )
                            ) {
                              onSuspendClient(client.id);
                            }
                          }}
                          className="p-1 text-zinc-600 hover:bg-amber-50 hover:text-amber-600 rounded transition-colors"
                          title={client.status === 'suspended' ? 'Réactiver' : 'Suspendre'}
                        >
                          <Pause className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                'Êtes-vous sûr de vouloir supprimer ce client et toutes ses données ?'
                              )
                            ) {
                              onDeleteClient(client.id);
                            }
                          }}
                          className="p-1 text-zinc-600 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
