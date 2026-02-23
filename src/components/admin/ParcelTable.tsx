'use client';

import { useState } from 'react';
import { Parcel, parcelStatusOptions, carriers, ParcelStatus } from '@/lib/parcel-data';
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
import { Trash2, Eye, Edit2, Upload } from 'lucide-react';

interface ParcelTableProps {
  parcels: Parcel[];
  onAddParcel: (parcel: Parcel) => void;
}

export function ParcelTable({ parcels, onAddParcel }: ParcelTableProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    carrier: '',
    trackingNumber: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    status: 'received' as ParcelStatus,
    clientName: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      !formData.carrier ||
      !formData.trackingNumber ||
      !formData.weight ||
      !formData.length ||
      !formData.width ||
      !formData.height ||
      !formData.clientName
    ) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const newParcel: Parcel = {
      id: Date.now().toString(),
      carrier: formData.carrier,
      trackingNumber: formData.trackingNumber,
      weight: parseFloat(formData.weight),
      length: parseFloat(formData.length),
      width: parseFloat(formData.width),
      height: parseFloat(formData.height),
      status: formData.status,
      clientName: formData.clientName,
      imageUrl: imagePreview || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onAddParcel(newParcel);

    // Reset form
    setFormData({
      carrier: '',
      trackingNumber: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      status: 'received',
      clientName: '',
    });
    setImagePreview(null);
    setShowForm(false);
  };

  const getStatusColor = (status: ParcelStatus) => {
    return parcelStatusOptions.find((opt) => opt.value === status)?.color || '';
  };

  const getStatusLabel = (status: ParcelStatus) => {
    return parcelStatusOptions.find((opt) => opt.value === status)?.label || status;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {/* Add Parcel Button */}
      <Button
        onClick={() => setShowForm(!showForm)}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        {showForm ? 'Annuler' : '+ Nouveau colis'}
      </Button>

      {/* Form Section */}
      {showForm && (
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-zinc-900">Ajouter un Nouveau Colis</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Client Name */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Nom du Client *
                  </label>
                  <Input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Nom du client"
                    required
                  />
                </div>

                {/* Carrier */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Transporteur *
                  </label>
                  <select
                    name="carrier"
                    value={formData.carrier}
                    onChange={handleInputChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    required
                  >
                    <option value="">Sélectionner un transporteur</option>
                    {carriers.map((carrier) => (
                      <option key={carrier} value={carrier}>
                        {carrier}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tracking Number */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Numéro de Suivi *
                  </label>
                  <Input
                    type="text"
                    name="trackingNumber"
                    value={formData.trackingNumber}
                    onChange={handleInputChange}
                    placeholder="Ex: 1234567890"
                    required
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Poids (kg) *
                  </label>
                  <Input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>

                {/* Dimensions */}
                <div className="md:col-span-2 grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Longueur (cm) *
                    </label>
                    <Input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Largeur (cm) *
                    </label>
                    <Input
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Hauteur (cm) *
                    </label>
                    <Input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Statut
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    {parcelStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Photo du Colis
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="flex-1"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-16 w-16 rounded-lg object-cover border border-zinc-200"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Enregistrer le Colis
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Parcels List */}
      <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
        {parcels.length > 0 ? (
          <Table>
            <TableHeader className="bg-zinc-50">
              <TableRow className="border-zinc-200 hover:bg-zinc-50">
                <TableHead className="h-10 text-zinc-700">Client</TableHead>
                <TableHead className="h-10 text-zinc-700">Transporteur</TableHead>
                <TableHead className="h-10 text-zinc-700">Suivi</TableHead>
                <TableHead className="h-10 text-zinc-700">Poids</TableHead>
                <TableHead className="h-10 text-zinc-700">Dimensions</TableHead>
                <TableHead className="h-10 text-zinc-700">Statut</TableHead>
                <TableHead className="h-10 text-zinc-700">Reçu le</TableHead>
                <TableHead className="h-10 text-zinc-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parcels.map((parcel) => (
                <TableRow
                  key={parcel.id}
                  className="border-zinc-200 hover:bg-zinc-50 transition-colors"
                >
                  <TableCell className="text-sm font-medium text-zinc-900">
                    {parcel.clientName}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-700">
                    {parcel.carrier}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-700 font-mono">
                    {parcel.trackingNumber}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-700">
                    {parcel.weight} kg
                  </TableCell>
                  <TableCell className="text-sm text-zinc-600">
                    {parcel.length} × {parcel.width} × {parcel.height} cm
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(parcel.status)}
                    >
                      {getStatusLabel(parcel.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-600">
                    {formatDate(parcel.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {parcel.imageUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title="Voir la photo"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        title="Modifier"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-8 text-center text-zinc-500">
            Aucun colis enregistré. Cliquez sur "Nouveau colis" pour en ajouter un.
          </div>
        )}
      </div>
    </div>
  );
}
