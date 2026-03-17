import Link from "next/link";

import { BrandLogo } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg space-y-5 text-center">
        <div className="flex justify-center">
          <BrandLogo className="w-52" />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-ink-900">That page slipped through the cracks.</h1>
        <p className="text-sm leading-7 text-ink-600">
          The page you were looking for is not here. Head back to your household dashboard and pick up where you left off.
        </p>
        <ButtonLink href="/dashboard">Go to dashboard</ButtonLink>
      </div>
    </main>
  );
}
