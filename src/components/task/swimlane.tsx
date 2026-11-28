import { StatusGroup } from "@/consts/constValues";
import { Task } from "@/models/task.model";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import StatusIcon from "./status-icon";
import TaskTicket from "./task-ticket";
import { Link } from "react-router";
import { buttonVariants } from "../ui/button";

interface SwimlaneProps {
  status: StatusGroup;
  tasks: Task[];
  onToggleCompleted: (task: Task) => void;
  onChangedTaskStatus: (taskId: number, status: string) => void;
}

export default function Swimlane({
  status,
  tasks,
  onToggleCompleted,
  onChangedTaskStatus,
}: SwimlaneProps) {
  return (
    <Card className="w-[20rem] shrink-0 bg-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StatusIcon status={status.name} />
          {status.label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.map((task) => (
          <TaskTicket
            key={task.id}
            task={task}
            className="mb-2 shadow-md"
            onToggleCompleted={onToggleCompleted}
            onChangedStatus={onChangedTaskStatus}
          />
        ))}
        <CardAction>
          <Link
            to={`/tasks/create?defaultStatus=${status.name}`}
            className={buttonVariants({ variant: "link" })}
          >
            ＋タスク作成
          </Link>
        </CardAction>
      </CardContent>
    </Card>
  );
}
