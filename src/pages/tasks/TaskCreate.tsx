import TaskForm, { TaskFormRequest } from "@/components/task/task-form";
import { useState } from "react";

export default function TaskCreate() {
  const [taskValue, setTaskValue] = useState<TaskFormRequest | null>(null);
  const handleSubmit = (values: TaskFormRequest) => {
    console.log(values);
    setTaskValue(values);
  };

  return (
    <div className="flex min-h-screen justify-center p-4">
      <TaskForm onSubmit={handleSubmit} />
      <div>{taskValue?.title}</div>
    </div>
  );
}
