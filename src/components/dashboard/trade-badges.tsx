import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Direction, TradeStatus } from "@/lib/data/types";

export function DirectionBadge({ direction }: { direction: Direction }) {
  const isLong = direction === "Long";
  return (
    <Badge
      variant={isLong ? "outline-positive" : "outline-negative"}
      className="gap-1 uppercase"
    >
      {isLong ? (
        <ArrowUpRight className="h-3 w-3" />
      ) : (
        <ArrowDownRight className="h-3 w-3" />
      )}
      {direction}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: TradeStatus }) {
  return (
    <Badge variant={status === "Win" ? "positive" : "negative"} className="uppercase">
      {status}
    </Badge>
  );
}
