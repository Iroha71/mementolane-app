import { getTaskById } from "@/repositories/task-repository";
import { Task } from "@/schemas/task.schema";
import { useEffect, useState } from "react";

export function useGetTask(id: number) {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      setError("");
      setIsLoading(true);
      setTask(await getTaskById(id));
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { task, fetchTask, isLoading, error };
}
