import { redirect } from "next/navigation";

import { SignInForm } from "@/components/auth/sign-in-form";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUserSession } from "@/lib/auth-session";

export default async function SignInPage() {
  const session = await getCurrentUserSession();

  if (session?.user.id) {
    redirect("/dashboard/racquets");
  }

  return (
    <main className="container flex min-h-screen items-center justify-center py-16">
      <Card className="w-full max-w-md border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <SignInForm />
        </CardContent>
      </Card>
    </main>
  );
}
