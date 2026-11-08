import { Task } from "@/models/task.model";
import { getTasksUseCase } from "@/usecases/tasks/getTasksUseCase";
import { useEffect, useState } from "react";

export function useTaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      setTasks(await getTasksUseCase(false));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, isLoading, error, fetchTasks };
}
