import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Card, CardAction, cardTitleVariants, CardContent, CardHeader, CardTitle } from './ui/card'
import TaskCard from './TaskCard'
import { TaskOutput } from '@shared/task'
import React from 'react'
import { type VariantProps } from 'class-variance-authority'

type StatusVariant = NonNullable<VariantProps<typeof cardTitleVariants>['variant']>

interface StatusLaneProps {
  status: StatusVariant
  color: string
  className?: string
  tasks: TaskOutput[]
  icon: React.JSX.Element
}

export default function StatusLane({
  status,
  className,
  tasks,
  icon
}: StatusLaneProps): React.JSX.Element {
  const laneTasks = tasks.filter((task) => task.status === status)

  return (
    <Card className={cn('bg-muted', className)}>
      <CardHeader>
        <CardTitle variant={status} className="flex items-center gap-2">
          <span className="flex shrink-0 items-center [&_svg]:size-4">{icon}</span>
          <span className="truncate">{status}</span>
        </CardTitle>
        <CardAction>
          <Badge variant={status}>{laneTasks.length}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {laneTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            startAt={task.startAt}
            dueAt={task.dueAt}
            detail={task.detail}
          />
        ))}
      </CardContent>
    </Card>
  )
}
