import { FileClock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/dates";
import { DocumentRecord } from "@/types";

export function DocumentCard({
  document,
  linkedItemTitle
}: {
  document: DocumentRecord;
  linkedItemTitle?: string;
}) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-ink-900">{document.title}</h3>
          <p className="mt-1 text-sm text-ink-500">{document.category}</p>
        </div>
        <FileClock className="h-5 w-5 text-ink-300" />
      </div>
      <div className="space-y-1 text-sm text-ink-600">
        <p>Linked item: {linkedItemTitle ?? "Unlinked"}</p>
        <p>Expiration: {formatDate(document.expirationDate)}</p>
        <p>Uploaded: {formatDate(document.createdAt)}</p>
      </div>
    </Card>
  );
}
