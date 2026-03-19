import { z } from "zod";

const optionalText = (max: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmedValue = value.trim();
      return trimmedValue.length > 0 ? trimmedValue : undefined;
    },
    z.string().max(max).optional(),
  );

const requiredTension = (label: string) =>
  z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }

      if (typeof value === "string") {
        return Number(value);
      }

      return value;
    },
    z
      .number({ error: `${label} is required.` })
      .min(10, `${label} must be at least 10 lbs.`)
      .max(90, `${label} must be 90 lbs or less.`),
  );

const requiredDate = z.preprocess(
  (value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined;
    }

    if (value instanceof Date) {
      return value;
    }

    return new Date(String(value));
  },
  z
    .date({ error: "Date strung is required." })
    .refine((value) => !Number.isNaN(value.getTime()), "Date strung must be a valid date."),
);

export const stringJobSchema = z.object({
  mainString: z.string().trim().min(1, "Main string is required."),
  crossString: z.string().trim().min(1, "Cross string is required."),
  tensionMainLbs: requiredTension("Main tension"),
  tensionCrossLbs: requiredTension("Cross tension"),
  gauge: optionalText(20),
  stringType: optionalText(40),
  strungAt: requiredDate,
  notes: optionalText(500),
  isCurrent: z.boolean().default(true),
});

export type StringJobFormValues = {
  mainString: string;
  crossString: string;
  tensionMainLbs: number | string;
  tensionCrossLbs: number | string;
  gauge?: string;
  stringType?: string;
  strungAt: string;
  notes?: string;
};

export type StringJobInput = z.infer<typeof stringJobSchema>;
