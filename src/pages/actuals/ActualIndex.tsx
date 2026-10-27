import ActualCalendar from "@/components/actual/actual-calendar";
import { Alert } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatLocalDate, getToday } from "@/lib/date";
import { Actual } from "@/models/actual.model";
import { Task } from "@/models/task.model";
import { getActualsByDate } from "@/repositories/actual-repository";
import { getTasks } from "@/repositories/task-repository";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ActualIndex() {
  const [actuals, setActuals] = useState<Actual[]>([]);
  const [error, setError] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(getToday());

  useEffect(() => {
    getActualsByDate(selectedDay)
      .then((actuals) => {
        setActuals(actuals);
        setError("");
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  }, [selectedDay]);

  useEffect(() => {
    getTasks({ includeCompleted: true })
      .then((tasks) => setTasks(tasks))
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

  const addSelectedDate = (addValue: number) => {
    const date = new Date(selectedDay);
    date.setDate(date.getDate() + addValue);
    setSelectedDay(date);
  };

  return (
    <main className="p-4">
      {error ?? <Alert>{error}</Alert>}
      <div className="mb-4 flex flex-row gap-4">
        <Button onClick={() => addSelectedDate(-1)}>
          <ArrowBigLeft />
          前日
        </Button>
        <h1 className="text-center text-lg">{formatLocalDate(selectedDay)}</h1>
        <Button onClick={() => addSelectedDate(1)}>
          <ArrowBigRight />
          翌日
        </Button>
      </div>
      <ActualCalendar actuals={actuals} error={error} />

      <Table className="mt-4 w-120">
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
