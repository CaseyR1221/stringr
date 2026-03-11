import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const routes = [
  {
    href: "/sign-in",
    label: "Sign in",
    description: "Placeholder auth route wired for Better Auth.",
  },
  {
    href: "/sign-up",
    label: "Sign up",
    description: "Placeholder auth route ready for future Zod-backed forms.",
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Phase 1 shell for the private app experience.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_28rem)]">
      <div className="container flex min-h-screen flex-col justify-center py-16">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              Smart Gear &amp; String Tracker
            </p>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Phase 1 foundation for a clean racquet and string tracking dashboard.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                The app shell, core data model, auth wiring, and demo seed data are set up without
                pushing into CRUD or analytics yet.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className={buttonVariants()} href="/dashboard">
                Open dashboard shell
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "outline" }), "bg-white")}
                href="/sign-in"
              >
                Review auth placeholders
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {routes.map((route) => (
              <Card key={route.href} className="border-slate-200/80 bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{route.label}</CardTitle>
                  <CardDescription>{route.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
                    href={route.href}
                  >
                    Visit route
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
