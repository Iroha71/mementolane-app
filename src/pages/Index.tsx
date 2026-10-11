import { useEffect, useMemo, useState } from "react";
import { Task } from "@/models/task.model";
import { getTasks } from "@/repositories/task-repository";
import Swimlane from "@/components/task/swimlane";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { STATUSES } from "@/consts/constValues";

type ErrorInfo = { title: string; message: string } | null;

const toMessage = (e: unknown) =>
  (e instanceof Error ? e.message : String(e)) || "不明なエラー";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<ErrorInfo>(null);

  useEffect(() => {
    getTasks()
      .then((tasks) => setTasks(tasks))
      .catch((e: unknown) => {
        console.error(e);
        setError({
          title: "データの読み込みに失敗しました",
          message: toMessage(e),
        });
      });
  }, []);

  const handleTaskUpdated = (updated: Task) => {
    setTasks((prev) =>
      prev.map((current) => (current.id === updated.id ? updated : current)),
    );
    setError(null);
  };

  const handleTaskError = (message: string) => {
    setError({ title: "タスクの更新に失敗しました", message });
  };

  const tasksByStatus = useMemo(() => {
    const grouped = Object.fromEntries(
      STATUSES.map(({ name }) => [name, [] as Task[]]),
    ) as Record<Task["status"], Task[]>;
    for (const t of tasks) {
      if (t.completed === 1) continue;
      grouped[t.status].push(t);
    }
    return grouped;
  }, [tasks]);

  return (
    <main className="container h-screen">
      {error ? (
        <Alert className="mx-auto mb-5 w-fit">
          <InfoIcon />
          <AlertTitle>{error.title}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ) : null}
      <div className="flex h-screen min-h-0 flex-1 flex-row gap-4 overflow-x-auto p-4">
        {STATUSES.map(({ name, label, icon }) => (
          <Swimlane
            key={name}
            label={label}
            icon={icon}
            tasks={tasksByStatus[name]}
            onTaskUpdate={handleTaskUpdated}
            onError={handleTaskError}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
