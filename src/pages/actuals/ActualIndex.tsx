import ActualTimeline from "@/components/actual/actual-timeline";
import TaskList from "@/components/task/task-list";
import { useCreateActual } from "@/hooks/actuals/useCreateActual";
import { useGetActuals } from "@/hooks/actuals/useGetActuals";
import { useTaskList } from "@/hooks/tasks/useTaskList";
import { formatWeekDay } from "@/lib/date";
import { Link } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import ErrorAlert from "@/components/ErrorAlert";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function ActualIndex() {
  const {
    actuals,
    targetDay,
    fetchActuals,
    error: fetchError,
    goToPrevDay,
    goToNextDay,
  } = useGetActuals();
  const { tasks } = useTaskList();
  const {
    selectedTask,
    setSelectedTask,
    drafts,
    resetDrafts,
    error: createError,
    assignTaskToSlot,
    upsertActuals,
  } = useCreateActual(fetchActuals);
  const createErrorMessages = createError
    ? Object.values(createError).flat()
    : [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="前日へ"
          onClick={() => {
            resetDrafts();
            goToPrevDay();
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <p className="text-xl">{formatWeekDay(targetDay)}</p>
        <Button
          variant="ghost"
          size="icon"
          aria-label="翌日へ"
          onClick={() => {
            resetDrafts();
            goToNextDay();
          }}
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div className="grid grid-cols-3">
        <div className="sticky top-4 self-start">
          <TaskList
            tasks={tasks}
            selectedTaskId={selectedTask?.id ?? null}
            onSelectTask={setSelectedTask}
          />
          <div className="mt-4 text-center">
            <Button onClick={upsertActuals}>更新する</Button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/" className={buttonVariants({ variant: "link" })}>
              ホームへ戻る
            </Link>
          </div>
        </div>
        <div>
          {fetchError && (
            <ErrorAlert
              message={fetchError.page?.[0] ?? "実績の取得に失敗しました。"}
            />
          )}
          {createErrorMessages.map((message, index) => (
            <ErrorAlert key={index} message={message} />
          ))}
          <ActualTimeline
            day={targetDay}
            drafts={drafts}
            actuals={actuals}
            onAssignTask={assignTaskToSlot}
          />
        </div>
      </div>
    </div>
  );
}
