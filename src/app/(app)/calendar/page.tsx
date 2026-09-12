"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatTile } from "@/components/dashboard/stat-tile";
import { TradingCalendar } from "@/components/dashboard/trading-calendar";
import { Card, CardContent } from "@/components/ui/card";
import { dailyPnl, getDailyPnlMap } from "@/lib/data";
import { formatCurrency, formatPercent } from "@/lib/format";

const MIN_YEAR = 2025;
const MIN_MONTH = 0; // January
const MAX_YEAR = 2025;
const MAX_MONTH = 7; // August

export default function CalendarPage() {
  const pnlMap = useMemo(() => getDailyPnlMap(), []);
  const [activeYear, setActiveYear] = useState(MAX_YEAR);
  const [activeMonth, setActiveMonth] = useState(MAX_MONTH);

  const monthSummary = useMemo(() => {
    const prefix = `${activeYear}-${String(activeMonth + 1).padStart(2, "0")}`;
    const days = dailyPnl.filter((d) => d.date.startsWith(prefix));
    const pnl = days.reduce((s, d) => s + d.pnl, 0);
    const winningDays = days.filter((d) => d.pnl > 0).length;
    const winRate = days.length > 0 ? (winningDays / days.length) * 100 : 0;
    const best = days.length > 0 ? Math.max(...days.map((d) => d.pnl)) : 0;
    const worst = days.length > 0 ? Math.min(...days.map((d) => d.pnl)) : 0;

    return {
      pnl,
      winRate: Math.round(winRate * 10) / 10,
      tradingDays: days.length,
      best,
      worst,
    };
  }, [activeYear, activeMonth]);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Trading Calendar" subtitle="Daily performance at a glance." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatTile
          label="Monthly P&L"
          value={formatCurrency(monthSummary.pnl, { signed: true })}
          tone={monthSummary.pnl >= 0 ? "positive" : "negative"}
        />
        <StatTile label="Win Rate" value={formatPercent(monthSummary.winRate)} tone="neutral" />
        <StatTile label="Trading Days" value={monthSummary.tradingDays.toString()} tone="neutral" />
        <StatTile
          label="Best Day"
          value={formatCurrency(monthSummary.best, { signed: true })}
          tone="positive"
        />
        <StatTile
          label="Worst Day"
          value={formatCurrency(monthSummary.worst, { signed: true })}
          tone="negative"
        />
      </div>

      <Card className="mt-6">
        <CardContent>
          <TradingCalendar
            pnlMap={pnlMap}
            initialYear={activeYear}
            initialMonth={activeMonth}
            minYear={MIN_YEAR}
            minMonth={MIN_MONTH}
            maxYear={MAX_YEAR}
            maxMonth={MAX_MONTH}
            onMonthChange={(y, m) => {
              setActiveYear(y);
              setActiveMonth(m);
            }}
          />

          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border-subtle pt-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-[4px] bg-accent-soft border border-accent/25" />
              <span className="text-[12px] text-muted">Profitable day</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-[4px] bg-negative-soft border border-negative/25" />
              <span className="text-[12px] text-muted">Loss day</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-[4px] bg-surface border border-border-subtle" />
              <span className="text-[12px] text-muted">No trades</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
