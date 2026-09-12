"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { dateRanges, type DateRangeId } from "@/lib/data/trader";

export function DateRangeSelect({
  value,
  onChange,
}: {
  value?: DateRangeId;
  onChange?: (id: DateRangeId) => void;
}) {
  const [internal, setInternal] = useState<DateRangeId>("3m");
  const current = value ?? internal;

  const currentLabel = dateRanges.find((r) => r.id === current)?.label ?? "3M";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="font-medium">
          {currentLabel}
          <ChevronDown className="h-3.5 w-3.5 text-muted" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {dateRanges.map((range) => (
          <DropdownMenuItem
            key={range.id}
            onClick={() => {
              setInternal(range.id);
              onChange?.(range.id);
            }}
          >
            {range.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
