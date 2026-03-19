
import { HomeNavbar } from "@/components/home/home-navbar";
import { getCurrentUserSession } from "@/lib/auth-session";

export default async function HomePage() {
  const session = await getCurrentUserSession();
  const isSignedIn = Boolean(session?.user.id);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_28rem)]">
      <HomeNavbar isSignedIn={isSignedIn} />
      <div className="container flex min-h-[calc(100vh-5.5rem)] flex-col justify-center py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-4 text-center sm:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              Smart Gear &amp; String Tracker
            </p>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Phase 1 foundation for a clean racquet and string tracking
                dashboard.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                The app shell, core data model, auth wiring, and demo seed data
                are set up without pushing into CRUD or analytics yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
