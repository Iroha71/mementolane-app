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

export async function insertTask(
  title: string,
  status: 'plan' | 'thisweek' | 'wip' | 'inreview' | 'inspection' | 'done',
  startAt: string,
  dueAt: string,
  detail: string
): Promise<boolean> {
  try {
    await db.insert(tasks).values({
      title: title,
      status: status,
      startAt: startAt,
      dueAt: dueAt,
      detail: detail
    })

    return true
  } catch (err) {
    console.error(err)

    return false
  }
}
