import raw from "./trades-raw.json";
import type { Trade } from "./types";
import { formatCurrency } from "@/lib/format";

const noteTemplates: Record<string, (t: Omit<Trade, "notes">) => string> = {
  Win: (t) =>
    `Clean ${t.setup.toLowerCase()} on ${t.symbol}. Entry aligned with higher-timeframe bias, risk defined at ${formatCurrency(
      t.risk
    )} before execution. Managed to target without interference.`,
  Loss: (t) =>
    `${t.setup} on ${t.symbol} invalidated after entry. Stop respected as planned — ${Math.abs(
      t.rMultiple
    )}R giveback within acceptable risk parameters.`,
};

export const trades: Trade[] = (raw as Omit<Trade, "notes">[]).map((t) => ({
  ...t,
  notes: noteTemplates[t.status](t),
}));

export function getTradeById(id: string): Trade | undefined {
  return trades.find((t) => t.id === id);
}
