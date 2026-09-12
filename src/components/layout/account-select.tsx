"use client";

import { useState } from "react";
import { ChevronDown, CircleDot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { accounts } from "@/lib/data/trader";

export function AccountSelect() {
  const [selected, setSelected] = useState(accounts[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="max-w-[180px] font-medium">
          <CircleDot className="h-3 w-3 text-accent" />
          <span className="truncate">{selected.name}</span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[220px]">
        <DropdownMenuLabel>Trading accounts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {accounts.map((acc) => (
          <DropdownMenuItem key={acc.id} onClick={() => setSelected(acc)}>
            <CircleDot
              className={`h-3 w-3 ${acc.type === "Live" ? "text-accent" : "text-muted-2"}`}
            />
            <span className="flex-1 truncate">{acc.name}</span>
            <span className="text-[11px] text-muted-2">{acc.type}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
