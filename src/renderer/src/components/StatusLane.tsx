import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from './ui/card'
import TaskCard from './TaskCard'

interface StatusLaneProps {
  status: string
  className?: string
}

export default function StatusLane({ status, className }: StatusLaneProps) {
  return (
    <Card size="sm" className={cn('h-full min-h-0', className)}>
      <CardHeader>
        <CardTitle className="truncate">{status}</CardTitle>
        <CardAction>
          <Badge variant="secondary">1</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto">
        <TaskCard title="test" />
      </CardContent>
    </Card>
  )
}
