import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl2 border border-border bg-white/90 p-5 shadow-soft backdrop-blur-sm", className)}
      {...props}
    />
  );
}
