import ActualCalendar from "@/components/actual/actual-calendar";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import { Link } from "react-router";

export default function ActualIndex() {
  const [actuals, setActuals] = useState<Actual[]>([]);
  const [actualsError, setActualsError] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksError, setTasksError] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<Date>(getToday());

  const normalizeErrorMessage = (err: unknown): string => {
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;
    return "不明なエラーが発生しました";
  };

  useEffect(() => {
    getActualsByDate(selectedDay)
      .then((actuals) => {
        setActuals(actuals);
        setActualsError("");
      })
      .catch((err) => {
        setActualsError(normalizeErrorMessage(err));
        console.error(err);
      });
  }, [selectedDay]);

  useEffect(() => {
    getTasks({ includeCompleted: true })
      .then((tasks) => {
        setTasks(tasks);
        setTasksError("");
      })
      .catch((err) => {
        console.error(err);
        setTasksError(normalizeErrorMessage(err));
      });
  }, []);

  const addSelectedDate = (addValue: number) => {
    const date = new Date(selectedDay);
    date.setDate(date.getDate() + addValue);
    setSelectedDay(date);
  };

  return (
    <main className="p-4">
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
      <ActualCalendar
        actuals={actuals}
        error={actualsError}
        onUpdateSlot={(slot) => setSelectedTaskId(slot)}
      />

      <div className="mt-4 flex flex-col gap-4">
        {tasksError && <Alert>{tasksError}</Alert>}
        <Table className="w-[30rem]">
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
        <div>
          <Link to="/" className="text-fg-brand mt-4 hover:underline">
            タスク一覧へ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
