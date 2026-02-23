import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { JSX } from "react";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}): Promise<JSX.Element> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="flex h-screen overflow-hidden bg-zinc-50">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8 shadow-sm">
                    <h1 className="text-lg font-semibold text-zinc-900">Espace Client</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-zinc-600">{user.email}</span>
                        <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                            {user.email?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
