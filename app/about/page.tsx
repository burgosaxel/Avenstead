import Link from "next/link";

import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">About Avenstead</p>
          <h1 className="text-4xl font-semibold text-ink-900">Built to make household life feel steadier.</h1>
          <p className="text-sm leading-7 text-ink-600">
            Avenstead exists because modern households are managing a hidden second job: life administration. We are building a calmer, more practical way to stay ahead of recurring responsibilities, documents, deadlines, and shared home logistics.
          </p>
          <Link href="/" className="text-sm font-medium text-ink-700 hover:text-ink-900">
            Back to home
          </Link>
        </Card>
      </div>
    </main>
  );
}
