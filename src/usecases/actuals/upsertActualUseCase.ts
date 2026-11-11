import { InternalError } from "@/consts/error";
import { Actual, ActualInput, actualInputModel } from "@/models/actual.model";
import { actualRepository } from "@/repositories/actual-repository";
import z from "zod";

const MISSING_TASK_MESSAGE =
  "登録対象のタスクがありませんでした。タスクが存在するかご確認ください。";
const DEFAULT_ERROR_MESSAGE =
  "実績の登録に失敗しました。もう一度お試しください。";

/** スロットに実績を登録する。同じスロットに実績があればタスクを上書きする */
export async function upsertActualUseCase(
  input: ActualInput,
  repo = actualRepository,
): Promise<Actual> {
  const parsedInput = actualInputModel.safeParse(input);
  if (!parsedInput.success) {
    const errors = z.flattenError(parsedInput.error);
    throw new InternalError(errors.fieldErrors);
  }

  let updatedActual: Actual | null;
  try {
    updatedActual = await repo.upsert(
      parsedInput.data.record_at,
      parsedInput.data.task_id,
    );
  } catch (err) {
    console.error(err);
    // 存在しない task_id を指定すると、null ではなく FK 制約違反のエラーになる
    const isMissingTask = String(err).includes("FOREIGN KEY constraint failed");
    throw new InternalError({
      page: [isMissingTask ? MISSING_TASK_MESSAGE : DEFAULT_ERROR_MESSAGE],
    });
  }

  if (updatedActual === null)
    throw new InternalError({ page: [MISSING_TASK_MESSAGE] });

  return updatedActual;
}
