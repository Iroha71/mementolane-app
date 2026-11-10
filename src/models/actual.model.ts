import z from "zod";

export const actualModel = z.object({
  id: z.number().int(),
  task_id: z.number().int(),
  // スロット開始時刻（UTC）。toISOString() と同じ形式のみ許可し、文字列比較と UNIQUE を保つ
  record_at: z.iso.datetime({
    precision: 3,
    error: "日時はUTCのISO形式で入力してください",
  }),
  task_title: z.string(),
});

export type Actual = z.infer<typeof actualModel>;

export const actualInputModel = actualModel.omit({
  id: true,
  task_title: true,
});

export type ActualInput = z.input<typeof actualInputModel>;
