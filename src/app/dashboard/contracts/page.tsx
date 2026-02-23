import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

export default function ContractsPage(): JSX.Element {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-zinc-900">Mes Contrats</h1>
            </div>

            <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Action Requise</AlertTitle>
                <AlertDescription>
                    Votre dossier est incomplet. Veuillez finaliser les informations de votre société pour générer votre contrat.
                </AlertDescription>
            </Alert>

            <Card className="bg-white border-zinc-200">
                <CardHeader>
                    <CardTitle>Contrat de Domiciliation</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                    <div className="p-4 bg-zinc-100 rounded-full">
                        <FileText className="h-8 w-8 text-zinc-400" />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-900">Aucun contrat actif</h3>
                    <p className="text-zinc-500 max-w-sm">
                        Une fois les informations de votre société validées, vous pourrez télécharger votre contrat ici.
                    </p>
                    <Button asChild className="bg-indigo-600 text-white hover:bg-indigo-700">
                        <Link href="/dashboard/company">Commencer la procédure</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
