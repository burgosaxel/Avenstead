import type { Route } from "next";
import { FileText, Home, House, LayoutDashboard, Settings } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/dashboard" as Route, label: "Home", icon: Home },
  { href: "/items" as Route, label: "Items", icon: LayoutDashboard },
  { href: "/documents" as Route, label: "Documents", icon: FileText },
  { href: "/household" as Route, label: "Household", icon: House },
  { href: "/settings" as Route, label: "Settings", icon: Settings }
];
