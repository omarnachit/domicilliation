"use client";

import Link from "next/link";
import { JSX } from "react";

export function Footer(): JSX.Element {
    return (
        <footer className="bg-zinc-900 border-t border-zinc-800 py-16 text-zinc-400">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Domiciliation.ma</h3>
                        <p className="text-sm leading-relaxed max-w-xs">
                            La référence de la domiciliation d'entreprise au Maroc.
                            Simple, rapide, et 100% conforme à la loi.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Services</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Domiciliation</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Création d'entreprise</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Location de bureaux</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Comptabilité</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Légal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Mentions Légales</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">CGV</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Politique de Confidentialité</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Loi 89-17</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li>Casablanca, Maroc</li>
                            <li>contact@domiciliation.ma</li>
                            <li>+212 5 22 00 00 00</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
                    <p>© {new Date().getFullYear()} Domiciliation.ma. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
