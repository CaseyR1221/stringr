import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const dashboardCards = [
  {
    title: "Racquets",
    description: "Placeholder route for the Phase 2 racquet list and add/edit flows.",
    href: "/dashboard/racquets",
  },
  {
    title: "String jobs",
    description: "Tracked in the schema and seed data, but not surfaced in CRUD yet.",
    href: "/dashboard/racquets/demo-ezone-98",
  },
  {
    title: "Play sessions",
    description: "Seeded realistically for local development and future restring logic.",
    href: "/dashboard/racquets/demo-blade-98",
  },
];

export default function DashboardPage() {
  return (
    <main className="container space-y-8 py-12">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Foundation shell for the private tracker.
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          This page stays intentionally simple until the racquet, string job, and play session
          flows are implemented in later phases.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => (
          <Card key={card.title} className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link className={cn(buttonVariants({ variant: "secondary" }), "w-full")} href={card.href}>
                Review route
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
