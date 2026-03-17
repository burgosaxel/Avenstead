"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/dates";
import { Item } from "@/types";

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getCalendarStart(date: Date) {
  const start = getMonthStart(date);
  const day = start.getDay();
  start.setDate(start.getDate() - day);
  return start;
}

export function ItemsCalendar({ items }: { items: Item[] }) {
  const [month, setMonth] = useState(() => getMonthStart(new Date()));

  const datedItems = useMemo(() => items.filter((item) => item.dueDate), [items]);
  const days = useMemo(() => {
    const start = getCalendarStart(month);
    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      const isoDay = day.toISOString().slice(0, 10);
      return {
        date: day,
        isoDay,
        items: datedItems.filter((item) => item.dueDate?.slice(0, 10) === isoDay)
      };
    });
  }, [datedItems, month]);

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-ink-900">
            {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h3>
          <p className="text-sm text-ink-500">Items with due dates appear on the calendar.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl border border-border p-2 text-ink-600"
            onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-xl border border-border p-2 text-ink-600"
            onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-ink-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const inMonth = day.date.getMonth() === month.getMonth();

          return (
            <div
              key={day.isoDay}
              className={`min-h-36 rounded-xl border p-3 ${
                inMonth ? "border-border bg-white" : "border-border/60 bg-white/50"
              }`}
            >
              <p className={`text-sm font-medium ${inMonth ? "text-ink-900" : "text-ink-400"}`}>{day.date.getDate()}</p>
              <div className="mt-3 space-y-2">
                {day.items.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`/items/${item.id}`}
                    className="block rounded-lg bg-ink-50 px-2 py-1.5 text-xs text-ink-700 hover:bg-ink-100"
                    title={`${item.title} • ${formatDate(item.dueDate)}`}
                  >
                    {item.title}
                  </Link>
                ))}
                {day.items.length > 3 ? (
                  <p className="text-xs text-ink-500">+{day.items.length - 3} more</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
