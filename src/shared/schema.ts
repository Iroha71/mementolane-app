import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { TASK_STATUSES } from './task'

export const tasks = sqliteTable('tasks', {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text({ length: 30 }).notNull(),
  status: text({ length: 10, enum: TASK_STATUSES }).default('plan'),
  startAt: text('start_at'),
  dueAt: text('due_at'),
  detail: text({ length: 200 })
})
