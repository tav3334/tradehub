import { Card } from "@/components/ui/card";

interface MetricRow {
  label: string;
  value: string;
  description: string;
}

export function RiskMetricsTable({ rows }: { rows: MetricRow[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="divide-y divide-border-subtle">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-surface-hover"
          >
            <div>
              <p className="text-[13.5px] font-medium text-foreground">{row.label}</p>
              <p className="text-[12px] text-muted-2">{row.description}</p>
            </div>
            <span className="shrink-0 text-[15px] font-semibold tabular-nums text-foreground">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
