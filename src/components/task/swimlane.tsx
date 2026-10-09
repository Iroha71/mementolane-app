import { Task } from "@/models/task.model";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TaskCard from "./task-card";
import { LucideIcon } from "lucide-react";

interface SwimlaneProps {
    label: string;
    icon: LucideIcon;
    tasks: Task[];
}

export default function Swimlane ({label, icon: Icon, tasks}: SwimlaneProps) {
    return (
        <Card className="w-[22rem] shrink-0 [--card-spacing:--spacing(2)]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Icon className="size-4" />
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 overflow-y-auto">
                {tasks.length > 0 ? tasks.map((task) => <TaskCard key={task.id} task={task} />) : <p>タスクはありません</p>}
            </CardContent>
        </Card>
    )
}