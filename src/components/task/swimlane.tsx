import { StatusGroup } from "@/consts/constValues";
import { Task } from "@/schemas/task.schema";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StatusIcon from "./status-icon";
import TaskTicket from "./task-ticket";

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
      </CardContent>
    </Card>
  );
}
