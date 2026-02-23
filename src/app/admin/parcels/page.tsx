'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParcelTable } from "@/components/admin/ParcelTable";
import { Package } from "lucide-react";
import { JSX } from "react";
import { Parcel } from "@/lib/parcel-data";

export default function ParcelsPage(): JSX.Element {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Package className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-zinc-900">Gestion des Colis</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Colis Reçus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">0</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              En Attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">0</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Retirés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Réexpédiés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Parcels Table */}
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardContent className="pt-6">
          <ParcelTable
            parcels={[]}
            onAddParcel={(parcel) => {
              console.log("New parcel:", parcel);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
