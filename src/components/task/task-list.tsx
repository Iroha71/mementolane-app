import { Task } from "@/schemas/task.schema";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Field, FieldContent, FieldLabel } from "../ui/field";

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: number | null;
  onSelectTask: (task: Task) => void;
}

export default function TaskList({
  tasks,
  selectedTaskId,
  onSelectTask,
}: TaskListProps) {
  return (
    <div className="mx-auto w-fit">
      <p className="mb-2 text-lg">タスク一覧</p>
      <RadioGroup
        value={selectedTaskId}
        onValueChange={(value: number) => {
          const task = tasks.find((t) => t.id === value);
          if (task) onSelectTask(task);
        }}
      >
        {tasks.map((task) => (
          <Field key={task.id} orientation="horizontal">
            <RadioGroupItem value={task.id} id={`radio-${task.id}`} />
            <FieldContent>
              <FieldLabel htmlFor={`radio-${task.id}`}>{task.title}</FieldLabel>
            </FieldContent>
          </Field>
        ))}
      </RadioGroup>
    </div>
  );
}
