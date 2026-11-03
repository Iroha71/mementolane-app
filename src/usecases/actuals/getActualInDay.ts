import { formatDate } from "@/lib/date";
import { getActualsByDate } from "@/repositories/actual-repository";

export async function getActualInDayUseCase(targetDay: Date) {
  const nextDay = new Date(targetDay);
  nextDay.setDate(targetDay.getDate() + 1);
  try {
    console.log(formatDate(targetDay));
    const actuals = await getActualsByDate(
      formatDate(targetDay),
      formatDate(nextDay),
    );

    return actuals;
  } catch (err) {
    console.error(err);
    throw new Error("実績の取得に失敗しました。再度お試しください。");
  }
}
