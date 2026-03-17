import { ItemCategory, ItemStatus, RecurrenceType } from "@/types";

export function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatCategory(category: ItemCategory) {
  return sentenceCase(category);
}

export function formatStatus(status: ItemStatus) {
  return sentenceCase(status);
}

export function formatRecurrence(recurrenceType: RecurrenceType) {
  if (recurrenceType === "none") return "One-time";
  return sentenceCase(recurrenceType);
}
