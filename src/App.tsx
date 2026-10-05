import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Task } from "./models/task.model";
import { getTasks } from "./repositories/task-repository";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks()
      .then((tasks) => setTasks(tasks))
      .catch((e) => console.error(e));
  }, []);

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <ul>
        {tasks.map((task) => (
          <li>{task.title}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
