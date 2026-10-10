import TaskForm, { TaskFormRequest } from "@/components/task/task-form";
import { createTask } from "@/repositories/task-repository";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function TaskCreate() {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // valuesはフォーム側のzodResolverで検証済み
  const handleSubmit = (values: TaskFormRequest) => {
    setError("");
    // Promiseを返し、登録完了までフォームを送信中の状態にする
    return createTask(
      values.title,
      values.status,
      // 未入力の日付は空文字ではなくNULLで登録する
      values.start_at || null,
      values.due_at || null,
    )
      .then(() => {
        navigate("/");
      })
      .catch((e: unknown) => {
        console.error(e);
        setError(
          (e instanceof Error ? e.message : String(e)) || "不明なエラー",
        );
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-4">
      {error && (
        <p className="w-full max-w-[30rem] text-red-500">
          データ登録に失敗しました: {error}
        </p>
      )}
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
