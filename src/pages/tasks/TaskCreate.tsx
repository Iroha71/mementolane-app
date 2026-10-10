import TaskForm, {
  taskFormRequest,
  TaskFormRequest,
} from "@/components/task/task-form";
import { createTask } from "@/repositories/task-repository";
import { useState } from "react";
import { useNavigate } from "react-router";
import z from "zod";

export default function TaskCreate() {
  const [error, setError] = useState<string>("");
  const [parseError, setParseError] = useState<z.ZodError<TaskFormRequest>>();
  const navigate = useNavigate();

  const handleSubmit = (values: TaskFormRequest) => {
    setError("");
    const parsedRequest = taskFormRequest.safeParse(values);
    if (parsedRequest.success) {
      setParseError(undefined);
      const request = parsedRequest.data;
      // Promiseを返し、登録完了までフォームを送信中の状態にする
      return createTask(
        request.title,
        request.status,
        // 未入力の日付は空文字ではなくNULLで登録する
        request.start_at || null,
        request.due_at || null,
      )
        .then((lastInsertId) => {
          if (lastInsertId !== 0) {
            navigate("/");
          } else {
            throw new Error("登録したタスクのIDを取得できませんでした");
          }
        })
        .catch((e: unknown) => {
          console.error(e);
          setError(
            (e instanceof Error ? e.message : String(e)) || "不明なエラー",
          );
        });
    } else {
      setParseError(parsedRequest.error);
    }
  };

  return (
    <div className="flex min-h-screen justify-center p-4">
      {error && (
        <p className="text-red-500">データ登録に失敗しました: {error}</p>
      )}
      <TaskForm onSubmit={handleSubmit} parseError={parseError} />
    </div>
  );
}
