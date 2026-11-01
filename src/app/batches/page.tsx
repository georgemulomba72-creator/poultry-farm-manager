import { batches } from "@/data/seed";
import { formatCurrency, formatPct, formatNumber } from "@/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TARGETS } from "@/data/seed";

export default function BatchesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Batches</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage production batches from placement to harvest
          </p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition">
          + New Batch
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {batches.map((b) => {
          const marginOk = b.margin >= TARGETS.amberMarginFloor;
          return (
            <div
              key={b.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{b.code}</h3>
                  <p className="text-xs text-gray-500">
                    Started {b.dateStarted} · {b.breed}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    b.status === "Complete"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  )}
                >
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <div className="text-xs text-gray-500">Chicks</div>
                  <div className="font-medium">{formatNumber(b.chicksStart)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Sold</div>
                  <div className="font-medium">{formatNumber(b.birdsSold)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Revenue</div>
                  <div className="font-medium">{formatCurrency(b.revenue)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Profit</div>
                  <div className={cn("font-medium", marginOk ? "text-green-600" : "text-red-600")}>
                    {formatCurrency(b.netProfit)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  Margin {formatPct(b.margin)} · Cost/bird {formatCurrency(b.costPerBird, 0)}
                </span>
                <Link
                  href={`/batches/${b.id}`}
                  className="text-brand-600 font-medium hover:underline"
                >
                  View details →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
