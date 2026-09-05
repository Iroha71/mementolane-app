import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@renderer/components/ui/field'
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
import React from 'react'
import { Link } from 'react-router-dom'

interface CreateProps {
  status?: string
}

const statusItems = [
  { label: '状態を選択', value: null },
  { label: '予定', value: '予定' },
  { label: '今週やること', value: '今週やること' },
  { label: '作業中', value: '作業中' },
  { label: 'レビュー中', value: 'レビュー中' },
  { label: '検収中', value: '検収中' }
]

export default function Create({ status }: CreateProps): React.JSX.Element {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-3 p-4">
      <Card style={{ width: '30rem' }}>
        <CardHeader>
          <CardTitle>タスクの作成</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="">
            <FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel>タスク名 *</FieldLabel>
                  <Input placeholder="○○の開発" required />
                </Field>
                <Field>
                  <FieldLabel>状態</FieldLabel>
                  <Select items={statusItems} defaultValue={status}>
                    <SelectTrigger>
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
                </Field>
                <Field>
                  <FieldLabel>開始日 - 期限日</FieldLabel>
                  <InputGroup>
                    <Input type="date" />
                    <Input type="date" />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>メモ</FieldLabel>
                  <Textarea />
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <CardAction>
            <Button>登録する</Button>
          </CardAction>
        </CardFooter>
      </Card>
      <Link to="/" className="text-sm text-muted-foreground hover:underline">
        Homeへ戻る
      </Link>
    </div>
  )
}
