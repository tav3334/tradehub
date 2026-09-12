"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCompact, formatCurrency } from "@/lib/format";

interface DayStat {
  day: string;
  avgPnl: number;
  trades: number;
}

export function BestDaysChart({ data }: { data: DayStat[] }) {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }} barCategoryGap="32%">
          <CartesianGrid strokeDasharray="3 6" stroke="var(--border-subtle)" vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-2)", fontSize: 11 }}
            tickFormatter={(v: string) => v.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-2)", fontSize: 11 }}
            tickFormatter={(v) => formatCompact(v)}
            width={44}
          />
          <Tooltip
            cursor={{ fill: "var(--surface-hover)" }}
            content={({ active, payload }) => {
              if (!active || !payload || payload.length === 0) return null;
              const p = payload[0].payload as DayStat;
              return (
                <div className="rounded-[10px] border border-border-default bg-background-elevated px-3 py-2 shadow-xl shadow-black/40">
                  <p className="text-[11px] text-muted-2">{p.day}</p>
                  <p
                    className={`text-[14px] font-semibold tabular-nums ${
                      p.avgPnl >= 0 ? "text-accent" : "text-negative"
                    }`}
                  >
                    {formatCurrency(p.avgPnl, { signed: true })} avg
                  </p>
                  <p className="text-[11px] text-muted-2">{p.trades} trades</p>
                </div>
              );
            }}
          />
          <Bar dataKey="avgPnl" radius={[5, 5, 5, 5]} maxBarSize={40}>
            {data.map((entry) => (
              <Cell key={entry.day} fill={entry.avgPnl >= 0 ? "var(--accent)" : "var(--negative)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
