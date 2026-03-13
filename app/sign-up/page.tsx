import { redirect } from "next/navigation";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUserSession } from "@/lib/auth-session";

export default async function SignUpPage() {
  const session = await getCurrentUserSession();

  if (session?.user.id) {
    redirect("/dashboard/racquets");
  }

  return (
    <main className="container flex min-h-screen items-center justify-center py-16">
      <Card className="w-full max-w-md border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <SignUpForm />
        </CardContent>
      </Card>
    </main>
  );
}
