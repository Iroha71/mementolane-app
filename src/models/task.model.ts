import z from "zod";

export const taskModel = z.object({
  id: z.number().int(),
  title: z
    .string()
    .trim()
    .min(1, { error: "タスク名を入力してください" })
    .max(30, { error: "タイトルは30字以内で入力してください" }),
  status: z.enum(["planning", "thisweek", "wip", "reviewing", "delivering"]),
  start_at: z.iso.date({ error: "日付はISO形式で入力してください" }).nullable(),
  due_at: z.iso.date({ error: "日付はISO形式で入力してください" }).nullable(),
  completed: z.union([z.literal(0), z.literal(1)]),
  created_at: z.iso.date({ error: "日付はISO形式で入力してください" }),
});

export type Task = z.infer<typeof taskModel>;

export const taskInputModel = taskModel.omit({
  id: true,
  created_at: true,
});

export type TaskInput = z.input<typeof taskInputModel>;
