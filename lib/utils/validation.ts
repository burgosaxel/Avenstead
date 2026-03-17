import { DocumentFormInput, ItemFormInput } from "@/types";

export function validateItemForm(input: ItemFormInput) {
  const errors: string[] = [];

  if (!input.title.trim()) errors.push("Title is required.");
  if (!input.category) errors.push("Category is required.");

  return errors;
}

export function validateDocumentForm(input: DocumentFormInput) {
  const errors: string[] = [];

  if (!input.title.trim()) errors.push("Document name is required.");
  if (!input.category) errors.push("Document category is required.");
  if (!input.file) errors.push("A file is required.");

  return errors;
}
