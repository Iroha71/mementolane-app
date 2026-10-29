import z from "zod";

export const actual = z.object({
  id: z.number().int(),
  task_id: z.number().int(),
  task_title: z.string(),
  record_at: z.iso.datetime(),
  slot: z.number().int().min(0).max(47),
});

export type Actual = z.infer<typeof actual>;

export const createActual = actual.omit({
  id: true,
  task_title: true,
});

export type CreateActual = z.input<typeof createActual>;
