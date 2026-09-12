import { Card } from "@/components/ui/card";
import { DirectionBadge } from "./trade-badges";
import { formatCurrency, formatDate, formatR } from "@/lib/format";
import type { Trade } from "@/lib/data/types";
import { Trophy, TrendingDown } from "lucide-react";

export function BestWorstTradeCard({ trade, kind }: { trade: Trade; kind: "best" | "worst" }) {
  const isBest = kind === "best";
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-[8px] ${
            isBest ? "bg-accent-soft text-accent" : "bg-negative-soft text-negative"
          }`}
        >
          {isBest ? <Trophy className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
        </div>
        <span className="text-[13px] font-medium text-muted">
          {isBest ? "Best Trade" : "Worst Trade"}
        </span>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-[17px] font-semibold text-foreground">{trade.symbol}</span>
        <DirectionBadge direction={trade.direction} />
      </div>

      <div className="mt-3 flex items-end justify-between">
        <span
          className={`text-[24px] font-semibold tabular-nums tracking-tight ${
            isBest ? "text-accent" : "text-negative"
          }`}
        >
          {formatCurrency(trade.pnl, { signed: true })}
        </span>
        <span className="text-[14px] font-medium tabular-nums text-muted">
          {formatR(trade.rMultiple)}
        </span>
      </div>

      <p className="mt-3 text-[12px] text-muted-2">
        {formatDate(trade.date)} · {trade.setup}
      </p>
    </Card>
  );
}
