import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@renderer/components/ui/field'
import { Input } from '@renderer/components/ui/input'
import { InputGroup } from '@renderer/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { Textarea } from '@renderer/components/ui/textarea'
import { taskInputSchema, type TaskInput } from '@shared/task'
import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const statusItems = [
  { label: '予定', value: 'plan' },
  { label: '今週やること', value: 'thisweek' },
  { label: '作業中', value: 'wip' },
  { label: 'レビュー中', value: 'inreview' },
  { label: '検収中', value: 'inspection' }
]

export default function Create(): React.JSX.Element {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const status = searchParams.get('status') ?? undefined
  const [formErrors, setFormErrors] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm<TaskInput>({
    mode: "onBlur",
    resolver: zodResolver(taskInputSchema),
    defaultValues: {
      title: '',
      status: (status as TaskInput['status']) ?? null,
      startAt: null,
      dueAt: null,
      detail: null
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    const result = await window.api.createTask(data)

    if (result.success) {
      navigate('/')
      return
    }

    setFormErrors(result.errors)
  })

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-3 p-4">
      <Card style={{ width: '30rem' }}>
        <CardHeader>
          <CardTitle>タスクの作成</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="create-task-form" onSubmit={onSubmit}>
            <FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel>タスク名 *</FieldLabel>
                  <Input
                    placeholder="○○の開発"
                    maxLength={30}
                    {...register("title")}
                  />
                  <FieldError errors={[errors.title]} />
                </Field>
                <Field>
                  <FieldLabel>状態</FieldLabel>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        items={statusItems}
                        value={field.value ?? undefined}
                        onValueChange={(value) => field.onChange(value ?? null)}
                      >
                        <SelectTrigger onBlur={field.onBlur}>
                          <SelectValue placeholder="theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>状態</SelectLabel>
                            {statusItems.map((items) => (
                              <SelectItem key={items.value} value={items.value}>
                                {items.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.status]} />
                </Field>
                <Field>
                  <FieldLabel>開始日 - 期限日</FieldLabel>
                  <InputGroup>
                    <Input type="date" {...register("startAt")} />
                    <Input type="date" {...register("dueAt")} />
                  </InputGroup>
                  <FieldError errors={[errors.startAt]} />
                  <FieldError errors={[errors.dueAt]} />
                </Field>
                <Field>
                  <FieldLabel>メモ</FieldLabel>
                  <Textarea maxLength={200} {...register("detail")} />
                  <FieldError errors={[errors.detail]} />
                </Field>
                <FieldError errors={formErrors.map((message) => ({ message }))} />
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <CardAction>
            <Button type="submit" form="create-task-form" disabled={!isValid}>
              登録する
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
      <Link to="/" className="text-sm text-muted-foreground hover:underline">
        Homeへ戻る
      </Link>
    </div>
  )
}
