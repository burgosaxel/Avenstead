import { AlertCircle, CalendarClock, FileWarning, Users } from "lucide-react";

import { Card } from "@/components/ui/card";

export function WeeklyBriefingCard({
  dueThisWeek,
  overdue,
  expiringDocuments,
  assignedSummary
}: {
  dueThisWeek: number;
  overdue: number;
  expiringDocuments: number;
  assignedSummary: string;
}) {
  const rows = [
    { icon: CalendarClock, label: "Due this week", value: dueThisWeek },
    { icon: AlertCircle, label: "Overdue", value: overdue },
    { icon: FileWarning, label: "Expiring documents", value: expiringDocuments },
    { icon: Users, label: "Owner focus", value: assignedSummary }
  ];

  return (
    <Card className="bg-ink-900 text-white">
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">This week in your household</p>
          <h3 className="mt-2 text-2xl font-semibold">A steadier view of what needs attention.</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            Avenstead pulls your deadlines, documents, and assignments into one weekly briefing so nothing stays vague for long.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="rounded-xl bg-white/10 p-4">
              <div className="flex items-center gap-3">
                <row.icon className="h-4 w-4 text-white/70" />
                <p className="text-sm text-white/75">{row.label}</p>
              </div>
              <p className="mt-3 text-xl font-semibold">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
