"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppState } from "@/components/providers/app-provider";
import { BrandLogo } from "@/components/ui/brand";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const { authResolved, isAuthenticated, hasHousehold, login, signup, error, clearError } = useAppState();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const modeParam = new URLSearchParams(window.location.search).get("mode");
      if (modeParam === "signup") {
        setMode("signup");
      }
    }
  }, []);

  useEffect(() => {
    if (!authResolved || !isAuthenticated) return;
    const nextPath =
      typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") : null;
    router.replace((hasHousehold ? nextPath || "/dashboard" : "/onboarding") as never);
  }, [authResolved, hasHousehold, isAuthenticated, router]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <div className="flex justify-center">
            <BrandLogo className="w-56" />
          </div>
          <h1 className="text-3xl font-semibold text-ink-900">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm leading-6 text-ink-600">
            {mode === "login"
              ? "Sign in to get back to your household command center."
              : "Set up your Avenstead account, then we will guide you through household setup."}
          </p>
        </div>
        <div className="space-y-4">
          {mode === "signup" ? (
            <div>
              <label className="mb-2 block text-sm font-medium text-ink-700">Full name</label>
              <Input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Alex Morgan" />
            </div>
          ) : null}
          <div>
            <label className="mb-2 block text-sm font-medium text-ink-700">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-ink-700">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
            />
          </div>
        </div>
        {error ? (
          <div className="rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose">
            <p>{error}</p>
          </div>
        ) : null}
        <div className="space-y-3">
          <Button
            className="w-full"
            disabled={submitting}
            onClick={async () => {
              clearError();
              setSubmitting(true);

              try {
                if (mode === "login") {
                  await login(email, password);
                } else {
                  await signup({ fullName, email, password });
                  router.push("/onboarding");
                }
              } catch {
                // Provider error state surfaces the message inline.
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => {
              clearError();
              setMode((current) => (current === "login" ? "signup" : "login"));
            }}
          >
            {mode === "login" ? "Need an account?" : "Already have an account?"}
          </Button>
          <ButtonLink className="w-full" href="/" variant="ghost">
            Back to home
          </ButtonLink>
        </div>
      </Card>
    </main>
  );
}
