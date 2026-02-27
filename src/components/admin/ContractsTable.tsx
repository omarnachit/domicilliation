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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Contract, formatCurrency, getContractStatusColor, getContractStatusLabel, getContractTypeLabel, getDaysUntilExpiration } from '@/lib/contracts-data';
import { MoreHorizontal, Plus, Edit, Trash2, RefreshCw, Eye } from 'lucide-react';
import { JSX } from 'react';

interface ContractsTableProps {
  contracts: Contract[];
  onAdd?: () => void;
  onEdit?: (contract: Contract) => void;
  onRenew?: (contract: Contract) => void;
  onDelete?: (contract: Contract) => void;
}

export function ContractsTable({ contracts, onAdd, onEdit, onRenew, onDelete }: ContractsTableProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredContracts = contracts.filter(
    contract =>
      contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = filteredContracts.reduce((sum, c) => sum + c.monthlyAmount, 0);
  const activeContracts = filteredContracts.filter(c => c.status === 'active').length;
  const renewalNeeded = filteredContracts.filter(c => c.status === 'renewal' || c.status === 'expired').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Contrats Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{activeContracts}</div>
            <p className="text-xs text-gray-500 mt-1">sur {filteredContracts.length} contrats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">À Renouveler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{renewalNeeded}</div>
            <p className="text-xs text-gray-500 mt-1">nécessite action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Revenu Mensuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-gray-500 mt-1">total des contrats actifs</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add */}
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Rechercher par client ou numéro de contrat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        {onAdd && (
          <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Contrat
          </Button>
        )}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Contrats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                      Aucun contrat trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContracts.map(contract => (
                    <TableRow key={contract.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {contract.contractNumber}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {contract.clientName}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {getContractTypeLabel(contract.contractType)}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getContractStatusColor(contract.status)} border`}>
                          {getContractStatusLabel(contract.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <div>{contract.startDate.toLocaleDateString('fr-FR')}</div>
                        <div className="text-xs text-gray-500">{contract.endDate.toLocaleDateString('fr-FR')}</div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {formatCurrency(contract.monthlyAmount)}/mois
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onClick={() => setSelectedContract(contract)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir détails
                                </DropdownMenuItem>
                              </DialogTrigger>
                              {onEdit && (
                                <DropdownMenuItem onClick={() => onEdit(contract)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Éditer
                                </DropdownMenuItem>
                              )}
                              {onRenew && contract.status !== 'terminated' && (
                                <DropdownMenuItem onClick={() => onRenew(contract)}>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Renouveler
                                </DropdownMenuItem>
                              )}
                              {onDelete && (
                                <DropdownMenuItem
                                  onClick={() => onDelete(contract)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Supprimer
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </Dialog>

                        {selectedContract?.id === contract.id && (
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Détails du Contrat</DialogTitle>
                              <DialogDescription>
                                Informations complètes du contrat
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-600">Numéro</p>
                                  <p className="font-medium">{selectedContract.contractNumber}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Client</p>
                                  <p className="font-medium">{selectedContract.clientName}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Type</p>
                                  <p className="font-medium">{getContractTypeLabel(selectedContract.contractType)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Statut</p>
                                  <Badge className={`${getContractStatusColor(selectedContract.status)} border`}>
                                    {getContractStatusLabel(selectedContract.status)}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Montant Mensuel</p>
                                  <p className="font-medium">{formatCurrency(selectedContract.monthlyAmount)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Montant Total</p>
                                  <p className="font-medium">{formatCurrency(selectedContract.totalAmount)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Date Début</p>
                                  <p className="font-medium">{selectedContract.startDate.toLocaleDateString('fr-FR')}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Date Fin</p>
                                  <p className="font-medium">{selectedContract.endDate.toLocaleDateString('fr-FR')}</p>
                                  {getDaysUntilExpiration(selectedContract.endDate) > 0 && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      {getDaysUntilExpiration(selectedContract.endDate)} jours restants
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-2">Description</p>
                                <p className="text-gray-700">{selectedContract.description}</p>
                              </div>
                            </div>
                          </DialogContent>
                        )}
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