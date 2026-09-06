import { z } from 'zod'

export const TASK_STATUSES = ['plan', 'thisweek', 'wip', 'inreview', 'inspection', 'done'] as const

export const taskStatusSchema = z.enum(TASK_STATUSES, '状態は選択肢に存在する値を入力してください')

export const taskOutputSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'タスク名は必須です').max(30, 'タスク名は30字以内で入力してください'),
  status: taskStatusSchema.nullable(),
  startAt: z.string().nullable(),
  dueAt: z.string().nullable(),
  detail: z.string().max(200, 'メモは200字以内で入力してください').nullable()
})

export const taskInputSchema = z.object({
  title: z.string().min(1, 'タスク名は必須です').max(30, 'タスク名は30字以内で入力してください'),
  status: taskStatusSchema.nullable(),
  startAt: z.string().nullable(),
  dueAt: z.string().nullable(),
  detail: z.string().max(200, 'メモは200字以内で入力してください').nullable()
})

export type TaskStatus = z.infer<typeof taskStatusSchema>
export type TaskOutput = z.infer<typeof taskOutputSchema>
export type TaskInput = z.infer<typeof taskInputSchema>

export type CreateTaskResult = { success: true } | { success: false; errors: string[] }
