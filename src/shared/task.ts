import { z } from 'zod'

export const taskOutputSchema = z.object({
  id: z.number(),
  title: z.string().max(30),
  status: z.string().max(10).nullable(),
  startAt: z.string().nullable(),
  dueAt: z.string().nullable(),
  detail: z.string().max(200).nullable()
})

export const taskInputSchema = z.object({
  title: z.string().max(30),
  status: z.string().max(10).optional(),
  startAt: z.string().optional().nullable(),
  dueAt: z.string().optional().nullable(),
  detail: z.string().max(200).optional().nullable()
})

export type TaskOutput = z.infer<typeof taskOutputSchema>
export type TaskInput = z.infer<typeof taskInputSchema>
