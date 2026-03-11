import { z } from "zod";

export const playSessionSchema = z.object({
  playedAt: z.coerce.date(),
  durationMinutes: z.coerce
    .number()
    .int()
    .min(15, "Session must be at least 15 minutes.")
    .max(600, "Session must be 10 hours or less."),
  notes: z.string().trim().max(500).optional(),
});

export type PlaySessionInput = z.infer<typeof playSessionSchema>;
