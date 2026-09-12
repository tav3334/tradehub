"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { MobileNav } from "./mobile-nav";
import { MobileDrawer } from "./mobile-drawer";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
        <div className="lg:pl-[248px]">
          <TopBar onMenuClick={() => setDrawerOpen(true)} />
          <main className="px-4 py-6 pb-24 lg:px-8 lg:py-8 lg:pb-8">{children}</main>
        </div>
        <MobileNav />
      </div>
    </TooltipProvider>
  );
}
