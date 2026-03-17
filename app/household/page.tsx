"use client";

import { AppShell } from "@/components/layout/app-shell";
import { HouseholdMemberCard } from "@/components/household/household-member-card";
import { useAppState } from "@/components/providers/app-provider";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function HouseholdPage() {
  const { state } = useAppState();

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Household"
          title={state.household?.name ?? "Your household"}
          description="Shared visibility starts here: who is part of the household, what they own, and what is coming up next."
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {state.members.map((member) => (
            <HouseholdMemberCard
              key={member.id}
              member={member}
              assignedCount={state.items.filter((item) => item.ownerUserId === member.userId).length}
            />
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-ink-900">Assigned responsibilities</h2>
            {state.members.map((member) => (
              <div key={member.id} className="rounded-xl bg-ink-50 p-4">
                <p className="font-medium text-ink-900">{member.displayName}</p>
                <p className="mt-1 text-sm text-ink-600">
                  {state.items.filter((item) => item.ownerUserId === member.userId).length} active responsibilities
                </p>
              </div>
            ))}
          </Card>
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-ink-900">Invite member</h2>
            <p className="text-sm leading-7 text-ink-600">
              Shared invites are prepared in the data model. The MVP keeps a clean placeholder here so future collaboration can be added without reshaping the app.
            </p>
            <div className="rounded-xl border border-dashed border-border bg-mist p-4 text-sm text-ink-600">
              Future-ready invite flow: send email invitation, assign role, and connect household member to auth account.
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
