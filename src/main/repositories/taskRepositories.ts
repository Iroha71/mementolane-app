import { ne } from 'drizzle-orm'
import { db } from '../db'
import { tasks } from '../db/schema'

export async function getActive() {
  try {
    const result = await db.select().from(tasks).where(ne(tasks.status, 'done'))

    return result
  } catch (err) {
    console.log(err)
  }

  return {}
}
