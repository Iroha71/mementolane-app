import { getTaskById, updateActual } from "@/repositories/task-repository";

export async function updateActualUseCase(taskId: number, changeValue: number) {
  try {
    const task = await getTaskById(taskId);
    if (task === null) {
      throw new Error("対象のタスクが見つかりません。");
    }
    const actual = task.actuals + changeValue;
    const updateResult = await updateActual(taskId, actual);
    if (updateResult.success) {
    } else {
      throw new Error("実績時間の更新に失敗しました。もう一度お試しください。");
    }
  } catch (err) {
    throw err;
  }
}
