import { batches, getFarmTotals, TARGETS, requiredPriceForTarget } from "@/data/seed";
import { formatCurrency, formatNumber, formatPct } from "@/lib/utils";
import {
  Bird,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Package,
  Activity,
  Percent,
} from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { BatchScorecard } from "@/components/BatchScorecard";
import { ProfitHealth } from "@/components/ProfitHealth";

export default function DashboardPage() {
  const totals = getFarmTotals();
  const focus = batches[0]; // Batch 01 as default focus like Excel

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Full performance intelligence · Live from batch records · Currency: Zambian Kwacha (K)
        </p>
      </div>

      {/* Top KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard
          title="Batches"
          value={totals.totalBatches.toString()}
          subtitle="Included"
          icon={<Package className="h-4 w-4" />}
        />
        <KPICard
          title="Chicks Started"
          value={formatNumber(totals.chicksStarted)}
          icon={<Bird className="h-4 w-4" />}
        />
        <KPICard
          title="Birds Sold"
          value={formatNumber(totals.birdsSold)}
          icon={<Activity className="h-4 w-4" />}
        />
        <KPICard
          title="Total Revenue"
          value={formatCurrency(totals.totalRevenue)}
          icon={<DollarSign className="h-4 w-4" />}
          positive
        />
        <KPICard
          title="Total Costs"
          value={formatCurrency(totals.totalCosts)}
          icon={<TrendingDown className="h-4 w-4" />}
        />
        <KPICard
          title="Net Profit"
          value={formatCurrency(totals.netProfitCompleted)}
          subtitle={formatPct(totals.marginCompleted) + " margin"}
          icon={<TrendingUp className="h-4 w-4" />}
          positive={totals.netProfitCompleted > 0}
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Farm Mortality"
          value={formatPct(totals.mortalityPct)}
          subtitle={`${totals.totalMortality} birds`}
          icon={<AlertTriangle className="h-4 w-4" />}
          warning={totals.mortalityPct > TARGETS.mortalityAlert}
        />
        <KPICard
          title="Cash Still Owed"
          value={formatCurrency(totals.cashStillOwed)}
          icon={<DollarSign className="h-4 w-4" />}
          warning={totals.cashStillOwed > 0}
        />
        <KPICard
          title="Feed Cost (total)"
          value={formatCurrency(totals.feedCost)}
          icon={<Percent className="h-4 w-4" />}
        />
        <KPICard
          title="Target Margin"
          value={formatPct(TARGETS.profitMargin)}
          subtitle="Control setting"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
      </div>

      {/* Profit Health Monitor */}
      <ProfitHealth batch={focus} />

      {/* Batch Scorecard */}
      <BatchScorecard batches={batches} />

      {/* Footer note */}
      <div className="text-xs text-gray-400 border-t pt-4">
        Data seeded from your Excel “Poultry Batch Manager” workbook (Batch Register + batch sheets).
        All calculations follow the same logic as the original Register and CONTROL panel.
        Next step: connect Supabase for multi-device live data.
      </div>
    </div>
  );
}
