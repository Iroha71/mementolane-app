import { useEffect, useMemo, useState } from "react";
import { Task } from "@/models/task.model";
import { getTasks } from "@/repositories/task-repository";
import Swimlane from "@/components/task/swimlane";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { STATUSES } from "@/consts/constValues";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getTasks()
      .then((tasks) => setTasks(tasks))
      .catch((e: unknown) => {
        console.error(e);
        setError((e instanceof Error ? e.message : String(e)) || "不明なエラー");
      });
  }, []);

  const tasksByStatus = useMemo(() => {
    const grouped = Object.fromEntries(
      STATUSES.map(({ name }) => [name, [] as Task[]]),
    ) as Record<Task["status"], Task[]>;
    for (const t of tasks) {
      grouped[t.status].push(t);
    }
    return grouped;
  }, [tasks]);

  return (
    <main className="container h-screen">
      {error !== "" ? (
        <Alert className="mx-auto mb-5 w-fit">
          <InfoIcon />
          <AlertTitle>データの読み込みに失敗しました</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <div className="flex h-screen min-h-0 flex-1 flex-row gap-4 overflow-x-auto p-4">
        {STATUSES.map(({ name, label, icon }) => (
          <Swimlane
            key={name}
            label={label}
            icon={icon}
            tasks={tasksByStatus[name]}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
