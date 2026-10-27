import ActualCalendar from "@/components/actual/actual-calendar";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addDays,
  formatDateParam,
  formatLocalDate,
  parseDateParam,
} from "@/lib/date";
import { Actual } from "@/models/actual.model";
import { Task } from "@/models/task.model";
import { getActualsByDate } from "@/repositories/actual-repository";
import { getTasks } from "@/repositories/task-repository";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function ActualIndex() {
  const [actuals, setActuals] = useState<Actual[]>([]);
  const [error, setError] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchParams] = useSearchParams();
  const viewDay = searchParams.get("date");
  console.log(viewDay);
  const currentDay = viewDay ? parseDateParam(viewDay) : new Date();
  console.log(`currentDay ${currentDay}`);
  useEffect(() => {
    const date = viewDay ? new Date(viewDay) : new Date();
    getActualsByDate(date)
      .then((actuals) => {
        setActuals(actuals);
        setError("");
      })
      .catch((err) => setError(err));
  }, []);

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
      <div className="mb-4 flex flex-row gap-4">
        <Link
          to={`/actuals?date=${formatDateParam(addDays(currentDay, -1))}`}
          className={buttonVariants({ variant: "link" })}
        >
          <ArrowBigLeft />
          前日
        </Link>
        <h1 className="text-center text-lg">{formatLocalDate(currentDay)}</h1>
        <Link
          to={`/actuals?date=${formatDateParam(addDays(currentDay, 1))}`}
          className={buttonVariants({ variant: "link" })}
        >
          翌日
          <ArrowBigRight />
        </Link>
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
