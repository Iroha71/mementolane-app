import Swimlane from "@/components/task/swimlane";
import { STATUSES } from "@/consts/constValues";
import { useTaskList } from "@/hooks/tasks/useTaskList";
import ErrorAlert from "@/components/ErrorAlert";
import { updateTaskStatusUseCase } from "@/usecases/tasks/updateTaskStatusUseCase";
import { useUpdateTask } from "@/hooks/tasks/useUpdateTask";

export default function Index() {
  const { tasks, isLoading, error, fetchTasks } = useTaskList();
  const { toggleCompleted } = useUpdateTask({ onSuccess: fetchTasks });
  const groupedTasks = Map.groupBy(tasks, (task) => task.status);
  const changeTaskStatus = async (taskId: number, status: string) => {
    try {
      await updateTaskStatusUseCase(taskId, status);
      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>読み込み中</p>
      ) : (
        <>
          {error && <ErrorAlert message={error} />}
          <div className="flex h-auto flex-row gap-4 overflow-x-auto p-2">
            {STATUSES.map((status) => (
              <Swimlane
                key={status.name}
                status={status}
                tasks={groupedTasks.get(status.name) ?? []}
                onToggleCompleted={toggleCompleted}
                onChangedTaskStatus={changeTaskStatus}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
