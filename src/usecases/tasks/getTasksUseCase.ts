import { taskRepository } from "@/repositories/task-repository";

export async function getTasksUseCase(
  isIncludeComplete: boolean,
  repo = taskRepository,
) {
  try {
    return await repo.getAll(isIncludeComplete);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error(
        "タスク一覧の取得に失敗しました。\n画面を再読み込みしてください。",
      );
    }
  }
}
