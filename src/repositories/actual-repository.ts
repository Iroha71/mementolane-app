import { getDb } from "@/lib/db";
import { Actual } from "@/models/actual.model";

export class ActualRepository {
  /** record_at（UTCのISO文字列）が [startAt, endAt) に含まれる実績を取得する */
  async getInDate(startAt: string, endAt: string): Promise<Actual[]> {
    const db = await getDb();

    return await db.select<Actual[]>(
      "SELECT actuals.id, actuals.record_at, actuals.task_id, tasks.title AS task_title \
        FROM actuals INNER JOIN tasks ON actuals.task_id = tasks.id \
        WHERE actuals.record_at >= $1 AND actuals.record_at < $2 \
        ORDER BY actuals.record_at;",
      [startAt, endAt],
    );
  }

  /** 同じ record_at の実績があればタスクを上書きし、なければ登録する */
  async upsert(recordAt: string, taskId: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.execute(
      "INSERT INTO actuals(record_at, task_id) VALUES($1, $2) \
        ON CONFLICT(record_at) DO UPDATE SET task_id = excluded.task_id;",
      [recordAt, taskId],
    );

    return result.rowsAffected > 0;
  }
}

export const actualRepository = new ActualRepository();
