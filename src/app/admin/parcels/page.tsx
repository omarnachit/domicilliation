'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParcelTable } from "@/components/admin/ParcelTable";
import { Package } from "lucide-react";
import { JSX } from "react";
import { Parcel } from "@/lib/parcel-data";
import { initialParcelsMock } from '@/data/parcels.mock';

export default function ParcelsPage(): JSX.Element {
  const [parcels, setParcels] = useState<Parcel[]>(initialParcelsMock);

  const stats = useMemo(() => {
    const received = parcels.filter((p) => p.status === 'received').length;
    const pending = parcels.filter((p) => p.status === 'pending').length;
    const withdrawn = parcels.filter((p) => p.status === 'withdrawn').length;
    const reshipped = parcels.filter((p) => p.status === 'reshipped').length;

    return { received, pending, withdrawn, reshipped };
  }, [parcels]);

  const handleAddParcel = (parcel: Parcel) => {
    setParcels((prev) => [parcel, ...prev]);
  };

  const handleMarkAsWithdrawn = (id: string) => {
    setParcels((prev) =>
      prev.map((parcel) =>
        parcel.id === id
          ? { ...parcel, status: 'withdrawn', updatedAt: new Date() }
          : parcel
      )
    );
  };

  const handleDeleteParcel = (id: string) => {
    setParcels((prev) => prev.filter((parcel) => parcel.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Package className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-zinc-900">Gestion des Colis</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Colis recus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.received}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              En attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Retires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.withdrawn}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Reexpedies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.reshipped}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardContent className="pt-6">
          <ParcelTable
            parcels={parcels}
            onAddParcel={handleAddParcel}
            onMarkAsWithdrawn={handleMarkAsWithdrawn}
            onDeleteParcel={handleDeleteParcel}
          />
        </CardContent>
      </Card>
    </div>
  );
}
