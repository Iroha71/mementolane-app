import { InternalError } from "@/consts/error";
import { Actual, ActualInput, actualInputModel } from "@/models/actual.model";
import { actualRepository } from "@/repositories/actual-repository";
import z from "zod";
import { updateActualTimeUseCase } from "../tasks/updateActualTimeUseCase";

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
  const updatedActual = await repo.upsert(
    parsedInput.data.record_at,
    parsedInput.data.task_id,
  );

  if (updatedActual === null)
    throw new InternalError({
      page: [
        "登録対象のタスクがありませんでした。タスクが存在するかご確認ください。",
      ],
    });

  await updateActualTimeUseCase(parsedInput.data.task_id, 0.5);

  return updatedActual;
}
