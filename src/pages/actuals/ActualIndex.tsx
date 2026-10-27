import ActualCalendar from "@/components/actual/actual-calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Actual } from "@/models/actual.model";
import { Task } from "@/models/task.model";
import { getActualsByDate } from "@/repositories/actual-repository";
import { getTasks } from "@/repositories/task-repository";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function ActualIndex() {
  const [actuals, setActuals] = useState<Actual[]>([]);
  const [error, setError] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchParams] = useSearchParams();
  const viewDay = searchParams.get("date");

  useState(() => {
    const date = viewDay ? new Date(viewDay) : new Date();
    getActualsByDate(date)
      .then((actuals) => {
        setActuals(actuals);
        setError("");
      })
      .catch((err) => setError(err));
  });

  useState(() => {
    getTasks({ includeCompleted: true })
      .then((tasks) => setTasks(tasks))
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  });

  return (
    <main className="p-4">
      <h1>{viewDay}</h1>
      <ActualCalendar actuals={actuals} error={error} />

      <Table className="w-120">
        <TableHeader>
          <TableRow>
            <TableHead>タスクID</TableHead>
            <TableHead>タスク名</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
