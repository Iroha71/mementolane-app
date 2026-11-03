import { updateActualUseCase } from "@/usecases/tasks/updateActualUseCase";
import { useState } from "react";

export function useUpdateTaskActual() {
  const [updateActualError, setUpdateActualError] = useState<string | null>(
    null,
  );

  async function updateActual(taskId: number, addValue: number) {
    try {
      setUpdateActualError(null);
      await updateActualUseCase(taskId, addValue);
    } catch (err) {
      setUpdateActualError(err instanceof Error ? err.message : String(err));
    }
  }

  return { updateActual, updateActualError };
}
