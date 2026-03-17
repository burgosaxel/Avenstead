const DAY_MS = 1000 * 60 * 60 * 24;

export function startOfDay(input: Date | string) {
  const date = typeof input === "string" ? new Date(input) : new Date(input);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function addDays(input: Date | string, days: number) {
  const date = startOfDay(input);
  date.setDate(date.getDate() + days);
  return date;
}

export function addMonthsSafe(input: Date | string, months: number) {
  const date = startOfDay(input);
  const originalDay = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(originalDay, lastDay));
  return date;
}

export function differenceInDays(a: Date | string, b: Date | string) {
  return Math.round((startOfDay(a).getTime() - startOfDay(b).getTime()) / DAY_MS);
}

export function isWithinDays(input: string | null, days: number) {
  if (!input) return false;
  const delta = differenceInDays(input, new Date());
  return delta >= 0 && delta <= days;
}

export function formatDate(input: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!input) return "No date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options
  }).format(new Date(input));
}

export function formatRelativeDueDate(input: string | null) {
  if (!input) return "No date";
  const delta = differenceInDays(input, new Date());
  if (delta === 0) return "Due today";
  if (delta === 1) return "Due tomorrow";
  if (delta > 1) return `Due in ${delta} days`;
  if (delta === -1) return "1 day overdue";
  return `${Math.abs(delta)} days overdue`;
}

export function toIsoDate(input: Date | string) {
  return startOfDay(input).toISOString();
}
