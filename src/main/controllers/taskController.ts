import { TaskOutput } from '../../shared/task'
import { getActive } from '../repositories/taskRepositories'

export async function getActiveTasks(): Promise<TaskOutput[]> {
  const result = await getActive()
  console.log(result)
  return result
}
