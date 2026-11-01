import { Task } from "@/schemas/task.schema";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Field, FieldContent, FieldLabel } from "../ui/field";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="mx-auto w-fit">
      <p className="mb-2 text-lg">タスク一覧</p>
      <RadioGroup>
        {tasks.map((task) => (
          <Field orientation="horizontal">
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
