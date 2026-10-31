import { StatusGroup } from "@/consts/constValues";
import { Task } from "@/schemas/task.schema";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import StatusIcon from "./status-icon";
import TaskTicket from "./task-ticket";
import { Button } from "../ui/button";
import { Link } from "react-router";

interface SwimlaneProps {
  status: StatusGroup;
  tasks: Task[];
  onToggleCompleted: (completed: boolean) => void;
}

export default function Swimlane({
  status,
  tasks,
  onToggleCompleted,
}: SwimlaneProps) {
  return (
    <Card className="w-[20rem] shrink-0">
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
            onToggleCompleted={onToggleCompleted}
          />
        ))}
        <CardAction>
          <Link to={`/tasks/create?defaultStatus=${status.name}`}>
            ＋タスク作成
          </Link>
        </CardAction>
      </CardContent>
    </Card>
  );
}
