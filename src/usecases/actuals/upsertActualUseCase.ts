import { InternalError } from "@/consts/error";
import { Actual, ActualInput, actualInputModel } from "@/models/actual.model";
import { actualRepository } from "@/repositories/actual-repository";
import z from "zod";

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
  try {
    const updatedACtual = await repo.upsert(
      parsedInput.data.record_at,
      parsedInput.data.task_id,
    );

    if (updatedACtual === null)
      throw new InternalError({
        page: [
          "登録対象のタスクがありませんでした。タスクが存在するかご確認ください。",
        ],
      });

    return updatedACtual;
  } catch (err) {
    console.error(err);
    if (err instanceof InternalError) throw err;
    throw new InternalError({
      page: ["実績の登録に失敗しました。もう一度お試しください。"],
    });
  }
}
