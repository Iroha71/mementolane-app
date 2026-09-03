import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { tasks } from './schema'

export const taskSchema = createSelectSchema(tasks)
export const taskInputSchema = createInsertSchema(tasks)

export type Task = z.infer<typeof taskSchema>
export type TaskInput = z.infer<typeof taskInputSchema>
