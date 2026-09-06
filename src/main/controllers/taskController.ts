import { CreateTaskResult, TaskOutput, taskInputSchema } from '../../shared/task'
import { getActive, insertTask } from '../repositories/taskRepositories'

export async function getActiveTasks(): Promise<TaskOutput[]> {
  const result = await getActive()
  return result
}

export async function createTask(input: unknown): Promise<CreateTaskResult> {
  const parsed = taskInputSchema.safeParse(input)

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((issue) => issue.message)
    }
  }

  const { title, status, startAt, dueAt, detail } = parsed.data

  const result = await insertTask(
    title,
    status ?? 'plan',
    startAt ?? '',
    dueAt ?? '',
    detail ?? ''
  )

  if (!result) {
    return { success: false, errors: ['タスクの登録に失敗しました'] }
  }

  return { success: true }
}
