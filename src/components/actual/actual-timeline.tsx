import { Actual } from "@/schemas/actual.schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import React from "react";

interface ActualTimelineProps {
  actuals: Actual[];
  date: string;
}

interface TimeSlot {
  index: number;
  time: string;
}

const getTimes = (): TimeSlot[] => {
  const times: TimeSlot[] = [];
  for (let i = 0; i < 24; i++) {
    times.push({ index: i * 2, time: `${i}:00` });
    times.push({ index: i * 2 + 1, time: `${i}:30` });
  }

  return times;
};

const TIMES = getTimes();

interface TaskCellProps {
  actuals: Actual[];
  slot: number;
}

const TaskCell = ({ actuals, slot }: TaskCellProps): React.JSX.Element => {
  const result = actuals.find((actual) => actual.slot === slot);
  if (result !== undefined) {
    return <TableCell>{result.task_title}</TableCell>;
  } else {
    return <TableCell></TableCell>;
  }
};

export default function ActualTimeline({ actuals }: ActualTimelineProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-px">時間</TableHead>
          <TableHead>作業</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TIMES.map(({ index, time }) => (
          <TableRow key={index}>
            <TableCell>{time}</TableCell>
            <TaskCell actuals={actuals} slot={index} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
