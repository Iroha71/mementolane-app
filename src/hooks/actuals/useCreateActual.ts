import { Task } from "@/models/task.model";
import { useState } from "react";
import { ActualInput } from "@/models/actual.model";
import { slotToRecordAt } from "@/lib/date";
import { upsertActualUseCase } from "@/usecases/actuals/upsertActualUseCase";
import { InternalError } from "@/consts/error";
import { message } from "@tauri-apps/plugin-dialog";

const DEFAULT_ERROR_MESSAGE =
  "実績の登録に失敗しました。もう一度お試しください。";

const showError = (text: string) =>
  message(text, { title: "実績を登録できませんでした", kind: "error" });

/** 捕まえたエラーから、ダイアログに表示するメッセージを取り出す */
const getErrorMessage = (err: unknown): string => {
  if (!(err instanceof InternalError)) {
    return DEFAULT_ERROR_MESSAGE;
  }

  return err.errors.page?.[0] ?? DEFAULT_ERROR_MESSAGE;
};

export function useCreateActual(onCreated: () => Promise<void>) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [error, setError] = useState<Record<string, string[]> | null>(null);

  const createActualInSlot = async (date: Date, slot: number) => {
    // 前回のエラー表示を消してから登録する
    setError(null);

    if (selectedTask === null) {
      await showError("タスクが選択されていません。");
      return;
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
      // zod などの項目ごとのエラーは、画面の ErrorAlert に表示する
      if (err instanceof InternalError && err.errors.page === undefined) {
        setError(err.errors);
        return;
      }
      await showError(getErrorMessage(err));
    }
  };

  return { selectedTask, setSelectedTask, createActualInSlot, error };
}
