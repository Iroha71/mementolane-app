import { getAllTasks } from "@/repositories/task-repository";
import { Task } from "@/schemas/task.schema";
import { useEffect, useState } from "react";

export function useTaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      setTasks(await getAllTasks(false));
    } catch (err) {
      console.error(err);
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
