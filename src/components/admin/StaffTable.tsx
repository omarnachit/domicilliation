'use client';

import { useState } from 'react';
import { Staff, staffRoleOptions, getRoleColor, StaffRole } from '@/lib/staff-data';
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
import { Trash2, Edit2, CheckCircle2, Circle, Plus, X } from 'lucide-react';

interface StaffTableProps {
  staff: Staff[];
  onAddStaff: (staff: Staff) => void;
  onUpdateStaff: (staff: Staff) => void;
  onDeleteStaff: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export function StaffTable({
  staff,
  onAddStaff,
  onUpdateStaff,
  onDeleteStaff,
  onToggleActive,
}: StaffTableProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'receptionist' as StaffRole,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.role
    ) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (editingId) {
      // Update
      const updatedStaff = staff.find(s => s.id === editingId);
      if (updatedStaff) {
        onUpdateStaff({
          ...updatedStaff,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          updatedAt: new Date(),
        });
      }
    } else {
      // Create
      const newStaff: Staff = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        isActive: true,
        hireDate: new Date(),
        updatedAt: new Date(),
      };
      onAddStaff(newStaff);
    }

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'receptionist',
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (s: Staff) => {
    setFormData({
      firstName: s.firstName,
      lastName: s.lastName,
      email: s.email,
      phone: s.phone,
      role: s.role,
    });
    setEditingId(s.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'receptionist',
    });
  };

  return (
    <div className="space-y-4">
      {/* Add/Edit Form */}
      {showForm && (
        <Card className="bg-zinc-50 border-zinc-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                {editingId ? 'Modifier le personnel' : 'Ajouter un nouveau personnel'}
              </CardTitle>
              <button onClick={handleCancel}>
                <X className="h-4 w-4 text-zinc-500 hover:text-zinc-700" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-zinc-700 block mb-1">
                    Prénom
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="ex: Jean"
                    className="h-8"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-zinc-700 block mb-1">
                    Nom
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="ex: Dupont"
                    className="h-8"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-zinc-700 block mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ex: jean@example.com"
                    className="h-8"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-zinc-700 block mb-1">
                    Téléphone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="ex: +212612345678"
                    className="h-8"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-zinc-700 block mb-1">
                    Rôle
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full h-8 rounded-md border border-zinc-200 px-2 text-sm bg-white text-zinc-900"
                  >
                    {staffRoleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="h-8 px-3 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="h-8 px-3 bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {editingId ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Button */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="h-9 px-4 bg-indigo-600 text-white hover:bg-indigo-700 gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter un personnel
        </Button>
      )}

      {/* Table */}
      <div className="border border-zinc-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow className="border-b border-zinc-200">
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Nom
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Email
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Téléphone
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Rôle
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Status
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold text-zinc-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-12 text-center text-sm text-zinc-500"
                >
                  Aucun personnel trouvé
                </TableCell>
              </TableRow>
            ) : (
              staff.map((s) => (
                <TableRow
                  key={s.id}
                  className="border-b border-zinc-200 hover:bg-zinc-50 transition-colors"
                >
                  <TableCell className="h-12 px-4 text-sm">
                    <div className="font-medium text-zinc-900">
                      {s.firstName} {s.lastName}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {new Date(s.hireDate).toLocaleDateString('fr-FR')}
                    </div>
                  </TableCell>
                  <TableCell className="h-12 px-4 text-sm text-zinc-700">
                    {s.email}
                  </TableCell>
                  <TableCell className="h-12 px-4 text-sm text-zinc-700">
                    {s.phone}
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    <Badge
                      className={`${getRoleColor(
                        s.role
                      )} border text-xs font-medium`}
                    >
                      {staffRoleOptions.find(r => r.value === s.role)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    <button
                      onClick={() => onToggleActive(s.id)}
                      className="flex items-center gap-1 text-xs font-medium transition-colors"
                    >
                      {s.isActive ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-green-700">Actif</span>
                        </>
                      ) : (
                        <>
                          <Circle className="h-4 w-4 text-zinc-400" />
                          <span className="text-zinc-600">Inactif</span>
                        </>
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => handleEdit(s)}
                        className="p-1 text-zinc-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              'Êtes-vous sûr de vouloir supprimer ce personnel ?'
                            )
                          ) {
                            onDeleteStaff(s.id);
                          }
                        }}
                        className="p-1 text-zinc-600 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
