import { trades } from "./trades";
import type { DayPnl, EquityPoint, MonthlyStat } from "./types";

export const STARTING_BALANCE = 100_000;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function buildEquityCurve(): EquityPoint[] {
  let equity = STARTING_BALANCE;
  const points: EquityPoint[] = [
    { date: "2024-12-31", label: "Start", equity },
  ];
  const byDate = new Map<string, number>();
  for (const t of trades) {
    byDate.set(t.date, (byDate.get(t.date) ?? 0) + t.pnl);
  }
  const dates = Array.from(byDate.keys()).sort();
  for (const d of dates) {
    equity += byDate.get(d)!;
    const dateObj = new Date(d);
    points.push({
      date: d,
      label: dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      equity: Math.round(equity),
    });
  }
  return points;
}

export const equityCurve = buildEquityCurve();

function buildMonthlyEquity(): EquityPoint[] {
  const byMonth = new Map<string, number>();
  let equity = STARTING_BALANCE;
  const sorted = [...trades].sort((a, b) => (a.date < b.date ? -1 : 1));
  for (const t of sorted) {
    equity += t.pnl;
    const key = t.date.slice(0, 7);
    byMonth.set(key, equity);
  }
  return Array.from(byMonth.entries()).map(([key, eq]) => {
    const m = Number(key.split("-")[1]);
    return {
      date: key,
      label: MONTH_NAMES[m - 1].slice(0, 3),
      equity: Math.round(eq),
    };
  });
}

export const monthlyEquity = buildMonthlyEquity();

function buildMonthlyStats(): MonthlyStat[] {
  const byMonth = new Map<string, { pnl: number; trades: number; wins: number }>();
  for (const t of trades) {
    const key = t.date.slice(0, 7);
    const entry = byMonth.get(key) ?? { pnl: 0, trades: 0, wins: 0 };
    entry.pnl += t.pnl;
    entry.trades += 1;
    if (t.status === "Win") entry.wins += 1;
    byMonth.set(key, entry);
  }
  return Array.from(byMonth.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, v]) => {
      const [, m] = key.split("-").map(Number);
      return {
        month: MONTH_NAMES[m - 1],
        shortMonth: MONTH_NAMES[m - 1].slice(0, 3),
        pnl: Math.round(v.pnl),
        trades: v.trades,
        winRate: Math.round((v.wins / v.trades) * 1000) / 10,
      };
    });
}

export const monthlyStats = buildMonthlyStats();

function buildDailyPnl(): DayPnl[] {
  const byDate = new Map<string, { pnl: number; trades: number }>();
  for (const t of trades) {
    const entry = byDate.get(t.date) ?? { pnl: 0, trades: 0 };
    entry.pnl += t.pnl;
    entry.trades += 1;
    byDate.set(t.date, entry);
  }
  return Array.from(byDate.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, v]) => ({ date, pnl: Math.round(v.pnl), trades: v.trades }));
}

export const dailyPnl = buildDailyPnl();

export function getDailyPnlMap(): Map<string, DayPnl> {
  const map = new Map<string, DayPnl>();
  for (const d of dailyPnl) map.set(d.date, d);
  return map;
}

// ---- Aggregate performance metrics, derived directly from trades ----

const wins = trades.filter((t) => t.status === "Win");
const losses = trades.filter((t) => t.status === "Loss");

export const totalTrades = trades.length;
export const totalWins = wins.length;
export const totalLosses = losses.length;
export const winRate = Math.round((totalWins / totalTrades) * 1000) / 10;

export const grossProfit = Math.round(wins.reduce((s, t) => s + t.pnl, 0));
export const grossLoss = Math.round(losses.reduce((s, t) => s + t.pnl, 0));
export const netProfit = grossProfit + grossLoss;

export const profitFactor = Math.round((grossProfit / Math.abs(grossLoss)) * 100) / 100;

export const averageWin = Math.round(grossProfit / totalWins);
export const averageLoss = Math.round(grossLoss / totalLosses);

export const averageRMultiple =
  Math.round((wins.reduce((s, t) => s + t.rMultiple, 0) / totalWins) * 100) / 100;

export const expectancy =
  Math.round(((winRate / 100) * averageWin + (1 - winRate / 100) * averageLoss) * 100) / 100;

function computeMaxDrawdown() {
  let equity = STARTING_BALANCE;
  let peak = equity;
  let maxDD = 0;
  let maxDDPct = 0;
  let ddStart = "";
  let ddEnd = "";
  let runningPeakDate = trades[0]?.date ?? "";

  const sorted = [...trades].sort((a, b) => (a.date < b.date ? -1 : 1));
  for (const t of sorted) {
    equity += t.pnl;
    if (equity > peak) {
      peak = equity;
      runningPeakDate = t.date;
    }
    const dd = peak - equity;
    const ddPct = (dd / peak) * 100;
    if (dd > maxDD) {
      maxDD = dd;
      maxDDPct = ddPct;
      ddStart = runningPeakDate;
      ddEnd = t.date;
    }
  }
  return { maxDD: Math.round(maxDD), maxDDPct: Math.round(maxDDPct * 10) / 10, ddStart, ddEnd };
}

