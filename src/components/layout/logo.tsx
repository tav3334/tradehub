import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

function splitProductName(name: string): [string, string] {
  // "TradeHub" -> ["Trade", "Hub"]; falls back to splitting at the midpoint
  // for names without an internal capital.
  const match = name.match(/^([A-Z][a-z0-9]*)([A-Z].*)$/);
  if (match) return [match[1], match[2]];
  const mid = Math.ceil(name.length / 2);
  return [name.slice(0, mid), name.slice(mid)];
}

export function Logo({ className, iconOnly }: { className?: string; iconOnly?: boolean }) {
  const [first, second] = splitProductName(brand.productName);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-accent to-accent-strong">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 11.5L6 7L9 10L14 4"
            stroke="#06120e"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 4H14V7.5"
            stroke="#06120e"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {!iconOnly && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground uppercase">
          {first}
          <span className="text-accent">{second}</span>
        </span>
      )}
    </div>
  );
}
