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
  onUpdateSlot: (slotNumber: number) => void;
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
  onSlotClick: (slot: number) => void;
}

const TaskCell = ({
  actuals,
  slot,
  onSlotClick,
}: TaskCellProps): React.JSX.Element => {
  const result = actuals.find((actual) => actual.slot === slot);
  if (result !== undefined) {
    return (
      <TableCell onClick={() => onSlotClick(slot)}>
        {result.task_title}
      </TableCell>
    );
  } else {
    return <TableCell onClick={() => onSlotClick(slot)}></TableCell>;
  }
};

export default function ActualTimeline({
  actuals,
  onUpdateSlot,
}: ActualTimelineProps) {
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
            <TaskCell
              actuals={actuals}
              slot={index}
              onSlotClick={onUpdateSlot}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
