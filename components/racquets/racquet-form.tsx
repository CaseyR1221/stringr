"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";

import { type RacquetFormActionState } from "@/app/dashboard/racquets/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { racquetSchema, type RacquetFormValues, type RacquetInput } from "@/lib/validations";

type RacquetFormProps = {
  action: (input: RacquetInput) => Promise<RacquetFormActionState | void>;
  defaultValues?: Partial<RacquetInput>;
  submitLabel: string;
  title: string;
  description: string;
};

const fields: Array<keyof RacquetFormValues> = [
  "brand",
  "model",
  "nickname",
  "headSize",
  "stringPattern",
  "weightGrams",
  "imageUrl",
  "notes",
];

export function RacquetForm({
  action,
  defaultValues,
  submitLabel,
  title,
  description,
}: RacquetFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<RacquetFormValues, unknown, RacquetInput>({
    resolver: zodResolver(racquetSchema) as Resolver<RacquetFormValues, unknown, RacquetInput>,
    defaultValues: {
      brand: defaultValues?.brand ?? "",
      model: defaultValues?.model ?? "",
      nickname: defaultValues?.nickname ?? "",
      headSize: defaultValues?.headSize ?? undefined,
      stringPattern: defaultValues?.stringPattern ?? "",
      weightGrams: defaultValues?.weightGrams ?? undefined,
      imageUrl: defaultValues?.imageUrl ?? "",
      notes: defaultValues?.notes ?? "",
    },
  });

  async function onSubmit(values: RacquetInput) {
    form.clearErrors();

    startTransition(async () => {
      const result = await action(values);

      if (!result) {
        return;
      }

      if (result.formError) {
        form.setError("root", {
          message: result.formError,
        });
      }

      fields.forEach((field) => {
        const fieldError = result.fieldErrors?.[field];

        if (!fieldError) {
          return;
        }

        form.setError(field, {
          message: fieldError,
        });
      });
    });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Yonex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="EZONE 98" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input placeholder="Match Frame 1" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>Optional label for how you identify the frame.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="headSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Head size</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      placeholder="98"
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(event.target.value === "" ? undefined : Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stringPattern"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>String pattern</FormLabel>
                  <FormControl>
                    <Input placeholder="16x19" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weightGrams"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (grams)</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      placeholder="305"
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(event.target.value === "" ? undefined : Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="/demo/racquets/yonex-ezone-98.svg" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>Use a seeded asset path or a direct image URL.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Anything you want to remember about this racquet."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.root?.message ? (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
          ) : null}

          <div className="flex justify-end">
            <Button disabled={isPending} type="submit">
              {isPending ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
