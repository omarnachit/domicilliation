'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuditLog, getActionLabel, getResourceLabel, getActionColor, sampleAuditLogs } from '@/lib/audit-data';
import { Filter, Clock } from 'lucide-react';
import { JSX } from 'react';

interface AuditTableProps {
  logs: AuditLog[];
}

export function AuditTable({ logs }: AuditTableProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('');

  const filteredLogs = logs.filter(log =>
    (log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resourceName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterAction || log.action === filterAction)
  );

  const sortedLogs = [...filteredLogs].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}j`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Rechercher par utilisateur ou ressource..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
        >
          <option value="">Toutes les actions</option>
          <option value="create">Créer</option>
          <option value="update">Modifier</option>
          <option value="delete">Supprimer</option>
          <option value="login">Connexion</option>
          <option value="logout">Déconnexion</option>
          <option value="view">Consulter</option>
          <option value="export">Exporter</option>
          <option value="import">Importer</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{filteredLogs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Dernier Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-gray-900">
              {sortedLogs[0]?.userName || 'N/A'}
            </div>
            <p className="text-xs text-gray-500">{sortedLogs[0] ? formatTime(sortedLogs[0].timestamp) : '-'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Utilisateurs Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {Array.from(new Set(filteredLogs.map(l => l.userId))).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Journal d'Audit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date/Heure</TableHead>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Ressource</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                      Aucun log trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedLogs.map(log => (
                    <TableRow key={log.id} className="hover:bg-gray-50">
                      <TableCell className="text-sm text-gray-600 whitespace-nowrap">
                        <div>{log.timestamp.toLocaleDateString('fr-FR')}</div>
                        <div className="text-xs text-gray-500">{log.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {log.userName}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getActionColor(log.action)} border`}>
                          {getActionLabel(log.action)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <div className="text-sm font-medium">{getResourceLabel(log.resourceType)}</div>
                        <div className="text-xs text-gray-500">{log.resourceName}</div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {log.description}
                      </TableCell>
                      <TableCell className="text-xs text-gray-500 font-mono">
                        {log.ipAddress}
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
