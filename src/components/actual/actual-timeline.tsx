import { Actual } from "@/models/actual.model";
import { recordAtToSlot } from "@/lib/date";
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
  actual: Actual | undefined;
  slot: number;
  onSlotClick: (slot: number) => void;
}

const TaskCell = ({
  actual,
  slot,
  onSlotClick,
}: TaskCellProps): React.JSX.Element => (
  <TableCell onClick={() => onSlotClick(slot)}>{actual?.task_title}</TableCell>
);

export default function ActualTimeline({
  actuals,
  onUpdateSlot,
}: ActualTimelineProps) {
  // record_at（UTC）をローカルのスロット番号に変換して引けるようにする
  const actualBySlot = new Map(
    actuals.map((actual) => [recordAtToSlot(actual.record_at), actual]),
  );

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
              actual={actualBySlot.get(index)}
              slot={index}
              onSlotClick={onUpdateSlot}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
