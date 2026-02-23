'use client';

import { MonthlyRevenueData } from '@/lib/admin-data';

interface RevenueChartProps {
  data: MonthlyRevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const minRevenue = Math.min(...data.map((d) => d.revenue));
  const range = maxRevenue - minRevenue;

  const getChartHeight = (revenue: number) => {
    const percentage = ((revenue - minRevenue) / range) * 100;
    return Math.max(percentage, 5);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="h-64 flex items-end justify-between gap-2 bg-gradient-to-b from-blue-50 to-white p-4 rounded-lg border border-zinc-200">
        {data.map((item) => (
          <div
            key={item.month}
            className="flex-1 flex flex-col items-center gap-2 group"
          >
            <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-500 shadow-sm"
              style={{ height: `${getChartHeight(item.revenue)}%` }}
              title={`${item.month}: ${formatCurrency(item.revenue)}`}
            />
            <div className="text-xs font-medium text-zinc-600">{item.month}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        <div className="text-sm text-zinc-600">
          <span className="font-medium">Plage:</span> {formatCurrency(minRevenue)} - {formatCurrency(maxRevenue)}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-2 px-3 text-zinc-600 font-medium">Mois</th>
                <th className="text-right py-2 px-3 text-zinc-600 font-medium">Revenu</th>
                <th className="text-right py-2 px-3 text-zinc-600 font-medium">Clients</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.month} className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-2 px-3 font-medium text-zinc-900">{item.month}</td>
                  <td className="text-right py-2 px-3 text-blue-600 font-semibold">
                    {formatCurrency(item.revenue)}
                  </td>
                  <td className="text-right py-2 px-3 text-zinc-600">{item.clients}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
