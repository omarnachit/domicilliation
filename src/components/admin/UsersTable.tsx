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
import { User, getRoleLabel, getRoleColor, getStatusLabel, getStatusColor } from '@/lib/users-data';
import { MoreHorizontal, Plus, Edit, Trash2, Eye, Lock, Unlock } from 'lucide-react';
import { JSX } from 'react';

interface UsersTableProps {
  users: User[];
  onAdd?: () => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onSuspend?: (user: User) => void;
  onReactivate?: (user: User) => void;
}

export function UsersTable({ users, onAdd, onEdit, onDelete, onSuspend, onReactivate }: UsersTableProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredUsers = users.filter(
    user =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterRole || user.role === filterRole)
  );

  const activeUsers = filteredUsers.filter(u => u.status === 'active').length;
  const adminCount = filteredUsers.filter(u => u.role === 'admin').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{filteredUsers.length}</div>
            <p className="text-xs text-gray-500 mt-1">dans le système</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            <p className="text-xs text-gray-500 mt-1">connectés récemment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Administrateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{adminCount}</div>
            <p className="text-xs text-gray-500 mt-1">comptes admin</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Rechercher par nom ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
        >
          <option value="">Tous les rôles</option>
          <option value="admin">Administrateur</option>
          <option value="manager">Gestionnaire</option>
          <option value="staff">Personnel</option>
          <option value="accountant">Comptable</option>
        </select>
        {onAdd && (
          <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel Utilisateur
          </Button>
        )}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière Connexion</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                      Aucun utilisateur trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map(user => (
                    <TableRow key={user.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getRoleColor(user.role)} border`}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {user.department}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(user.status)} border`}>
                          {getStatusLabel(user.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {user.lastLogin ? user.lastLogin.toLocaleDateString('fr-FR') : 'Jamais'}
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
                                  onClick={() => setSelectedUser(user)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir détails
                                </DropdownMenuItem>
                              </DialogTrigger>
                              {onEdit && (
                                <DropdownMenuItem onClick={() => onEdit(user)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Éditer
                                </DropdownMenuItem>
                              )}
                              {onSuspend && user.status === 'active' && (
                                <DropdownMenuItem
                                  onClick={() => onSuspend(user)}
                                  className="text-yellow-600 focus:text-yellow-600"
                                >
                                  <Lock className="mr-2 h-4 w-4" />
                                  Suspendre
                                </DropdownMenuItem>
                              )}
                              {onReactivate && user.status === 'suspended' && (
                                <DropdownMenuItem onClick={() => onReactivate(user)}>
                                  <Unlock className="mr-2 h-4 w-4" />
                                  Réactiver
                                </DropdownMenuItem>
                              )}
                              {onDelete && (
                                <DropdownMenuItem
                                  onClick={() => onDelete(user)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Supprimer
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </Dialog>

                        {selectedUser?.id === user.id && (
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Détails de l'Utilisateur</DialogTitle>
                              <DialogDescription>
                                Informations complètes du compte utilisateur
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-600">Nom</p>
                                  <p className="font-medium">{selectedUser.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Email</p>
                                  <p className="font-medium">{selectedUser.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Rôle</p>
                                  <Badge className={`${getRoleColor(selectedUser.role)} border`}>
                                    {getRoleLabel(selectedUser.role)}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Statut</p>
                                  <Badge className={`${getStatusColor(selectedUser.status)} border`}>
                                    {getStatusLabel(selectedUser.status)}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Département</p>
                                  <p className="font-medium">{selectedUser.department}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Date d'Adhésion</p>
                                  <p className="font-medium">{selectedUser.joinDate.toLocaleDateString('fr-FR')}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-2">Permissions</p>
                                <div className="space-y-1">
                                  {selectedUser.permissions.length === 0 ? (
                                    <p className="text-xs text-gray-500">Aucune permission assignée</p>
                                  ) : (
                                    selectedUser.permissions.map(perm => (
                                      <div key={perm} className="text-xs bg-gray-100 px-2 py-1 rounded inline-block mr-1">
                                        {perm}
                                      </div>
                                    ))
                                  )}
                                </div>
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
