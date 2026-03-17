"use client";

import { ITEM_CATEGORIES } from "@/lib/constants/categories";
import { ItemCategory } from "@/types";

export function FilterBar({
  activeFilter,
  onFilterChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange
}: {
  activeFilter: string;
  onFilterChange: (value: string) => void;
  activeCategory: ItemCategory | "all";
  onCategoryChange: (value: ItemCategory | "all") => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}) {
  const filters = ["All", "Due soon", "Overdue", "Assigned to me", "Unassigned"];

  return (
    <div className="space-y-4 rounded-xl2 border border-border bg-white/80 p-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`rounded-full px-3 py-1.5 text-sm ${
              activeFilter === filter ? "bg-ink-900 text-white" : "bg-ink-50 text-ink-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <select
          className="rounded-xl border border-border bg-white px-3 py-2 text-sm"
          value={activeCategory}
          onChange={(event) => onCategoryChange(event.target.value as ItemCategory | "all")}
        >
          <option value="all">All categories</option>
          {ITEM_CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <select
          className="rounded-xl border border-border bg-white px-3 py-2 text-sm"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="dueDate">Sort by due date</option>
          <option value="category">Sort by category</option>
          <option value="owner">Sort by owner</option>
        </select>
      </div>
    </div>
  );
}
