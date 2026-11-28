import { Task } from "@/models/task.model";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CircleCheck, Hourglass } from "lucide-react";
import { formatWeekDay } from "@/lib/date";
import { Link } from "react-router";
import { STATUSES } from "@/consts/constValues";

interface TaskTicketProps {
  task: Task;
  className?: string;
  onChangedStatus: (id: number, status: string) => void;
  onToggleCompleted: (task: Task) => void;
}

export default function TaskTicket({
  task,
  className,
  onChangedStatus,
  onToggleCompleted,
}: TaskTicketProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">
          <Link
            to={`/tasks/${task.id}/edit`}
            className="flex items-center gap-2 hover:underline"
          >
            {task.title}
          </Link>
        </CardTitle>
        <CardAction>
          <button
            type="button"
            aria-label={task.completed ? "未完了にする" : "完了にする"}
            className="cursor-pointer"
            onClick={() => onToggleCompleted(task)}
            aria-pressed={task.completed === 1}
          >
            <CircleCheck className="size-5" />
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="flex items-center text-base">
          <Hourglass className="mr-2 size-4" />
          {task.start_at ? formatWeekDay(task.start_at) : "---"} →{" "}
          {task.due_at ? formatWeekDay(task.due_at) : "---"}
        </p>
        <hr className="my-2" />
        <div className="flex items-center gap-2">
          <span className="shrink-0">ステータス</span>
          <select
            value={task.status}
            onChange={(e) => onChangedStatus(task.id, e.target.value)}
            name="status"
            className="h-8 min-w-0 flex-1 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          >
            {STATUSES.map((status) => (
              <option key={status.name} value={status.name}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
