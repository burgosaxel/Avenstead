"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/ui/brand";
import { NAV_ITEMS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-border bg-white/80 px-5 py-6 backdrop-blur lg:flex">
      <Link href="/dashboard" className="mb-8 space-y-1">
        <div className="flex justify-center">
          <BrandLogo className="w-44" />
        </div>
        <p className="text-center text-sm text-ink-500">Your path to stability</p>
      </Link>

      <nav className="space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active ? "bg-ink-900 text-white" : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl2 border border-border bg-mist p-4">
        <p className="text-sm font-semibold text-ink-900">Your path to stability.</p>
        <p className="mt-2 text-sm leading-6 text-ink-600">
          Avenstead keeps recurring responsibilities, deadlines, and documents in one steady system.
        </p>
      </div>
    </aside>
  );
}
