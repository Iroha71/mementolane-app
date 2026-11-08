import TaskForm from "@/components/task/task-form";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { taskModel } from "@/models/task.model";
import { useNavigate, useSearchParams } from "react-router";

export default function TaskCreate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { submitTask, error } = useCreateTask({
    onSuccess: () => navigate("/"),
  });
  const parsedStatus = taskModel.shape.status.safeParse(
    searchParams.get("defaultStatus"),
  );
  const defaultStatus = parsedStatus.success ? parsedStatus.data : "planning";

  return (
    <div className="flex flex-col items-center gap-4">
      <TaskForm
        defaultValues={{ status: defaultStatus }}
        onSubmit={submitTask}
        error={error}
      />
    </div>
  );
}
