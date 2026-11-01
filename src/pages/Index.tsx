import Swimlane from "@/components/task/swimlane";
import { STATUSES } from "@/consts/constValues";
import { useTaskList } from "@/hooks/tasks/useTaskList";
import { Link } from "react-router";

export default function Index() {
  const { tasks, isLoading, error, fetchTasks } = useTaskList();
  const groupedTasks = Map.groupBy(tasks, (task) => task.status);

  return (
    <div>
      {isLoading ? (
        <p>読み込み中</p>
      ) : (
        <div className="flex h-auto flex-row gap-4 overflow-x-auto p-2">
          <div>
            <Link to="/actuals">actual</Link>
          </div>
          {STATUSES.map((status) => (
            <Swimlane
              key={status.name}
              status={status}
              tasks={groupedTasks.get(status.name) ?? []}
              onToggleCompleted={(completed) => console.log(completed)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
