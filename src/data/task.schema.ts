import z from "zod";

export const taskTable = z.object({
  id: z.number().int(),
  title: z.string().min(1).max(30),
  status: z.enum(["planning", "thisweek", "wip", "reviewing", "delivering"]),
  start_at: z.string().nullable(),
  due_at: z.string().nullable(),
  completed: z.number(),
  created_at: z.string(),
});

export type TaskTable = z.infer<typeof taskTable>;
