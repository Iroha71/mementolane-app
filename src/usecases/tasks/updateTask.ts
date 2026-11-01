import { updateTask } from "@/repositories/task-repository";
import { TaskInput, taskInputSchema } from "@/schemas/task.schema";
import z from "zod";

export async function updateTaskUseCase(id: number, input: TaskInput) {
  const result = taskInputSchema.safeParse(input);
  if (!result.success) {
    return {
      success: false,
      error: z.flattenError(result.error),
    };
  }
  const { success } = await updateTask(id, input);
  return { success, error: null };
}
