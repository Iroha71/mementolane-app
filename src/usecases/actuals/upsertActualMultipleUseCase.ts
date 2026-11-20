import { InternalError } from "@/consts/error";
import { ActualInput, actualInputModel } from "@/models/actual.model";
import { actualRepository } from "@/repositories/actual-repository";
import z from "zod";

const MISSING_TASK_MESSAGE =
  "登録対象のタスクがありませんでした。タスクが存在するかご確認ください。";
const DEFAULT_ERROR_MESSAGE =
  "実績の登録に失敗しました。もう一度お試しください。";

export async function upsertActualMultipleUseCase(
  input: ActualInput[],
  repo = actualRepository,
): Promise<void> {
  const parsedInput = z.array(actualInputModel).safeParse(input);
  if (!parsedInput.success) {
    throw new InternalError({ page: ["不正な入力値が含まれています"] });
  }

  try {
    await repo.upsertMultiple(parsedInput.data);
  } catch (err) {
    console.error(err);
    // 存在しない task_id を指定すると、FK 制約違反のエラーになる
    const isMissingTask = String(err).includes("FOREIGN KEY constraint failed");
    throw new InternalError({
      page: [isMissingTask ? MISSING_TASK_MESSAGE : DEFAULT_ERROR_MESSAGE],
    });
  }
}
