import Link from "next/link";

import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">Contact</p>
          <h1 className="text-4xl font-semibold text-ink-900">Get in touch</h1>
          <p className="text-sm leading-7 text-ink-600">
            Contact details are a placeholder for now. When ready, this page can be wired to a support inbox, contact form, or founder email.
          </p>
          <p className="text-sm text-ink-600">Suggested placeholder: support@avenstead.com</p>
          <Link href="/" className="text-sm font-medium text-ink-700 hover:text-ink-900">
            Back to home
          </Link>
        </Card>
      </div>
    </main>
  );
}
