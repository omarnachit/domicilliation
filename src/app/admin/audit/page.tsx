'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditTable } from "@/components/admin/AuditTable";
import { Clock, Activity, LogIn, BarChart3 } from "lucide-react";
import { JSX } from "react";
import { sampleAuditLogs, AuditLog } from "@/lib/audit-data";

export default function AuditPage(): JSX.Element {
  const [logs] = useState<AuditLog[]>(sampleAuditLogs);

  const loginCount = logs.filter(l => l.action === 'login').length;
  const modificationCount = logs.filter(l => ['create', 'update', 'delete'].includes(l.action)).length;
  const uniqueUsers = Array.from(new Set(logs.map(l => l.userId))).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Journal d'Audit & Activité</h1>
        <p className="text-gray-600 mt-2">Suivi complet de toutes les actions dans le système</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Total Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{logs.length}</div>
            <p className="text-xs text-gray-500 mt-1">enregistrements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Connexions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{loginCount}</div>
            <p className="text-xs text-gray-500 mt-1">aujourd'hui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Modifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{modificationCount}</div>
            <p className="text-xs text-gray-500 mt-1">ajouts, édits, suppressions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Utilisateurs Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{uniqueUsers}</div>
            <p className="text-xs text-gray-500 mt-1">utilisateurs uniques</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Audit Table */}
      <AuditTable logs={logs} />
    </div>
  );
}
