import Link from "next/link";
import { notFound } from "next/navigation";

import { createStringJobAction, updateRacquetAction } from "@/app/dashboard/racquets/actions";
import { CurrentStringSetupCard } from "@/components/racquets/current-string-setup-card";
import { DeleteRacquetButton } from "@/components/racquets/delete-racquet-button";
import { RacquetForm } from "@/components/racquets/racquet-form";
import { RacquetImage } from "@/components/racquets/racquet-image";
import { StringJobForm } from "@/components/racquets/string-job-form";
import { StringJobHistoryList } from "@/components/racquets/string-job-history-list";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireCurrentUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

type RacquetDetailPageProps = {
  params: Promise<{
    racquetId: string;
  }>;
};

function getActiveStringJob<
  T extends {
    id: string;
    isCurrent: boolean;
  },
>(stringJobs: T[]) {
  return stringJobs.find((stringJob) => stringJob.isCurrent) ?? stringJobs[0] ?? null;
}

export default async function RacquetDetailPage({ params }: RacquetDetailPageProps) {
  const { racquetId } = await params;
  const user = await requireCurrentUser();

  console.log("RacquetDetailPage params:", racquetId);

  const racquet = await prisma.racquet.findFirst({
    where: {
      id: racquetId,
      userId: user.id,
    },
    include: {
      stringJobs: {
        select: {
          id: true,
          mainString: true,
          crossString: true,
          tensionMainLbs: true,
          tensionCrossLbs: true,
          gauge: true,
          stringType: true,
          strungAt: true,
          notes: true,
          isCurrent: true,
        },
        orderBy: [
          {
            strungAt: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      },
    },
  });

  if (!racquet) {
    notFound();
  }

  const activeStringJob = getActiveStringJob(racquet.stringJobs);
  const stringJobHistory = racquet.stringJobs.map((stringJob) => ({
    id: stringJob.id,
    mainString: stringJob.mainString,
    crossString: stringJob.crossString,
    tensionMainLbs: stringJob.tensionMainLbs,
    tensionCrossLbs: stringJob.tensionCrossLbs,
    gauge: stringJob.gauge,
    stringType: stringJob.stringType,
    strungAt: stringJob.strungAt.toISOString(),
    notes: stringJob.notes,
    isCurrent: stringJob.id === activeStringJob?.id,
  }));
  const defaultStrungAt = new Date().toISOString().slice(0, 10);

  return (
    <main className="container space-y-8 py-12">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Racquet Detail
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          {racquet.nickname?.trim() || `${racquet.brand} ${racquet.model}`}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Review the racquet details, current string setup, and restring history for this frame in
          one place.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link className={cn(buttonVariants({ variant: "secondary" }))} href="/dashboard/racquets">
          Back to racquets
        </Link>
      </div>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
          <div className="min-h-80 border-b border-slate-200 bg-slate-100 lg:border-b-0 lg:border-r">
            <RacquetImage className="h-full w-full" label={`${racquet.brand} ${racquet.model}`} imageUrl={racquet.imageUrl} />
          </div>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                  Overview
                </p>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                    {racquet.brand} {racquet.model}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {racquet.nickname ? `Nickname: ${racquet.nickname}` : "No nickname saved yet."}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-100 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Head size
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900">
                    {racquet.headSize ? `${racquet.headSize} sq in` : "Not set"}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-100 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    String pattern
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900">
                    {racquet.stringPattern ?? "Not set"}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-100 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Weight
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900">
                    {racquet.weightGrams ? `${racquet.weightGrams} g` : "Not set"}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-100 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Image reference
                  </p>
                  <p className="mt-2 break-all text-sm font-medium text-slate-900">
                    {racquet.imageUrl ?? "Not set"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Notes</p>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {racquet.notes ?? "No notes saved yet."}
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <CurrentStringSetupCard stringJob={activeStringJob} />

          <StringJobHistoryList racquetId={racquet.id} stringJobs={stringJobHistory} />

          {/* TODO: Replace this placeholder with real play session history in Phase 4. */}
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Play sessions</CardTitle>
              <CardDescription>
                Placeholder section for Phase 4. Hours played and restring status will be derived
                from session data later.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-6">
          <Card id="add-string-job" className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <StringJobForm
                action={createStringJobAction.bind(null, racquet.id)}
                defaultValues={{
                  strungAt: defaultStrungAt,
                }}
                description="Log a new restring for this racquet. New jobs become the active setup."
                submitLabel="Add string job"
                title="Add string job"
              />
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <RacquetForm
                action={updateRacquetAction.bind(null, racquet.id)}
                defaultValues={{
                  brand: racquet.brand,
                  model: racquet.model,
                  nickname: racquet.nickname ?? undefined,
                  headSize: racquet.headSize ?? undefined,
                  stringPattern: racquet.stringPattern ?? undefined,
                  weightGrams: racquet.weightGrams ?? undefined,
                  imageUrl: racquet.imageUrl ?? undefined,
                  notes: racquet.notes ?? undefined,
                }}
                description="Update the saved specs for this frame. String jobs and play sessions stay outside this form."
                submitLabel="Save changes"
                title="Edit racquet"
              />
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">Delete racquet</h2>
                <p className="text-sm leading-6 text-slate-600">
                  Remove this racquet from your account. This action returns you to the racquet
                  list.
                </p>
              </div>

              <DeleteRacquetButton racquetId={racquet.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
