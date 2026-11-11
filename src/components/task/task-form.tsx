import React from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { STATUSES } from "@/consts/constValues";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { TaskInput, taskInputModel } from "@/models/task.model";

interface TaskFormProps {
  /** 指定しなかった項目は空欄（状態は「planning」）で始まる。最初の描画でのみ読まれる */
  defaultValues?: Partial<TaskInput>;
  /** フォームの見出し */
  legend?: string;
  /** 送信ボタンの文言 */
  submitLabel?: string;
  /** 入力チェックを通った値で送信するときに呼ばれる */
  onSubmit: (values: TaskInput) => void | Promise<void>;
  /** 項目ごとのエラー。該当する項目の下に表示する */
  error?: Record<string, string[]>;
  /** 送信ボタンの上に表示する内容 */
  notice?: React.ReactNode;
  /** 実績（人日）。指定したときだけ表示する。編集はできない */
  actualTime?: number;
}
const RequireMark = (): React.JSX.Element => {
  return <span className="text-red-600">*</span>;
};

export default function TaskForm({
  defaultValues,
  legend = "タスクを作成",
  submitLabel = "登録する",
  error,
  notice,
  actualTime,
  onSubmit,
}: TaskFormProps): React.JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskInputModel),
    mode: "onChange",
    defaultValues: {
      title: "",
      start_at: null,
      due_at: null,
      status: "planning",
      completed: 0,
      ...defaultValues,
    },
  });

  return (
    <div className="w-full max-w-[30rem]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>{legend}</FieldLegend>
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
                {error?.title && (
                  <FieldError errors={[{ message: error.title?.[0] }]} />
                )}
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
                {error?.status && (
                  <FieldError errors={[{ message: error.status?.[0] }]} />
                )}
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
              {(error?.start_at || error?.due_at) && (
                <FieldError
                  errors={[error.start_at?.[0], error.due_at?.[0]]
                    .filter((message) => message !== undefined)
                    .map((message) => ({ message }))}
                />
              )}
              {actualTime !== undefined && (
                <Field>
                  <FieldTitle>実績</FieldTitle>
                  <p className="font-bold">{actualTime} 人日</p>
                </Field>
              )}
            </FieldGroup>
          </FieldSet>
          {notice}
          <Field orientation="horizontal" className="flex justify-center">
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {submitLabel}
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
