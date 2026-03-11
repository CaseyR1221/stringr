import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sampleRacquets = [
  {
    id: "demo-ezone-98",
    name: "Match Frame 1",
    subtitle: "Yonex EZONE 98 with seeded demo image support",
  },
  {
    id: "demo-blade-98",
    name: "Practice Frame",
    subtitle: "Wilson Blade 98 with sample string and play history",
  },
  {
    id: "demo-speed-mp",
    name: "Clay Backup",
    subtitle: "Head Speed MP with a current full-bed poly setup",
  },
];

export default function RacquetsPage() {
  return (
    <main className="container space-y-8 py-12">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Racquets</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Placeholder list route with seeded model targets.
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          The Prisma seed includes realistic local demo data. This page remains a shell until the
          actual list UI lands in Phase 2.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {sampleRacquets.map((racquet) => (
          <Card key={racquet.id} className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>{racquet.name}</CardTitle>
              <CardDescription>{racquet.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
                href={`/dashboard/racquets/${racquet.id}`}
              >
                Open detail shell
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
