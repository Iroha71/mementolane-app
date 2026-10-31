import TaskForm from "@/components/task/task-form";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { taskSchema } from "@/schemas/task.schema";
import { useNavigate, useSearchParams } from "react-router";

export default function TaskCreate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { submitTask, backendError } = useCreateTask({
    onSuccess: () => navigate("/"),
  });
  const parsedStatus = taskSchema.shape.status.safeParse(
    searchParams.get("defaultStatus"),
  );
  const defaultStatus = parsedStatus.success ? parsedStatus.data : "planning";

  return (
    <div className="flex flex-col items-center gap-4">
      {backendError.length > 0 && (
        <p className="whitespace-pre-line text-red-600">
          {backendError.join("\n")}
        </p>
      )}
      <TaskForm defaultStatus={defaultStatus} onSubmit={submitTask} />
    </div>
  );
}
