import { z } from "zod";

export const racquetSchema = z.object({
  nickname: z.string().trim().max(60).optional(),
  brand: z.string().trim().min(1, "Brand is required."),
  model: z.string().trim().min(1, "Model is required."),
  headSize: z.coerce.number().int().positive().optional(),
  stringPattern: z.string().trim().max(30).optional(),
  weightGrams: z.coerce.number().int().positive().optional(),
  imageUrl: z.string().trim().max(255).optional(),
  notes: z.string().trim().max(500).optional(),
});

export type RacquetInput = z.infer<typeof racquetSchema>;
