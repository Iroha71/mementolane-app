import { TaskInput } from "@/schemas/task.schema";
import { updateTaskUseCase } from "@/usecases/tasks/updateTask";
import { useEffect, useState } from "react";

interface UseUpdateTaskProps {
  onSuccess?: () => void;
}

export function useUpdateTask(id: number, { onSuccess }: UseUpdateTaskProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {}, [id]);

  const submitTask = async (input: TaskInput) => {
    try {
      const result = await updateTaskUseCase(id, input);
      if (result.success) {
        onSuccess?.();
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { submitTask };
}
