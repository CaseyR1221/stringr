"use client";

import { useState, useTransition } from "react";

import { deleteRacquetAction } from "@/app/dashboard/racquets/actions";
import { Button } from "@/components/ui/button";

type DeleteRacquetButtonProps = {
  racquetId: string;
};

export function DeleteRacquetButton({ racquetId }: DeleteRacquetButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteRacquetAction(racquetId);
    });
  }

  if (!showConfirmation) {
    return (
      <Button onClick={() => setShowConfirmation(true)} type="button" variant="destructive">
        Delete racquet
      </Button>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-medium text-red-900">Delete this racquet permanently?</p>
      <p className="text-sm text-red-800">
        This will remove the racquet record now. TODO: future phases should handle related string
        job and play session history in the confirmation copy.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button disabled={isPending} onClick={handleDelete} type="button" variant="destructive">
          {isPending ? "Deleting..." : "Confirm delete"}
        </Button>
        <Button disabled={isPending} onClick={() => setShowConfirmation(false)} type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
}
