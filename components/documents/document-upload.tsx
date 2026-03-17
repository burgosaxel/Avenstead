"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DOCUMENT_CATEGORIES } from "@/lib/constants/categories";
import { validateDocumentForm } from "@/lib/utils/validation";
import { DocumentCategory, DocumentFormInput } from "@/types";

export function DocumentUpload({
  onSubmit,
  itemOptions,
  isSubmitting = false,
  initialLinkedItemId = null
}: {
  onSubmit: (input: DocumentFormInput) => Promise<void> | void;
  itemOptions: { value: string; label: string }[];
  isSubmitting?: boolean;
  initialLinkedItemId?: string | null;
}) {
  const [form, setForm] = useState<DocumentFormInput>({
    title: "",
    category: "other",
    linkedItemId: initialLinkedItemId,
    expirationDate: null,
    file: null
  });
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <Card className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-ink-700">Document name</label>
          <Input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Insurance card"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-ink-700">File</label>
          <Input
            type="file"
            onChange={(event) =>
              setForm((current) => ({ ...current, file: event.target.files?.[0] ?? null }))
            }
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink-700">Category</label>
          <Select
            value={form.category}
            onChange={(event) =>
              setForm((current) => ({ ...current, category: event.target.value as DocumentCategory }))
            }
          >
            {DOCUMENT_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink-700">Expiration date</label>
          <Input
            type="date"
            value={form.expirationDate ?? ""}
            onChange={(event) =>
              setForm((current) => ({ ...current, expirationDate: event.target.value || null }))
            }
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-ink-700">Link to item</label>
          <Select
            value={form.linkedItemId ?? ""}
            onChange={(event) => setForm((current) => ({ ...current, linkedItemId: event.target.value || null }))}
          >
            <option value="">Leave unlinked</option>
            {itemOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
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
              expirationDate: form.expirationDate ? new Date(form.expirationDate).toISOString() : null
            };
            const validationErrors = validateDocumentForm(normalized);
            if (validationErrors.length > 0) {
              setErrors(validationErrors);
              return;
            }
            setErrors([]);
            await onSubmit(normalized);
          }}
        >
          {isSubmitting ? "Uploading..." : "Add document"}
        </Button>
      </div>
    </Card>
  );
}
