import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
  accent?: "positive" | "negative" | "neutral";
}

export function KpiCard({ label, value, change, icon: Icon, accent = "neutral" }: KpiCardProps) {
  return (
    <Card className="p-5 transition-all duration-200 hover:border-border-default hover:shadow-[0_1px_2px_rgba(0,0,0,0.24),0_12px_28px_-14px_rgba(0,0,0,0.5)] hover:-translate-y-[1px]">
      <div className="flex items-start justify-between">
        <span className="text-[13px] font-medium text-muted">{label}</span>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-[9px]",
            accent === "positive" && "bg-accent-soft text-accent",
            accent === "negative" && "bg-negative-soft text-negative",
            accent === "neutral" && "bg-info-soft text-info"
          )}
        >
          <Icon className="h-[16px] w-[16px]" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-[26px] font-semibold tracking-tight text-foreground tabular-nums">
          {value}
        </span>
      </div>
      {change && (
        <div className="mt-2 flex items-center gap-1">
          {change.positive ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 text-negative" />
          )}
          <span
            className={cn(
              "text-[12.5px] font-medium",
              change.positive ? "text-accent" : "text-negative"
            )}
          >
            {change.value}
          </span>
          <span className="text-[12.5px] text-muted-2">vs prev. period</span>
        </div>
      )}
    </Card>
  );
}
