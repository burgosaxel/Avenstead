import Link from "next/link";
import { Paperclip } from "lucide-react";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate, formatRelativeDueDate } from "@/lib/utils/dates";
import { formatCategory, formatRecurrence } from "@/lib/utils/formatting";
import { Item } from "@/types";

export function DueItemCard({ item }: { item: Item }) {
  const relativeLabel = formatRelativeDueDate(item.dueDate);
  const badgeStatus = item.status === "overdue" || relativeLabel.includes("overdue") ? "overdue" : "dueSoon";

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href={`/items/${item.id}`} className="text-base font-semibold text-ink-900 hover:text-ink-700">
            {item.title}
          </Link>
          <p className="mt-1 text-sm text-ink-600">
            {formatCategory(item.category)} • {formatRecurrence(item.recurrenceType)}
          </p>
        </div>
        <StatusBadge status={badgeStatus} label={relativeLabel} />
      </div>
      <div className="flex items-center justify-between text-sm text-ink-500">
        <span>{formatDate(item.dueDate)}</span>
        {item.attachmentIds.length > 0 ? <Paperclip className="h-4 w-4" /> : null}
      </div>
    </Card>
  );
}