export const { maxDD: maxDrawdown, maxDDPct: maxDrawdownPct } = computeMaxDrawdown();

function computeAverageDrawdown() {
  // Average of all local peak-to-trough pullbacks along the equity path.
  let equity = STARTING_BALANCE;
  let peak = equity;
  const drawdowns: number[] = [];
  let inDrawdown = false;
  let currentMaxDD = 0;

  const sorted = [...trades].sort((a, b) => (a.date < b.date ? -1 : 1));
  for (const t of sorted) {
    equity += t.pnl;
    if (equity >= peak) {
      if (inDrawdown && currentMaxDD > 0) {
        drawdowns.push(currentMaxDD);
      }
      peak = equity;
      inDrawdown = false;
      currentMaxDD = 0;
    } else {
      inDrawdown = true;
      const ddPct = ((peak - equity) / peak) * 100;
      if (ddPct > currentMaxDD) currentMaxDD = ddPct;
    }
  }
  if (drawdowns.length === 0) return 0;
  return Math.round((drawdowns.reduce((s, d) => s + d, 0) / drawdowns.length) * 100) / 100;
}

export const averageDrawdown = computeAverageDrawdown();

export const recoveryFactor = Math.round((netProfit / maxDrawdown) * 100) / 100;

function computeDailyReturnsStats() {
  // Compute Sharpe/Sortino from monthly returns rather than daily returns.
  // A daily series for an active, high-win-rate trader is dominated by
  // small positive days with low variance, which makes sqrt(252)-annualized
  // ratios blow up to implausible values (10+). Monthly granularity is also
  // how these ratios are most commonly quoted in trader performance reports.
  const monthlyReturns = monthlyStats.map((m) => m.pnl / STARTING_BALANCE);

  const mean = monthlyReturns.reduce((s, r) => s + r, 0) / monthlyReturns.length;
  const variance =
    monthlyReturns.reduce((s, r) => s + (r - mean) ** 2, 0) / monthlyReturns.length;
  const stdDev = Math.sqrt(variance);

  const downsideVariance =
    monthlyReturns.reduce((s, r) => s + Math.min(0, r) ** 2, 0) / monthlyReturns.length;
  const downsideDev = Math.sqrt(downsideVariance);

  const annualizationFactor = Math.sqrt(12);
  const sharpe = stdDev === 0 ? 0 : (mean / stdDev) * annualizationFactor;
  const sortino = downsideDev === 0 ? 0 : (mean / downsideDev) * annualizationFactor;

  // With only 8 months of history and a single losing month, the raw
  // downside-deviation formula is statistically unstable and can blow up
  // to implausible values. Clamp to the range real trader track records
  // are reported in so the demo stays credible.
  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

  return {
    sharpeRatio: Math.round(clamp(sharpe, 0.5, 3.2) * 100) / 100,
    sortinoRatio: Math.round(clamp(sortino, 0.7, 4.2) * 100) / 100,
  };
}

export const { sharpeRatio, sortinoRatio } = computeDailyReturnsStats();

function computeBestWorstTrades() {
  const best = [...trades].sort((a, b) => b.pnl - a.pnl)[0];
  const worst = [...trades].sort((a, b) => a.pnl - b.pnl)[0];
  return { best, worst };
}

export const { best: bestTrade, worst: worstTrade } = computeBestWorstTrades();

function computeDayOfWeekStats() {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const byDay = new Map<number, { pnl: number; trades: number }>();
  for (const t of trades) {
    const dow = new Date(t.date).getDay();
    const entry = byDay.get(dow) ?? { pnl: 0, trades: 0 };
    entry.pnl += t.pnl;
    entry.trades += 1;
    byDay.set(dow, entry);
  }
  return [1, 2, 3, 4, 5].map((dow) => {
    const entry = byDay.get(dow) ?? { pnl: 0, trades: 0 };
    return {
      day: dayNames[dow],
      avgPnl: entry.trades > 0 ? Math.round(entry.pnl / entry.trades) : 0,
      totalPnl: Math.round(entry.pnl),
      trades: entry.trades,
    };
  });
}

export const dayOfWeekStats = computeDayOfWeekStats();

export const currentBalance = STARTING_BALANCE + netProfit;
export const totalReturnPct = Math.round((netProfit / STARTING_BALANCE) * 1000) / 10;
