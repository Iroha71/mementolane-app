import { useEffect, useState } from "react";
import "./App.css";
import { Task } from "./models/task.model";
import { getTasks } from "./repositories/task-repository";
import Swimlane from "./components/task/swimlane";

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
