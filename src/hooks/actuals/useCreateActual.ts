import { Task } from "@/models/task.model";
import { useState } from "react";
import { ActualInput } from "@/models/actual.model";
import { slotToRecordAt } from "@/lib/date";
import { upsertActualUseCase } from "@/usecases/actuals/upsertActualUseCase";

export function useCreateActual(onCreated: () => Promise<void>) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const createActualInSlot = async (date: Date, slot: number) => {
    if (selectedTask == null) {
      throw new Error("タスクを選択してください");
    }

    const input: ActualInput = {
      task_id: selectedTask.id,
      record_at: slotToRecordAt(date, slot),
    };

    try {
      await upsertActualUseCase(input);
      await onCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return { selectedTask, setSelectedTask, createActualInSlot };
}
