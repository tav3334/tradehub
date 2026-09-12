"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export function WinLossDonut({
  wins,
  losses,
  winRate,
}: {
  wins: number;
  losses: number;
  winRate: number;
}) {
  const data = [
    { name: "Wins", value: wins, color: "var(--accent)" },
    { name: "Losses", value: losses, color: "var(--negative)" },
  ];

  return (
    <div className="relative h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="72%"
            outerRadius="100%"
            paddingAngle={3}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || payload.length === 0) return null;
              const p = payload[0];
              return (
                <div className="rounded-[10px] border border-border-default bg-background-elevated px-3 py-2 shadow-xl shadow-black/40">
                  <p className="text-[13px] font-medium text-foreground">
                    {p.name}: {p.value}
                  </p>
                </div>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[26px] font-semibold tracking-tight text-foreground tabular-nums">
          {winRate}%
        </span>
        <span className="text-[12px] text-muted-2">Win Rate</span>
      </div>
    </div>
  );
}
