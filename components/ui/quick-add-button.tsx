"use client";

import Link from "next/link";
import { FileText, ListTodo, Plus } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";

export function QuickAddButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
        onClick={() => setOpen((current) => !current)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Quick add
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-border bg-white p-2 shadow-soft">
          <Link
            href="/items?new=1"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
            onClick={() => setOpen(false)}
          >
            <ListTodo className="h-4 w-4" />
            New item
          </Link>
          <Link
            href="/documents?new=1"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
            onClick={() => setOpen(false)}
          >
            <FileText className="h-4 w-4" />
            New document
          </Link>
        </div>
      ) : null}
    </div>
  );
}
