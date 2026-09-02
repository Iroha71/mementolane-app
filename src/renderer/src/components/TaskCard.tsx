import { Card, CardHeader } from './ui/card'

interface TaskCardProps {
  title: string
  startAt?: string
  dueAt?: string
  detail?: string
}

export default function TaskCard(props: TaskCardProps) {
  return (
    <Card>
      <CardHeader>{props.title}</CardHeader>
    </Card>
  )
}
