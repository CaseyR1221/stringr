import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CurrentStringSetupCardProps = {
  stringJob: {
    id: string;
    mainString: string;
    crossString: string;
    tensionMainLbs: number | null;
    tensionCrossLbs: number | null;
    gauge: string | null;
    stringType: string;
    strungAt: Date;
    notes: string | null;
  } | null;
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

function formatTension(value: number | null) {
  return value === null ? "Not set" : `${value} lbs`;
}

export function CurrentStringSetupCard({ stringJob }: CurrentStringSetupCardProps) {
  if (!stringJob) {
    return (
      <Card className="border-dashed border-slate-300 bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Current string setup</CardTitle>
          <CardDescription>No string jobs have been logged for this racquet yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Add the first string job to capture what is currently in this frame and start a clean
              history.
            </p>
            <Link
              className={cn(buttonVariants({ variant: "secondary" }))}
              href="#add-string-job"
            >
              Add first string job
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isFullBed = stringJob.mainString === stringJob.crossString;

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>Current string setup</CardTitle>
            <CardDescription>The active setup shown here comes from the current marker or the most recent job.</CardDescription>
          </div>

          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
            Current
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Setup summary
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
            {isFullBed ? `Full bed: ${stringJob.mainString}` : `${stringJob.mainString} / ${stringJob.crossString}`}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Main string</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{stringJob.mainString}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Cross string</p>
            <p className="mt-2 text-sm font-medium text-slate-900">
              {isFullBed ? "Same as mains (full bed)" : stringJob.crossString}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Date strung</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{formatDate(stringJob.strungAt)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Main tension</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{formatTension(stringJob.tensionMainLbs)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Cross tension</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{formatTension(stringJob.tensionCrossLbs)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Gauge</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{stringJob.gauge?.trim() || "Not set"}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:col-span-2 xl:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">String type</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{stringJob.stringType.trim() || "Not set"}</p>
          </div>
        </div>

        {stringJob.notes?.trim() ? (
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Notes</p>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              {stringJob.notes}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
