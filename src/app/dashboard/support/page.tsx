import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import Link from "next/link";
import { JSX } from "react";

export default function SupportPage(): JSX.Element {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Support Client</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Trouvez rapidement une aide pour votre dossier de domiciliation.
        </p>
      </div>

      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-zinc-900">Actions utiles</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Button asChild variant="outline" className="justify-start">
            <Link href="/dashboard/contracts">Verifier mon contrat</Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/dashboard/billing">Consulter ma facturation</Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/dashboard/mail">Suivre mes courriers</Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/dashboard/settings">Mettre a jour mes parametres</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-zinc-900">Besoin d&apos;assistance ?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-zinc-700">
          <p>Email: support@domiciliation.ma</p>
          <p>Telephone: +212 5 00 00 00 00</p>
          <p>Delai de reponse moyen: moins de 24h ouvrables.</p>
        </CardContent>
      </Card>
      <ChatWidget />
    </div>
  );
}
