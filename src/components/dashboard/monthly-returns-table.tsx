import type { MonthlyStat } from "@/lib/data/types";
import { formatCurrency, formatPercent } from "@/lib/format";

export function MonthlyReturnsTable({ data }: { data: MonthlyStat[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse">
        <thead>
          <tr className="border-b border-border-subtle text-left">
            <th className="pb-2.5 pr-3 text-[11px] font-medium uppercase tracking-wide text-muted-2">
              Month
            </th>
            <th className="pb-2.5 pr-3 text-right text-[11px] font-medium uppercase tracking-wide text-muted-2">
              P&amp;L
            </th>
            <th className="pb-2.5 pr-3 text-right text-[11px] font-medium uppercase tracking-wide text-muted-2">
              Trades
            </th>
            <th className="pb-2.5 text-right text-[11px] font-medium uppercase tracking-wide text-muted-2">
              Win Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.month} className="border-b border-border-subtle/60">
              <td className="py-2.5 pr-3 text-[13px] font-medium text-foreground">{m.shortMonth}</td>
              <td
                className={`py-2.5 pr-3 text-right text-[13px] font-medium tabular-nums ${
                  m.pnl >= 0 ? "text-accent" : "text-negative"
                }`}
              >
                {formatCurrency(m.pnl, { signed: true })}
              </td>
              <td className="py-2.5 pr-3 text-right text-[13px] tabular-nums text-muted">{m.trades}</td>
              <td className="py-2.5 text-right text-[13px] tabular-nums text-muted">
                {formatPercent(m.winRate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
