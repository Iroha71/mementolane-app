import { getDb } from "@/lib/db";
import { effort, Effort } from "@/models/effort.model";
import z, { ZodError } from "zod";

export async function getEffortsInWeek(startDate: Date): Promise<Effort[]> {
  const db = await getDb();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 7);

  try {
    const rows = await db.select<Effort[]>(
      `SELECT id, date, slot, task_id FROM efforts WHERE date BETWEEN $1 AND $2`,
      [startDate.toISOString(), endDate.toISOString()],
    );
    const result = z.array(effort).parse(rows);
    return result;
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(
        "読み込みに失敗しました：不正な形式のデータが含まれています",
      );
    } else {
      throw new Error("DB接続時にエラーが発生しました");
    }
  }
}
