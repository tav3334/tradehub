"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { Trade } from "@/lib/data/types";
import { formatCurrency, formatPrice, formatDate, formatR } from "@/lib/format";
import { DirectionBadge, StatusBadge } from "./trade-badges";
import { Badge } from "@/components/ui/badge";

export function TradeDetailDrawer({
  trade,
  open,
  onOpenChange,
}: {
  trade: Trade | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-y-auto border-l border-border-default bg-background-elevated shadow-2xl shadow-black/50">
          {trade && (
            <>
              <div className="flex items-start justify-between border-b border-border-subtle p-5">
                <div>
                  <DialogPrimitive.Title className="text-[18px] font-semibold text-foreground">
                    {trade.symbol}
                  </DialogPrimitive.Title>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {formatDate(trade.date, { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <DialogPrimitive.Close className="flex h-8 w-8 items-center justify-center rounded-[8px] text-muted hover:bg-surface-hover hover:text-foreground">
                  <X className="h-4 w-4" />
                </DialogPrimitive.Close>
              </div>

              <div className="flex flex-col gap-6 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DirectionBadge direction={trade.direction} />
                    <Badge variant="outline">{trade.setup}</Badge>
                  </div>
                  <StatusBadge status={trade.status} />
                </div>

                <div className="rounded-[var(--radius-md)] border border-border-subtle bg-surface p-4">
                  <p className="text-[13px] text-muted">Profit / Loss</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span
                      className={`text-[30px] font-semibold tracking-tight tabular-nums ${
                        trade.pnl >= 0 ? "text-accent" : "text-negative"
                      }`}
                    >
                      {formatCurrency(trade.pnl, { signed: true })}
                    </span>
                    <span className="text-[14px] font-medium tabular-nums text-muted">
                      {formatR(trade.rMultiple)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <DetailField label="Entry" value={formatPrice(trade.entry)} />
                  <DetailField label="Exit" value={formatPrice(trade.exit)} />
                  <DetailField label="Stop Loss" value={formatPrice(trade.stopLoss)} />
                  <DetailField label="Take Profit" value={formatPrice(trade.takeProfit)} />
                  <DetailField label="Risk" value={formatCurrency(trade.risk)} />
                  <DetailField label="Duration" value={trade.duration} />
                </div>

                <div>
                  <p className="mb-2 text-[13px] font-medium text-muted">Notes</p>
                  <p className="rounded-[var(--radius-md)] border border-border-subtle bg-surface p-3.5 text-[13px] leading-relaxed text-foreground">
                    {trade.notes}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-border-subtle bg-surface px-3.5 py-2.5">
      <p className="text-[11.5px] text-muted-2">{label}</p>
      <p className="mt-0.5 text-[14px] font-medium tabular-nums text-foreground">{value}</p>
    </div>
  );
}
