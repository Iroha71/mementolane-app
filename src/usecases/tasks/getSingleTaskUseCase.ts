import { InternalError } from "@/consts/error";
import { slotCountToPersonDays } from "@/lib/date";
import { TaskDetail, taskModel } from "@/models/task.model";
import { taskRepository } from "@/repositories/task-repository";

export async function getSingleTaskUseCase(
  id: number,
  repo = taskRepository,
): Promise<TaskDetail> {
  const parsedId = taskModel.shape.id.safeParse(id);
  if (!parsedId.success)
    throw new InternalError({ page: ["対象のタスクが存在しません。"] });

  try {
    const taskWithActualCount = await repo.findWithActualCount(parsedId.data);
    if (taskWithActualCount === null) {
      throw new InternalError({
        page: [
          "対象のタスクが見つかりません。対象が存在するか確認してください。",
        ],
      });
    }

    const { actual_count, ...task } = taskWithActualCount;
    return { ...task, actual_time: slotCountToPersonDays(actual_count) };
  } catch (err) {
    if (err instanceof InternalError) throw err;
    else
      throw new InternalError({
        page: ["タスクの取得に失敗しました。ログを確認してください。"],
      });
  }
}
