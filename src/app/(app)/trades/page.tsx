"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { TradesFilters, type TradesFilterState } from "@/components/dashboard/trades-filters";
import { TradesTable } from "@/components/dashboard/trades-table";
import { Pagination } from "@/components/dashboard/pagination";
import { TradeDetailDrawer } from "@/components/dashboard/trade-detail-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { trades } from "@/lib/data";
import type { Trade } from "@/lib/data/types";

const PAGE_SIZE = 12;

export default function TradesPage() {
  const [filters, setFilters] = useState<TradesFilterState>({
    search: "",
    symbol: "All Symbols",
    result: "All Results",
    direction: "All Directions",
  });
  const [page, setPage] = useState(1);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sorted = useMemo(
    () => [...trades].sort((a, b) => (a.date < b.date ? 1 : -1)),
    []
  );

  const filtered = useMemo(() => {
    return sorted.filter((t) => {
      if (filters.symbol !== "All Symbols" && t.symbol !== filters.symbol) return false;
      if (filters.result !== "All Results" && t.status !== filters.result) return false;
      if (filters.direction !== "All Directions" && t.direction !== filters.direction) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!t.symbol.toLowerCase().includes(q) && !t.setup.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [sorted, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleFilterChange(next: TradesFilterState) {
    setFilters(next);
    setPage(1);
  }

  function handleViewTrade(trade: Trade) {
    setSelectedTrade(trade);
    setDrawerOpen(true);
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Trade History"
        subtitle="A complete, searchable journal of every executed trade."
      />

      <Card>
        <CardContent>
          <TradesFilters filters={filters} onChange={handleFilterChange} />

          <div className="mt-5">
            {pageItems.length > 0 ? (
              <TradesTable trades={pageItems} onViewTrade={handleViewTrade} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
                <p className="text-[14px] font-medium text-foreground">No trades found</p>
                <p className="text-[13px] text-muted">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>

          {filtered.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12.5px] text-muted-2">
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} trades
              </p>
              <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </CardContent>
      </Card>

      <TradeDetailDrawer trade={selectedTrade} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}
