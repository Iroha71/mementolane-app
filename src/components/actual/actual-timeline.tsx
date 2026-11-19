import { Actual } from "@/models/actual.model";
import { formatRecordAtLocal, getRecordAtsInDay } from "@/lib/date";
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
  day: Date;
  actuals: Actual[];
  onUpdate: (recordAt: string) => void;
}

interface TaskCellProps {
  actual: Actual | undefined;
  recordAt: string;
  onClick: (recordAt: string) => void;
}

const TaskCell = ({
  actual,
  recordAt,
  onClick,
}: TaskCellProps): React.JSX.Element => (
  <TableCell onClick={() => onClick(recordAt)}>{actual?.task_title}</TableCell>
);

export default function ActualTimeline({
  day,
  actuals,
  onUpdate,
}: ActualTimelineProps) {
  const recordAts = getRecordAtsInDay(day);
  const actualByRecordAt = new Map(
    actuals.map((actual) => [actual.record_at, actual]),
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
        {recordAts.map((recordAt) => (
          <TableRow key={recordAt}>
            <TableCell>{formatRecordAtLocal(recordAt)}</TableCell>
            <TaskCell
              actual={actualByRecordAt.get(recordAt)}
              recordAt={recordAt}
              onClick={onUpdate}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
