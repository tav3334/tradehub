"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SearchDialog } from "./search-dialog";
import { Notifications } from "./notifications";
import { DateRangeSelect } from "./date-range-select";
import { AccountSelect } from "./account-select";
import { trader } from "@/lib/data";
import { Logo } from "./logo";

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border-subtle bg-background/90 backdrop-blur-md px-4 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex lg:hidden h-9 w-9 items-center justify-center rounded-[10px] text-muted hover:bg-surface hover:text-foreground"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex lg:hidden">
        <Logo iconOnly />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <div className="hidden sm:block">
          <SearchDialog />
        </div>
        <div className="hidden md:block">
          <DateRangeSelect />
        </div>
        <div className="hidden sm:block">
          <AccountSelect />
        </div>
        <Notifications />
        <Link href="/profile" className="ml-1">
          <Avatar className="h-8 w-8 border border-border-default">
            <AvatarFallback className="text-[12px]">{trader.avatarInitials}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
