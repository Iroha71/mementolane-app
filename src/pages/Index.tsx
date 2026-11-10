import Swimlane from "@/components/task/swimlane";
import { STATUSES } from "@/consts/constValues";
import { useTaskList } from "@/hooks/tasks/useTaskList";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import ErrorAlert from "@/components/ErrorAlert";

export default function Index() {
  const { tasks, isLoading, error } = useTaskList();
  const groupedTasks = Map.groupBy(tasks, (task) => task.status);

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
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
