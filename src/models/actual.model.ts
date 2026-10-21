import z, { iso, number } from "zod";

export const actualOutput = z.object({
  id: number().int(),
  date: iso.date(),
  slot: number().int(),
  task_id: number().int(),
});

export type ActualOutput = z.infer<typeof actualOutput>;
