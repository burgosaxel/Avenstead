"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { BottomNav } from "@/components/layout/bottom-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { useAppState } from "@/components/providers/app-provider";
import { LoadingState } from "@/components/ui/loading-state";

export function AppShell({ children }: { children: ReactNode }) {
  const { ready, authResolved, profileResolved, isAuthenticated, hasHousehold } = useAppState();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!authResolved) return;

    if (!isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!profileResolved) return;

    if (!hasHousehold) {
      router.replace("/onboarding");
    }
  }, [authResolved, hasHousehold, isAuthenticated, pathname, profileResolved, router]);

  if (!ready || !isAuthenticated || !hasHousehold) {
    return <LoadingState label="Loading your household..." />;
  }

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1 pb-24 lg:pb-0">
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {ready ? children : <LoadingState />}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
