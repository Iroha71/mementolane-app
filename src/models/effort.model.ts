import z, { number, string } from "zod";

export const effort = z.object({
  id: number().int(),
  date: string(),
  slot: number()
    .min(0, { error: "範囲外の番号が指定されました" })
    .max(47, { error: "範囲外の番号が指定されました" }),
  task_id: number().int(),
});

export type Effort = z.infer<typeof effort>;
