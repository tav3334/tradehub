import type { Account, Trader } from "./types";
import {
  averageRMultiple,
  currentBalance,
  maxDrawdownPct,
  netProfit,
  profitFactor,
  STARTING_BALANCE,
  totalReturnPct,
  totalTrades,
  winRate,
} from "./derived";

export const trader: Trader = {
  name: "Alex Morgan",
  role: "Professional Forex & Indices Trader",
  location: "London, UK",
  tradingSince: 2019,
  markets: ["Forex", "Gold", "Indices"],
  strategy: "Price Action / Market Structure",
  bio: "Focused on disciplined risk management, market structure and high-probability setups across Forex, Gold and major indices.",
  avatarInitials: "AM",
};

export const account: Account = {
  balance: currentBalance,
  startingBalance: STARTING_BALANCE,
  totalProfit: netProfit,
  totalProfitPct: totalReturnPct,
  winRate,
  profitFactor,
  maxDrawdown: maxDrawdownPct,
  maxDrawdownPct,
  totalTrades,
};

export const accounts = [
  { id: "live-1", name: "Live — FTMO $100K", type: "Live", isDefault: true },
  { id: "live-2", name: "Live — Personal", type: "Live", isDefault: false },
  { id: "demo-1", name: "Demo — Strategy Test", type: "Demo", isDefault: false },
];

export const dateRanges = [
  { id: "1d", label: "1D" },
  { id: "1w", label: "1W" },
  { id: "1m", label: "1M" },
  { id: "3m", label: "3M" },
  { id: "ytd", label: "YTD" },
  { id: "1y", label: "1Y" },
  { id: "all", label: "ALL" },
] as const;

export type DateRangeId = (typeof dateRanges)[number]["id"];

// Illustrative prior-period deltas used only for the KPI "change" indicators.
export const previousPeriod = {
  totalProfit: netProfit - 3120,
  winRate: winRate - 2.1,
  profitFactor: profitFactor - 0.18,
  maxDrawdownPct: maxDrawdownPct + 1.4,
  totalTrades: totalTrades - 14,
  avgRMultiple: averageRMultiple - 0.12,
};
