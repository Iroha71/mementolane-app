import { getActive } from '../repositories/taskRepositories'

export async function readTasks() {
  return await getActive()
}
