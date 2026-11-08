import { InternalError } from "@/consts/error";
import { Task, TaskInput } from "@/models/task.model";
import { updateTaskUseCase } from "@/usecases/tasks/updateTaskUseCase";
import { useState } from "react";

export function useUpdateTask(id: number) {
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);
  const [error, setError] = useState<Record<string, string[]> | undefined>(
    undefined,
  );

  const submitTask = async (input: TaskInput) => {
    try {
      setError(undefined);
      const updatedTask = await updateTaskUseCase(id, input);
      setUpdatedTask(updatedTask);
    } catch (err) {
      if (err instanceof InternalError) setError(err.errors);
    }
  };

  return { submitTask, error, updatedTask };
}
