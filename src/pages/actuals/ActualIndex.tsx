import ActualTimeline from "@/components/actual/actual-timeline";
import TaskList from "@/components/task/task-list";
import { useGetActuals } from "@/hooks/actuals/useGetActuals";
import { useTaskList } from "@/hooks/tasks/useTaskList";
import { formatDate } from "@/lib/date";

export default function ActualIndex() {
  const { actuals, targetDay } = useGetActuals();
  const { tasks } = useTaskList();
  return (
    <div className="grid grid-cols-3">
      <div className="sticky top-4 self-start">
        <TaskList tasks={tasks} />
      </div>
      <ActualTimeline date={formatDate(targetDay)} actuals={actuals} />
    </div>
  );
}
