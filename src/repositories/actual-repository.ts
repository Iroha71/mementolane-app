import { getDb } from "@/lib/db";
import { actualOutput, ActualOutput } from "@/models/actual.model";
import z, { ZodError } from "zod";

const formatISODate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export async function getActualsInWeek(
  startDay: Date,
): Promise<ActualOutput[]> {
  const db = await getDb();
  const sunDay = new Date(startDay);
  sunDay.setDate(sunDay.getDate() - startDay.getDay());
  const nextSunDay = new Date(sunDay);
  nextSunDay.setDate(sunDay.getDate() + 7);
  const actuals = await db.select<ActualOutput[]>(
    "SELECT id, date, slot, task_id from actuals WHERE $1 <= date AND date < $2;",
    [formatISODate(sunDay), formatISODate(nextSunDay)],
  );

  try {
    return z.array(actualOutput).parse(actuals);
  } catch (err) {
    if (err instanceof ZodError) {
      console.error(z.treeifyError(err));
      throw new Error(`不正な形式のデータがあります\n${z.prettifyError(err)}`);
    }

    throw new Error(`不明なエラーが発生しました\n${err}`);
  }
}
