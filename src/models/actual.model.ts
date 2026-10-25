import z from "zod";

export const actual = z.object({
  id: z.number().int(),
  task_id: z.number().int(),
  task_title: z.string(),
  // 文字列のまま大小比較するため、UTC（末尾が Z）の値だけを受け付ける
  record_at: z.iso.datetime({ precision: 0 }),
  slot: z.number().int().min(0).max(47),
});

export type Actual = z.infer<typeof actual>;
