import { getAllTasks } from "@/repositories/task-repository";
import { Task } from "@/schemas/task.schema";
import { useEffect, useState } from "react";

export function useTaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);
    getAllTasks(false)
      .then((_tasks) => setTasks(_tasks))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { tasks, isLoading, error };
}
