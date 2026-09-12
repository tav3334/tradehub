import {
  LayoutDashboard,
  LineChart,
  History,
  CalendarDays,
  UserRound,
  Settings,
  CircleHelp,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Performance", href: "/performance", icon: LineChart },
  { label: "Trades", href: "/trades", icon: History },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export const utilityNavItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help & Support", href: "/help", icon: CircleHelp },
];
