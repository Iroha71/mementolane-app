import { getDb } from "@/lib/db";
import { Task, TaskInput } from "@/models/task.model";

export class TaskRepository {
  async getAll(isIncludeComplete: boolean): Promise<Task[]> {
    const sql = isIncludeComplete
      ? "SELECT * FROM tasks;"
      : "SELECT * FROM tasks WHERE completed = 0;";
    const db = await getDb();

    return await db.select<Task[]>(sql);
  }

  async find(id: number): Promise<Task | null> {
    const db = await getDb();
    const tasks = await db.select<Task[]>("SELECT * FROM tasks WHERE id = $1", [
      id,
    ]);

    return tasks[0] ?? null;
  }

  async create(
    title: string,
    status: string,
    startAt: string | null,
    dueAt: string | null,
  ): Promise<Task | null> {
    const db = await getDb();
    const createdTask = await db.select<Task[]>(
      "INSERT INTO tasks (title, status, start_at, due_at) VALUES($1, $2, $3, $4) RETURNING *;",
      [title, status, startAt, dueAt],
    );

    return createdTask[0] ?? null;
  }

  async update(
    id: number,
    title: string,
    status: string,
    startAt: string | null,
    dueAt: string | null,
  ): Promise<Task | null> {
    const db = await getDb();
    const updatedTask = await db.select<Task[]>(
      "UPDATE tasks SET title = $1, status = $2, start_at = $3, due_at = $4 WHERE id = $5 RETURNING *;",
      [title, status, startAt, dueAt, id],
    );

    return updatedTask[0] ?? null;
  }
}

export const taskRepository = new TaskRepository();

export async function updateTask(
  id: number,
  task: TaskInput,
): Promise<{ success: boolean }> {
  const db = await getDb();
  const result = await db.execute(
    "UPDATE tasks SET title = $1, status = $2, start_at = $3, due_at = $4, completed = $5 WHERE id = $6;",
    [task.title, task.status, task.start_at, task.due_at, task.completed, id],
  );

  return {
    success: result.rowsAffected > 0,
  };
}
