import { Task } from "@/schemas/task.schema";
import { createActualToSlotUseCase } from "@/usecases/actuals/createActualToSlot";
import { useState } from "react";
import { ActualInput } from "@/schemas/actual.schema";
import { formatDate } from "@/lib/date";
import { useUpdateTaskActual } from "@/hooks/tasks/useUpdateTaskActual";

// 1スロット = 30分
const SLOT_HOURS = 0.5;

export function useCreateActual(onCreated: () => Promise<void>) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { updateActual, updateActualError } = useUpdateTaskActual();

  const createActualInSlot = async (date: Date, slot: number) => {
    if (selectedTask == null) {
      throw new Error("タスクを選択してください");
    }

    const input: ActualInput = {
      task_id: selectedTask.id,
      record_at: formatDate(date),
      slot: slot,
    };

    try {
      const { error } = await createActualToSlotUseCase(input);
      // 入力エラーのときは登録されていないので、実績時間も足さない
      if (error) return;

      await updateActual(selectedTask.id, SLOT_HOURS);
      await onCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    selectedTask,
    setSelectedTask,
    createActualInSlot,
    updateActualError,
  };
}
