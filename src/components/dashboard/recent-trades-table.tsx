import Link from "next/link";
import type { Trade } from "@/lib/data/types";
import { formatCurrency, formatPrice, formatR } from "@/lib/format";
import { DirectionBadge, StatusBadge } from "./trade-badges";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function RecentTradesTable({ trades }: { trades: Trade[] }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-left">
              <th className="pb-2.5 pr-3 text-[11.5px] font-medium uppercase tracking-wide text-muted-2">
                Symbol
              </th>
              <th className="pb-2.5 pr-3 text-[11.5px] font-medium uppercase tracking-wide text-muted-2">
                Direction
              </th>
              <th className="pb-2.5 pr-3 text-right text-[11.5px] font-medium uppercase tracking-wide text-muted-2">
                Entry
              </th>
              <th className="pb-2.5 pr-3 text-right text-[11.5px] font-medium uppercase tracking-wide text-muted-2">
                Exit
              </th>
              <th className="pb-2.5 pr-3 text-right text-[11.5px] font-medium uppercase tracking-wide text-muted-2">
                P&amp;L
              </th>
              <th className="pb-2.5 pr-3 text-right text-[11.5px] font-medium uppercase tracking-wide text-muted-2">
                R:R
              </th>
              <th className="pb-2.5 text-right text-[11.5px] font-medium uppercase tracking-wide text-muted-2">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr
                key={t.id}
                className="border-b border-border-subtle/60 transition-colors hover:bg-surface-hover"
              >
                <td className="py-3 pr-3 text-[13px] font-medium text-foreground whitespace-nowrap">
                  {t.symbol}
                </td>
                <td className="py-3 pr-3">
                  <DirectionBadge direction={t.direction} />
                </td>
                <td className="py-3 pr-3 text-right text-[13px] tabular-nums text-muted whitespace-nowrap">
                  {formatPrice(t.entry)}
                </td>
                <td className="py-3 pr-3 text-right text-[13px] tabular-nums text-muted whitespace-nowrap">
                  {formatPrice(t.exit)}
                </td>
                <td
                  className={`py-3 pr-3 text-right text-[13px] font-medium tabular-nums whitespace-nowrap ${
                    t.pnl >= 0 ? "text-accent" : "text-negative"
                  }`}
                >
                  {formatCurrency(t.pnl, { signed: true })}
                </td>
                <td className="py-3 pr-3 text-right text-[13px] tabular-nums text-muted whitespace-nowrap">
                  {formatR(t.rMultiple)}
                </td>
                <td className="py-3 text-right">
                  <StatusBadge status={t.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <Button variant="secondary" size="sm" asChild>
          <Link href="/trades">
            View all trades
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
