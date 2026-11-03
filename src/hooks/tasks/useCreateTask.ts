import type { TaskFieldErrors } from "@/components/task/task-form";
import { TaskInput } from "@/schemas/task.schema";
import { createTaskUseCase } from "@/usecases/tasks/createTask";
import { useState } from "react";

interface UseCreateTaskOptions {
  /** 登録に成功したときに呼ばれる */
  onSuccess?: () => void;
}

export function useCreateTask({ onSuccess }: UseCreateTaskOptions = {}) {
  const [backendError, setBackendError] = useState<string[]>([]);

  const submitTask = async (
    task: TaskInput,
  ): Promise<TaskFieldErrors | null> => {
    setBackendError([]);

    try {
      const result = await createTaskUseCase(task);
      if (result.success) {
        onSuccess?.();
        return null;
      }

      if (!result.error) {
        setBackendError(["タスクの登録に失敗しました。再度登録してください。"]);
        return null;
      }

      // 特定の項目に紐づかないエラーは画面全体のエラーとして持つ
      setBackendError(result.error.formErrors);
      return result.error.fieldErrors;
    } catch (err) {
      setBackendError([String(err)]);
      return null;
    }
  };

  return { submitTask, backendError };
}
