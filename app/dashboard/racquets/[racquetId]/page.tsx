import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type RacquetDetailPageProps = {
  params: Promise<{
    racquetId: string;
  }>;
};

export default async function RacquetDetailPage({ params }: RacquetDetailPageProps) {
  const { racquetId } = await params;

  return (
    <main className="container space-y-8 py-12">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Racquet Detail
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{racquetId}</h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          This dynamic route is in place for the future racquet detail experience. Seed data uses
          stable IDs that match this route format.
        </p>
      </div>

      <Card className="max-w-3xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Phase 1 placeholder</CardTitle>
          <CardDescription>
            Future work will bring in the current setup summary, restring history, play sessions,
            and the seeded demo image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link className={cn(buttonVariants({ variant: "secondary" }))} href="/dashboard/racquets">
            Back to racquets
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
