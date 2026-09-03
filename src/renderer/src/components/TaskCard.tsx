import { TaskOutput } from '@shared/task'
import { Card, CardHeader } from './ui/card'

interface TaskCardProps {
  title: TaskOutput['title']
  startAt?: TaskOutput['startAt']
  dueAt?: TaskOutput['dueAt']
  detail?: TaskOutput['detail']
}

export default function TaskCard(props: TaskCardProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>{props.title}</CardHeader>
    </Card>
  )
}
