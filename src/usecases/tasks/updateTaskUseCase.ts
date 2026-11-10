import { InternalError } from "@/consts/error";
import { TaskInput, taskInputModel, taskModel } from "@/models/task.model";
import { taskRepository } from "@/repositories/task-repository";
import z from "zod";

export async function updateTaskUseCase(
  id: number,
  input: TaskInput,
  repo = taskRepository,
) {
  const parsedId = taskModel.shape.id.safeParse(id);
  if (!parsedId.success)
    throw new InternalError({ page: ["対象のタスクが見つかりません。"] });
  const parsedInput = taskInputModel.safeParse(input);
  if (!parsedInput.success)
    throw new InternalError(z.flattenError(parsedInput.error).fieldErrors);
  try {
    const updatedTask = await repo.update(
      parsedId.data,
      parsedInput.data.title,
      parsedInput.data.status,
      parsedInput.data.start_at,
      parsedInput.data.due_at,
    );

    if (updatedTask === null) {
      throw new InternalError({
        page: [
          "タスク更新に失敗しました。対象タスクが存在するか確認してください。",
        ],
      });
    }

    return updatedTask;
  } catch (err) {
    console.error(err);
    if (err instanceof InternalError) throw err;
    else
      throw new InternalError({
        page: ["タスク更新に失敗しました。もう一度お試しください。"],
      });
  }
}
