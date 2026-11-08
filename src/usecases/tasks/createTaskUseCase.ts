import { InternalError } from "@/consts/error";
import { Task, TaskInput, taskInputModel } from "@/models/task.model";
import { taskRepository } from "@/repositories/task-repository";
import z from "zod";

export async function createTaskUseCase(
  input: TaskInput,
  repo = taskRepository,
): Promise<Task> {
  const parsedInput = taskInputModel.safeParse(input);
  if (!parsedInput.success) {
    const errors = z.flattenError(parsedInput.error);
    throw new InternalError(errors.fieldErrors);
  }
  try {
    const createdTask = await repo.create(
      parsedInput.data.title,
      parsedInput.data.status,
      parsedInput.data.start_at,
      parsedInput.data.due_at,
    );
    if (createdTask === null)
      throw new Error("タスクの作成に失敗しました。もう一度お試しください。");

    return createdTask;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("タスクの作成に失敗しました。もう一度お試しください。");
    }
  }
}
