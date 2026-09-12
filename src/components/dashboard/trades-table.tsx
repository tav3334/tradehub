"use client";

import { Eye } from "lucide-react";
import type { Trade } from "@/lib/data/types";
import { formatCurrency, formatPrice, formatDate, formatR } from "@/lib/format";
import { DirectionBadge, StatusBadge } from "./trade-badges";
import { Button } from "@/components/ui/button";

export function TradesTable({
  trades,
  onViewTrade,
}: {
  trades: Trade[];
  onViewTrade: (trade: Trade) => void;
}) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[920px] border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-left">
              {[
                "Date",
                "Symbol",
                "Direction",
                "Setup",
                "Entry",
                "Stop Loss",
                "Take Profit",
                "Exit",
                "Risk",
                "P&L",
                "R:R",
                "Status",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap pb-2.5 pr-3 text-[11px] font-medium uppercase tracking-wide text-muted-2"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr
                key={t.id}
                onClick={() => onViewTrade(t)}
                className="cursor-pointer border-b border-border-subtle/60 transition-colors hover:bg-surface-hover"
              >
                <td className="whitespace-nowrap py-3 pr-3 text-[13px] text-muted">
                  {formatDate(t.date, { month: "short", day: "numeric" })}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-[13px] font-medium text-foreground">
                  {t.symbol}
                </td>
                <td className="whitespace-nowrap py-3 pr-3">
                  <DirectionBadge direction={t.direction} />
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-[12.5px] text-muted">{t.setup}</td>
                <td className="whitespace-nowrap py-3 pr-3 text-[13px] tabular-nums text-muted">
                  {formatPrice(t.entry)}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-[13px] tabular-nums text-muted">
                  {formatPrice(t.stopLoss)}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-[13px] tabular-nums text-muted">
                  {formatPrice(t.takeProfit)}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-[13px] tabular-nums text-muted">
                  {formatPrice(t.exit)}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-[13px] tabular-nums text-muted">
                  {formatCurrency(t.risk)}
                </td>
                <td
                  className={`whitespace-nowrap py-3 pr-3 text-[13px] font-medium tabular-nums ${
                    t.pnl >= 0 ? "text-accent" : "text-negative"
                  }`}
                >
                  {formatCurrency(t.pnl, { signed: true })}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-[13px] tabular-nums text-muted">
                  {formatR(t.rMultiple)}
                </td>
                <td className="whitespace-nowrap py-3 pr-3">
                  <StatusBadge status={t.status} />
                </td>
                <td className="whitespace-nowrap py-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewTrade(t);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-2.5 lg:hidden">
        {trades.map((t) => (
          <button
            key={t.id}
            onClick={() => onViewTrade(t)}
            className="flex flex-col gap-2.5 rounded-[var(--radius-md)] border border-border-subtle bg-surface p-4 text-left transition-colors hover:bg-surface-hover"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-foreground">{t.symbol}</span>
                <DirectionBadge direction={t.direction} />
              </div>
              <StatusBadge status={t.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-muted-2">
                {formatDate(t.date)} · {t.setup}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border-subtle pt-2.5">
              <span className="text-[12px] text-muted-2">{formatR(t.rMultiple)}</span>
              <span
                className={`text-[15px] font-semibold tabular-nums ${
                  t.pnl >= 0 ? "text-accent" : "text-negative"
                }`}
              >
                {formatCurrency(t.pnl, { signed: true })}
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
