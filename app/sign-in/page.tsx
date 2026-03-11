import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function SignInPage() {
  return (
    <main className="container flex min-h-screen items-center justify-center py-16">
      <Card className="w-full max-w-md border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Better Auth is wired at <code>/api/auth/[...all]</code>. The actual sign-in form lands
            in a later phase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>Email/password auth is enabled in configuration, but this route stays intentionally
          lightweight for Phase 1.</p>
          <p>Validation schemas are ready in <code>lib/validations</code> for the future form
          implementation.</p>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Link className={cn(buttonVariants(), "flex-1")} href="/sign-up">
            Go to sign up
          </Link>
          <Link className={cn(buttonVariants({ variant: "outline" }), "flex-1")} href="/">
            Home
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
