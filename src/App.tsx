import { useEffect, useState } from "react";
import "./App.css";
import { Task } from "./models/task.model";
import { getTasks } from "./repositories/task-repository";
import TaskCard from "./components/task/task-card";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>('');

  const emptyTaskList = () => {
    return <p>タスクはありません</p>;
  };

  const taskList = () => {
    return tasks.map((task) => <TaskCard task={task} />);
  };

  useEffect(() => {
    getTasks()
      .then((tasks) => setTasks(tasks))
      .catch((e) => console.error(e));
  }, []);

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>
      {error !== '' ? <p>データ読み取り時にエラーが発生しました：{error}</p> : null}
      {tasks.length <= 0 ? emptyTaskList() : taskList()}
    </main>
  );
}

export default App;
