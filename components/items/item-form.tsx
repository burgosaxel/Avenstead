"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ITEM_CATEGORIES } from "@/lib/constants/categories";
import { validateItemForm } from "@/lib/utils/validation";
import { ItemCategory, ItemFormInput, RecurrenceType } from "@/types";

export function ItemForm({
  onSubmit,
  ownerOptions,
  initialValues,
  isSubmitting = false
}: {
  onSubmit: (input: ItemFormInput) => Promise<void> | void;
  ownerOptions: { value: string; label: string }[];
  initialValues?: Partial<ItemFormInput>;
  isSubmitting?: boolean;
}) {
  const [form, setForm] = useState<ItemFormInput>({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    category: initialValues?.category ?? "bills",
    dueDate: initialValues?.dueDate?.slice(0, 10) ?? null,
    recurrenceType: initialValues?.recurrenceType ?? "monthly",
    ownerUserId: initialValues?.ownerUserId ?? null,
    reminderOffsets: initialValues?.reminderOffsets ?? [7, 2],
    note: initialValues?.note ?? ""
  });
  const [errors, setErrors] = useState<string[]>([]);

  const recurrenceOptions = useMemo<RecurrenceType[]>(
    () => ["none", "weekly", "monthly", "quarterly", "yearly"],
    []
  );

  return (
    <Card className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-ink-700">Title</label>
          <Input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Electric bill"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink-700">Category</label>
          <Select
            value={form.category}
            onChange={(event) =>
              setForm((current) => ({ ...current, category: event.target.value as ItemCategory }))
            }
          >
            {ITEM_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink-700">Due date</label>
          <div className="space-y-2">
            <Input
              type="date"
              value={form.dueDate ?? ""}
              onChange={(event) =>
                setForm((current) => ({ ...current, dueDate: event.target.value || null }))
              }
            />
            <button
              type="button"
              className="text-sm font-medium text-ink-600 underline-offset-4 hover:underline"
              onClick={() => setForm((current) => ({ ...current, dueDate: null }))}
            >
              Set to No date
            </button>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink-700">Recurrence</label>
          <Select
            value={form.recurrenceType}
            onChange={(event) =>
              setForm((current) => ({ ...current, recurrenceType: event.target.value as RecurrenceType }))
            }
          >
            {recurrenceOptions.map((option) => (
              <option key={option} value={option}>
                {option === "none" ? "One-time" : option}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink-700">Owner</label>
          <Select
            value={form.ownerUserId ?? ""}
            onChange={(event) =>
              setForm((current) => ({ ...current, ownerUserId: event.target.value || null }))
            }
          >
            <option value="">Unassigned</option>
            {ownerOptions.map((owner) => (
              <option key={owner.value} value={owner.value}>
                {owner.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-ink-700">Description</label>
          <Textarea
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            placeholder="Add useful context, account details, or prep notes."
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-ink-700">Private note</label>
          <Textarea
            value={form.note}
            onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
            placeholder="Optional reminder details or household context."
          />
        </div>
      </div>
      {errors.length > 0 ? (
        <div className="rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}
      <div className="flex justify-end">
        <Button
          disabled={isSubmitting}
          onClick={async () => {
            const normalized = {
              ...form,
              dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null
            };
            const validationErrors = validateItemForm(normalized);
            if (validationErrors.length > 0) {
              setErrors(validationErrors);
              return;
            }
            setErrors([]);
            await onSubmit(normalized);
          }}
        >
          {isSubmitting ? "Saving..." : "Save item"}
        </Button>
      </div>
    </Card>
  );
}
