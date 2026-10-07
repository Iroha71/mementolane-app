import { useEffect, useState } from "react";
import "./App.css";
import { Task } from "./models/task.model";
import { getTasks } from "./repositories/task-repository";
import Swimlane from "./components/task/swimlane";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { InfoIcon } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getTasks()
      .then((tasks) => setTasks(tasks))
      .catch((e) => {
        console.error(e);
        setError(e);
      });
  }, []);

  return (
    <main className="container">
      {
        error !== "" ? (
          <Alert className="mx-auto w-fit mb-5">
            <InfoIcon />
            <AlertTitle>データの読み込みに失敗しました</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null
      }
      <div className="flex flex-row gap-4 overflow-x-auto">
        <Swimlane status="planning" tasks={tasks.filter((task) => task.status === 'planning')} />
        <Swimlane status="thisweek" tasks={tasks.filter((task) => task.status === 'thisweek')} />
        <Swimlane status="wip" tasks={tasks.filter((task) => task.status === 'wip')} />
        <Swimlane status="reviewing" tasks={tasks.filter((task) => task.status === 'reviewing')} />
        <Swimlane status="delivering" tasks={tasks.filter((task) => task.status === 'delivering')} />
      </div>
    </main>
  );
}

export default App;
