"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonthlyStat } from "@/lib/data/types";
import { formatCompact, formatCurrency } from "@/lib/format";

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { payload: MonthlyStat }[] }) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-[10px] border border-border-default bg-background-elevated px-3 py-2 shadow-xl shadow-black/40">
      <p className="text-[11px] text-muted-2">{point.month}</p>
      <p
        className={`text-[14px] font-semibold tabular-nums ${
          point.pnl >= 0 ? "text-accent" : "text-negative"
        }`}
      >
        {formatCurrency(point.pnl, { signed: true })}
      </p>
      <p className="text-[11px] text-muted-2">
        {point.trades} trades · {point.winRate}% win rate
      </p>
    </div>
  );
}

export function MonthlyBarChart({ data }: { data: MonthlyStat[] }) {
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }} barCategoryGap="28%">
          <CartesianGrid strokeDasharray="3 6" stroke="var(--border-subtle)" vertical={false} />
          <XAxis
            dataKey="shortMonth"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-2)", fontSize: 11 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-2)", fontSize: 11 }}
            tickFormatter={(v) => formatCompact(v)}
            width={48}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-hover)" }} />
          <Bar dataKey="pnl" radius={[5, 5, 5, 5]} maxBarSize={36}>
            {data.map((entry) => (
              <Cell
                key={entry.month}
                fill={entry.pnl >= 0 ? "var(--accent)" : "var(--negative)"}
                fillOpacity={entry.pnl >= 0 ? 0.85 : 0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
