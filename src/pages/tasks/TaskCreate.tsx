import TaskForm from "@/components/task/task-form";
import { taskSchema } from "@/schemas/task.schema";
import { useSearchParams } from "react-router";

export default function TaskCreate() {
  const [searchParams] = useSearchParams();
  const parsedStatus = taskSchema.shape.status.safeParse(
    searchParams.get("defaultStatus"),
  );
  const defaultStatus = parsedStatus.success ? parsedStatus.data : "planning";

  return (
    <div className="flex justify-center">
      <TaskForm
        defaultStatus={defaultStatus}
        onSubmit={(task) => console.log(task)}
      />
    </div>
  );
}
