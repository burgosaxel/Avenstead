import { Card } from "@/components/ui/card";
import { HouseholdMember } from "@/types";

export function HouseholdMemberCard({
  member,
  assignedCount
}: {
  member: HouseholdMember;
  assignedCount: number;
}) {
  return (
    <Card className="space-y-3">
      <div>
        <h3 className="font-semibold text-ink-900">{member.displayName}</h3>
        <p className="text-sm text-ink-500">{member.email}</p>
      </div>
      <div className="flex items-center justify-between text-sm text-ink-600">
        <span>{member.role}</span>
        <span>{assignedCount} assigned</span>
      </div>
      <p className="text-xs uppercase tracking-[0.15em] text-ink-400">{member.status}</p>
    </Card>
  );
}
