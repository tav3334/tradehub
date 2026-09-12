"use client";

import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface TradesFilterState {
  search: string;
  symbol: string;
  result: string;
  direction: string;
}

const symbols = ["All Symbols", "EURUSD", "GBPUSD", "XAUUSD", "NAS100", "US30", "USDJPY", "AUDUSD", "XAGUSD"];

export function TradesFilters({
  filters,
  onChange,
}: {
  filters: TradesFilterState;
  onChange: (filters: TradesFilterState) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
      <div className="relative flex-1 sm:max-w-[260px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
        <input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search symbol or setup..."
          className="h-9 w-full rounded-[10px] border border-border-default bg-surface pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-2 outline-none transition-colors focus:border-accent/50"
        />
      </div>

      <Select value={filters.symbol} onValueChange={(v) => onChange({ ...filters, symbol: v })}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {symbols.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.direction} onValueChange={(v) => onChange({ ...filters, direction: v })}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Directions">All Directions</SelectItem>
          <SelectItem value="Long">Long</SelectItem>
          <SelectItem value="Short">Short</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.result} onValueChange={(v) => onChange({ ...filters, result: v })}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Results">All Results</SelectItem>
          <SelectItem value="Win">Win</SelectItem>
          <SelectItem value="Loss">Loss</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
