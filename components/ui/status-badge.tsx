import { cn } from "@/lib/utils/cn";
import { ItemStatus } from "@/types";

const styleMap: Record<ItemStatus | "dueSoon", string> = {
  active: "bg-ink-100 text-ink-800",
  completed: "bg-moss/15 text-moss",
  overdue: "bg-rose/15 text-rose",
  archived: "bg-ink-100 text-ink-500",
  dueSoon: "bg-amber/15 text-amber"
};

export function StatusBadge({ status, label }: { status: ItemStatus | "dueSoon"; label?: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", styleMap[status])}>
      {label ?? status}
    </span>
  );
}
