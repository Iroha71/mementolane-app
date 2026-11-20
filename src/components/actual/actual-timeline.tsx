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
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

interface ActualTimelineProps {
  day: Date;
  actuals: Actual[];
  drafts: Map<string, Task>;
  onAssignTask: (recordAt: string) => void;
  onDeleteActual: (recordAt: string, isDraft: boolean) => void;
}

interface TaskCellProps {
  title: string | undefined;
  recordAt: string;
  isDraft: boolean;
  onClick: (recordAt: string) => void;
  onDeleteClick: (recordAt: string, isDraft: boolean) => void;
}

const TaskCell = ({
  title,
  recordAt,
  isDraft,
  onClick,
  onDeleteClick,
}: TaskCellProps): React.JSX.Element => {
  return (
    <TableCell
      onClick={() => onClick(recordAt)}
      className={isDraft ? "bg-lime-100" : ""}
    >
      <div className="flex flex-row items-center justify-between">
        {title}
        {title && (
          <Button
            size="icon"
            aria-label="実績を削除"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(recordAt, isDraft);
            }}
          >
            <Trash2Icon />
          </Button>
        )}
      </div>
    </TableCell>
  );
};

export default function ActualTimeline({
  day,
  actuals,
  drafts,
  onAssignTask,
  onDeleteActual,
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
                isDraft={draft !== undefined}
                onClick={onAssignTask}
                onDeleteClick={onDeleteActual}
              />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
