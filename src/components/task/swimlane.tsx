import { Task } from "@/models/task.model";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TaskCard from "./task-card";

interface SwimlaneProps {
    status: "planning" | "thisweek" | "wip" | "reviewing" | "delivering";
    tasks: Task[];
}

export default function Swimlane ({status, tasks}: SwimlaneProps) {
    return (
        <Card className="w-[22rem] shrink-0 [--card-spacing:--spacing(2)]">
            <CardHeader>
                <CardTitle>{status}</CardTitle>
            </CardHeader>
            <CardContent>
                {tasks.length > 0 ? tasks.map((task) => <TaskCard task={task} />) : <p>タスクはありません</p>}
            </CardContent>
        </Card>
    )
}