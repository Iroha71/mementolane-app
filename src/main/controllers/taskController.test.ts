import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { TaskOutput } from '../../shared/task'

vi.mock('../repositories/taskRepositories', () => ({
  getActive: vi.fn()
}))

import { getActive } from '../repositories/taskRepositories'
import { getActiveTasks } from './taskController'

describe('getActiveTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('リポジトリの取得結果をそのまま返す', async () => {
    const mockTasks: TaskOutput[] = [
      { id: 1, title: 'タスクA', status: 'plan', startAt: null, dueAt: null, detail: null }
    ]
    vi.mocked(getActive).mockResolvedValue(mockTasks)

    const result = await getActiveTasks()

    expect(result).toEqual(mockTasks)
    expect(getActive).toHaveBeenCalledTimes(1)
  })

  it('リポジトリが空配列を返す場合は空配列を返す', async () => {
    vi.mocked(getActive).mockResolvedValue([])

    const result = await getActiveTasks()

    expect(result).toEqual([])
  })
})
