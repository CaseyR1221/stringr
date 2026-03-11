import { z } from "zod";

export const stringJobSchema = z.object({
  mainString: z.string().trim().min(1, "Main string is required."),
  crossString: z.string().trim().min(1, "Cross string is required."),
  tensionMainLbs: z.coerce.number().min(10).max(90).optional(),
  tensionCrossLbs: z.coerce.number().min(10).max(90).optional(),
  gauge: z.string().trim().max(20).optional(),
  stringType: z.string().trim().min(1, "String type is required."),
  strungAt: z.coerce.date(),
  notes: z.string().trim().max(500).optional(),
  isCurrent: z.boolean().default(true),
});

export type StringJobInput = z.infer<typeof stringJobSchema>;
