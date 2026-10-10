import { useEffect, useMemo, useState } from "react";
import { Task } from "@/models/task.model";
import { getTasks } from "@/repositories/task-repository";
import Swimlane from "@/components/task/swimlane";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CalendarDaysIcon,
  HammerIcon,
  InfoIcon,
  LucideIcon,
  NotebookPenIcon,
  PackageIcon,
  SearchCheckIcon,
} from "lucide-react";

interface StatusGroup {
  name: Task["status"];
  label: string;
  icon: LucideIcon;
}

const STATUSES: StatusGroup[] = [
  { name: "planning", label: "予定", icon: NotebookPenIcon },
  { name: "thisweek", label: "今週やること", icon: CalendarDaysIcon },
  { name: "wip", label: "作業中", icon: HammerIcon },
  { name: "reviewing", label: "レビュー中", icon: SearchCheckIcon },
  { name: "delivering", label: "検収中", icon: PackageIcon },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getTasks()
      .then((tasks) => setTasks(tasks))
      .catch((e) => {
        console.error(e);
        setError(e);
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
