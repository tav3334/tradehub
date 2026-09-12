import { MapPin, CalendarClock, LineChart as LineChartIcon, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/dashboard/stat-tile";
import { EquityChart } from "@/components/dashboard/equity-chart";
import { MonthlyReturnsTable } from "@/components/dashboard/monthly-returns-table";
import { account, equityCurve, monthlyStats, trader } from "@/lib/data";
import { formatPercent } from "@/lib/format";

export default function ProfilePage() {
  return (
    <div className="animate-fade-in">
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-accent/20 via-accent/5 to-transparent sm:h-32" />
        <CardContent className="pt-0">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <Avatar className="h-20 w-20 border-4 border-background-elevated shadow-lg">
                <AvatarFallback className="text-[22px]">{trader.avatarInitials}</AvatarFallback>
              </Avatar>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-[20px] font-semibold tracking-tight text-foreground">
                    {trader.name}
                  </h1>
                  <Badge variant="positive" className="gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Performance
                  </Badge>
                </div>
                <p className="mt-0.5 text-[13.5px] text-muted">{trader.role}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border-subtle pt-4">
            <span className="flex items-center gap-1.5 text-[13px] text-muted">
              <MapPin className="h-3.5 w-3.5 text-muted-2" />
              {trader.location}
            </span>
            <span className="flex items-center gap-1.5 text-[13px] text-muted">
              <CalendarClock className="h-3.5 w-3.5 text-muted-2" />
              Trading since {trader.tradingSince}
            </span>
            <span className="flex items-center gap-1.5 text-[13px] text-muted">
              <LineChartIcon className="h-3.5 w-3.5 text-muted-2" />
              {trader.strategy}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {trader.markets.map((m) => (
              <Badge key={m} variant="outline">
                {m}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile
          label="Total Return"
          value={formatPercent(account.totalProfitPct, { signed: true })}
          tone="positive"
        />
        <StatTile label="Win Rate" value={formatPercent(account.winRate)} tone="neutral" />
        <StatTile label="Profit Factor" value={account.profitFactor.toFixed(2)} tone="neutral" />
        <StatTile
          label="Max Drawdown"
          value={`-${formatPercent(account.maxDrawdownPct)}`}
          tone="negative"
        />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[14px] leading-relaxed text-muted">{trader.bio}</p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Equity growth since account inception</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <EquityChart data={equityCurve} />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Monthly Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyReturnsTable data={monthlyStats} />
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-[11.5px] text-muted-2">
        Verified Performance is a demo UI element only and does not represent an independently
        audited track record.
      </p>
    </div>
  );
}
