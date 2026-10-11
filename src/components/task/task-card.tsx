import { useState } from "react";
import { formatDateWithWeekday } from "@/lib/date";
import { Task } from "@/models/task.model";
import { Tickets } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { setTaskCompleted } from "@/repositories/task-repository";
import { Button } from "../ui/button";

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
      </CardContent>
      <CardFooter>
        <Button onClick={completeTask} disabled={isUpdating}>
          {isUpdating ? "更新中..." : "完了にする"}
        </Button>
      </CardFooter>
    </Card>
  );
}
