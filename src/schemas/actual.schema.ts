import z from "zod";

export const actualSchema = z.object({
  taskId: z.number().int(),
  task_title: z.string(),
  record_at: z.iso.date(),
  slot: z
    .number()
    .int()
    .min(0, { error: "範囲外の値です。0~47で入力してください。" })
    .max(47, { error: "範囲外の値です。0~47で入力してください。" }),
});

export type Actual = z.infer<typeof actualSchema>;
