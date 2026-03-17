import { ReactNode } from "react";

import { Card } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="border-dashed bg-white/70 text-center">
      <div className="mx-auto max-w-md space-y-3 py-8">
        <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
        <p className="text-sm leading-6 text-ink-600">{description}</p>
        {action}
      </div>
    </Card>
  );
}
