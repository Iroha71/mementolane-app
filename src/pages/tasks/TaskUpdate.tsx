import TaskForm from "@/components/task/task-form";
import { useGetTask } from "@/hooks/tasks/useGetTask";
import { useUpdateTask } from "@/hooks/tasks/useUpdateTask";
import { useNavigate, useParams } from "react-router";
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
  const navigate = useNavigate();
  const { task, isLoading, error } = useGetTask(id);
  const { submitTask } = useUpdateTask(id, {
    onSuccess: () => navigate("/"),
  });

  if (isLoading) return <p className="text-center">読み込み中...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!task) {
    return <p className="text-center">タスクが見つかりませんでした。</p>;
  }

  // TaskForm の defaultValues は最初の描画でしか読まれないため、読み込み後に描画する
  return (
    <div className="flex flex-col items-center gap-4">
      <TaskForm
        legend="タスクを編集"
        submitLabel="更新する"
        defaultValues={{
          title: task.title,
          status: task.status,
          start_at: task.start_at,
          due_at: task.due_at,
          completed: task.completed,
        }}
        onSubmit={submitTask}
      />
    </div>
  );
}
