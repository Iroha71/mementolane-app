import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from './ui/card'
import TaskCard from './TaskCard'
import { TaskOutput } from '@shared/task'

interface StatusLaneProps {
  status: string
  className?: string
  tasks: TaskOutput[]
}

export default function StatusLane({
  status,
  className,
  tasks
}: StatusLaneProps): React.JSX.Element {
  return (
    <Card size="sm" className={cn('h-full min-h-0', className)}>
      <CardHeader>
        <CardTitle className="truncate">{status}</CardTitle>
        <CardAction>
          <Badge variant="secondary">1</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskCard key={task.id} title={task.title} />
          ))}
      </CardContent>
    </Card>
  )
}
