/**
 * Central brand configuration. Change these values to re-skin the product
 * (name, trader identity, accent color, currency) without touching
 * individual components or pages.
 */
export const brand = {
  productName: "TradeHub",
  productNameShort: "TH",
  tagline: "Trading Performance Hub",
  description:
    "A premium trading performance dashboard for tracking equity growth, risk metrics, and trade history.",

  trader: {
    name: "Alex Morgan",
    role: "Professional Trader",
    avatarInitials: "AM",
    avatarUrl: undefined as string | undefined,
  },

  accentColor: "#35D0A3",
  accentColorStrong: "#29B88D",

  currency: "USD" as const,
  currencySymbol: "$",

  isDemo: true,
} as const;
