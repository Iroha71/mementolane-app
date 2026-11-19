import { Task } from "@/models/task.model";
import { useState } from "react";
import { ActualInput } from "@/models/actual.model";
import { upsertActualMultipleUseCase } from "@/usecases/actuals/upsertActualMultipleUseCase";
import { InternalError } from "@/consts/error";
import { message } from "@tauri-apps/plugin-dialog";

const showError = (text: string) =>
  message(text, { title: "実績を登録できませんでした", kind: "error" });

export function useCreateActual(onCreated: () => Promise<void>) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [drafts, setDrafts] = useState<Map<string, Task>>(new Map());
  const [error, setError] = useState<Record<string, string[]> | null>(null);

  const assignTaskToSlot = async (recordAt: string) => {
    if (selectedTask === null) {
      await showError("タスクが選択されていません。");
      return;
    }
    setDrafts((prev) => new Map(prev).set(recordAt, selectedTask));
  };

  const upsertActuals = async () => {
    setError(null);
    const inputs: ActualInput[] = Array.from(drafts, ([recordAt, task]) => ({
      task_id: task.id,
      record_at: recordAt,
    }));

    try {
      await upsertActualMultipleUseCase(inputs);
      await onCreated?.();
      setDrafts(new Map());
    } catch (err) {
      console.error(err);
      if (err instanceof InternalError) {
        setError(err.errors);
      }
    }
  };

  return {
    selectedTask,
    setSelectedTask,
    upsertActuals,
    error,
    assignTaskToSlot,
    drafts,
  };
}
