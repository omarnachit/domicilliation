import { JSX, type ComponentType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contactez-nous",
  description:
    "Contactez notre equipe support pour toute question sur nos services de domiciliation et de creation d'entreprise.",
};

type ContactInfo = {
  title: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
};

const contactInfos: ContactInfo[] = [
  {
    title: "Adresse",
    value: "123 Boulevard d'Anfa, Casablanca, Maroc",
    icon: MapPin,
  },
  {
    title: "Telephone",
    value: "+212 5 22 00 00 00",
    icon: Phone,
  },
  {
    title: "Email",
    value: "support@domiciliation.ma",
    icon: Mail,
  },
  {
    title: "Horaires",
    value: "Lundi au Vendredi, 9h00 - 18h00",
    icon: Clock,
  },
];

function ContactInfoCard({ title, value, icon: Icon }: ContactInfo): JSX.Element {
  return (
    <Card className="h-full border-zinc-200/80 bg-gradient-to-br from-white to-zinc-50/60 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-base font-semibold text-zinc-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-zinc-600">{value}</p>
      </CardContent>
    </Card>
  );
}

export default function ContactPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.14),_transparent_45%),radial-gradient(circle_at_90%_10%,_rgba(14,165,233,0.12),_transparent_35%)]" />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">Contactez-nous</h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Notre equipe accompagne votre entreprise avec un support rapide, professionnel et disponible a chaque etape.
            </p>
            <p className="mt-3 text-sm font-medium text-blue-600">
              Reponse sous 24h ouvrables pour toutes vos demandes.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {contactInfos.map((info) => (
              <ContactInfoCard key={info.title} {...info} />
            ))}
          </div>

          <div className="mt-16">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Notre localisation</h2>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <iframe
                title="Localisation Domiciliation.ma"
                src="https://maps.google.com/maps?q=Casablanca%2C%20Maroc&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-[420px] w-full md:h-[560px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="mt-16 border-t border-zinc-200/80 pt-10">
            <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-sky-50 p-6 text-center md:p-8">
              <p className="mb-5 text-sm text-zinc-700">
                Lancez votre projet avec un accompagnement administratif complet.
              </p>
              <Button asChild size="lg" className="bg-indigo-600 px-8 text-white hover:bg-indigo-700">
                <Link href="/booking">Creer votre entreprise</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

