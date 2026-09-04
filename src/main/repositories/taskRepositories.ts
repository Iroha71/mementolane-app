import { ne } from 'drizzle-orm'
import { db } from '../db'
import { tasks } from '../../shared/schema'
import { TaskOutput } from '../../shared/task'

export async function getActive(): Promise<TaskOutput[]> {
  try {
    const result = await db.select().from(tasks).where(ne(tasks.status, 'done'))

    return result
  } catch (err) {
    console.error('DB Access Error ' + err)
  }

  return []
}
