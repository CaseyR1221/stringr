"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUpSchema, type SignUpInput } from "@/lib/validations";
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

  return "Unable to create your account.";
}

async function signUpWithEmail(values: SignUpInput) {
  const response = await fetch("/api/auth/sign-up/email", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const payload = (await response.json().catch(() => null)) as
    | { message?: string }
    | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? "Unable to create your account.");
  }
}

export function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignUpInput) {
    form.clearErrors();

    startTransition(async () => {
      try {
        await signUpWithEmail(values);

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
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Create account</h1>
        <p className="text-sm leading-6 text-slate-600">
          Set up an account so you can manage your racquets and upcoming tracker data.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" placeholder="Avery Chen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input autoComplete="new-password" placeholder="At least 8 characters" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.message ? (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
          ) : null}

          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link className="font-medium text-slate-950 underline-offset-4 hover:underline" href="/sign-in">
          Sign in
        </Link>
      </p>
    </div>
  );
}
