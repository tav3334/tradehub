"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { mainNavItems, utilityNavItems } from "./nav-items";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { trader } from "@/lib/data";
import { ShieldCheck } from "lucide-react";

export function MobileDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden data-[state=open]:animate-fade-in" />
        <DialogPrimitive.Content className="fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-background-elevated border-r border-border-subtle lg:hidden">
          <DialogPrimitive.Title className="sr-only">Navigation menu</DialogPrimitive.Title>
          <div className="flex h-16 items-center justify-between px-4">
            <Logo />
            <DialogPrimitive.Close className="flex h-8 w-8 items-center justify-center rounded-[8px] text-muted hover:bg-surface hover:text-foreground">
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
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
                      onClick={() => onOpenChange(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] font-medium transition-colors",
                        isActive
                          ? "bg-surface text-foreground"
                          : "text-muted hover:bg-surface hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("h-[18px] w-[18px]", isActive ? "text-accent" : "text-muted-2")} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="mt-4 flex flex-col gap-0.5 border-t border-border-subtle pt-4">
              {utilityNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] font-medium text-muted hover:bg-surface hover:text-foreground"
                    >
                      <Icon className="h-[18px] w-[18px] text-muted-2" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-border-subtle p-3">
            <Link
              href="/profile"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-2.5 rounded-[10px] p-2 hover:bg-surface"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback>{trader.avatarInitials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-foreground">{trader.name}</span>
                <span className="flex items-center gap-1 text-[11.5px] text-muted">
                  <ShieldCheck className="h-3 w-3 text-accent" />
                  Pro Trader
                </span>
              </div>
            </Link>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
