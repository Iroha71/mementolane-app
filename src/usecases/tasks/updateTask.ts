import { updateTask } from "@/repositories/task-repository";
import { TaskInput, taskInputSchema } from "@/schemas/task.schema";
import z from "zod";
import { $ZodFlattenedError } from "zod/v4/core";

export async function updateTaskUseCase(
  id: number,
  input: TaskInput,
): Promise<{ success: boolean; error: $ZodFlattenedError<TaskInput> | null }> {
  const result = taskInputSchema.safeParse(input);
  if (result.success === false)
    return { success: false, error: z.flattenError(result.error) };

  try {
    const { success } = await updateTask(id, input);
    if (!success) {
      return {
        success: false,
        error: { formErrors: ["タスクの更新に失敗しました。"], fieldErrors: {} },
      };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error(err);
    throw new Error(
      `タスクの更新に失敗しました。再度更新してください。\n${err}`,
    );
  }
}
