import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { JSX } from "react";

export default async function AdminLayout({
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

    // Optional: Check if admin role here again for security

    return (
        <div className="flex h-screen overflow-hidden bg-zinc-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8 shadow-sm">
                    <h1 className="text-lg font-semibold text-zinc-900">Administration Système</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-zinc-600 font-medium">Administrateur</span>
                        <div className="h-9 w-9 rounded-full bg-indigo-900 flex items-center justify-center text-white font-bold border border-indigo-700">
                            A
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
