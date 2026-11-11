import ErrorAlert from "@/components/ErrorAlert";
import TaskForm from "@/components/task/task-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleCheckIcon } from "lucide-react";
import { useGetTask } from "@/hooks/tasks/useGetTask";
import { useUpdateTask } from "@/hooks/tasks/useUpdateTask";
import { useParams } from "react-router";
import z from "zod";

const idParamSchema = z.coerce.number().int().positive();

export default function TaskUpdate() {
  const { id } = useParams();
  const parsedId = idParamSchema.safeParse(id);

  if (!parsedId.success) {
    return (
      <p className="text-center text-red-600">
        タスクの指定が正しくありません。
      </p>
    );
  }

  return <TaskUpdateContent key={parsedId.data} id={parsedId.data} />;
}

function TaskUpdateContent({ id }: { id: number }) {
  const { task, isLoading, error: fetchError } = useGetTask(id);
  const { submitTask, error: updateError, updatedTask } = useUpdateTask(id);

  if (isLoading) return <p className="text-center">読み込み中...</p>;
  if (fetchError) {
    return (
      <div className="flex justify-center">
        <ErrorAlert
          message={fetchError.page?.[0] ?? "タスクの取得に失敗しました。"}
        />
      </div>
    );
  }
  if (!task) {
    return <p className="text-center">タスクが見つかりませんでした。</p>;
  }
  const currentTask = updatedTask ?? task;

  return (
    <div className="flex flex-col items-center gap-4">
      <TaskForm
        // TaskForm は defaultValues を最初の描画でしか読まないため、内容が変わったら作り直す
        key={JSON.stringify(currentTask)}
        legend="タスクを編集"
        submitLabel="更新する"
        defaultValues={{
          title: currentTask.title,
          status: currentTask.status,
          start_at: currentTask.start_at,
          due_at: currentTask.due_at,
          completed: currentTask.completed,
        }}
        actualTime={task.actual_time}
        onSubmit={submitTask}
        error={updateError}
        notice={
          updateError ? (
            <ErrorAlert
              message={updateError.page?.[0] ?? "入力内容を確認してください。"}
            />
          ) : (
            updatedTask && (
              <Alert>
                <CircleCheckIcon />
                <AlertTitle>更新しました</AlertTitle>
              </Alert>
            )
          )
        }
      />
    </div>
  );
}
