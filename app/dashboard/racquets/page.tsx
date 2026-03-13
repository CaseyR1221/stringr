import { createRacquetAction } from "@/app/dashboard/racquets/actions";
import { RacquetCard } from "@/components/racquets/racquet-card";
import { RacquetForm } from "@/components/racquets/racquet-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

      <Card id="add-racquet" className="border-slate-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <RacquetForm
            action={createRacquetAction}
            description="Add the specs you care about now. More racquet tracking details can land in later phases."
            submitLabel="Add racquet"
            title="Add racquet"
          />
        </CardContent>
      </Card>
    </main>
  );
}
