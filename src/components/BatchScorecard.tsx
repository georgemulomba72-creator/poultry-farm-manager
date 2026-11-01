import { Batch, TARGETS } from "@/data/seed";
import { formatCurrency, formatPct, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function BatchScorecard({ batches }: { batches: Batch[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden dark:border-gray-800 dark:bg-gray-900">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="font-semibold">Batch Performance Scorecard</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Auto-populated from the Batch Register logic
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 text-left text-xs text-gray-500 uppercase">
              <th className="px-4 py-3 font-medium">Batch</th>
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium text-right">Chicks</th>
              <th className="px-4 py-3 font-medium text-right">Sold</th>
              <th className="px-4 py-3 font-medium text-right">Mort %</th>
              <th className="px-4 py-3 font-medium text-right">Revenue</th>
              <th className="px-4 py-3 font-medium text-right">Cost</th>
              <th className="px-4 py-3 font-medium text-right">Profit</th>
              <th className="px-4 py-3 font-medium text-right">Margin</th>
              <th className="px-4 py-3 font-medium text-right">Cost/Bird</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {batches.map((b) => {
              const statusColor =
                b.margin >= TARGETS.profitMargin
                  ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                  : b.margin >= TARGETS.amberMarginFloor
                  ? "text-amber-600 bg-amber-50 dark:bg-amber-900/20"
                  : "text-red-600 bg-red-50 dark:bg-red-900/20";
              const statusLabel =
                b.margin >= TARGETS.profitMargin
                  ? "✅ On target"
                  : b.margin >= TARGETS.amberMarginFloor
                  ? "🟡 Near target"
                  : "🔴 Below target";
              return (
                <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <td className="px-4 py-3 font-medium">{b.code}</td>
                  <td className="px-4 py-3">{b.year}</td>
                  <td className="px-4 py-3 text-right">{formatNumber(b.chicksStart)}</td>
                  <td className="px-4 py-3 text-right">{formatNumber(b.birdsSold)}</td>
                  <td className="px-4 py-3 text-right">{formatPct(b.mortalityPct)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(b.revenue)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(b.totalCost)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(b.netProfit)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatPct(b.margin)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(b.costPerBird, 2)}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", statusColor)}>
                      {statusLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
