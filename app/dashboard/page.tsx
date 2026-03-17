"use client";

import { AppShell } from "@/components/layout/app-shell";
import { CategoryCard } from "@/components/dashboard/category-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DueItemCard } from "@/components/dashboard/due-item-card";
import { WeeklyBriefingCard } from "@/components/dashboard/weekly-briefing-card";
import { useAppState } from "@/components/providers/app-provider";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { QuickAddButton } from "@/components/ui/quick-add-button";
import { ITEM_CATEGORIES } from "@/lib/constants/categories";

export default function DashboardPage() {
  const { state, weeklyBriefing } = useAppState();

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Home"
          title={`Good evening, ${state.user.fullName.split(" ")[0]}`}
          description="Stay ahead of what needs attention across your household this week."
          actions={<QuickAddButton />}
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            label="Needs attention soon"
            value={weeklyBriefing.dueThisWeek.length}
            detail="Next 7 days"
            href="/items?filter=Due%20soon"
          />
          <DashboardStatCard
            label="Overdue"
            value={weeklyBriefing.overdue.length}
            tone="danger"
            detail="Catch these first"
            href="/items?filter=Overdue"
          />
          <DashboardStatCard
            label="Expiring documents"
            value={weeklyBriefing.expiringDocuments.length}
            tone="warning"
            detail="Next 30 days"
            href="/documents"
          />
          <DashboardStatCard
            label="Household members"
            value={state.members.length}
            tone="positive"
            detail={state.household?.name ?? "No household"}
            href="/household"
          />
        </section>

        <WeeklyBriefingCard
          dueThisWeek={weeklyBriefing.dueThisWeek.length}
          overdue={weeklyBriefing.overdue.length}
          expiringDocuments={weeklyBriefing.expiringDocuments.length}
          assignedSummary={
            weeklyBriefing.ownerCounts[0]
              ? `${weeklyBriefing.ownerCounts[0].displayName} leads with ${weeklyBriefing.ownerCounts[0].count} items`
              : "No assignments yet"
          }
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <PageHeader title="Needs attention" description="Upcoming responsibilities that are easiest to stay ahead of now." />
            {weeklyBriefing.dueThisWeek.length > 0 ? (
              <div className="grid gap-4">
                {weeklyBriefing.dueThisWeek.slice(0, 4).map((item) => (
                  <DueItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Nothing urgent right now"
                description="Once you add recurring household responsibilities, Avenstead will surface what matters next."
              />
            )}
          </div>
          <div className="space-y-4">
            <PageHeader title="Overdue" description="Loose ends that could turn into stress, fees, or friction." />
            {weeklyBriefing.overdue.length > 0 ? (
              <div className="grid gap-4">
                {weeklyBriefing.overdue.map((item) => (
                  <DueItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No overdue items"
                description="You’re in a good place. Keep checking in weekly to stay steady."
              />
            )}
          </div>
        </section>

        <section className="space-y-4">
          <PageHeader
            title="Category snapshot"
            description="A quick view of where household admin is currently concentrated."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ITEM_CATEGORIES.map((category) => (
              <CategoryCard
                key={category.value}
                label={category.label}
                count={weeklyBriefing.categoryCounts[category.value] ?? 0}
                description={category.description}
                href={`/items?category=${category.value}`}
              />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
