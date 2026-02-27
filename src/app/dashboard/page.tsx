import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX } from "react";
import { UpgradePackSection } from "@/components/dashboard/UpgradePackSection";
import { ClientAnalyticsSectionLazy } from "@/components/dashboard/ClientAnalyticsSectionLazy";
import { PickupSchedulingSection } from "@/components/dashboard/PickupSchedulingSection";

export default function DashboardPage(): JSX.Element {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Statut Contrat</CardTitle>
                        <Activity className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900">Actif</div>
                        <p className="text-xs text-zinc-500">Expire dans 340 jours</p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Courriers</CardTitle>
                        <Mail className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900">2</div>
                        <p className="text-xs text-zinc-500">En attente de lecture</p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">Factures</CardTitle>
                        <CreditCard className="h-4 w-4 text-zinc-900" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900">0</div>
                        <p className="text-xs text-zinc-500">Aucune facture impayée</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-white border-zinc-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-zinc-900">Activité Récente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none text-zinc-900">Création du compte</p>
                                    <p className="text-sm text-zinc-500">
                                        Votre compte a été créé avec succès.
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-zinc-400 text-sm">Aujourd&apos;hui</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 bg-white border-zinc-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-zinc-900">Mon Entreprise</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-600 text-sm mb-4">
                            Configurez les détails de votre entreprise dans l&apos;onglet &quot;Ma Société&quot; pour générer votre contrat.
                        </p>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/dashboard/company">Compléter mes informations</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <UpgradePackSection />
            <ClientAnalyticsSectionLazy />
            <PickupSchedulingSection />

            <Card className="bg-white border-zinc-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-zinc-900">Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <Button asChild variant="outline" className="justify-start">
                        <Link href="/dashboard/company">Completer ma societe</Link>
                    </Button>
                    <Button asChild variant="outline" className="justify-start">
                        <Link href="/dashboard/contracts">Voir mes contrats</Link>
                    </Button>
                    <Button asChild variant="outline" className="justify-start">
                        <Link href="/dashboard/billing">Consulter mes factures</Link>
                    </Button>
                    <Button asChild variant="outline" className="justify-start">
                        <Link href="/dashboard/notifications">Ouvrir notifications</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

