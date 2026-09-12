"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, LayoutDashboard, LineChart, History, CalendarDays, UserRound } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { trades } from "@/lib/data";

const quickLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Performance Analytics", href: "/performance", icon: LineChart },
  { label: "Trade History", href: "/trades", icon: History },
  { label: "Trading Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredLinks = quickLinks.filter((l) =>
    l.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredTrades = query
    ? trades
        .filter((t) => t.symbol.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : [];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search className="h-[18px] w-[18px]" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0 gap-0" hideClose>
          <div className="flex items-center gap-2.5 border-b border-border-subtle px-4 py-3">
            <Search className="h-4 w-4 text-muted" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, symbols, trades..."
              className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-2 outline-none"
            />
            <kbd className="rounded-md border border-border-default px-1.5 py-0.5 text-[11px] text-muted-2">
              Esc
            </kbd>
          </div>
          <div className="max-h-[320px] overflow-y-auto p-2">
            <p className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-2">
              Pages
            </p>
            {filteredLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.href}
                  onClick={() => {
                    router.push(link.href);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left text-[13px] text-foreground transition-colors hover:bg-surface-hover"
                >
                  <Icon className="h-4 w-4 text-muted" />
                  {link.label}
                </button>
              );
            })}
            {filteredTrades.length > 0 && (
              <>
                <p className="mt-2 px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-2">
                  Trades
                </p>
                {filteredTrades.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      router.push("/trades");
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center justify-between rounded-[8px] px-2.5 py-2 text-left text-[13px] text-foreground transition-colors hover:bg-surface-hover"
                  >
                    <span>
                      {t.symbol} · {t.direction}
                    </span>
                    <span className={t.pnl >= 0 ? "text-accent" : "text-negative"}>
                      {t.pnl >= 0 ? "+" : ""}
                      {t.pnl}
                    </span>
                  </button>
                ))}
              </>
            )}
            {query && filteredLinks.length === 0 && filteredTrades.length === 0 && (
              <p className="px-2.5 py-6 text-center text-[13px] text-muted">
                No results for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
