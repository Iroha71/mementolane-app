import z from "zod";

export const actualSchema = z.object({
  taskId: z.number().int(),
  recordAt: z.iso.date(),
  slot: z.number().int().min(0).max(47),
});

export type ActualSchema = z.infer<typeof actualSchema>;
