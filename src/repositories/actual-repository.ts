import { getDb } from "@/lib/db";
import { Actual } from "@/models/actual.model";

export class ActualRepository {
  async find(record_at: string): Promise<Omit<Actual, "task_title"> | null> {
    const db = await getDb();

    const actuals = await db.select<Omit<Actual, "task_title">[]>(
      "SELECT id, record_at, task_id FROM actuals WHERE record_at = $1",
      [record_at],
    );

    return actuals[0] ?? null;
  }

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
  async upsertMultiple(
    inputs: { record_at: string; task_id: number }[],
  ): Promise<void> {
    if (inputs.length <= 0) return;
    const db = await getDb();
    // 1件につき2つ使うので、2件なら "($1, $2), ($3, $4)" になる
    const placeholders = inputs
      .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
      .join(", ");
    await db.execute(
      `INSERT INTO actuals(record_at, task_id) VALUES ${placeholders} \
        ON CONFLICT(record_at) DO UPDATE SET task_id = excluded.task_id;`,
      inputs.flatMap((input) => [input.record_at, input.task_id]),
    );
  }

  async delete(record_at: string): Promise<void> {
    const db = await getDb();
    await db.execute("DELETE FROM actuals WHERE record_at = $1", [record_at]);
  }
}

export const actualRepository = new ActualRepository();
