"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { FilterBar } from "@/components/items/filter-bar";
import { ItemsCalendar } from "@/components/items/items-calendar";
import { ItemForm } from "@/components/items/item-form";
import { ItemList } from "@/components/items/item-list";
import { useAppState } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { SearchInput } from "@/components/ui/search-input";
import { buildTemplateInitialValues, getStarterTemplates } from "@/lib/services/templates";
import { differenceInDays } from "@/lib/utils/dates";
import { ItemCategory, ItemFormInput, Template } from "@/types";

export default function ItemsPage() {
  const { state, createItem, markItemComplete, error, clearError } = useAppState();
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCategory, setActiveCategory] = useState<ItemCategory | "all">("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [submitting, setSubmitting] = useState(false);
  const [completingItemId, setCompletingItemId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("new") === "1") {
      setShowForm(true);
      setShowTemplatePicker(false);
    }
    const filter = params.get("filter");
    const category = params.get("category");
    if (filter) setActiveFilter(filter);
    if (category) setActiveCategory(category as ItemCategory);
  }, []);

  const ownerLookup = useMemo(
    () =>
      state.members.reduce(
        (acc, member) => {
          if (member.userId) acc[member.userId] = member.displayName;
          return acc;
        },
        {} as Record<string, string>
      ),
    [state.members]
  );

  const filteredItems = useMemo(() => {
    return [...state.items]
      .filter((item) => item.status !== "completed")
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      .filter((item) => (activeCategory === "all" ? true : item.category === activeCategory))
      .filter((item) => {
        if (!item.dueDate) {
          return activeFilter === "All" || activeFilter === "Assigned to me" || activeFilter === "Unassigned";
        }

        const daysUntilDue = differenceInDays(item.dueDate, new Date());
        if (activeFilter === "Due soon") return daysUntilDue >= 0 && daysUntilDue <= 7;
        if (activeFilter === "Overdue") return daysUntilDue < 0 || item.status === "overdue";
        if (activeFilter === "Assigned to me") return item.ownerUserId === state.user.id;
        if (activeFilter === "Unassigned") return !item.ownerUserId;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "category") return a.category.localeCompare(b.category);
        if (sortBy === "owner") return (a.ownerUserId ?? "").localeCompare(b.ownerUserId ?? "");
        if (!a.dueDate && !b.dueDate) return a.title.localeCompare(b.title);
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [activeCategory, activeFilter, query, sortBy, state.items, state.user.id]);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Items"
          title="Recurring responsibilities"
          description="Track the real-life tasks, deadlines, and obligations that keep your household running smoothly."
          actions={
            <div className="flex gap-2">
              <Button variant={viewMode === "list" ? "primary" : "secondary"} onClick={() => setViewMode("list")}>
                List
              </Button>
              <Button variant={viewMode === "calendar" ? "primary" : "secondary"} onClick={() => setViewMode("calendar")}>
                Calendar
              </Button>
              <Button
                onClick={() => {
                  setShowTemplatePicker((current) => !current);
                  setShowForm(false);
                }}
              >
                Add item
              </Button>
            </div>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {error ? (
              <div className="rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose">
                <p>{error}</p>
              </div>
            ) : null}
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search items"
            />
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            {viewMode === "calendar" ? (
              <ItemsCalendar items={filteredItems.filter((item) => item.dueDate)} />
            ) : filteredItems.length > 0 ? (
              <ItemList
                items={filteredItems}
                ownerLookup={ownerLookup}
                completingItemId={completingItemId}
                onComplete={async (itemId) => {
                  clearError();
                  setCompletingItemId(itemId);
                  try {
                    await markItemComplete(itemId);
                  } catch {
                    // Provider error state surfaces the message inline.
                  } finally {
                    setCompletingItemId(null);
                  }
                }}
              />
            ) : (
              <EmptyState
                title="No matching items"
                description="Try a different filter, or add an item to start building a steadier household rhythm."
              />
            )}
          </div>
          <div className="space-y-4">
            {showTemplatePicker ? (
              <Card className="space-y-3">
                <h3 className="text-lg font-semibold text-ink-900">Use a starter template</h3>
                <p className="text-sm leading-7 text-ink-600">
                  Start from a real household responsibility instead of an empty custom form.
                </p>
                <div className="space-y-2">
                  {getStarterTemplates().map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      className="w-full rounded-xl border border-border px-4 py-3 text-left hover:bg-ink-50"
                      onClick={() => {
                        setShowTemplatePicker(false);
                        setSelectedTemplate(template);
                        setShowForm(true);
                      }}
                    >
                      <p className="font-medium text-ink-900">{template.title}</p>
                      <p className="text-sm text-ink-500">{template.suggestedDescription}</p>
                    </button>
                  ))}
                </div>
                <Button variant="secondary" onClick={() => { setShowTemplatePicker(false); setShowForm(true); }}>
                  Create custom item instead
                </Button>
              </Card>
            ) : showForm ? (
              <ItemForm
                isSubmitting={submitting}
                initialValues={
                  selectedTemplate
                    ? (buildTemplateInitialValues(selectedTemplate) satisfies Partial<ItemFormInput>)
                    : undefined
                }
                ownerOptions={state.members.filter((member) => member.userId).map((member) => ({
                  value: member.userId!,
                  label: member.displayName
                }))}
                onSubmit={async (input) => {
                  clearError();
                  setSubmitting(true);

                  try {
                    await createItem(input);
                    setSelectedTemplate(null);
                    setShowForm(false);
                  } catch {
                    // Provider error state surfaces the message inline.
                  } finally {
                    setSubmitting(false);
                  }
                }}
              />
            ) : (
              <Card className="space-y-3">
                <h3 className="text-lg font-semibold text-ink-900">Add a new household item</h3>
                <p className="text-sm leading-7 text-ink-600">
                  Choose a starter template for common life-admin tasks or create a custom item from scratch.
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => setShowTemplatePicker(true)}>Use template</Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelectedTemplate(null);
                      setShowForm(true);
                    }}
                  >
                    Create custom item
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
