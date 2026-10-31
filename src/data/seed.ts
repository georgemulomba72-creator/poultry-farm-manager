// Seed data extracted and reconciled from the Poultry Batch Manager Excel workbook
// All figures match the 📋 Batch Register and individual batch sheets (Nov 2026)

export type BatchStatus = "Growing" | "Selling" | "Complete" | "Excluded";

export interface Batch {
  id: string;
  code: string;
  sheetName: string;
  dateStarted: string;
  year: number;
  chicksStart: number;
  mortality: number;
  birdsAlive: number;
  mortalityPct: number;
  feedCost: number;
  vaccineCost: number;
  medicineCost: number;
  housekeepingCost: number;
  otherCost: number;
  totalCost: number;
  birdsSold: number;
  revenue: number;
  cashReceived: number;
  stillOwed: number;
  netProfit: number;
  margin: number;
  costPerBird: number;
  feedPctOfCost: number;
  loansInCost: number;
  status: BatchStatus;
  include: boolean;
  breed: string;
  feedBrand: string;
  notes?: string;
}

export const TARGETS = {
  profitMargin: 0.40,
  minSellPrice: 140,
  mortalityAlert: 0.03,
  feedMaxPct: 0.55,
  otherMaxPct: 0.30,
  medicineMaxPct: 0.10,
  completeThreshold: 0.90,
  amberMarginFloor: 0.30,
};

export const batches: Batch[] = [
  {
    id: "batch-01",
    code: "BATCH 01",
    sheetName: "🐔 Batch 01",
    dateStarted: "2025-06-02",
    year: 2025,
    chicksStart: 160,
    mortality: 4,
    birdsAlive: 156,
    mortalityPct: 0.025,
    feedCost: 6752,
    vaccineCost: 220,
    medicineCost: 880,
    housekeepingCost: 1240,
    otherCost: 9284,
    totalCost: 18376,
    birdsSold: 150,
    revenue: 22500,
    cashReceived: 22500,
    stillOwed: 0,
    netProfit: 4124,
    margin: 0.1833,
    costPerBird: 122.51,
    feedPctOfCost: 0.3674,
    loansInCost: 0,
    status: "Complete",
    include: true,
    breed: "HYBRID",
    feedBrand: "NOVATEC",
    notes: "Revenue entered in Sales Day rows. Start year may be typo vs log dates.",
  },
  {
    id: "batch-02",
    code: "BATCH 02",
    sheetName: "🐔 Batch 02",
    dateStarted: "2026-07-14",
    year: 2026,
    chicksStart: 160,
    mortality: 4,
    birdsAlive: 156,
    mortalityPct: 0.025,
    feedCost: 7395,
    vaccineCost: 220,
    medicineCost: 675,
    housekeepingCost: 0,
    otherCost: 7828,
    totalCost: 16118,
    birdsSold: 150,
    revenue: 22500,
    cashReceived: 19950,
    stillOwed: 2550,
    netProfit: 6382,
    margin: 0.2836,
    costPerBird: 107.45,
    feedPctOfCost: 0.4588,
    loansInCost: 3118,
    status: "Complete",
    include: true,
    breed: "HYBRID",
    feedBrand: "NOVATEk",
    notes: "Sales Log complete; some buyers still owe money. Loans/drawings included.",
  },
  {
    id: "batch-03",
    code: "BATCH 03",
    sheetName: "🐔 Batch 03",
    dateStarted: "2026-10-29",
    year: 2026,
    chicksStart: 150,
    mortality: 0,
    birdsAlive: 210,
    mortalityPct: 0,
    feedCost: 10544,
    vaccineCost: 480,
    medicineCost: 1150,
    housekeepingCost: 0,
    otherCost: 7660,
    totalCost: 19834,
    birdsSold: 200,
    revenue: 30000,
    cashReceived: 30000,
    stillOwed: 0,
    netProfit: 10166,
    margin: 0.3389,
    costPerBird: 99.17,
    feedPctOfCost: 0.5316,
    loansInCost: 2000,
    status: "Complete",
    include: true,
    breed: "HYBRID",
    feedBrand: "NOVATEk",
    notes: "Logs may be carried over from older batch. Costs include a loan.",
  },
  {
    id: "batch-04",
    code: "BATCH 04",
    sheetName: "🐔 Batch 04",
    dateStarted: "2026-11-12",
    year: 2026,
    chicksStart: 200,
    mortality: 0,
    birdsAlive: 200,
    mortalityPct: 0,
    feedCost: 10544,
    vaccineCost: 480,
    medicineCost: 1150,
    housekeepingCost: 0,
    otherCost: 6620,
    totalCost: 18794,
    birdsSold: 200,
    revenue: 30000,
    cashReceived: 30000,
    stillOwed: 0,
    netProfit: 11206,
    margin: 0.3735,
    costPerBird: 93.97,
    feedPctOfCost: 0.5610,
    loansInCost: 2100,
    status: "Complete",
    include: true,
    breed: "HYBRID",
    feedBrand: "NOVATEk",
    notes: "Originally flagged as possible duplicate of Batch 03 – verify real data.",
  },
];

export function getFarmTotals(includeOnly = true) {
  const active = includeOnly ? batches.filter((b) => b.include) : batches;
  const completed = active.filter((b) => b.status === "Complete");
  return {
    totalBatches: active.length,
    chicksStarted: active.reduce((s, b) => s + b.chicksStart, 0),
    birdsSold: active.reduce((s, b) => s + b.birdsSold, 0),
    totalRevenue: active.reduce((s, b) => s + b.revenue, 0),
    totalCosts: active.reduce((s, b) => s + b.totalCost, 0),
    netProfitCompleted: completed.reduce((s, b) => s + b.netProfit, 0),
    marginCompleted:
      completed.reduce((s, b) => s + b.revenue, 0) > 0
        ? completed.reduce((s, b) => s + b.netProfit, 0) /
          completed.reduce((s, b) => s + b.revenue, 0)
        : 0,
    totalMortality: active.reduce((s, b) => s + b.mortality, 0),
    mortalityPct:
      active.reduce((s, b) => s + b.chicksStart, 0) > 0
        ? active.reduce((s, b) => s + b.mortality, 0) /
          active.reduce((s, b) => s + b.chicksStart, 0)
        : 0,
    cashStillOwed: active.reduce((s, b) => s + b.stillOwed, 0),
    feedCost: active.reduce((s, b) => s + b.feedCost, 0),
  };
}

export function requiredPriceForTarget(costPerBird: number, targetMargin = TARGETS.profitMargin) {
  return costPerBird / (1 - targetMargin);
}
