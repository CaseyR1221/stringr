"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type HomeNavbarProps = {
  isSignedIn: boolean;
};

export function HomeNavbar({ isSignedIn }: HomeNavbarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      const { error } = await signOut();

      if (error) {
        return;
      }

      router.refresh();
    });
  }

  return (
    <header className="pt-6">
      <div className="container">
        <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200/80 bg-white/90 px-5 py-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link className="flex items-center gap-3" href="/">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold tracking-[0.18em] text-white">
              SR
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">
                Stringr
              </p>
              <p className="text-sm text-slate-600">Smart Gear &amp; String Tracker</p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            {isSignedIn ? (
              <>
                <Link
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "rounded-full px-5 text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  )}
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                <Button
                  className="rounded-full px-5"
                  disabled={isPending}
                  onClick={handleSignOut}
                  type="button"
                >
                  {isPending ? "Signing out..." : "Sign out"}
                </Button>
              </>
            ) : (
              <>
                <Link
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "rounded-full px-5 text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  )}
                  href="/sign-in"
                >
                  Sign in
                </Link>
                <Link className={cn(buttonVariants(), "rounded-full px-5")} href="/sign-up">
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
