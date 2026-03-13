import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { RacquetImage } from "@/components/racquets/racquet-image";
import { cn } from "@/lib/utils";

type RacquetCardProps = {
  racquet: {
    id: string;
    nickname: string | null;
    brand: string;
    model: string;
    headSize: number | null;
    stringPattern: string | null;
    weightGrams: number | null;
    imageUrl: string | null;
  };
};

const placeholderRows = [
  {
    label: "Current string setup",
    value: "Coming in Phase 3",
  },
  {
    label: "Hours played",
    value: "Coming in Phase 4",
  },
  {
    label: "Restring status",
    value: "Coming in Phase 4",
  },
] as const;

export function RacquetCard({ racquet }: RacquetCardProps) {
  const displayName = racquet.nickname?.trim() || `${racquet.brand} ${racquet.model}`;

  return (
    <Link className="group block h-full focus-visible:outline-none" href={`/dashboard/racquets/${racquet.id}`}>
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden border-slate-200 bg-white shadow-sm transition-colors duration-150",
          "hover:border-slate-300 hover:bg-slate-50/40 focus-visible:border-slate-400",
        )}
      >
        <div className="aspect-[4/3] border-b border-slate-200 bg-slate-100">
          <RacquetImage label={displayName} imageUrl={racquet.imageUrl} />
        </div>

        <CardContent className="flex flex-1 flex-col gap-5 p-5">
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-lg font-semibold tracking-tight text-slate-950">{displayName}</p>
              <p className="text-sm text-slate-600">
                {racquet.brand} {racquet.model}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg bg-slate-100 px-3 py-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  Head size
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  {racquet.headSize ? `${racquet.headSize} sq in` : "Not set"}
                </p>
              </div>
              <div className="rounded-lg bg-slate-100 px-3 py-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  Pattern
                </p>
                <p className="mt-1 font-medium text-slate-900">{racquet.stringPattern ?? "Not set"}</p>
              </div>
              <div className="rounded-lg bg-slate-100 px-3 py-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  Weight
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  {racquet.weightGrams ? `${racquet.weightGrams} g` : "Not set"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-200 pt-4 text-sm">
            {placeholderRows.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-3">
                <span className="text-slate-500">{row.label}</span>
                <span className="text-right font-medium text-slate-900">{row.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
