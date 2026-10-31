import { getDb } from "@/lib/db";
import { Task } from "@/schemas/task.schema";

interface TaskRow {
  id: number;
  title: string;
  status: string;
  start_at: string | null;
  due_at: string | null;
  completed: number;
  created_at: string;
}

export function toTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    startAt: row.start_at === null ? null : new Date(row.start_at),
    dueAt: row.due_at === null ? null : new Date(row.due_at),
    completed: row.completed === 0 ? false : true,
    createdAt: new Date(row.created_at),
  };
}

export async function getAllTasks(isActiveOnly: boolean): Promise<Task[]> {
  const db = await getDb();
  const sql = isActiveOnly
    ? "SELECT * FROM tasks WHERE completed = 0;"
    : "SELECT * FROM tasks;";
  try {
    const rows = await db.select<TaskRow[]>(sql);
    const tasks = rows.map((row) => toTask(row));
    return tasks;
  } catch (err) {
    console.error(err);
    throw new Error("読み込みに失敗しました。画面を再度読み込んでください。");
  }
}

// export async function getTasks({
//   includeCompleted = false,
// }: { includeCompleted?: boolean } = {}): Promise<Task[]> {
//   const db = await getDb();
//   const where = includeCompleted ? "" : " WHERE completed = 0";
//   const rows = await db.select<Task[]>(
//     `SELECT id, title, status, start_at, due_at, completed, created_at FROM tasks${where};`,
//   );
//   const result = z.array(task).safeParse(rows);

//   if (!result.success) {
//     throw new Error(`データ形式が不正です\n${z.prettifyError(result.error)}`);
//   }

//   return result.data;
// }

// export async function createTask(
//   title: string,
//   status: Task["status"],
//   start_at: string | null,
//   due_at: string | null,
// ): Promise<number> {
//   const db = await getDb();

//   const result = await db.execute(
//     "INSERT INTO tasks (title, status, start_at, due_at) VALUES ($1, $2, $3, $4)",
//     [title, status, start_at, due_at],
//   );

//   if (result.lastInsertId == null) {
//     throw new Error("登録したタスクのIDを取得できませんでした");
//   }

//   return result.lastInsertId;
// }

// async function findTask(id: number): Promise<Task> {
//   const db = await getDb();

//   const rows = await db.select<Task[]>(
//     "SELECT id, title, status, start_at, due_at, completed, created_at FROM tasks WHERE id = $1",
//     [id],
//   );

//   if (rows.length === 0) throw new Error("対象のタスクがありません");

//   const parsedResult = task.safeParse(rows[0]);
//   if (!parsedResult.success)
//     throw new Error(
//       `データ形式が不正です\n${z.prettifyError(parsedResult.error)}`,
//     );

//   return parsedResult.data;
// }

// export async function setTaskCompleted(
//   id: number,
//   completed: boolean,
// ): Promise<Task> {
//   const db = await getDb();
//   const completedNumber = completed ? 1 : 0;

//   // 不正なデータを更新してしまわないよう、更新前に対象行を検証する
//   await findTask(id);

//   const result = await db.execute(
//     "UPDATE tasks SET completed = $1 WHERE id = $2",
//     [completedNumber, id],
//   );

//   if (result.rowsAffected === 0) throw new Error("対象のタスクがありません");

//   // 更新と同時に他の列が変わっている可能性があるため、更新後の行を返す
//   return findTask(id);
// }

// export async function changeStatus(
//   id: number,
//   status: Task["status"],
// ): Promise<Task> {
//   const db = await getDb();

//   // 型は実行時に保証されないため、不正な値を保存しないよう検証する
//   const parsedStatus = task.shape.status.safeParse(status);
//   if (!parsedStatus.success)
//     throw new Error(
//       `状態の値が不正です\n${z.prettifyError(parsedStatus.error)}`,
//     );

//   // 不正なデータを更新してしまわないよう、更新前に対象行を検証する
//   const current = await findTask(id);
//   if (current.completed)
//     throw new Error("完了済みのタスクの状態は変更できません");

//   const result = await db.execute(
//     "UPDATE tasks SET status = $1 WHERE id = $2 AND completed = 0",
//     [parsedStatus.data, id],
//   );

//   // 検証後に削除・完了された場合も更新対象から外れる
//   if (result.rowsAffected === 0)
//     throw new Error(
//       "対象のタスクが削除されたか完了済みのため、状態を変更できません",
//     );

//   // 更新と同時に他の列が変わっている可能性があるため、更新後の行を返す
//   return findTask(id);
// }
