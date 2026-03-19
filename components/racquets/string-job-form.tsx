"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";

import { type StringJobFormActionState } from "@/app/dashboard/racquets/actions";
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
import { stringJobSchema, type StringJobFormValues, type StringJobInput } from "@/lib/validations";

type StringJobFormProps = {
  action: (input: StringJobInput) => Promise<StringJobFormActionState | void>;
  defaultValues?: Partial<StringJobFormValues>;
  submitLabel: string;
  title?: string;
  description?: string;
  onCancel?: () => void;
};

const fields: Array<keyof StringJobFormValues> = [
  "mainString",
  "crossString",
  "tensionMainLbs",
  "tensionCrossLbs",
  "gauge",
  "stringType",
  "strungAt",
  "notes",
];

export function StringJobForm({
  action,
  defaultValues,
  submitLabel,
  title,
  description,
  onCancel,
}: StringJobFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<StringJobFormValues, unknown, StringJobInput>({
    resolver: zodResolver(stringJobSchema) as Resolver<StringJobFormValues, unknown, StringJobInput>,
    defaultValues: {
      mainString: defaultValues?.mainString ?? "",
      crossString: defaultValues?.crossString ?? "",
      tensionMainLbs: defaultValues?.tensionMainLbs ?? "",
      tensionCrossLbs: defaultValues?.tensionCrossLbs ?? "",
      gauge: defaultValues?.gauge ?? "",
      stringType: defaultValues?.stringType ?? "",
      strungAt: defaultValues?.strungAt ?? "",
      notes: defaultValues?.notes ?? "",
    },
  });

  async function onSubmit(values: StringJobInput) {
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
      {title || description ? (
        <div className="space-y-1">
          {title ? <h2 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h2> : null}
          {description ? <p className="text-sm leading-6 text-slate-600">{description}</p> : null}
        </div>
      ) : null}

      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="mainString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main string</FormLabel>
                  <FormControl>
                    <Input placeholder="Luxilon ALU Power" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="crossString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cross string</FormLabel>
                  <FormControl>
                    <Input placeholder="Luxilon ALU Power" {...field} />
                  </FormControl>
                  <FormDescription>Use the same value as mains for a full bed setup.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tensionMainLbs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main tension (lbs)</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="decimal"
                      placeholder="52"
                      step="0.5"
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tensionCrossLbs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cross tension (lbs)</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="decimal"
                      placeholder="50"
                      step="0.5"
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gauge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gauge</FormLabel>
                  <FormControl>
                    <Input placeholder="16L" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>Optional. Keep this simple for now.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stringType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>String type</FormLabel>
                  <FormControl>
                    <Input placeholder="Poly" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>Optional label such as Poly, Hybrid, or Multi.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="strungAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date strung</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="hidden md:block" />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Anything worth remembering about this restring."
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

          <div className="flex flex-wrap justify-end gap-3">
            {onCancel ? (
              <Button disabled={isPending} onClick={onCancel} type="button" variant="outline">
                Cancel
              </Button>
            ) : null}

            <Button disabled={isPending} type="submit">
              {isPending ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
