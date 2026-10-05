import z from "zod";

export const task = z.object({
  id: z.number().int(),
  title: z.string().min(1).max(30),
  status: z.enum(["planning", "thisweek", "wip", "reviewing", "delivering"]),
  start_at: z.string().nullable(),
  due_at: z.string().nullable(),
  completed: z.union([z.literal(0), z.literal(1)]),
  created_at: z.string(),
});

export type Task = z.infer<typeof task>;
