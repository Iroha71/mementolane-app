import { Task } from "@/schemas/task.schema";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CircleCheck, Clock, Hourglass, Ticket } from "lucide-react";
import { formatWeekDay } from "@/lib/date";

interface TaskTicketProps {
  task: Task;
  onToggleCompleted: (completed: boolean) => void;
}

export default function TaskTicket({ task }: TaskTicketProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Ticket />
          {task.title}
        </CardTitle>
        <CardAction>
          <button
            type="button"
            aria-label="完了にする"
            className="cursor-pointer"
          >
            <CircleCheck className="size-5" />
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-2 text-base">
          <Clock className="size-4" />
          <label>開始日: </label>
          <span className="font-bold">
            {task.startAt ? formatWeekDay(task.startAt) : "---"}
          </span>
        </p>
        <p className="flex items-center gap-2 text-base">
          <Hourglass className="size-4" />
          <label>期限日: </label>
          <span className="font-bold">
            {task.dueAt ? formatWeekDay(task.dueAt) : "---"}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
