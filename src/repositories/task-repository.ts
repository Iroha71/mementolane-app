import { getDb } from "@/lib/db";
import { task, Task } from "@/models/task.model";
import z from "zod";

export async function getTasks({
  includeCompleted = false,
}: { includeCompleted?: boolean } = {}): Promise<Task[]> {
  const db = await getDb();
  const where = includeCompleted ? "" : " WHERE completed = 0";
  const rows = await db.select<Task[]>(
    `SELECT id, title, status, start_at, due_at, completed, created_at FROM tasks${where};`,
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

export async function setTaskCompleted(
  id: number,
  completed: boolean,
): Promise<Task> {
  const db = await getDb();
  const completedNumber = completed ? 1 : 0;

  // 不正なデータを更新してしまわないよう、更新前に対象行を検証する
  const rows = await db.select<Task[]>(
    "SELECT id, title, status, start_at, due_at, completed, created_at FROM tasks WHERE id = $1",
    [id],
  );

  if (rows.length === 0) throw new Error("対象のタスクがありません");

  const parsedResult = task.safeParse(rows[0]);
  if (!parsedResult.success)
    throw new Error(
      `データ形式が不正です\n${z.prettifyError(parsedResult.error)}`,
    );

  const result = await db.execute(
    "UPDATE tasks SET completed = $1 WHERE id = $2",
    [completedNumber, id],
  );

  if (result.rowsAffected === 0) throw new Error("対象のタスクがありません");

  return { ...parsedResult.data, completed: completedNumber };
}
