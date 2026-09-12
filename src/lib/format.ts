export function formatCurrency(value: number, opts?: { signed?: boolean }): string {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  if (opts?.signed) {
    return value < 0 ? `-${formatted}` : `+${formatted}`;
  }
  return value < 0 ? `-${formatted}` : formatted;
}

/**
 * Formats an instrument price (entry/exit/SL/TP) — not a currency amount.
 * FX pairs quote to 4-5 decimals, gold/silver to 2-3, indices to 1-2, so the
 * precision adapts to magnitude rather than always showing 2 decimals.
 */
export function formatPrice(value: number): string {
  const abs = Math.abs(value);
  const decimals = abs >= 1000 ? 1 : abs >= 100 ? 2 : abs >= 10 ? 3 : 4;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(value: number, opts?: { signed?: boolean }): string {
  const formatted = `${Math.abs(value).toFixed(1)}%`;
  if (opts?.signed) {
    return value < 0 ? `-${formatted}` : `+${formatted}`;
  }
  return value < 0 ? `-${formatted}` : formatted;
}

export function formatR(value: number, opts?: { signed?: boolean }): string {
  const signed = opts?.signed ?? true;
  const sign = value < 0 ? "-" : signed ? "+" : "";
  return `${sign}${Math.abs(value).toFixed(1)}R`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(date: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString("en-US", opts ?? { month: "short", day: "numeric", year: "numeric" });
}
