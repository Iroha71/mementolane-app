import { InternalError } from "@/consts/error";
import { Task, TaskInput } from "@/models/task.model";
import { completeTaskUseCase } from "@/usecases/tasks/completeTaskUseCase";
import { updateTaskUseCase } from "@/usecases/tasks/updateTaskUseCase";
import { useState } from "react";

interface UpdateTaskOptions {
  onSuccess?: () => void | Promise<void>;
}

export function useUpdateTask({ onSuccess }: UpdateTaskOptions) {
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);
  const [error, setError] = useState<Record<string, string[]> | undefined>(
    undefined,
  );

  const submitTask = async (taskId: number, input: TaskInput) => {
    try {
      setError(undefined);
      const updatedTask = await updateTaskUseCase(taskId, input);
      setUpdatedTask(updatedTask);
    } catch (err) {
      if (err instanceof InternalError) setError(err.errors);
    }
  };

  const toggleCompleted = async (task: Task) => {
    try {
      setError(undefined);
      const isCompleted = !task.completed;
      await completeTaskUseCase(task.id, isCompleted);
      await onSuccess?.();
    } catch (err) {
      if (err instanceof InternalError) setError(err.errors);
    }
  };

  return { submitTask, error, updatedTask, toggleCompleted };
}
