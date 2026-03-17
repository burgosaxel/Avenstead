"use client";

import { useState } from "react";
import { notFound } from "next/navigation";

import { DocumentUpload } from "@/components/documents/document-upload";
import { AppShell } from "@/components/layout/app-shell";
import { useAppState } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils/dates";
import { formatCategory, formatRecurrence } from "@/lib/utils/formatting";

export function ItemDetailView({ id }: { id: string }) {
  const { state, markItemComplete, updateItem, addDocument, error, clearError } = useAppState();
  const item = state.items.find((entry) => entry.id === id);
  const [submitting, setSubmitting] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [noteDraft, setNoteDraft] = useState(item?.note ?? "");

  if (!item) {
    return notFound();
  }

  const owner = state.members.find((member) => member.userId === item.ownerUserId);
  const attachments = state.documents.filter((document) => item.attachmentIds.includes(document.id));

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Item detail"
          title={item.title}
          description={item.description || "A household item with recurrence, reminders, and document support."}
          actions={
            <>
              <Button variant="secondary">Snooze</Button>
              <Button
                disabled={submitting}
                onClick={async () => {
                  clearError();
                  setSubmitting(true);

                  try {
                    await markItemComplete(item.id);
                  } catch {
                    // Provider error state surfaces the message inline.
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? "Saving..." : "Mark complete"}
              </Button>
            </>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-5">
            {error ? (
              <div className="rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose">
                <p>{error}</p>
              </div>
            ) : null}
            <div className="flex items-center gap-3">
              <StatusBadge status={item.status === "overdue" ? "overdue" : "active"} label={item.status} />
              <span className="text-sm text-ink-500">{formatCategory(item.category)}</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Detail label="Due date" value={formatDate(item.dueDate)} />
              <Detail label="Recurrence" value={formatRecurrence(item.recurrenceType)} />
              <Detail
                label="Reminder timing"
                value={item.reminderOffsets.length ? `${item.reminderOffsets.join(", ")} days before` : "None"}
              />
              <Detail label="Owner" value={owner?.displayName ?? "Unassigned"} />
              <Detail label="Status" value={item.status} />
              <Detail label="Last completed" value={formatDate(item.lastCompletedAt)} />
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-500">Notes</h2>
              <div className="mt-3 space-y-3">
                <Textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} />
                <div className="flex justify-end">
                  <Button
                    disabled={savingNotes}
                    onClick={async () => {
                      clearError();
                      setSavingNotes(true);

                      try {
                        await updateItem(item.id, { note: noteDraft });
                      } catch {
                        // Provider error state surfaces the message inline.
                      } finally {
                        setSavingNotes(false);
                      }
                    }}
                  >
                    {savingNotes ? "Saving notes..." : "Save notes"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="space-y-4">
              <h2 className="text-lg font-semibold text-ink-900">Attachments</h2>
              <DocumentUpload
                isSubmitting={uploadingAttachment}
                initialLinkedItemId={item.id}
                itemOptions={[{ value: item.id, label: item.title }]}
                onSubmit={async (input) => {
                  clearError();
                  setUploadingAttachment(true);

                  try {
                    await addDocument(input);
                  } catch {
                    // Provider error state surfaces the message inline.
                  } finally {
                    setUploadingAttachment(false);
                  }
                }}
              />
              {attachments.length > 0 ? (
                attachments.map((attachment) => (
                  <div key={attachment.id} className="rounded-xl bg-ink-50 p-4">
                    <p className="font-medium text-ink-900">{attachment.title}</p>
                    <p className="mt-1 text-sm text-ink-500">Expires {formatDate(attachment.expirationDate)}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-ink-500">
                  No files attached yet. Firebase Storage wiring is scaffolded for future uploads.
                </p>
              )}
            </Card>
            <Card className="space-y-4">
              <h2 className="text-lg font-semibold text-ink-900">Completion history</h2>
              {item.completionHistory.length > 0 ? (
                item.completionHistory.map((entry) => (
                  <div key={entry.id} className="rounded-xl bg-ink-50 p-4 text-sm text-ink-600">
                    Completed on {formatDate(entry.completedAt)} for due date {formatDate(entry.previousDueDate)}
                  </div>
                ))
              ) : (
                <p className="text-sm text-ink-500">
                  Once this item is completed, Avenstead will keep a record of when it was handled.
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-ink-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-500">{label}</p>
      <p className="mt-2 text-sm text-ink-900">{value}</p>
    </div>
  );
}
