import { InternalError } from "@/consts/error";
import { taskModel } from "@/models/task.model";
import { taskRepository } from "@/repositories/task-repository";
import z from "zod";

export async function updateTaskStatusUseCase(
  id: number,
  status: string,
  repo = taskRepository,
) {
  const parsedId = taskModel.shape.id.safeParse(id);
  if (!parsedId.success)
    throw new InternalError({
      page: z.flattenError(parsedId.error).formErrors,
    });

  const parsedStatus = taskModel.shape.status.safeParse(status);
  if (!parsedStatus.success)
    throw new InternalError({
      page: z.flattenError(parsedStatus.error).formErrors,
    });

  try {
    const task = await repo.find(parsedId.data);
    if (task === null)
      throw new InternalError({ page: ["対象タスクが見つかりません。"] });

    const updatedTask = await repo.update(
      parsedId.data,
      task.title,
      parsedStatus.data,
      task.start_at,
      task.due_at,
      task.completed,
    );

    return updatedTask;
  } catch (err) {
    if (err instanceof InternalError) throw err;
    else {
      throw new InternalError({
        page: ["タスクを更新できませんでした。もう一度お試しください。"],
      });
    }
  }
}
