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

export default function SignUpPage() {
  return (
    <main className="container flex min-h-screen items-center justify-center py-16">
      <Card className="w-full max-w-md border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Placeholder route for the future Better Auth email/password sign-up flow.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>The auth client is configured, but Phase 1 stops short of building the form UI.</p>
          <p>Next steps will wire this route to Zod validation and submit through Better Auth.</p>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Link className={cn(buttonVariants(), "flex-1")} href="/dashboard">
            View dashboard shell
          </Link>
          <Link className={cn(buttonVariants({ variant: "outline" }), "flex-1")} href="/">
            Home
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
