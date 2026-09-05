import { app } from 'electron'
import { join, resolve } from 'path'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from '../../shared/schema'

// 開発時のみ .env の MAIN_VITE_DB_PATH を優先する。
// import.meta.env はビルド時に静的置換されるため、DEV で明示的に絞り、
// 本番ビルドに開発用のパスが焼き込まれないようにしている。
const overridePath = import.meta.env.DEV ? import.meta.env.MAIN_VITE_DB_PATH : undefined

const dbPath = overridePath
  ? resolve(overridePath)
  : join(app.getPath('userData'), 'mementolane.db')

const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')

export const db = drizzle(sqlite, { schema })
