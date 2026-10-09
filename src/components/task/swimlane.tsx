import { Task } from "@/models/task.model";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TaskCard from "./task-card";
import { LucideIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

interface SwimlaneProps {
  label: string;
  icon: LucideIcon;
  tasks: Task[];
}

export default function Swimlane({ label, icon: Icon, tasks }: SwimlaneProps) {
  let navigate = useNavigate();

  return (
    <Card className="w-[22rem] shrink-0 [--card-spacing:--spacing(2)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-4" />
          {label}
          <Button variant="link" onClick={() => navigate("/task/create")}>
            <PlusIcon />
            タスクを作成
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 gap-2 overflow-y-auto">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p>タスクはありません</p>
        )}
      </CardContent>
    </Card>
  );
}
