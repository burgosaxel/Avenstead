"use client";

import { AppShell } from "@/components/layout/app-shell";
import { useAppState } from "@/components/providers/app-provider";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function SettingsPage() {
  const { state, logout, error, clearError } = useAppState();

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Settings"
          title="Preferences and household controls"
          description="Shape reminder timing, weekly summaries, and the settings foundation for future billing and privacy controls."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-ink-900">Reminder preferences</h2>
            <p className="text-sm text-ink-600">Current lead days: {state.settings.reminderLeadDays.join(", ")} days before due date.</p>
            <p className="text-sm text-ink-600">Weekly summary: {state.settings.weeklySummaryEnabled ? "Enabled" : "Disabled"}</p>
            <p className="text-sm text-ink-600">Preferred summary day: {state.settings.weeklySummaryDay}</p>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-ink-900">Household settings</h2>
            <p className="text-sm text-ink-600">Household name: {state.settings.householdName}</p>
            <p className="text-sm text-ink-600">Categories are built-in for the MVP and ready for admin customization later.</p>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-ink-900">Export data</h2>
            <p className="text-sm text-ink-600">Placeholder for household export tooling and backup options.</p>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-ink-900">Privacy, security, and billing</h2>
            <p className="text-sm text-ink-600">
              Reserved for Firebase auth controls, account security, and subscription billing in later iterations.
            </p>
            {error ? (
              <div className="rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose">
                <p>{error}</p>
              </div>
            ) : null}
            <button
              className="rounded-xl bg-ink-900 px-4 py-2 text-sm font-medium text-white"
              onClick={async () => {
                clearError();
                try {
                  await logout();
                } catch {
                  // Provider error state surfaces the message inline.
                }
              }}
            >
              Sign out
            </button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
