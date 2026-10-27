import { getDb } from "@/lib/db";
import { actual, Actual } from "@/models/actual.model";
import z, { ZodError } from "zod";

export async function getActualsByDate(date: Date): Promise<Actual[]> {
  const db = await getDb();
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const nextDate = new Date(start);
  nextDate.setDate(start.getDate() + 1);

  const results = await db.select<Actual[]>(
    "SELECT actuals.id, actuals.record_at, actuals.slot, actuals.task_id, tasks.title AS task_title \
      from actuals INNER JOIN tasks ON actuals.task_id = tasks.id \
      WHERE actuals.record_at >= $1 AND actuals.record_at < $2",
    [start.toISOString(), nextDate.toISOString()],
  );

  try {
    return z.array(actual).parse(results);
  } catch (err) {
    if (err instanceof ZodError)
      throw new Error(`データ形式が不正です\n${z.prettifyError(err)}`);
    throw err;
  }
}
