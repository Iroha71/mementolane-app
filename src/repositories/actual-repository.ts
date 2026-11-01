import { getDb } from "@/lib/db";
import { Actual } from "@/schemas/actual.schema";
import z, { ZodError } from "zod";

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

// export async function createActualInSlot(
//   recordAt: string,
//   slot: number,
//   taskId: number,
// ): Promise<Actual[]> {
//   try {
//     const params = createActual.parse({
//       record_at: recordAt,
//       slot: slot,
//       task_id: taskId,
//     });
//     const db = await getDb();
//     await db.execute(
//       "INSERT INTO actuals(record_at, task_id, slot) VALUES($1, $2, $3) \
//         ON CONFLICT(record_at, slot) DO UPDATE SET task_id = excluded.task_id;",
//       [params.record_at, params.task_id, params.slot],
//     );

//     return await getActualsByDate(new Date(recordAt));
//   } catch (err) {
//     if (err instanceof ZodError) {
//       throw new Error(
//         `値のパースに失敗しました\nもう一度登録を試してください\n${z.prettifyError(err)}`,
//       );
//     } else {
//       console.error(err);
//       throw new Error("不明なエラーが発生しました、ログを確認してください");
//     }
//   }
// }
