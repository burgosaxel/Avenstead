import { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-100",
        className
      )}
      {...props}
    />
  );
}
