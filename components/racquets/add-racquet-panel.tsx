"use client";

import { useState } from "react";

import { type createRacquetAction } from "@/app/dashboard/racquets/actions";
import { RacquetForm } from "@/components/racquets/racquet-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type AddRacquetPanelProps = {
  action: typeof createRacquetAction;
};

export function AddRacquetPanel({ action }: AddRacquetPanelProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!isFormOpen) {
    return (
      <div className="flex justify-center">
        <Card
          id="add-racquet"
          className="w-full max-w-sm border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm"
        >
          <CardContent className="flex justify-center p-6">
            <Button onClick={() => setIsFormOpen(true)} type="button">
              Add racquet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Card
        id="add-racquet"
        className="w-full max-w-4xl border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm"
      >
        <CardContent className="p-6">
          <RacquetForm
            action={action}
            cancelLabel="Close"
            description="Add the specs you care about now. More racquet tracking details can land in later phases."
            onCancel={() => setIsFormOpen(false)}
            submitLabel="Add racquet"
            title="Add racquet"
          />
        </CardContent>
      </Card>
    </div>
  );
}
