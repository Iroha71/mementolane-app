import z from "zod";

export const actualOutput = z.object({
  id: z.number().int(),
  date: z.iso.date(),
  slot: z.number().int().min(0).max(47),
  task_id: z.number().int(),
});

export type ActualOutput = z.infer<typeof actualOutput>;
