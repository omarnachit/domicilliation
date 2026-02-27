"use client";

import dynamic from "next/dynamic";
import { JSX } from "react";

const ClientAnalyticsSection = dynamic(
  () => import("@/components/dashboard/ClientAnalyticsSection").then((mod) => mod.ClientAnalyticsSection),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-500">
        Chargement des analytics...
      </div>
    ),
  }
);

export function ClientAnalyticsSectionLazy(): JSX.Element {
  return <ClientAnalyticsSection />;
}
