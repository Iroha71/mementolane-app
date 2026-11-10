import { InternalError } from "@/consts/error";
import { startOfLocalDay } from "@/lib/date";
import { Actual } from "@/models/actual.model";
import { actualRepository } from "@/repositories/actual-repository";

/** targetDay が属するローカル日付（0:00〜翌0:00）の実績を取得する */
export async function getActualInDayUseCase(
  targetDay: Date,
  repo = actualRepository,
): Promise<Actual[]> {
  const startAt = startOfLocalDay(targetDay);
  const endAt = new Date(startAt);
  endAt.setDate(startAt.getDate() + 1);
  try {
    return await repo.getInDate(startAt.toISOString(), endAt.toISOString());
  } catch (err) {
    console.error(err);
    throw new InternalError({
      page: ["実績の取得に失敗しました。もう一度お試しください。"],
    });
  }
}
