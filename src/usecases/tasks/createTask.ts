import { insertTask } from "@/repositories/task-repository";
import { TaskInput, taskInputSchema } from "@/schemas/task.schema";
import z from "zod";
import { $ZodFlattenedError } from "zod/v4/core";

export async function createTask(
  task: TaskInput,
): Promise<{ success: boolean; error: $ZodFlattenedError<TaskInput> | null }> {
  const result = taskInputSchema.safeParse(task);
  if (result.success === false)
    return { success: false, error: z.flattenError(result.error) };

  try {
    const createResult = await insertTask(
      task.title,
      task.status,
      task.start_at,
      task.due_at,
    );

    return { success: createResult.success, error: null };
  } catch (err) {
    console.error(err);
    throw new Error(
      `タスクの登録に失敗しました。再度登録してください。\n${err}`,
    );
  }
}
