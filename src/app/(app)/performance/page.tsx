import { PageHeader } from "@/components/dashboard/page-header";
import { StatTile } from "@/components/dashboard/stat-tile";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { WinLossDonut } from "@/components/dashboard/win-loss-donut";
import { RiskMetricsTable } from "@/components/dashboard/risk-metrics-table";
import { BestDaysChart } from "@/components/dashboard/best-days-chart";
import { BestWorstTradeCard } from "@/components/dashboard/best-worst-trade-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  averageDrawdown,
  averageRMultiple,
  bestTrade,
  dailyPnl,
  dayOfWeekStats,
  equityCurve,
  expectancy,
  grossLoss,
  grossProfit,
  maxDrawdownPct,
  netProfit,
  profitFactor,
  recoveryFactor,
  sharpeRatio,
  sortinoRatio,
  totalLosses,
  totalWins,
  winRate,
  worstTrade,
} from "@/lib/data";
import { formatCurrency, formatPercent, formatR } from "@/lib/format";

export default function PerformancePage() {
  const kpis = [
    { label: "Net Profit", value: formatCurrency(netProfit, { signed: true }), tone: "positive" as const },
    { label: "Gross Profit", value: formatCurrency(grossProfit, { signed: true }), tone: "positive" as const },
    { label: "Gross Loss", value: formatCurrency(grossLoss, { signed: true }), tone: "negative" as const },
    { label: "Win Rate", value: formatPercent(winRate), tone: "neutral" as const },
    { label: "Profit Factor", value: profitFactor.toFixed(2), tone: "neutral" as const },
    { label: "Expectancy", value: formatCurrency(expectancy, { signed: true }), tone: "positive" as const },
    { label: "Average R:R", value: formatR(averageRMultiple, { signed: false }), tone: "neutral" as const },
    { label: "Max Drawdown", value: `-${formatPercent(maxDrawdownPct)}`, tone: "negative" as const },
  ];

  const riskRows = [
    {
      label: "Max Drawdown",
      value: `-${formatPercent(maxDrawdownPct)}`,
      description: "Largest peak-to-trough equity decline",
    },
    {
      label: "Average Drawdown",
      value: `-${formatPercent(averageDrawdown)}`,
      description: "Mean depth of recorded pullbacks",
    },
    {
      label: "Recovery Factor",
      value: recoveryFactor.toFixed(2),
      description: "Net profit relative to max drawdown",
    },
    {
      label: "Sharpe Ratio",
      value: sharpeRatio.toFixed(2),
      description: "Risk-adjusted return, annualized",
    },
    {
      label: "Sortino Ratio",
      value: sortinoRatio.toFixed(2),
      description: "Downside risk-adjusted return",
    },
    {
      label: "Profit Factor",
      value: profitFactor.toFixed(2),
      description: "Gross profit divided by gross loss",
    },
    {
      label: "Expectancy",
      value: formatCurrency(expectancy, { signed: true }),
      description: "Expected P&L per trade",
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Performance Analytics"
        subtitle="Deep insights into your trading performance."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <StatTile key={kpi.label} label={kpi.label} value={kpi.value} tone={kpi.tone} />
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Performance Chart</CardTitle>
            <CardDescription>Switch between equity, daily and cumulative views</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <PerformanceChart equityCurve={equityCurve} dailyPnl={dailyPnl} />
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Win / Loss Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <WinLossDonut wins={totalWins} losses={totalLosses} winRate={winRate} />
            <div className="mt-2 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-[13px] text-muted">Winning Trades: {totalWins}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-negative" />
                <span className="text-[13px] text-muted">Losing Trades: {totalLosses}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Best Trading Days</CardTitle>
            <CardDescription>Average P&amp;L by weekday</CardDescription>
          </CardHeader>
          <CardContent>
            <BestDaysChart data={dayOfWeekStats} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-foreground">
          Risk Metrics
        </h2>
        <RiskMetricsTable rows={riskRows} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BestWorstTradeCard trade={bestTrade} kind="best" />
        <BestWorstTradeCard trade={worstTrade} kind="worst" />
      </div>
    </div>
  );
}
