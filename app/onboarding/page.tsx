"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { TemplateCard } from "@/components/items/template-card";
import { useAppState } from "@/components/providers/app-provider";
import { BrandLogo } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HOUSEHOLD_TYPE_OPTIONS, ITEM_CATEGORIES } from "@/lib/constants/categories";
import { HouseholdType, ItemCategory } from "@/types";

export default function OnboardingPage() {
  const router = useRouter();
  const { createHousehold, authResolved, isAuthenticated, hasHousehold, error, clearError } = useAppState();
  const [step, setStep] = useState(1);
  const [householdType, setHouseholdType] = useState<HouseholdType>("individual");
  const [householdName, setHouseholdName] = useState("Avenstead Home");
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<ItemCategory[]>(["bills", "vehicle", "home"]);
  const [submitting, setSubmitting] = useState(false);

  const templateCards = useMemo(
    () =>
      ITEM_CATEGORIES.filter((category) =>
        ["bills", "subscriptions", "vehicle", "home", "school", "health", "documents", "chores"].includes(
          category.value
        )
      ),
    []
  );

  useEffect(() => {
    if (!authResolved) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (hasHousehold) {
      router.replace("/dashboard");
    }
  }, [authResolved, hasHousehold, isAuthenticated, router]);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <div className="flex justify-center">
            <BrandLogo className="w-60" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">Set up Avenstead</p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink-900">Stop carrying your whole household in your head.</h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-ink-600">
            Track bills, renewals, documents, maintenance, and shared responsibilities in one place.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((index) => (
            <Card key={index} className={step === index ? "border-ink-900" : ""}>
              <p className="text-xs uppercase tracking-[0.15em] text-ink-400">Step {index}</p>
              <p className="mt-2 font-medium text-ink-900">
                {index === 1 && "Welcome"}
                {index === 2 && "Household type"}
                {index === 3 && "Household setup"}
                {index === 4 && "Quick start"}
              </p>
            </Card>
          ))}
        </div>

        {step === 1 ? (
          <Card className="space-y-5">
            <h2 className="text-2xl font-semibold text-ink-900">Your path to stability.</h2>
            <p className="text-sm leading-7 text-ink-600">
              Avenstead is built for recurring real-world responsibilities: bills, school forms, maintenance, renewals, subscriptions, and the documents attached to them.
            </p>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)}>Continue</Button>
            </div>
          </Card>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 md:grid-cols-4">
            {HOUSEHOLD_TYPE_OPTIONS.map((option) => (
              <button key={option.value} onClick={() => setHouseholdType(option.value)} type="button">
                <Card className={householdType === option.value ? "border-ink-900" : ""}>
                  <h3 className="font-semibold text-ink-900">{option.label}</h3>
                </Card>
              </button>
            ))}
            <div className="flex justify-between md:col-span-4">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>Continue</Button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <Card className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-ink-700">Household name</label>
              <Input value={householdName} onChange={(event) => setHouseholdName(event.target.value)} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-ink-700">Invite email</label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={(event) => setInviteEmail(event.target.value)}
                placeholder="future co-manager or partner"
              />
              <p className="mt-2 text-xs text-ink-500">
                Invites are scaffolded for later. This stores a placeholder member record for now.
              </p>
            </div>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)}>Continue</Button>
            </div>
          </Card>
        ) : null}

        {step === 4 ? (
          <div className="space-y-5">
            <Card className="space-y-2">
              <h2 className="text-2xl font-semibold text-ink-900">What do you want help staying on top of?</h2>
              <p className="text-sm leading-7 text-ink-600">
                Select the areas that should seed your dashboard with realistic starter items.
              </p>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              {templateCards.map((category) => (
                <TemplateCard
                  key={category.value}
                  title={category.label}
                  description={category.description}
                  selected={selectedGroups.includes(category.value)}
                  onClick={() =>
                    setSelectedGroups((current) =>
                      current.includes(category.value)
                        ? current.filter((value) => value !== category.value)
                        : [...current, category.value]
                    )
                  }
                />
              ))}
            </div>
            {error ? (
              <div className="rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose">
                <p>{error}</p>
              </div>
            ) : null}
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button
                disabled={submitting}
                onClick={async () => {
                  clearError();
                  setSubmitting(true);

                  try {
                    await createHousehold({
                      householdName,
                      householdType,
                      inviteEmail,
                      selectedTemplateGroups: selectedGroups
                    });
                    router.push("/dashboard");
                  } catch {
                    // Provider error state surfaces the message inline.
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? "Finishing setup..." : "Finish setup"}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
