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
  onUpdateSlot: (slot: number) => void;
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
  onUpdateSlot,
}: ActualCalendarProps) {
  const times = getTimes();
  // 同じ slot が複数ある場合は、id が最も小さい（先に登録された）実績を表示する
  const actualBySlot = new Map<number, Actual>();
  for (const actual of actuals) {
    if (!actualBySlot.has(actual.slot)) {
      actualBySlot.set(actual.slot, actual);
    }
  }

  const findActualInSlot = (slotNumber: number) => {
    const result = actualBySlot.get(slotNumber);
    if (result !== undefined) {
      return (
        <TableCell
          key={slotNumber}
          role="button"
          tabIndex={0}
          className="border"
          onClick={() => onUpdateSlot(slotNumber)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onUpdateSlot(slotNumber);
            }
          }}
        >
          {result.task_title}
        </TableCell>
      );
    } else {
      return (
        <TableCell
          key={slotNumber}
          role="button"
          className="border bg-amber-50"
          onClick={() => onUpdateSlot(slotNumber)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onUpdateSlot(slotNumber);
            }
          }}
        ></TableCell>
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
