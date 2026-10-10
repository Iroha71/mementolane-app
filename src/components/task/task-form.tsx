import React from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import z from "zod";
import { task } from "@/models/task.model";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { STATUSES } from "@/consts/constValues";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

interface TaskFormProps {
  onSubmit: (values: TaskFormRequest) => void | Promise<void>;
  parseError?: z.ZodError<TaskFormRequest>;
}

export const taskFormRequest = task.omit({
  id: true,
});
export type TaskFormRequest = z.infer<typeof taskFormRequest>;

const FORM_FIELDS: (keyof TaskFormRequest)[] = [
  "title",
  "status",
  "start_at",
  "due_at",
];

const RequireMark = (): React.JSX.Element => {
  return <span className="text-red-600">*</span>;
};

export default function TaskForm({
  onSubmit,
  parseError,
}: TaskFormProps): React.JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TaskFormRequest>({
    resolver: zodResolver(taskFormRequest),
    mode: "onChange",
    defaultValues: {
      title: "",
      start_at: "",
      due_at: "",
      status: "planning",
      completed: 0,
    },
  });

  const parseIssuesOf = (...names: (keyof TaskFormRequest)[]) =>
    parseError?.issues.filter((issue) =>
      names.includes(issue.path[0] as keyof TaskFormRequest),
    );
  // 入力欄を持たない項目のエラーはフォーム下部にまとめて表示する
  const otherParseIssues = parseError?.issues.filter(
    (issue) => !FORM_FIELDS.includes(issue.path[0] as keyof TaskFormRequest),
  );

  return (
    <div className="w-full max-w-[30rem]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>タスクを作成</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel>
                  タスク名 <RequireMark />
                </FieldLabel>
                <Input
                  id="title"
                  {...register("title")}
                  maxLength={30}
                  placeholder="○○を実装する"
                />
                <FieldError errors={[errors.title]} />
                <FieldError errors={parseIssuesOf("title")} />
              </Field>
              <FieldSet>
                <FieldLegend variant="label">状態</FieldLegend>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <ToggleGroup
                      value={[field.value]}
                      onValueChange={(groupValue) => {
                        // 選択中の項目を再度押すと空配列になるため、選択を維持する
                        if (groupValue.length === 0) return;
                        field.onChange(
                          groupValue[0] as TaskFormRequest["status"],
                        );
                      }}
                      variant="outline"
                      size="lg"
                      className="grid w-full grid-cols-5"
                    >
                      {STATUSES.map(({ name, label, icon: Icon }) => (
                        <ToggleGroupItem
                          key={name}
                          value={name}
                          aria-label={label}
                          className="flex size-16 w-full flex-col"
                        >
                          <Icon className="size-5" />
                          <span className="text-xs">{label}</span>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  )}
                />
                <FieldError errors={[errors.status]} />
                <FieldError errors={parseIssuesOf("status")} />
              </FieldSet>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>開始日</FieldLabel>
                  <Input type="date" {...register("start_at")} />
                </Field>
                <Field>
                  <FieldLabel>期限日</FieldLabel>
                  <Input type="date" {...register("due_at")} />
                </Field>
              </div>
              <FieldError errors={[errors.start_at, errors.due_at]} />
              <FieldError errors={parseIssuesOf("start_at", "due_at")} />
            </FieldGroup>
          </FieldSet>
          <FieldError errors={otherParseIssues} />
          <Field orientation="horizontal" className="flex justify-center">
            <Button type="submit" disabled={!isValid || isSubmitting}>
              登録する
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              キャンセル
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
