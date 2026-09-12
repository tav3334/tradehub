export type Direction = "Long" | "Short";
export type TradeStatus = "Win" | "Loss";

export interface Trade {
  id: string;
  date: string;
  symbol: string;
  direction: Direction;
  setup: string;
  entry: number;
  stopLoss: number;
  takeProfit: number;
  exit: number;
  risk: number;
  pnl: number;
  rMultiple: number;
  status: TradeStatus;
  duration: string;
  notes?: string;
}

export interface EquityPoint {
  date: string;
  label: string;
  equity: number;
}

export interface MonthlyStat {
  month: string;
  shortMonth: string;
  pnl: number;
  trades: number;
  winRate: number;
}

export interface DayPnl {
  date: string;
  pnl: number;
  trades: number;
}

export interface Trader {
  name: string;
  role: string;
  location: string;
  tradingSince: number;
  markets: string[];
  strategy: string;
  bio: string;
  avatarInitials: string;
}

export interface Account {
  balance: number;
  startingBalance: number;
  totalProfit: number;
  totalProfitPct: number;
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  maxDrawdownPct: number;
  totalTrades: number;
}
