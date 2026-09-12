import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Direction, TradeStatus } from "@/lib/data/types";

export function DirectionBadge({ direction }: { direction: Direction }) {
  const isLong = direction === "Long";
  return (
    <span
      className={`inline-flex items-center gap-1 text-[12.5px] font-medium ${
        isLong ? "text-accent" : "text-negative"
      }`}
    >
      {isLong ? (
        <ArrowUpRight className="h-3.5 w-3.5" />
      ) : (
        <ArrowDownRight className="h-3.5 w-3.5" />
      )}
      {direction}
    </span>
  );
}

export function StatusBadge({ status }: { status: TradeStatus }) {
  return (
    <Badge variant={status === "Win" ? "positive" : "negative"}>{status}</Badge>
  );
}
