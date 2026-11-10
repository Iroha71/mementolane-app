import { InternalError } from "@/consts/error";
import { Task, taskModel } from "@/models/task.model";
import { taskRepository } from "@/repositories/task-repository";

export async function getSingleTaskUseCase(
  id: number,
  repo = taskRepository,
): Promise<Task | null> {
  const parsedId = taskModel.shape.id.safeParse(id);
  if (!parsedId.success)
    throw new InternalError({ page: ["対象のタスクが存在しません。"] });

  try {
    const task = await repo.find(parsedId.data);
    if (task === null) {
      throw new InternalError({
        page: [
          "対象のタスクが見つかりません。対象が存在するか確認してください。",
        ],
      });
    }

    return task;
  } catch (err) {
    if (err instanceof InternalError) throw err;
    else
      throw new InternalError({
        page: ["タスクの取得に失敗しました。ログを確認してください。"],
      });
  }
}
