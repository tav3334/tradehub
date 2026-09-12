"use client";

import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    title: "New equity high",
    body: "Your account reached a new all-time high of $122,760.",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Weekly summary ready",
    body: "Your performance recap for last week is available.",
    time: "1d ago",
  },
  {
    id: 3,
    title: "Drawdown alert cleared",
    body: "Equity has recovered above your risk threshold.",
    time: "3d ago",
  },
];

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((n) => (
          <DropdownMenuItem key={n.id} className="flex-col items-start gap-0.5 py-2.5">
            <div className="flex w-full items-center justify-between">
              <span className="text-[13px] font-medium text-foreground">{n.title}</span>
              <span className="text-[11px] text-muted-2">{n.time}</span>
            </div>
            <p className="text-[12px] leading-snug text-muted">{n.body}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
