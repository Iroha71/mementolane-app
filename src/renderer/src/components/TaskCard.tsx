import { TaskOutput } from '@shared/task'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Hourglass, NotebookPen, Ticket } from 'lucide-react'
import { Separator } from './ui/separator'

interface TaskCardProps {
  title: TaskOutput['title']
  startAt?: TaskOutput['startAt']
  dueAt?: TaskOutput['dueAt']
  detail?: TaskOutput['detail']
}

export default function TaskCard(props: TaskCardProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <Ticket />
          <span className="text-lg">{props.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {props.startAt ? (
          <>
            <div className="flex gap-1 items-center">
              <Hourglass className="size-3.5 shrink-0" aria-hidden="true" />
              期限
            </div>
            <div className="font-bold">
              {props.startAt} {'>>'} {props.dueAt}
            </div>
          </>
        ) : null}

        {props.detail ? (
          <div>
            <Separator className="my-2" />
            <div className="flex items-center">
              <NotebookPen className='size-3.5 shrink-0 aria-hidden="true"' />
              メモ
            </div>
            <span>{props.detail}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
