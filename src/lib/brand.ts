/**
 * Central brand configuration. Change these values to re-skin the product
 * (name, trader identity, accent color, currency) without touching
 * individual components or pages.
 */
export const brand = {
  productName: "ProfiteLab",
  productNameShort: "PL",
  tagline: "Trading Performance Platform",
  description:
    "ProfiteLab is a trading-focused platform built around disciplined execution, performance tracking and transparent analytics.",

  trader: {
    name: "Hatim",
    role: "Professional Trader",
    avatarInitials: "H",
    avatarUrl: undefined as string | undefined,
  },

  accentColor: "#35D0A3",
  accentColorStrong: "#29B88D",

  currency: "USD" as const,
  currencySymbol: "$",

  isDemo: true,
} as const;
