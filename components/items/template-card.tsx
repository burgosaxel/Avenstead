"use client";

import { Check } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

export function TemplateCard({
  title,
  description,
  selected,
  onClick
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button className="text-left" onClick={onClick} type="button">
      <Card className={cn("h-full transition", selected && "border-ink-900 ring-2 ring-ink-100")}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-ink-900">{title}</h3>
            <p className="text-sm leading-6 text-ink-600">{description}</p>
          </div>
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border",
              selected ? "border-ink-900 bg-ink-900 text-white" : "border-border text-transparent"
            )}
          >
            <Check className="h-4 w-4" />
          </div>
        </div>
      </Card>
    </button>
  );
}
