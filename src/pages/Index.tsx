import Swimlane from "@/components/task/swimlane";
import { STATUSES } from "@/consts/constValues";
import { useTaskList } from "@/hooks/tasks/useTaskList";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import ErrorAlert from "@/components/ErrorAlert";
import { updateTaskStatusUseCase } from "@/usecases/tasks/updateTaskStatusUseCase";

export default function Index() {
  const { tasks, isLoading, error, fetchTasks } = useTaskList();
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
          <div className="px-2 pt-2">
            <Link to="/actuals" className={buttonVariants({ variant: "link" })}>
              actual
            </Link>
          </div>
          {error && <ErrorAlert message={error} />}
          <div className="flex h-auto flex-row gap-4 overflow-x-auto p-2">
            {STATUSES.map((status) => (
              <Swimlane
                key={status.name}
                status={status}
                tasks={groupedTasks.get(status.name) ?? []}
                onToggleCompleted={(completed) => console.log(completed)}
                onChangedTaskStatus={changeTaskStatus}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
