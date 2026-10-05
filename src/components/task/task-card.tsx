import { Task } from "@/models/task.model";
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
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.created_at}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p>開始日: {task.start_at ?? "---"}</p>
        </div>
        <div>
          <p>期限日: {task.due_at ?? "---"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
