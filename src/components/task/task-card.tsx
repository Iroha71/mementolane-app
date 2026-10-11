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
import { Button } from "@base-ui/react/button";
import { toggleCompleted } from "@/repositories/task-repository";

interface TaskCardProps {
  task: Task;
  onUpdated: (task: Task) => void;
  onError: (message: string) => void;
}

export default function TaskCard({ task, onUpdated, onError }: TaskCardProps) {
  const completeTask = async () => {
    try {
      const updated = await toggleCompleted(task.id, true);
      onUpdated(updated);
    } catch (e) {
      console.error(e);
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
        <Button onClick={() => completeTask()}>完了にする</Button>
      </CardFooter>
    </Card>
  );
}
