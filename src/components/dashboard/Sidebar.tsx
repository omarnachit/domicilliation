"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Mail,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Rocket,
  BarChart3,
  CalendarClock,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/login/actions";
import { JSX } from "react";

const navigation = [
  { name: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
  { name: "Ma Société", href: "/dashboard/company", icon: Building2 },
  { name: "Contrats", href: "/dashboard/contracts", icon: FileText },
  { name: "Courrier", href: "/dashboard/mail", icon: Mail },
  { name: "Planning", href: "/dashboard/planning", icon: CalendarClock },
  { name: "Facturation", href: "/dashboard/billing", icon: CreditCard },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Upgrade Pack", href: "/dashboard/upgrade", icon: Rocket },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-zinc-200">
      <div className="flex h-16 items-center px-6 border-b border-zinc-200 bg-zinc-50/50">
        <span className="text-xl font-bold text-zinc-900 tracking-tight">Domiciliation.ma</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-500"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-zinc-200 bg-zinc-50/30">
        <form action={signOut}>
          <Button variant="ghost" className="w-full justify-start text-zinc-600 hover:text-red-600 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </form>
      </div>
    </div>
  );
}
