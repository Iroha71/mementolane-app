import { InternalError } from "@/consts/error";
import { TaskInput } from "@/models/task.model";
import { createTaskUseCase } from "@/usecases/tasks/createTaskUseCase";
import { useState } from "react";

interface UseCreateTaskOptions {
  /** 登録に成功したときに呼ばれる */
  onSuccess?: () => void;
}

export function useCreateTask({ onSuccess }: UseCreateTaskOptions = {}) {
  const [error, setError] = useState<Record<string, string[]> | undefined>(
    undefined,
  );

  const submitTask = async (task: TaskInput): Promise<void> => {
    try {
      setError(undefined);

      await createTaskUseCase(task);
      onSuccess?.();
    } catch (err) {
      if (err instanceof InternalError) setError(err.errors);
    }
  };

  return { submitTask, error };
}
