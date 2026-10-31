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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { STATUSES } from "@/consts/constValues";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Task, TaskInput, taskInputSchema } from "@/schemas/task.schema";
import { $ZodFlattenedError } from "zod/v4/core";

export type TaskFieldErrors = $ZodFlattenedError<TaskInput>["fieldErrors"];

interface TaskFormProps {
  defaultStatus: Task["status"];
  /** 項目ごとのエラーを返すと、該当する項目の下に表示する */
  onSubmit: (
    values: TaskInput,
  ) => void | TaskFieldErrors | null | Promise<void | TaskFieldErrors | null>;
}
const RequireMark = (): React.JSX.Element => {
  return <span className="text-red-600">*</span>;
};

export default function TaskForm({
  defaultStatus,
  onSubmit,
}: TaskFormProps): React.JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskInputSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      start_at: null,
      due_at: null,
      status: defaultStatus,
      completed: 0,
    },
  });

  const submit = async (values: TaskInput) => {
    const fieldErrors = await onSubmit(values);
    if (!fieldErrors) return;

    for (const [name, messages] of Object.entries(fieldErrors) as [
      keyof TaskInput,
      string[] | undefined,
    ][]) {
      if (messages?.[0]) {
        setError(name, { type: "server", message: messages[0] });
      }
    }
  };

  return (
    <div className="w-full max-w-[30rem]">
      <form onSubmit={handleSubmit(submit)}>
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
              </Field>
              <FieldSet>
                <FieldLegend variant="label">状態</FieldLegend>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <ToggleGroup
                      defaultValue={[defaultStatus]}
                      value={[field.value]}
                      onValueChange={(groupValue) => {
                        // 選択中の項目を再度押すと空配列になるため、選択を維持する
                        if (groupValue.length === 0) return;
                        field.onChange(groupValue[0] as TaskInput["status"]);
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
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal" className="flex justify-center">
            <Button type="submit" disabled={isSubmitting || !isValid}>
              登録する
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              キャンセル
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
