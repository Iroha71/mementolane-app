import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../db', async () => {
  const { default: Database } = await import('better-sqlite3')
  const { drizzle } = await import('drizzle-orm/better-sqlite3')
  const schema = await import('../../shared/schema')

  const sqlite = new Database(':memory:')
  sqlite.exec(`
    CREATE TABLE tasks (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      title text(30) NOT NULL,
      status text(10) DEFAULT 'plan',
      start_at text,
      due_at text,
      detail text(200)
    );
  `)

  return { db: drizzle(sqlite, { schema }) }
})

import { db } from '../db'
import { tasks } from '../../shared/schema'
import { getActive } from './taskRepositories'

describe('getActive', () => {
  beforeEach(async () => {
    await db.delete(tasks)
  })

  it('done以外のタスクのみ取得できる', async () => {
    await db.insert(tasks).values([
      { title: 'タスクA', status: 'plan' },
      { title: 'タスクB', status: 'wip' },
      { title: 'タスクC', status: 'done' }
    ])

    const result = await getActive()

    expect(result).toHaveLength(2)
    expect(result.map((t) => t.title).sort()).toEqual(['タスクA', 'タスクB'])
    expect(result.every((t) => t.status !== 'done')).toBe(true)
  })

  it('該当タスクがない場合は空配列を返す', async () => {
    const result = await getActive()

    expect(result).toEqual([])
  })

  it('DBアクセスでエラーが発生した場合は空配列を返す', async () => {
    const spy = vi.spyOn(db, 'select').mockImplementation(() => {
      throw new Error('DB error')
    })

    const result = await getActive()

    expect(result).toEqual([])

    spy.mockRestore()
  })
})
