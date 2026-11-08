import { InternalError } from "@/consts/error";
import { Task } from "@/models/task.model";
import { getSingleTaskUseCase } from "@/usecases/tasks/getSingleTaskUseCase";
import { useEffect, useState } from "react";

export function useGetTask(id: number) {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
