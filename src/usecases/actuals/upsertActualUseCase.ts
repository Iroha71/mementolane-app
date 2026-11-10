import { InternalError } from "@/consts/error";
import { ActualInput, actualInputModel } from "@/models/actual.model";
import { actualRepository } from "@/repositories/actual-repository";
import z from "zod";

/** スロットに実績を登録する。同じスロットに実績があればタスクを上書きする */
export async function upsertActualUseCase(
  input: ActualInput,
  repo = actualRepository,
): Promise<void> {
  const parsedInput = actualInputModel.safeParse(input);
  if (!parsedInput.success) {
    const errors = z.flattenError(parsedInput.error);
    throw new InternalError(errors.fieldErrors);
  }
  try {
    const isSuccess = await repo.upsert(
      parsedInput.data.record_at,
      parsedInput.data.task_id,
    );
    if (!isSuccess) throw new Error("実績の登録で更新行が0件でした");
  } catch (err) {
    console.error(err);
    throw new InternalError({
      page: ["実績の登録に失敗しました。もう一度お試しください。"],
    });
  }
}
