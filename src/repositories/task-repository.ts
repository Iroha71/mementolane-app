import { getDb } from "@/lib/db";
import { task, Task } from "@/models/task.model";
import z from "zod";

export async function getTasks(): Promise<Task[]> {
  const db = await getDb();
  const rows = await db.select<Task[]>(
    "SELECT id, title, status, start_at, due_at, completed, created_at FROM tasks;",
  );
  const result = z.array(task).safeParse(rows);

  if (!result.success) {
    throw new Error(`データ形式が不正です\n${z.prettifyError(result.error)}`);
  }

  return result.data;
}

export async function createTask(
  title: string,
  status: Task["status"],
  start_at: string | null,
  due_at: string | null,
): Promise<number> {
  const db = await getDb();

  const result = await db.execute(
    "INSERT INTO tasks (title, status, start_at, due_at) VALUES ($1, $2, $3, $4)",
    [title, status, start_at, due_at],
  );

  if (result.lastInsertId == null) {
    throw new Error("登録したタスクのIDを取得できませんでした");
  }

  return result.lastInsertId;
}
