"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { DocumentCard } from "@/components/documents/document-card";
import { DocumentUpload } from "@/components/documents/document-upload";
import { useAppState } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { isWithinDays } from "@/lib/utils/dates";

export default function DocumentsPage() {
  const { state, addDocument, error, clearError } = useAppState();
  const [showUpload, setShowUpload] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("new") === "1") {
      setShowUpload(true);
    }
  }, []);

  const expiringSoon = useMemo(
    () => state.documents.filter((document) => isWithinDays(document.expirationDate, 30)),
    [state.documents]
  );
  const unlinked = useMemo(() => state.documents.filter((document) => !document.linkedItemId), [state.documents]);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Documents"
          title="Documents linked to action"
          description="Keep key records attached to the responsibilities they support so paperwork stays useful, not buried."
          actions={<Button onClick={() => setShowUpload((current) => !current)}>{showUpload ? "Close upload" : "Upload document"}</Button>}
        />

        {showUpload ? (
          <div className="space-y-4">
            {error ? (
              <div className="rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose">
                <p>{error}</p>
              </div>
            ) : null}
            <DocumentUpload
              isSubmitting={submitting}
              onSubmit={async (input) => {
                clearError();
                setSubmitting(true);

                try {
                  await addDocument(input);
                  setShowUpload(false);
                } catch {
                  // Provider error state surfaces the message inline.
                } finally {
                  setSubmitting(false);
                }
              }}
              itemOptions={state.items.map((item) => ({ value: item.id, label: item.title }))}
            />
          </div>
        ) : null}

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-ink-900">Expiring soon</h2>
          {expiringSoon.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {expiringSoon.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  linkedItemTitle={state.items.find((item) => item.id === document.linkedItemId)?.title}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No documents expiring soon"
              description="Add IDs, insurance files, school forms, or warranty records to start tracking expirations."
            />
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-ink-900">Recently added</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {state.documents.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                linkedItemTitle={state.items.find((item) => item.id === document.linkedItemId)?.title}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-ink-900">Unlinked documents</h2>
          {unlinked.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {unlinked.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Everything is linked"
              description="As you add more documents, Avenstead will highlight anything that still needs to be connected to a household item."
            />
          )}
        </section>
      </div>
    </AppShell>
  );
}
