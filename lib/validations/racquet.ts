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

const optionalPositiveInt = z.preprocess(
  (value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined;
    }

    if (typeof value === "string") {
      return Number(value);
    }

    return value;
  },
  z.number().int().positive().optional(),
);

export const racquetSchema = z.object({
  nickname: optionalText(60),
  brand: z.string().trim().min(1, "Brand is required.").max(60),
  model: z.string().trim().min(1, "Model is required.").max(80),
  headSize: optionalPositiveInt,
  stringPattern: optionalText(30),
  weightGrams: optionalPositiveInt,
  imageUrl: optionalText(255),
  notes: optionalText(500),
});

export type RacquetFormValues = {
  brand: string;
  model: string;
  nickname?: string;
  headSize?: number;
  stringPattern?: string;
  weightGrams?: number;
  imageUrl?: string;
  notes?: string;
};
export type RacquetInput = z.infer<typeof racquetSchema>;
