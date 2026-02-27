"use client";

import { JSX, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, FileText } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTRACT_STORAGE_KEY, type ContractDraft } from "@/lib/contract-draft";

function readStoredDraft(): ContractDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(CONTRACT_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as ContractDraft;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function ContractsPage(): JSX.Element {
  const [draft] = useState<ContractDraft | null>(() => readStoredDraft());
  const [showContract, setShowContract] = useState<boolean>(() => readStoredDraft() !== null);

  const effectDateLabel = useMemo(() => {
    if (!draft?.createdAt) {
      return "24 Fev 2026";
    }

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(draft.createdAt));
  }, [draft]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-900">Mes Contrats</h1>
      </div>

      {!showContract && (
        <Alert variant="destructive" className="border-amber-200 bg-amber-50 text-amber-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Action Requise</AlertTitle>
          <AlertDescription>
            Votre dossier est incomplet. Cliquez sur le bouton ci-dessous pour lancer la procedure et afficher votre contrat.
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-zinc-200 bg-white">
        <CardHeader>
          <CardTitle>Contrat de Domiciliation</CardTitle>
        </CardHeader>

        {!showContract ? (
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
            <div className="rounded-full bg-zinc-100 p-4">
              <FileText className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900">Aucun contrat actif</h3>
            <p className="max-w-sm text-zinc-500">
              Une fois la procedure commencee, vous verrez le contrat directement sur cette page.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => setShowContract(true)}>
                Voire le contrat
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/company">Completer mes informations</Link>
              </Button>
            </div>
          </CardContent>
        ) : (
          <CardContent className="space-y-5">
            <div className="flex items-start justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="h-5 w-5" />
                <p className="text-sm font-medium">Contrat genere avec succes.</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Actif</span>
            </div>

            <div className="rounded-lg border border-zinc-200 p-5">
              <div className="mb-4 border-b border-zinc-200 pb-4">
                <h3 className="text-lg font-semibold text-zinc-900">Contrat de domiciliation commerciale</h3>
                <p className="text-sm text-zinc-500">Reference: {draft?.reference ?? "CTR-2026-00017"}</p>
              </div>

              <div className="grid gap-3 text-sm text-zinc-700 md:grid-cols-2">
                <p>
                  <span className="font-medium text-zinc-900">Societe:</span> {draft?.companyName ?? "Client Demo SARL"}
                </p>
                <p>
                  <span className="font-medium text-zinc-900">Date effet:</span> {effectDateLabel}
                </p>
                <p>
                  <span className="font-medium text-zinc-900">Adresse:</span> {draft?.address ?? "123 Boulevard d'Anfa, Casablanca"}
                </p>
                <p>
                  <span className="font-medium text-zinc-900">Duree:</span> {draft?.durationMonths ?? 12} mois
                </p>
                <p>
                  <span className="font-medium text-zinc-900">Pack:</span> {draft?.packName ?? "Domiciliation Business"}
                </p>
                <p>
                  <span className="font-medium text-zinc-900">Montant:</span> {draft?.monthlyAmountMad ?? 599} MAD / mois
                </p>
                <p>
                  <span className="font-medium text-zinc-900">Forme juridique:</span> {draft?.legalForm ?? "SARL"}
                </p>
                <p>
                  <span className="font-medium text-zinc-900">ICE:</span> {draft?.iceNumber ?? "En cours"}
                </p>
                <p>
                  <span className="font-medium text-zinc-900">RC:</span> {draft?.rcNumber ?? "En cours"}
                </p>
                <p>
                  <span className="font-medium text-zinc-900">IF:</span> {draft?.taxId ?? "En cours"}
                </p>
              </div>

              <div className="mt-5 rounded-md bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-600">
                Le present contrat encadre la domiciliation de la societe au siege indique, conformement aux dispositions legales en vigueur.
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" onClick={() => setShowContract(false)}>
                Masquer le contrat
              </Button>
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Signer le contrat</Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
