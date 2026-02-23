"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { JSX } from "react";

export function Hero(): JSX.Element {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white pt-20">
            {/* Background Decor - Subtle & Professional */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-white to-white" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Value Proposition */}
                <div className="flex flex-col items-start space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="outline" className="px-4 py-1.5 rounded-full border-zinc-200 bg-white text-zinc-700 gap-2 shadow-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Service proposé par MARTECH CONSEILS
                        </Badge>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                            Votre Siège Social <br />
                            <span className="text-indigo-600">Premium à Casablanca</span>
                        </h1>
                        <p className="text-lg text-zinc-600 max-w-xl leading-relaxed">
                            Obtenez une adresse commerciale prestigieuse et un contrat de domiciliation conforme à la Loi 89-17 en quelques minutes. Idéal pour la création ou le transfert de votre entreprise.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col gap-3 w-full max-w-md"
                    >
                        <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                            <div className="bg-white p-2.5 rounded-full shadow-sm">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900">Adresse Stratégique</h3>
                                <p className="text-sm text-zinc-500">Au cœur du quartier d'affaires de Casablanca</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                            <div className="bg-white p-2.5 rounded-full shadow-sm">
                                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900">100% Conforme & Légal</h3>
                                <p className="text-sm text-zinc-500">Contrat validé par le Tribunal de Commerce</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                            <div className="bg-white p-2.5 rounded-full shadow-sm">
                                <Clock className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900">Activé en 5 Minutes</h3>
                                <p className="text-sm text-zinc-500">Processus 100% digital, zéro papier</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-row items-center gap-4 pt-4"
                    >
                        <Button asChild size="lg" className="h-14 px-8 text-lg bg-zinc-900 hover:bg-black text-white shadow-xl shadow-zinc-200">
                            <Link href="/register">
                                Commencer maintenant
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" size="lg" className="h-14 px-8 text-lg text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50">
                            <Link href="#pricing">
                                Voir les tarifs
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Right Column: Visual Trust/Map Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="relative hidden lg:block"
                >
                    <div className="absolute inset-0 bg-indigo-600 rounded-2xl rotate-3 opacity-5"></div>
                    <div className="relative bg-white border border-zinc-200 rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                                <span className="font-semibold text-zinc-900">Attestation de Domiciliation</span>
                                <Badge className="bg-green-100 text-green-700 border-green-200">Certifié</Badge>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2.5 bg-zinc-100 rounded-full w-3/4"></div>
                                <div className="h-2.5 bg-zinc-100 rounded-full w-1/2"></div>
                                <div className="h-2.5 bg-zinc-100 rounded-full w-5/6"></div>
                            </div>
                            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                                <p className="text-sm text-indigo-900 font-medium">
                                    "MARTECH CONSEILS certifie que la société cliente est valablement domiciliée..."
                                </p>
                            </div>
                            <div className="flex justify-between items-end pt-4">
                                <div className="text-xs text-zinc-400">Réf: DOM-2026-X89</div>
                                <div className="w-16 h-16 bg-zinc-100 rounded-md flex items-center justify-center text-[10px] text-zinc-400 border border-zinc-200">
                                    QR Code
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
