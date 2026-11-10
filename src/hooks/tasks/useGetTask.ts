import { InternalError } from "@/consts/error";
import { Task } from "@/models/task.model";
import { getSingleTaskUseCase } from "@/usecases/tasks/getSingleTaskUseCase";
import { useEffect, useState } from "react";

export function useGetTask(id: number) {
  const [task, setTask] = useState<Task | null>(null);
  // 最初の描画から読み込み中にしておき、取得前に「見つからない」表示が出ないようにする
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Record<string, string[]> | undefined>(
    undefined,
  );

  const fetchTask = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      setTask(await getSingleTaskUseCase(id));
    } catch (err) {
      if (err instanceof InternalError) setError(err.errors);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  return { task, fetchTask, isLoading, error };
}
