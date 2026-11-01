import ActualTimeline from "@/components/actual/actual-timeline";
import TaskList from "@/components/task/task-list";
import { useCreateActual } from "@/hooks/actuals/useCreateActual";
import { useGetActuals } from "@/hooks/actuals/useGetActuals";
import { useTaskList } from "@/hooks/tasks/useTaskList";
import { formatDate } from "@/lib/date";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";

export default function ActualIndex() {
  const { actuals, targetDay, fetchActuals } = useGetActuals();
  const { tasks } = useTaskList();
  const { selectedTask, setSelectedTask, createActualInSlot } =
    useCreateActual(fetchActuals);
  return (
    <div className="grid grid-cols-3">
      <div className="sticky top-4 self-start">
        <TaskList
          tasks={tasks}
          selectedTaskId={selectedTask?.id ?? null}
          onSelectTask={setSelectedTask}
        />
        <div className="mt-4 text-center">
          <Link to="/" className={buttonVariants({ variant: "link" })}>
            ホームへ戻る
          </Link>
        </div>
      </div>
      <ActualTimeline
        date={formatDate(targetDay)}
        actuals={actuals}
        onUpdateSlot={(slot) => createActualInSlot(targetDay, slot)}
      />
    </div>
  );
}
