import { InternalError } from "@/consts/error";
import { taskUpdateModel } from "@/models/task.model";
import { taskRepository } from "@/repositories/task-repository";

export async function completeTaskUseCase(
  id: number,
  isCompleted: boolean,
  repo = taskRepository,
): Promise<void> {
  const parsedInput = taskUpdateModel
    .pick({ id: true, completed: true })
    .safeParse({ id, completed: isCompleted ? 1 : 0 });

  if (!parsedInput.success) {
    throw new InternalError({ page: ["対象のタスクが見つかりません。"] });
  }

  try {
    const targetTask = await repo.find(parsedInput.data.id);
    if (targetTask === null)
      throw new InternalError({ page: ["対象のタスクが見つかりません。"] });
    await repo.update(
      targetTask.id,
      targetTask.title,
      targetTask.status,
      targetTask.start_at,
      targetTask.due_at,
      parsedInput.data.completed,
    );
  } catch (err) {
    if (err instanceof InternalError) throw err;
    else {
      throw new InternalError({
        page: ["タスク状態の更新に失敗しました。もう一度お試しください。"],
      });
    }
  }
}
