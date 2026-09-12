"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import type { DayPnl } from "@/lib/data/types";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface CalendarCell {
  date: Date;
  inMonth: boolean;
  pnl?: number;
  trades?: number;
}

function buildMonthGrid(year: number, month: number, pnlMap: Map<string, DayPnl>): CalendarCell[] {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
  const gridStart = new Date(year, month, 1 - startOffset);

  const cells: CalendarCell[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    const key = date.toISOString().slice(0, 10);
    const entry = pnlMap.get(key);
    cells.push({
      date,
      inMonth: date.getMonth() === month,
      pnl: entry?.pnl,
      trades: entry?.trades,
    });
  }
  return cells;
}

export function TradingCalendar({
  pnlMap,
  initialYear,
  initialMonth,
  minYear,
  minMonth,
  maxYear,
  maxMonth,
  onMonthChange,
}: {
  pnlMap: Map<string, DayPnl>;
  initialYear: number;
  initialMonth: number;
  minYear: number;
  minMonth: number;
  maxYear: number;
  maxMonth: number;
  onMonthChange?: (year: number, month: number) => void;
}) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const cells = useMemo(() => buildMonthGrid(year, month, pnlMap), [year, month, pnlMap]);

  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const atMin = year === minYear && month === minMonth;
  const atMax = year === maxYear && month === maxMonth;

  function go(delta: number) {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    if (newYear < minYear || (newYear === minYear && newMonth < minMonth)) return;
    if (newYear > maxYear || (newYear === maxYear && newMonth > maxMonth)) return;
    setYear(newYear);
    setMonth(newMonth);
    onMonthChange?.(newYear, newMonth);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold tracking-tight text-foreground">{monthLabel}</h3>
        <div className="flex items-center gap-1.5">
          <Button variant="secondary" size="icon" onClick={() => go(-1)} disabled={atMin}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => go(1)} disabled={atMax}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className="pb-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted-2">
            {d}
          </div>
        ))}
        {cells.map((cell, i) => {
          const hasData = cell.pnl !== undefined && cell.inMonth;
          const isPositive = hasData && cell.pnl! > 0;
          const isNegative = hasData && cell.pnl! < 0;

          return (
            <div
              key={i}
              className={`aspect-square rounded-[10px] border p-1.5 transition-colors sm:p-2 ${
                !cell.inMonth
                  ? "border-transparent"
                  : isPositive
                  ? "border-accent/25 bg-accent-soft"
                  : isNegative
                  ? "border-negative/25 bg-negative-soft"
                  : "border-border-subtle bg-surface"
              }`}
            >
              <span
                className={`text-[11px] sm:text-[12px] ${
                  cell.inMonth ? "text-muted" : "text-muted-2/40"
                }`}
              >
                {cell.date.getDate()}
              </span>
              {hasData && (
                <div className="mt-1 sm:mt-1.5">
                  <span
                    className={`block text-[10px] font-semibold tabular-nums sm:text-[12px] ${
                      isPositive ? "text-accent" : "text-negative"
                    }`}
                  >
                    {formatCurrency(cell.pnl!, { signed: true })}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
