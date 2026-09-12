import { DollarSign, Target, Gauge, TrendingDown, Repeat } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { StatTile } from "@/components/dashboard/stat-tile";
import { EquityChart } from "@/components/dashboard/equity-chart";
import { MonthlyBarChart } from "@/components/dashboard/monthly-bar-chart";
import { RecentTradesTable } from "@/components/dashboard/recent-trades-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  account,
  averageLoss,
  averageRMultiple,
  averageWin,
  equityCurve,
  monthlyStats,
  previousPeriod,
  totalTrades,
  trades,
} from "@/lib/data";
import { formatCurrency, formatPercent, formatR } from "@/lib/format";

export default function DashboardPage() {
  const recentTrades = [...trades]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Good morning, Alex" subtitle="Here’s your trading performance overview." />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          label="Total Profit"
          value={formatCurrency(account.totalProfit, { signed: true })}
          change={{
            value: formatCurrency(account.totalProfit - previousPeriod.totalProfit, { signed: true }),
            positive: account.totalProfit >= previousPeriod.totalProfit,
          }}
          icon={DollarSign}
          accent="positive"
        />
        <KpiCard
          label="Win Rate"
          value={formatPercent(account.winRate)}
          change={{
            value: formatPercent(account.winRate - previousPeriod.winRate, { signed: true }),
            positive: account.winRate >= previousPeriod.winRate,
          }}
          icon={Target}
          accent="neutral"
        />
        <KpiCard
          label="Profit Factor"
          value={account.profitFactor.toFixed(2)}
          change={{
            value: `${(account.profitFactor - previousPeriod.profitFactor >= 0 ? "+" : "")}${(
              account.profitFactor - previousPeriod.profitFactor
            ).toFixed(2)}`,
            positive: account.profitFactor >= previousPeriod.profitFactor,
          }}
          icon={Gauge}
          accent="neutral"
        />
        <KpiCard
          label="Max Drawdown"
          value={`-${formatPercent(account.maxDrawdownPct)}`}
          change={{
            value: formatPercent(previousPeriod.maxDrawdownPct - account.maxDrawdownPct, { signed: true }),
            positive: account.maxDrawdownPct <= previousPeriod.maxDrawdownPct,
          }}
          icon={TrendingDown}
          accent="negative"
        />
        <KpiCard
          label="Total Trades"
          value={totalTrades.toString()}
          change={{
            value: `+${totalTrades - previousPeriod.totalTrades}`,
            positive: totalTrades >= previousPeriod.totalTrades,
          }}
          icon={Repeat}
          accent="neutral"
        />
      </div>

      {/* Equity Growth */}
      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Equity Growth</CardTitle>
            <CardDescription>Account balance over time</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <EquityChart data={equityCurve} />
        </CardContent>
      </Card>

      {/* Performance Breakdown */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile label="Average Win" value={formatCurrency(averageWin, { signed: true })} tone="positive" />
        <StatTile label="Average Loss" value={formatCurrency(averageLoss, { signed: true })} tone="negative" />
        <StatTile
          label="Average R:R"
          value={formatR(averageRMultiple, { signed: false })}
          tone="neutral"
        />
      </div>

      {/* Monthly Performance + Recent Trades */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyBarChart data={monthlyStats} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTradesTable trades={recentTrades} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
