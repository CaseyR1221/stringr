"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signIn } from "@/lib/auth-client";
import { signInSchema, type SignInInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function getAuthErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }

  return "Unable to sign in with those credentials.";
}

async function signInWithEmail(values: SignInInput) {
  const { error } = await signIn.email({
    email: values.email,
    password: values.password,
  });

  if (error) {
    throw new Error(error.message ?? "Unable to sign in with those credentials.");
  }
}

export function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInInput) {
    form.clearErrors();

    startTransition(async () => {
      try {
        await signInWithEmail(values);

        router.push("/dashboard/racquets");
        router.refresh();
      } catch (error) {
        form.setError("root", {
          message: getAuthErrorMessage(error),
        });
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Sign in</h1>
        <p className="text-sm leading-6 text-slate-600">
          Use your email and password to access your private racquet tracker.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoComplete="email" placeholder="you@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input autoComplete="current-password" placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.message ? (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
          ) : null}

          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-slate-600">
        Need an account?{" "}
        <Link className="font-medium text-slate-950 underline-offset-4 hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </div>
  );
}
