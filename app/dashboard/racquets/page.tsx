import { createRacquetAction } from "@/app/dashboard/racquets/actions";
import { AddRacquetPanel } from "@/components/racquets/add-racquet-panel";
import { RacquetCard } from "@/components/racquets/racquet-card";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireCurrentUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export default async function RacquetsPage() {
  const user = await requireCurrentUser();

  const racquets = await prisma.racquet.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      nickname: true,
      brand: true,
      model: true,
      headSize: true,
      stringPattern: true,
      weightGrams: true,
      imageUrl: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <main className="container space-y-10 py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Racquets</p>

        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Manage your racquets</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Keep your frame details in one place. String setup, hours played, and restring status
            stay as placeholders until later phases.
          </p>
        </div>
      </div>

      {racquets.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {racquets.map((racquet) => (
            <RacquetCard key={racquet.id} racquet={racquet} />
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-slate-300 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>No racquets yet</CardTitle>
            <CardDescription>
              Add your first racquet below to start building out your gear list.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <AddRacquetPanel action={createRacquetAction} />
    </main>
  );
}
