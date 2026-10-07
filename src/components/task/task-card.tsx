import { formatDateWithWeekday } from "@/lib/date";
import { Task } from "@/models/task.model";
import { Tickets } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="mx-auto w-[20rem]">
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
    </Card>
  );
}
