import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  BellRing,
  CalendarDays,
  CheckCircle2,
  FileStack,
  HeartHandshake,
  MenuSquare,
  ShieldCheck,
  Users
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { BrandLogo, BrandMark, BrandName } from "@/components/ui/brand";
import { Card } from "@/components/ui/card";

const featureGroups = [
  {
    icon: MenuSquare,
    title: "See what needs attention",
    description: "Keep recurring bills, renewals, forms, subscriptions, and maintenance visible in one calm dashboard."
  },
  {
    icon: BellRing,
    title: "Stay ahead of deadlines",
    description: "Know what is due soon, overdue, expiring, or worth reviewing before it becomes stressful."
  },
  {
    icon: FileStack,
    title: "Keep documents linked to action",
    description: "Store important files with the item they support instead of losing them in folders and email threads."
  },
  {
    icon: Users,
    title: "Reduce household friction",
    description: "Give couples and families shared visibility into what is owned, what is coming up, and what is done."
  },
  {
    icon: CalendarDays,
    title: "Use the view that fits you",
    description: "Work from lists or calendar views so different household styles still feel supported."
  },
  {
    icon: ShieldCheck,
    title: "Build a steadier home system",
    description: "Replace scattered memory, sticky notes, and inbox anxiety with a purpose-built life-admin routine."
  }
];

const steps = [
  {
    number: "01",
    title: "Set up your household",
    description: "Create your account, name your household, and choose the life-admin areas you want help managing."
  },
  {
    number: "02",
    title: "Start from real templates",
    description: "Use starter templates for bills, vehicle deadlines, maintenance, appointments, school forms, and more."
  },
  {
    number: "03",
    title: "Review weekly, not constantly",
    description: "Come back to one dashboard that shows what is due, overdue, expiring, and worth discussing this week."
  }
];

const useCases = [
  "Busy parents juggling school forms, bills, and household upkeep",
  "Couples who want clearer ownership and less mental load imbalance",
  "Single parents who need one steady system for recurring obligations",
  "Young professionals learning adult life-admin without cobbling tools together",
  "Caregivers coordinating documents, appointments, and responsibilities for others"
];

const pricing = [
  {
    tier: "Starter",
    price: "$9/mo",
    note: "Placeholder pricing",
    description: "For individuals and couples who want one trusted home for life-admin basics.",
    features: [
      "Household dashboard",
      "Recurring items and reminders",
      "Document uploads and linking",
      "Calendar and checklist views"
    ]
  },
  {
    tier: "Family",
    price: "$16/mo",
    note: "Placeholder pricing",
    description: "For shared households that want stronger visibility, organization, and weekly coordination.",
    features: [
      "Everything in Starter",
      "Shared household members",
      "Assignments and weekly briefing",
      "Priority support placeholder"
    ]
  }
];

