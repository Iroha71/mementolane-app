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
import { Task } from "@/models/task.model";

interface ActualTimelineProps {
  day: Date;
  actuals: Actual[];
  drafts: Map<string, Task>;
  onAssignTask: (recordAt: string) => void;
}

interface TaskCellProps {
  title: string | undefined;
  recordAt: string;
  onClick: (recordAt: string) => void;
}

const TaskCell = ({
  title,
  recordAt,
  onClick,
}: TaskCellProps): React.JSX.Element => {
  return <TableCell onClick={() => onClick(recordAt)}>{title}</TableCell>;
};

export default function ActualTimeline({
  day,
  actuals,
  drafts,
  onAssignTask,
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
        {recordAts.map((recordAt) => {
          const actual = actualByRecordAt.get(recordAt);
          const draft = drafts.get(recordAt);
          return (
            <TableRow key={recordAt}>
              <TableCell>{formatRecordAtLocal(recordAt)}</TableCell>
              <TaskCell
                title={draft?.title ?? actual?.task_title}
                recordAt={recordAt}
                onClick={onAssignTask}
              />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
