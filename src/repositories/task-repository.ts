import { getDb } from "@/lib/db";
import { Task, TaskInput } from "@/schemas/task.schema";

export async function getAllTasks(isActiveOnly: boolean): Promise<Task[]> {
  const sql = isActiveOnly
    ? "SELECT * FROM tasks WHERE completed = 0;"
    : "SELECT * FROM tasks;";
  const db = await getDb();

  return await db.select<Task[]>(sql);
}

export async function getTaskById(id: number) {
  const db = await getDb();
  const rows = await db.select<Task[]>("SELECT * FROM tasks WHERE id = $1;", [
    id,
  ]);

  return rows[0] ?? null;
}

export async function insertTask(
  title: string,
  status: Task["status"],
  start_at: string | null,
  due_at: string | null,
): Promise<{ success: boolean }> {
  const db = await getDb();
  const result = await db.execute(
    "INSERT INTO tasks(title, status, start_at, due_at) VALUES($1, $2, $3, $4);",
    [title, status, start_at, due_at],
  );

  return {
    success: result.lastInsertId !== undefined && result.lastInsertId > 0,
  };
}

export async function updateTask(id: number, task: TaskInput) {
  const db = await getDb();
  const result = await db.execute(
    "UPDATE tasks SET title = $1, status = $2, start_at = $3, due_at = $4 WHERE id = $5;",
    [task.title, task.status, task.start_at, task.due_at, id],
  );

  return {
    success: result.rowsAffected > 0,
  };
}
