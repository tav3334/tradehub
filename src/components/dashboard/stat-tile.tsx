import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatTile({
  label,
  value,
  tone = "neutral",
  sublabel,
}: {
  label: string;
  value: string;
  tone?: "positive" | "negative" | "neutral";
  sublabel?: string;
}) {
  return (
    <Card className="p-5">
      <span className="text-[13px] font-medium text-muted">{label}</span>
      <div
        className={cn(
          "mt-2 text-[22px] font-semibold tracking-tight tabular-nums",
          tone === "positive" && "text-accent",
          tone === "negative" && "text-negative",
          tone === "neutral" && "text-foreground"
        )}
      >
        {value}
      </div>
      {sublabel && <p className="mt-1 text-[12px] text-muted-2">{sublabel}</p>}
    </Card>
  );
}
