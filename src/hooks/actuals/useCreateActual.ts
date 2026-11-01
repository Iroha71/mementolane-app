import { Task } from "@/schemas/task.schema";
import { createActualToSlot } from "@/usecases/actuals/createActualToSlot";
import { useState } from "react";
import { ActualInput } from "@/schemas/actual.schema";
import { formatDate } from "@/lib/date";

export function useCreateActual(onCreated: () => Promise<void>) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
      await createActualToSlot(input);
      await onCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return { selectedTask, setSelectedTask, createActualInSlot };
}
