import { Batch, TARGETS, requiredPriceForTarget } from "@/data/seed";
import { formatCurrency, formatPct } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function ProfitHealth({ batch }: { batch: Batch }) {
  const requiredPrice = requiredPriceForTarget(batch.costPerBird);
  const avgPrice = batch.birdsSold > 0 ? batch.revenue / batch.birdsSold : 0;

  const flags = [
    {
      id: 1,
      name: "Feed cost too high a share of total cost",
      threshold: `Feed ≤ ${formatPct(TARGETS.feedMaxPct)} of costs`,
      value: formatPct(batch.feedPctOfCost),
      ok: batch.feedPctOfCost <= TARGETS.feedMaxPct,
      action: "Reduce feed waste. Check spillage. Switch to cheaper grower if above the limit.",
    },
    {
      id: 2,
      name: "Average sell price per bird too low",
      threshold: `Min ${formatCurrency(requiredPrice, 0)}/bird for ${formatPct(TARGETS.profitMargin)} margin`,
      value: formatCurrency(avgPrice, 0),
      ok: avgPrice >= Math.max(TARGETS.minSellPrice, requiredPrice),
      action: "Negotiate buyer price up. Sell at 35–37 days, not earlier.",
    },
    {
      id: 3,
      name: "Mortality rate above limit",
      threshold: `Target < ${formatPct(TARGETS.mortalityAlert)}`,
      value: formatPct(batch.mortalityPct),
      ok: batch.mortalityPct < TARGETS.mortalityAlert,
      action: "Review ventilation, water quality, disease history, overcrowding.",
    },
    {
      id: 4,
      name: "Other / Misc expenses too high a share",
      threshold: `Other ≤ ${formatPct(TARGETS.otherMaxPct)} of costs`,
      value: formatPct(batch.otherCost / batch.totalCost),
      ok: batch.otherCost / batch.totalCost <= TARGETS.otherMaxPct,
      action: "Review labour, equipment, rent costs. Amortize equipment over several batches.",
    },
    {
      id: 5,
      name: "Medicine cost spike (antibiotics)",
      threshold: `Medicine ≤ ${formatPct(TARGETS.medicineMaxPct)} of costs`,
      value: formatPct(batch.medicineCost / batch.totalCost),
      ok: batch.medicineCost / batch.totalCost <= TARGETS.medicineMaxPct,
      action: "High antibiotic use signals disease. Invest in prevention (vaccines, hygiene).",
    },
    {
      id: 6,
      name: "Loans & drawings counted as batch cost",
      threshold: "Should not be treated as operating cost",
      value: formatCurrency(batch.loansInCost),
      ok: batch.loansInCost === 0,
      action: "Loans/drawings inflate cost and understate margin. Record them outside the batch.",
    },
  ];

  const marginStatus =
    batch.margin >= TARGETS.profitMargin
      ? "✅ ON TARGET"
      : batch.margin >= TARGETS.amberMarginFloor
      ? "🟡 NEAR TARGET"
      : "🚨 BELOW TARGET — SEE FLAGS BELOW";

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden dark:border-gray-800 dark:bg-gray-900">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Profit Health Monitor</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Flags & root-cause analysis for focus batch
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-gray-500">Focus: </span>
            <span className="font-medium">{batch.code}</span>
          </div>
          <div>
            <span className="text-gray-500">Margin: </span>
            <span className="font-medium">{formatPct(batch.margin)}</span>
          </div>
          <div
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-semibold",
              batch.margin >= TARGETS.profitMargin
                ? "bg-green-100 text-green-700"
                : batch.margin >= TARGETS.amberMarginFloor
                ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {marginStatus}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 text-left text-xs text-gray-500 uppercase">
              <th className="px-4 py-3 w-8">#</th>
              <th className="px-4 py-3">Profit Killer</th>
              <th className="px-4 py-3">Threshold / Signal</th>
              <th className="px-4 py-3 text-right">Your Value</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action Required</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {flags.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="px-4 py-3 text-gray-400">{f.id}</td>
                <td className="px-4 py-3 font-medium">{f.name}</td>
                <td className="px-4 py-3 text-gray-500">{f.threshold}</td>
                <td className="px-4 py-3 text-right font-medium">{f.value}</td>
                <td className="px-4 py-3">
                  {f.ok ? (
                    <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> OK
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-red-600 text-xs font-medium">
                      <AlertTriangle className="h-3.5 w-3.5" /> LOW / HIGH
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 max-w-xs">{f.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
