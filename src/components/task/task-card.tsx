import { useState } from "react";
import { formatDateWithWeekday } from "@/lib/date";
import { task as taskSchema, Task } from "@/models/task.model";
import { Tickets } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { changeStatus, setTaskCompleted } from "@/repositories/task-repository";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { STATUSES } from "@/consts/constValues";

interface TaskCardProps {
  task: Task;
  onUpdated: (task: Task) => void;
  onError: (message: string) => void;
}

export default function TaskCard({ task, onUpdated, onError }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const completeTask = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const updated = await setTaskCompleted(task.id, true);
      onUpdated(updated);
    } catch (e) {
      console.error(e);
      onError((e instanceof Error ? e.message : String(e)) || "不明なエラー");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangeStatus = async (
    event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const status = taskSchema.shape.status.parse(event.currentTarget.value);
      const updated = await changeStatus(task.id, status);
      onUpdated(updated);
    } catch (error) {
      console.error(error);
      onError(
        (error instanceof Error ? error.message : String(error)) ||
          "不明なエラー",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tickets className="size-4" />
          {task.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-left">
        <div>
          <p>
            開始日:{" "}
            {task.start_at ? formatDateWithWeekday(task.start_at) : "---"}
          </p>
        </div>
        <div>
          <p>
            期限日: {task.due_at ? formatDateWithWeekday(task.due_at) : "---"}
          </p>
        </div>
        <hr className="my-2" />
        <Field>
          <select
            name="status"
            id={`status-${task.id}`}
            aria-label="状態"
            value={task.status}
            onChange={handleChangeStatus}
            // 完了済みタスクは状態を変更できないため操作不可にする
            disabled={isUpdating || task.completed === 1}
          >
            {STATUSES.map((_status) => (
              <option key={_status.name} value={_status.name}>
                {_status.label}
              </option>
            ))}
          </select>
        </Field>
      </CardContent>
      <CardFooter>
        <Button onClick={completeTask} disabled={isUpdating}>
          {isUpdating ? "更新中..." : "完了にする"}
        </Button>
      </CardFooter>
    </Card>
  );
}
