import { addDays, addMonthsSafe, toIsoDate } from "@/lib/utils/dates";
import { RecurrenceType } from "@/types";

export function computeNextDueDate(
  dueDate: string | null,
  recurrenceType: RecurrenceType,
  interval = 1
) {
  if (!dueDate) return null;

  const step = Math.max(interval, 1);

  switch (recurrenceType) {
    case "daily":
      return toIsoDate(addDays(dueDate, step));
    case "weekly":
      return toIsoDate(addDays(dueDate, step * 7));
    case "monthly":
      return toIsoDate(addMonthsSafe(dueDate, step));
    case "quarterly":
      return toIsoDate(addMonthsSafe(dueDate, step * 3));
    case "yearly":
      return toIsoDate(addMonthsSafe(dueDate, step * 12));
    default:
      return null;
  }
}
