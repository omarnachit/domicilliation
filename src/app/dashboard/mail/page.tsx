import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MailTable } from "@/components/dashboard/MailTable";
import { mockMails } from "@/lib/mail-data";
import { Mail, Archive, AlertCircle } from "lucide-react";
import { JSX } from "react";

export default function MailPage(): JSX.Element {
  const unreadCount = mockMails.filter((m) => m.status === "unread").length;
  const archivedCount = mockMails.filter((m) => m.status === "archived").length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Total Courriers
            </CardTitle>
            <Mail className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{mockMails.length}</div>
            <p className="text-xs text-zinc-500">Tous les courriers</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Non Lus
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{unreadCount}</div>
            <p className="text-xs text-zinc-500">En attente de lecture</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">
              Archivés
            </CardTitle>
            <Archive className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{archivedCount}</div>
            <p className="text-xs text-zinc-500">Courriers archivés</p>
          </CardContent>
        </Card>
      </div>

      {/* Mail Table */}
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-zinc-900">Gestion des Courriers</CardTitle>
        </CardHeader>
        <CardContent>
          <MailTable mails={mockMails} />
        </CardContent>
      </Card>
    </div>
  );
}
