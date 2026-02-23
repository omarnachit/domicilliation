'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StaffTable } from "@/components/admin/StaffTable";
import { Users, CheckCircle2, Circle, Shield } from "lucide-react";
import { JSX } from "react";
import { Staff } from "@/lib/staff-data";

export default function StaffPage(): JSX.Element {
  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: '1',
      firstName: 'Ahmed',
      lastName: 'Bennani',
      email: 'ahmed@domiciliation.com',
      phone: '+212612345678',
      role: 'admin',
      isActive: true,
      hireDate: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      firstName: 'Fatima',
      lastName: 'Alaoui',
      email: 'fatima@domiciliation.com',
      phone: '+212712345678',
      role: 'receptionist',
      isActive: true,
      hireDate: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
    {
      id: '3',
      firstName: 'Mohammed',
      lastName: 'Hassan',
      email: 'mohammed@domiciliation.com',
      phone: '+212812345678',
      role: 'accountant',
      isActive: true,
      hireDate: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
    },
  ]);

  const handleAddStaff = (staff: Staff) => {
    setStaffList([...staffList, staff]);
  };

  const handleUpdateStaff = (updatedStaff: Staff) => {
    setStaffList(staffList.map(s => (s.id === updatedStaff.id ? updatedStaff : s)));
  };

  const handleDeleteStaff = (id: string) => {
    setStaffList(staffList.filter(s => s.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setStaffList(
      staffList.map(s =>
        s.id === id
          ? { ...s, isActive: !s.isActive, updatedAt: new Date() }
          : s
      )
    );
  };

  // Stats
  const totalStaff = staffList.length;
  const activeStaff = staffList.filter(s => s.isActive).length;
  const inactiveStaff = staffList.filter(s => !s.isActive).length;
  const admins = staffList.filter(s => s.role === 'admin').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-zinc-900">Gestion du Personnel</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Total Personnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{totalStaff}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeStaff}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 flex items-center gap-2">
              <Circle className="h-4 w-4 text-zinc-400" />
              Inactifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-500">{inactiveStaff}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-600" />
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{admins}</div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Table */}
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardContent className="pt-6">
          <StaffTable
            staff={staffList}
            onAddStaff={handleAddStaff}
            onUpdateStaff={handleUpdateStaff}
            onDeleteStaff={handleDeleteStaff}
            onToggleActive={handleToggleActive}
          />
        </CardContent>
      </Card>
    </div>
  );
}
