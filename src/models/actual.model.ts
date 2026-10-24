import z from "zod";

export const actual = z.object({
  id: z.number().int(),
  task_id: z.number().int(),
  task_title: z.string(),
  // 文字列のまま大小比較するため、UTC（末尾が Z）の値だけを受け付ける
  start_at: z.iso.datetime({ precision: 0 }),
  end_at: z.iso.datetime({ precision: 0 }),
});

export type Actual = z.infer<typeof actual>;
