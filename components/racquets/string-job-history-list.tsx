"use client";

import Link from "next/link";
import { useState } from "react";

import { updateStringJobAction } from "@/app/dashboard/racquets/actions";
import { StringJobForm } from "@/components/racquets/string-job-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StringJobHistoryListProps = {
  racquetId: string;
  stringJobs: Array<{
    id: string;
    mainString: string;
    crossString: string;
    tensionMainLbs: number | null;
    tensionCrossLbs: number | null;
    gauge: string | null;
    stringType: string;
    strungAt: string;
    notes: string | null;
    isCurrent: boolean;
  }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatTensions(main: number | null, cross: number | null) {
  if (main === null && cross === null) {
    return "Not set";
  }

  return `${main ?? "?"} / ${cross ?? "?"} lbs`;
}

function formatDateInput(value: string) {
  return value.slice(0, 10);
}

export function StringJobHistoryList({ racquetId, stringJobs }: StringJobHistoryListProps) {
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle>String job history</CardTitle>
        <CardDescription>
          Reverse chronological history for this racquet. The current setup is highlighted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {stringJobs.length > 0 ? (
          <div className="space-y-4">
            {stringJobs.map((stringJob) => {
              const isFullBed = stringJob.mainString === stringJob.crossString;
              const isEditing = editingJobId === stringJob.id;

              return (
                <div key={stringJob.id} className="rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex flex-wrap items-start justify-between gap-4 p-5">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-base font-semibold tracking-tight text-slate-950">
                          {formatDate(stringJob.strungAt)}
                        </p>
                        {stringJob.isCurrent ? (
                          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                            Current setup
                          </span>
                        ) : null}
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                            Strings
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-900">
                            {isFullBed
                              ? `Full bed: ${stringJob.mainString}`
                              : `${stringJob.mainString} / ${stringJob.crossString}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                            Tensions
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-900">
                            {formatTensions(stringJob.tensionMainLbs, stringJob.tensionCrossLbs)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                            Gauge
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-900">
                            {stringJob.gauge?.trim() || "Not set"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                            String type
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-900">
                            {stringJob.stringType.trim() || "Not set"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                            Main string
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-900">{stringJob.mainString}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                            Cross string
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-900">
                            {isFullBed ? "Same as mains" : stringJob.crossString}
                          </p>
                        </div>
                      </div>

                      {stringJob.notes?.trim() ? (
                        <p className="max-w-3xl text-sm leading-6 text-slate-600">{stringJob.notes}</p>
                      ) : null}
                    </div>

                    <Button
                      onClick={() => setEditingJobId(isEditing ? null : stringJob.id)}
                      type="button"
                      variant="outline"
                    >
                      {isEditing ? "Close editor" : "Edit"}
                    </Button>
                  </div>

                  {isEditing ? (
                    <div className="border-t border-slate-200 bg-white p-5">
                      <StringJobForm
                        action={updateStringJobAction.bind(null, racquetId, stringJob.id)}
                        defaultValues={{
                          mainString: stringJob.mainString,
                          crossString: stringJob.crossString,
                          tensionMainLbs: stringJob.tensionMainLbs ?? "",
                          tensionCrossLbs: stringJob.tensionCrossLbs ?? "",
                          gauge: stringJob.gauge ?? "",
                          stringType: stringJob.stringType,
                          strungAt: formatDateInput(stringJob.strungAt),
                          notes: stringJob.notes ?? "",
                        }}
                        description="Update the saved setup details for this specific string job."
                        onCancel={() => setEditingJobId(null)}
                        submitLabel="Save string job"
                        title="Edit string job"
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <p className="text-sm leading-6 text-slate-600">
              No string jobs have been logged yet. Add the first one to start building this
              racquet&apos;s restring history.
            </p>
            <Link
              className={cn(buttonVariants({ variant: "secondary" }))}
              href="#add-string-job"
            >
              Add first string job
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
