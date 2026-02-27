import Link from "next/link";
import { ArrowUpRight, Check, History, Receipt } from "lucide-react";
import { JSX } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Plan = {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  features: string[];
  cta: string;
  popular?: boolean;
};

type BillingEntry = {
  id: string;
  date: string;
  plan: string;
  amount: number;
  status: "Paid" | "Pending";
};

const plans: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    description: "Pour demarrer votre activite.",
    priceMonthly: 299,
    cta: "Choisir Essential",
    features: ["Adresse de domiciliation", "Gestion courrier standard", "Support email"],
  },
  {
    id: "business",
    name: "Business",
    description: "Plan actuel pour les entreprises en croissance.",
    priceMonthly: 599,
    cta: "Plan actuel",
    features: ["Tout Essential", "Scan courrier prioritaire", "Alertes en temps reel", "Support prioritaire"],
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    description: "Automatisation et support premium.",
    priceMonthly: 899,
    cta: "Upgrade en 1 clic",
    features: ["Tout Business", "Jusqu'a 3 societes", "Assistance juridique dediee", "SLA 4h"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Accompagnement avance multi-entites.",
    priceMonthly: 1299,
    cta: "Upgrade en 1 clic",
    features: ["Tout Scale", "Gestion multi-sites", "Responsable de compte", "Rapports personnalises"],
  },
];

const billingHistory: BillingEntry[] = [
  { id: "INV-2026-0182", date: "2026-02-01", plan: "Business", amount: 599, status: "Paid" },
  { id: "INV-2026-0145", date: "2026-01-01", plan: "Business", amount: 599, status: "Paid" },
  { id: "INV-2025-0381", date: "2025-12-01", plan: "Essential", amount: 299, status: "Paid" },
  { id: "INV-2025-0348", date: "2025-11-01", plan: "Essential", amount: 299, status: "Paid" },
];

const currentPlanId = "business";
const currentPlan = plans.find((plan) => plan.id === currentPlanId) ?? plans[0];

function formatMAD(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(value);
}

function PriceDelta({ priceMonthly }: { priceMonthly: number }): JSX.Element | null {
  if (priceMonthly <= currentPlan.priceMonthly) {
    return null;
  }

  const delta = priceMonthly - currentPlan.priceMonthly;
  return <p className="mt-1 text-xs font-medium text-indigo-600">+{formatMAD(delta)}/mois vs plan actuel</p>;
}

export function UpgradePackSection(): JSX.Element {
  return (
    <section id="upgrade-pack" className="space-y-4">
      <Card className="border-indigo-100 bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-700 text-white shadow-lg">
        <CardContent className="flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/80">Upgrade Pack</p>
            <h2 className="mt-1 text-2xl font-bold">Passez au plan superieur en un clic</h2>
            <p className="mt-1 text-sm text-white/85">
              Comparez les plans, visualisez les ecarts de prix et activez votre upgrade instantanement.
            </p>
          </div>
          <Button asChild className="bg-white text-indigo-700 hover:bg-indigo-50">
            <Link href="/dashboard/billing">
              Voir la facturation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-4">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          const isLower = plan.priceMonthly < currentPlan.priceMonthly;

          return (
            <Card
              key={plan.id}
              className={`h-full border shadow-sm ${
                plan.popular ? "border-indigo-300 ring-1 ring-indigo-100" : "border-zinc-200"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-zinc-900">{plan.name}</CardTitle>
                  {isCurrent && (
                    <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">Actuel</span>
                  )}
                </div>
                <p className="text-sm text-zinc-600">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-zinc-900">{formatMAD(plan.priceMonthly)}</p>
                  <p className="text-sm text-zinc-500">par mois</p>
                  <PriceDelta priceMonthly={plan.priceMonthly} />
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-zinc-700">
                      <Check className="h-4 w-4 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={isCurrent || isLower ? "outline" : "default"}
                  disabled={isCurrent || isLower}
                >
                  {isLower ? "Plan inferieur" : plan.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-zinc-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-zinc-900">
              <History className="h-5 w-5 text-indigo-600" />
              Historique de facturation
            </CardTitle>
            <p className="mt-1 text-sm text-zinc-600">Dernieres factures et changements de plan.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard/billing">
              <Receipt className="h-4 w-4" />
              Ouvrir les factures
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 text-zinc-500">
                <tr>
                  <th className="py-2 font-medium">Facture</th>
                  <th className="py-2 font-medium">Date</th>
                  <th className="py-2 font-medium">Plan</th>
                  <th className="py-2 font-medium">Montant</th>
                  <th className="py-2 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((entry) => (
                  <tr key={entry.id} className="border-b border-zinc-100">
                    <td className="py-3 font-medium text-zinc-800">{entry.id}</td>
                    <td className="py-3 text-zinc-600">{entry.date}</td>
                    <td className="py-3 text-zinc-700">{entry.plan}</td>
                    <td className="py-3 text-zinc-800">{formatMAD(entry.amount)}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
