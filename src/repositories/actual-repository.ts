import { getDb } from "@/lib/db";
import { Actual } from "@/schemas/actual.schema";

export async function getActualsByDate(
  startDay: string,
  nextDay: string,
): Promise<Actual[]> {
  const db = await getDb();

  const results = await db.select<Actual[]>(
    "SELECT actuals.id, actuals.record_at, actuals.slot, actuals.task_id, tasks.title AS task_title \
      from actuals INNER JOIN tasks ON actuals.task_id = tasks.id \
      WHERE actuals.record_at >= $1 AND actuals.record_at < $2 \
      ORDER BY actuals.slot, actuals.id",
    [startDay, nextDay],
  );

  return results;
}

export async function insertActual(
  recordAt: string,
  slot: number,
  taskId: number,
): Promise<boolean> {
  const db = await getDb();
  const results = await db.execute(
    "INSERT INTO actuals(record_at, task_id, slot) VALUES($1, $2, $3) \
      ON CONFLICT(record_at, slot) DO UPDATE SET task_id = excluded.task_id;",
    [recordAt, taskId, slot],
  );
  const isInsertSuccess =
    results.lastInsertId !== undefined && results.lastInsertId > 0;

  return isInsertSuccess;
}
