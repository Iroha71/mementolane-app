import { getDb } from "@/lib/db";
import { Task } from "@/schemas/task.schema";

export async function getAllTasks(isActiveOnly: boolean): Promise<Task[]> {
  const sql = isActiveOnly
    ? "SELECT * FROM tasks WHERE completed = 0;"
    : "SELECT * FROM tasks;";
  const db = await getDb();

  return await db.select<Task[]>(sql);
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
