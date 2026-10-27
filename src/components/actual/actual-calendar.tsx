import { Actual } from "@/models/actual.model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Alert, AlertTitle } from "../ui/alert";
import { InfoIcon } from "lucide-react";

interface ActualCalendarProps {
  actuals: Actual[];
  error: string;
}

const getTimes = (): string[] => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    times.push(`${i}:00`);
    times.push(`${i}:30`);
  }

  return times;
};

export default function ActualCalendar({
  actuals,
  error,
}: ActualCalendarProps) {
  const times = getTimes();
  const findActualInSlot = (slotNumber: number) => {
    const result = actuals.find((actual) => actual.slot === slotNumber);
    if (result !== undefined) {
      return (
        <TableCell key={slotNumber} className="border">
          {result.task_title}
        </TableCell>
      );
    } else {
      return (
        <TableCell key={slotNumber} className="border bg-amber-50"></TableCell>
      );
    }
  };
  return (
    <div>
      {error === "" ? (
        <Table>
          <TableHeader>
            <TableRow>
              {times.map((time) => (
                <TableHead key={time} className="w-[2rem] border">
                  {time}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-10">
              {times.map((_, index) => findActualInSlot(index))}
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Alert>
          <InfoIcon></InfoIcon>
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
    </div>
  );
}
