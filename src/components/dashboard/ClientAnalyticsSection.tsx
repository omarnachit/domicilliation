"use client";

import { JSX, useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mailsPerMonth = [
  { month: "Sep", mails: 22 },
  { month: "Oct", mails: 28 },
  { month: "Nov", mails: 31 },
  { month: "Dec", mails: 27 },
  { month: "Jan", mails: 34 },
  { month: "Feb", mails: 30 },
];

const parcelFrequency = [
  { month: "Sep", parcels: 3 },
  { month: "Oct", parcels: 5 },
  { month: "Nov", parcels: 4 },
  { month: "Dec", parcels: 6 },
  { month: "Jan", parcels: 7 },
  { month: "Feb", parcels: 5 },
];

const subscriptionUsage = [
  { name: "Courrier", value: 78 },
  { name: "Scan", value: 62 },
  { name: "Support", value: 45 },
];

const renewalHistory = [
  { period: "2024", renewals: 1 },
  { period: "2025", renewals: 2 },
  { period: "2026", renewals: 1 },
];

const usageColors = ["#4f46e5", "#2563eb", "#14b8a6"];

function ChartFrame({
  height,
  children,
}: {
  height: number;
  children: (width: number, height: number) => JSX.Element;
}): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;
    const updateSize = () => setWidth(Math.floor(element.clientWidth));
    updateSize();

    const observer = new ResizeObserver(() => updateSize());
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      {width > 0 ? (
        children(width, height)
      ) : (
        <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50 text-sm text-zinc-500">
          Chargement du graphique...
        </div>
      )}
    </div>
  );
}

export function ClientAnalyticsSection(): JSX.Element {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Analytics Client</h2>
        <p className="text-sm text-zinc-600">Suivi mensuel des courriers, colis, usage et renouvellements.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-zinc-900">Nombre de mails par mois</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartFrame height={260}>
              {(width, height) => (
                <LineChart width={width} height={height} data={mailsPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#71717a", fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mails" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              )}
            </ChartFrame>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-zinc-900">Frequence des colis</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartFrame height={260}>
              {(width, height) => (
                <BarChart width={width} height={height} data={parcelFrequency}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#71717a", fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="parcels" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              )}
            </ChartFrame>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-zinc-900">Usage abonnement</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartFrame height={260}>
              {(width, height) => (
                <PieChart width={width} height={height}>
                  <Pie data={subscriptionUsage} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                    {subscriptionUsage.map((entry, index) => (
                      <Cell key={entry.name} fill={usageColors[index % usageColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
            </ChartFrame>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              {subscriptionUsage.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-zinc-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: usageColors[index % usageColors.length] }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-zinc-900">Historique de renouvellement</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartFrame height={220}>
              {(width, height) => (
                <BarChart width={width} height={height} data={renewalHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="period" tick={{ fill: "#71717a", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#71717a", fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="renewals" fill="#14b8a6" radius={[6, 6, 0, 0]} />
                </BarChart>
              )}
            </ChartFrame>
            <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
              Dernier renouvellement: <span className="font-semibold text-zinc-900">15 Jan 2026</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
