import { Task } from "@/schemas/task.schema";
import { getTaskList } from "@/usecases/tasks/getTaskList";
import { useEffect, useState } from "react";

export function useTaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      setTasks(await getTaskList(false));
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, isLoading, error, fetchTasks };
}
