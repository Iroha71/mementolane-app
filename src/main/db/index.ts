import { app } from 'electron'
import { join } from 'path'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from '../../shared/schema'

const dbPath = join(app.getPath('userData'), 'mementolane.db')

const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')

export const db = drizzle(sqlite, { schema })
