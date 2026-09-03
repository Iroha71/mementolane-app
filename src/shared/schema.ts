import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const tasks = sqliteTable('tasks', {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text({ length: 30 }).notNull(),
  status: text({ length: 10 }).default('plan'),
  startAt: text('start_at'),
  dueAt: text('due_at'),
  detail: text({ length: 200 })
})
