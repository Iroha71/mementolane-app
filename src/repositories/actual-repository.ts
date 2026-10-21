import { getDb } from "@/lib/db";
import { actualOutput, ActualOutput } from "@/models/actual.model";
import z, { ZodError } from "zod";

const formatISODate = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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
    } else {
      console.error(err);
    }
    throw new Error("不正な形式のデータがあります");
  }
}
