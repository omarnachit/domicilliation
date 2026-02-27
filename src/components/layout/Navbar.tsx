"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JSX } from "react";

export function Navbar(): JSX.Element {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-xl">D</span>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-zinc-900">Domiciliation.ma</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/services-complementaires" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                        Services Complementaires
                    </Link>
                    <Link href="/packs" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                        Nos Packs
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                        Contact
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                        Tarifs
                    </Link>
                    <Link href="/loi-89-17" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                        Loi 89-17
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors hidden sm:block">
                        Connexion
                    </Link>
                    <Button asChild className="bg-indigo-600 text-white hover:bg-indigo-700 font-medium shadow-sm">
                        <Link href="/packs">Decouvrir les packs</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
