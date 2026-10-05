import { getDb } from "@/lib/db";
import { Task } from "@/models/task.model";

export async function getTasks(): Promise<Task[]> {
  const db = await getDb();
  const rows = await db.select<Task[]>(
    "SELECT id, title, status, start_at, due_at, completed, created_at FROM tasks",
  );

  return rows;
}
