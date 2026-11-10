import { InternalError } from "@/consts/error";
import { taskInputModel } from "@/models/task.model";
import { taskRepository } from "@/repositories/task-repository";
import z from "zod";

export async function updateActualTimeUseCase(
  id: number,
  addHour: number,
  repo = taskRepository,
) {
  const parsedAddValue = taskInputModel.shape.actual_time.safeParse(addHour);
  if (!parsedAddValue.success) {
    throw new InternalError({
      actual_time: z.flattenError(parsedAddValue.error).formErrors,
    });
  }

  const targetTask = await repo.find(id);
  if (targetTask == null)
    throw new InternalError({ page: ["更新対象のタスクが見つかりません。"] });
  const addValue = calcTotalPersonDay(addHour, targetTask.actual_time);
  const updatedTask = await repo.updateActual(id, addValue);

  return updatedTask;
}

function calcTotalPersonDay(addHour: number, currentPersonDay: number) {
  const parsedAddValue = addHour / 8;

  return currentPersonDay + parsedAddValue;
}
