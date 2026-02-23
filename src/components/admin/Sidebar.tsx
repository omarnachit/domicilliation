"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Package, Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/login/actions";
import { JSX } from "react";

const navigation = [
    { name: "Vue Globale", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Clients", href: "/admin/clients", icon: Users },
    { name: "Personnel", href: "/admin/staff", icon: Users },
    { name: "Contrats", href: "/admin/contracts", icon: FileText },
    { name: "Colis", href: "/admin/parcels", icon: Package },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar(): JSX.Element {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-zinc-900 border-r border-zinc-800 text-white">
            <div className="flex h-16 items-center px-6 border-b border-zinc-800 bg-zinc-900">
                <span className="text-xl font-bold tracking-tight text-white">MARTECH <span className="text-indigo-500">ADMIN</span></span>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? "bg-indigo-600 text-white"
                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-zinc-400 group-hover:text-white"}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                <form action={signOut}>
                    <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-950/30">
                        <LogOut className="mr-2 h-4 w-4" />
                        Déconnexion
                    </Button>
                </form>
            </div>
        </div>
    );
}
