import { Compass, Globe2, Shield, Timer, CalendarClock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InfoItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function TraderInfoGrid({
  strategy,
  markets,
  riskApproach,
  avgHoldingTime,
  tradingSince,
}: {
  strategy: string;
  markets: string[];
  riskApproach: string;
  avgHoldingTime: string;
  tradingSince: number;
}) {
  const items: InfoItem[] = [
    { label: "Trading Style", value: strategy, icon: Compass },
    { label: "Markets", value: markets.join(", "), icon: Globe2 },
    { label: "Risk Approach", value: riskApproach, icon: Shield },
    { label: "Average Holding Time", value: avgHoldingTime, icon: Timer },
    { label: "Trading Since", value: tradingSince.toString(), icon: CalendarClock },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-info-soft text-info">
              <item.icon className="h-[15px] w-[15px]" />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] text-muted-2">{item.label}</p>
              <p className="mt-0.5 text-[13.5px] font-medium text-foreground">{item.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
