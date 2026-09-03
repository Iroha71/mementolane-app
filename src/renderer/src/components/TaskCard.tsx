import { Task } from '@shared/task'
import { Card, CardHeader } from './ui/card'

interface TaskCardProps {
  title: Task['title']
  startAt?: Task['startAt']
  dueAt?: Task['dueAt']
  detail?: Task['detail']
}

export default function TaskCard(props: TaskCardProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>{props.title}</CardHeader>
    </Card>
  )
}
