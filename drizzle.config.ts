import { defineConfig } from 'drizzle-kit'
import { homedir } from 'os'
import { join } from 'path'
import { name as appName } from './package.json'

// Electron の app.getPath('userData') と同じ場所を drizzle-kit から参照する。
// ディレクトリ名は package.json の name（= productName）に一致する。
function userDataDir(): string {
  switch (process.platform) {
    case 'win32':
      return join(process.env.APPDATA ?? join(homedir(), 'AppData', 'Roaming'), appName)
    case 'darwin':
      return join(homedir(), 'Library', 'Application Support', appName)
    default:
      return join(process.env.XDG_CONFIG_HOME ?? join(homedir(), '.config'), appName)
  }
}

const dbPath = process.env.DB_PATH ?? join(userDataDir(), 'mementolane.db')

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/main/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: dbPath
  },
  migrations: {
    table: '__drizzle_migrations'
  }
})