const faqs = [
  {
    question: "Is Avenstead a to-do app?",
    answer: "No. It is designed specifically for household life-admin: recurring responsibilities, deadlines, documents, renewals, and shared household continuity."
  },
  {
    question: "Can I use it if I live alone?",
    answer: "Yes. Avenstead works for individuals, couples, families, and caregivers."
  },
  {
    question: "Do I need to use every feature at once?",
    answer: "No. Most households get value by starting with a few recurring responsibilities and building from there."
  }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen px-6 py-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[1.75rem] border border-border bg-white/85 px-6 py-5 shadow-soft backdrop-blur-sm lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white ring-1 ring-border">
                <BrandMark className="w-10" priority />
              </div>
              <div>
                <BrandName className="w-40" priority />
                <p className="text-center text-sm text-ink-500">Your path to stability.</p>
              </div>
            </div>
            <nav className="flex flex-wrap items-center gap-4 text-sm text-ink-600">
              <a href="#features" className="hover:text-ink-900">Features</a>
              <a href="#how-it-works" className="hover:text-ink-900">How it works</a>
              <a href="#pricing" className="hover:text-ink-900">Pricing</a>
              <a href="#faq" className="hover:text-ink-900">FAQ</a>
            </nav>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/login" variant="ghost">Log in</ButtonLink>
              <ButtonLink href="/login?mode=signup">Create account</ButtonLink>
            </div>
          </div>
        </header>

        <section className="overflow-hidden rounded-[2rem] border border-border bg-white/90 p-8 shadow-soft lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="space-y-6">
              <div className="space-y-3 text-center">
                <BrandLogo className="mx-auto w-64 lg:w-72" priority />
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">Household life-admin, finally organized</p>
              </div>
              <div className="space-y-4 text-center">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-ink-900 lg:text-6xl">
                  A professional household command center for real life.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-ink-600">
                  Avenstead helps individuals, couples, and families stay ahead of recurring responsibilities, deadlines, documents, subscriptions, maintenance, and shared household admin without carrying it all in their heads.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/onboarding">
                  Set up my household
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/login?mode=signup" variant="secondary">Create account</ButtonLink>
                <ButtonLink href="/login" variant="ghost">Log in</ButtonLink>
              </div>
              <div className="grid gap-4 pt-2 sm:grid-cols-3">
                <Stat label="Reduce mental load" value="One trusted system" />
                <Stat label="Prevent missed deadlines" value="Weekly visibility" />
                <Stat label="Lower household friction" value="Shared clarity" />
              </div>
            </div>
            <Card className="space-y-5 bg-ink-900 text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">This week in your household</p>
                <h2 className="mt-3 text-2xl font-semibold">A calmer picture of what matters next.</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Metric label="Due this week" value="6" />
                <Metric label="Overdue" value="1" />
                <Metric label="Expiring docs" value="2" />
                <Metric label="Shared visibility" value="Steadier week" />
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm leading-7 text-white/80">
                  Instead of bouncing between calendars, memory, inboxes, texts, paper folders, and stress, Avenstead gives your household one practical place to stay on top of life-admin.
                </p>
              </div>
            </Card>
          </div>
        </section>

        <section id="features" className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">Features</p>
            <h2 className="text-3xl font-semibold text-ink-900">What Avenstead actually does</h2>
            <p className="max-w-3xl text-sm leading-7 text-ink-600">
              Built for recurring real-world responsibilities instead of generic productivity tasks.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featureGroups.map((feature) => (
              <Card key={feature.title} className="space-y-4">
                <feature.icon className="h-8 w-8 text-ink-700" />
                <h3 className="text-xl font-semibold text-ink-900">{feature.title}</h3>
                <p className="text-sm leading-7 text-ink-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">Why families use it</p>
            <h2 className="text-3xl font-semibold text-ink-900">Less forgotten admin. Less household friction.</h2>
            <p className="text-sm leading-7 text-ink-600">
              Avenstead helps households feel more in control by making everyday responsibilities visible before they become urgent.
            </p>
            <div className="space-y-3">
              {useCases.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-ink-50 p-4">
                  <HeartHandshake className="mt-0.5 h-5 w-5 text-moss" />
                  <p className="text-sm leading-7 text-ink-700">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card id="how-it-works" className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">How it works</p>
            <h2 className="text-3xl font-semibold text-ink-900">Simple to start. Useful every week.</h2>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.number} className="grid gap-4 rounded-2xl border border-border bg-white p-5 md:grid-cols-[80px_1fr] md:items-start">
                  <p className="text-3xl font-semibold text-ink-200">{step.number}</p>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-ink-900">{step.title}</h3>
                    <p className="text-sm leading-7 text-ink-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section id="pricing" className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">Pricing</p>
            <h2 className="text-3xl font-semibold text-ink-900">Straightforward plans for households</h2>
            <p className="max-w-3xl text-sm leading-7 text-ink-600">
              Placeholder pricing for now, with room to refine once packaging is finalized.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {pricing.map((plan, index) => (
              <Card key={plan.tier} className={`space-y-5 ${index === 1 ? "border-ink-900" : ""}`}>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-ink-500">{plan.tier}</p>
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-semibold text-ink-900">{plan.price}</p>
                    <p className="pb-1 text-sm text-ink-500">{plan.note}</p>
                  </div>
                  <p className="text-sm leading-7 text-ink-600">{plan.description}</p>
                </div>
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-ink-700">
                      <CheckCircle2 className="h-4 w-4 text-moss" />
                      {feature}
                    </div>
                  ))}
                </div>
                <ButtonLink href="/onboarding" className="w-full">
                  Set up my household
                </ButtonLink>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <Card className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">What it means in real life</p>
            <h2 className="text-3xl font-semibold text-ink-900">Avenstead helps your home feel more stable.</h2>
            <p className="text-sm leading-7 text-ink-600">
              When recurring responsibilities are visible, households miss fewer deadlines, pay fewer late fees, communicate better, and carry less background stress. That does not just organize tasks. It changes how home feels week to week.
            </p>
          </Card>
          <Card id="faq" className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">FAQ</p>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-ink-50 p-4">
                  <h3 className="font-semibold text-ink-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="rounded-[2rem] bg-ink-900 px-8 py-10 text-white shadow-soft lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Start today</p>
              <h2 className="max-w-3xl text-3xl font-semibold">Bring your household admin into one steady system.</h2>
              <p className="max-w-2xl text-sm leading-7 text-white/75">
                Avenstead gives you a practical path to stability, with one place to manage the things that keep life from slipping through the cracks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/onboarding">
                Set up my household
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/login?mode=signup" variant="secondary">Create account</ButtonLink>
            </div>
          </div>
        </section>

        <footer className="rounded-[1.75rem] border border-border bg-white/85 px-6 py-8 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div className="space-y-3">
              <BrandLogo className="w-48" />
              <p className="max-w-sm text-sm leading-7 text-ink-600">
                Household life-admin for people who want less stress, better continuity, and a steadier way to run home.
              </p>
            </div>
            <FooterGroup
              title="Product"
              links={[
                { href: "#features", label: "Features" },
                { href: "#how-it-works", label: "How it works" },
                { href: "#pricing", label: "Pricing" },
                { href: "/onboarding", label: "Set up my household" }
              ]}
            />
            <FooterGroup
              title="Company"
              links={[
                { href: "/about", label: "About us" },
                { href: "/contact", label: "Contact us" },
                { href: "/privacy", label: "Privacy policy" },
                { href: "/terms", label: "Terms of use" }
              ]}
            />
            <FooterGroup
              title="Account"
              links={[
                { href: "/login", label: "Log in" },
                { href: "/login?mode=signup", label: "Sign up" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/documents", label: "Documents" }
              ]}
            />
          </div>
        </footer>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-ink-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-400">{label}</p>
      <p className="mt-2 text-base font-semibold text-ink-900">{value}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 p-4">
      <p className="text-sm text-white/70">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function FooterGroup({
  title,
  links
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      <div className="space-y-2">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="block text-sm text-ink-600 hover:text-ink-900">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
