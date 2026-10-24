import z from "zod";

export const actual = z.object({
  id: z.number().int(),
  task_id: z.number().int(),
  task_title: z.string(),
  start_at: z.iso.datetime({ offset: true }),
  end_at: z.iso.datetime({ offset: true }),
});

export type Actual = z.infer<typeof actual>;
