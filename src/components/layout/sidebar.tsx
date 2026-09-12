"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { mainNavItems, utilityNavItems } from "./nav-items";
import { trader } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ShieldCheck } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-[248px] lg:flex-col lg:fixed lg:inset-y-0 lg:z-30 border-r border-border-subtle bg-background">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-0.5">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13.5px] font-medium transition-colors",
                    isActive
                      ? "bg-surface text-foreground"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[17px] w-[17px] shrink-0 transition-colors",
                      isActive ? "text-accent" : "text-muted-2 group-hover:text-muted"
                    )}
                  />
                  {item.label}
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-2">
        <ul className="flex flex-col gap-0.5">
          {utilityNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13.5px] font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  <Icon className="h-[17px] w-[17px] shrink-0 text-muted-2" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-border-subtle p-3">
        <Link
          href="/profile"
          className="flex items-center gap-2.5 rounded-[10px] p-2 transition-colors hover:bg-surface"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback>{trader.avatarInitials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[13px] font-medium text-foreground">
              {trader.name}
            </span>
            <span className="flex items-center gap-1 text-[11.5px] text-muted">
              <ShieldCheck className="h-3 w-3 text-accent" />
              Pro Trader
            </span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
