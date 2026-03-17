import Link from "next/link";
import { CheckCircle2, Paperclip } from "lucide-react";

import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate, formatRelativeDueDate } from "@/lib/utils/dates";
import { formatCategory, formatRecurrence } from "@/lib/utils/formatting";
import { Item } from "@/types";

export function ItemList({
  items,
  ownerLookup,
  onComplete,
  completingItemId
}: {
  items: Item[];
  ownerLookup: Record<string, string>;
  onComplete: (itemId: string) => Promise<void> | void;
  completingItemId?: string | null;
}) {
  return (
    <div className="overflow-hidden rounded-xl2 border border-border bg-white">
      <div className="hidden grid-cols-[72px_2fr_1fr_1fr_1fr_120px] gap-4 border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink-500 md:grid">
        <span>Done</span>
        <span>Item</span>
        <span>Due date</span>
        <span>Category</span>
        <span>Owner</span>
        <span>Status</span>
      </div>
      <div className="divide-y divide-border">
        {items.map((item) => {
          const relative = formatRelativeDueDate(item.dueDate);
          const badgeStatus =
            relative.includes("overdue") || item.status === "overdue"
              ? "overdue"
              : item.dueDate
                ? "dueSoon"
                : "active";

          return (
            <div
              key={item.id}
              className="grid gap-3 px-5 py-4 transition hover:bg-ink-50 md:grid-cols-[72px_2fr_1fr_1fr_1fr_120px] md:items-center"
            >
              <div className="flex items-center">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-600 hover:bg-ink-50"
                  onClick={() => onComplete(item.id)}
                  disabled={completingItemId === item.id}
                  aria-label={`Mark ${item.title} complete`}
                >
                  <CheckCircle2 className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Link href={`/items/${item.id}`} className="font-medium text-ink-900 hover:text-ink-700">
                    {item.title}
                  </Link>
                  {item.attachmentIds.length > 0 ? <Paperclip className="h-4 w-4 text-ink-400" /> : null}
                </div>
                <p className="text-sm text-ink-500">{formatRecurrence(item.recurrenceType)}</p>
              </div>
              <div className="text-sm text-ink-600">
                <p>{formatDate(item.dueDate)}</p>
                <p className="text-xs text-ink-400">{item.dueDate ? relative : "No date set"}</p>
              </div>
              <p className="text-sm text-ink-600">{formatCategory(item.category)}</p>
              <p className="text-sm text-ink-600">
                {item.ownerUserId ? ownerLookup[item.ownerUserId] ?? "Unknown" : "Unassigned"}
              </p>
              <div>
                <StatusBadge
                  status={badgeStatus}
                  label={item.status === "overdue" ? "Overdue" : item.dueDate ? relative : "No date"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
