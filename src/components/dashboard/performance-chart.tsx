"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DayPnl, EquityPoint } from "@/lib/data/types";
import { formatCompact, formatCurrency, formatDate } from "@/lib/format";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Mode = "equity" | "daily" | "cumulative";

function buildCumulative(daily: DayPnl[]): EquityPoint[] {
  let cum = 0;
  return daily.map((d) => {
    cum += d.pnl;
    return {
      date: d.date,
      label: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      equity: Math.round(cum),
    };
  });
}

export function PerformanceChart({
  equityCurve,
  dailyPnl,
}: {
  equityCurve: EquityPoint[];
  dailyPnl: DayPnl[];
}) {
  const [mode, setMode] = useState<Mode>("equity");

  const cumulative = useMemo(() => buildCumulative(dailyPnl), [dailyPnl]);
  const dailyChartData = useMemo(
    () =>
      dailyPnl.map((d) => ({
        date: d.date,
        label: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        pnl: d.pnl,
      })),
    [dailyPnl]
  );

  return (
    <div>
      <div className="mb-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
          <TabsList>
            <TabsTrigger value="equity">Equity</TabsTrigger>
            <TabsTrigger value="daily">Daily P&amp;L</TabsTrigger>
            <TabsTrigger value="cumulative">Cumulative P&amp;L</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {mode === "daily" ? (
            <BarChart data={dailyChartData} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 6" stroke="var(--border-subtle)" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-2)", fontSize: 11 }}
                minTickGap={50}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-2)", fontSize: 11 }}
                tickFormatter={(v) => formatCompact(v)}
                width={48}
              />
              <Tooltip
                cursor={{ fill: "var(--surface-hover)" }}
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  const p = payload[0].payload as { date: string; pnl: number };
                  return (
                    <div className="rounded-[10px] border border-border-default bg-background-elevated px-3 py-2 shadow-xl shadow-black/40">
                      <p className="text-[11px] text-muted-2">{formatDate(p.date)}</p>
                      <p
                        className={`text-[14px] font-semibold tabular-nums ${
                          p.pnl >= 0 ? "text-accent" : "text-negative"
                        }`}
                      >
                        {formatCurrency(p.pnl, { signed: true })}
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="pnl" radius={[4, 4, 4, 4]} maxBarSize={10}>
                {dailyChartData.map((entry) => (
                  <Cell
                    key={entry.date}
                    fill={entry.pnl >= 0 ? "var(--accent)" : "var(--negative)"}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <AreaChart
              data={mode === "equity" ? equityCurve : cumulative}
              margin={{ top: 8, right: 4, left: 4, bottom: 0 }}
            >
              <defs>
                <linearGradient id="perfFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" stroke="var(--border-subtle)" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-2)", fontSize: 11 }}
                minTickGap={50}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-2)", fontSize: 11 }}
                tickFormatter={(v) => formatCompact(v)}
                width={52}
                domain={["auto", "auto"]}
              />
              <Tooltip
                cursor={{ stroke: "var(--border-default)" }}
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  const p = payload[0].payload as EquityPoint;
                  return (
                    <div className="rounded-[10px] border border-border-default bg-background-elevated px-3 py-2 shadow-xl shadow-black/40">
                      <p className="text-[11px] text-muted-2">{formatDate(p.date)}</p>
                      <p className="text-[14px] font-semibold tabular-nums text-foreground">
                        {formatCurrency(p.equity, { signed: mode === "cumulative" })}
                      </p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="equity"
                stroke="var(--accent)"
                strokeWidth={2}
                fill="url(#perfFill)"
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
