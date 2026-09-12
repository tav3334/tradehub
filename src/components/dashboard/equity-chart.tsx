"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EquityPoint } from "@/lib/data/types";
import { formatCompact, formatCurrency, formatDate } from "@/lib/format";

const RANGES = ["1D", "1W", "1M", "3M", "1Y", "ALL"] as const;
type Range = (typeof RANGES)[number];

function filterByRange(points: EquityPoint[], range: Range): EquityPoint[] {
  if (points.length === 0) return points;
  if (range === "ALL") return points;

  const last = new Date(points[points.length - 1].date);
  const cutoffs: Record<Range, number> = {
    "1D": 1,
    "1W": 7,
    "1M": 30,
    "3M": 90,
    "1Y": 365,
    ALL: Infinity,
  };
  const days = cutoffs[range];
  const cutoff = new Date(last);
  cutoff.setDate(cutoff.getDate() - days);

  const filtered = points.filter((p) => new Date(p.date) >= cutoff);
  return filtered.length > 1 ? filtered : points.slice(-2);
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { payload: EquityPoint }[] }) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-[10px] border border-border-default bg-background-elevated px-3 py-2 shadow-xl shadow-black/40">
      <p className="text-[11px] text-muted-2">{formatDate(point.date)}</p>
      <p className="text-[14px] font-semibold tabular-nums text-foreground">
        {formatCurrency(point.equity)}
      </p>
    </div>
  );
}

export function EquityChart({ data }: { data: EquityPoint[] }) {
  const [range, setRange] = useState<Range>("ALL");

  const visible = useMemo(() => filterByRange(data, range), [data, range]);

  const isPositive =
    visible.length > 1 && visible[visible.length - 1].equity >= visible[0].equity;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`rounded-[7px] px-2.5 py-1 text-[12px] font-medium transition-colors ${
              range === r
                ? "bg-surface-hover text-foreground"
                : "text-muted-2 hover:text-muted"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visible} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isPositive ? "var(--accent)" : "var(--negative)"}
                  stopOpacity={0.28}
                />
                <stop
                  offset="100%"
                  stopColor={isPositive ? "var(--accent)" : "var(--negative)"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 6"
              stroke="var(--border-subtle)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-2)", fontSize: 11 }}
              minTickGap={40}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-2)", fontSize: 11 }}
              tickFormatter={(v) => formatCompact(v)}
              width={52}
              domain={["auto", "auto"]}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--border-default)" }} />
            <Area
              type="monotone"
              dataKey="equity"
              stroke={isPositive ? "var(--accent)" : "var(--negative)"}
              strokeWidth={2}
              fill="url(#equityFill)"
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
