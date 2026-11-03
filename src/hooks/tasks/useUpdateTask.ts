import type { TaskFieldErrors } from "@/components/task/task-form";
import { TaskInput } from "@/schemas/task.schema";
import { updateTaskUseCase } from "@/usecases/tasks/updateTask";
import { useState } from "react";

interface UseUpdateTaskProps {
  /** 更新に成功したときに呼ばれる */
  onSuccess?: () => void;
}

export function useUpdateTask(
  id: number,
  { onSuccess }: UseUpdateTaskProps = {},
) {
  const [backendError, setBackendError] = useState<string[]>([]);

  const submitTask = async (
    input: TaskInput,
  ): Promise<TaskFieldErrors | null> => {
    setBackendError([]);

    try {
      const result = await updateTaskUseCase(id, input);
      if (result.success) {
        onSuccess?.();
        return null;
      }

      if (!result.error) {
        setBackendError(["タスクの更新に失敗しました。再度更新してください。"]);
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
