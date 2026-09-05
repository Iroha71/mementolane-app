import StatusLane from '../components/StatusLane'
import { useEffect, useState } from 'react'
import { TaskOutput } from '@shared/task'
import { ArrowRightFromLine, Construction, MessageSquareCode, Package, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'

const STATUSES = [
  {
    name: 'plan',
    variant: '',
    icon: <Pencil />
  },
  {
    name: 'thisweek',
    variant: '',
    icon: <ArrowRightFromLine />
  },
  {
    name: 'wip',
    variant: '',
    icon: <Construction />
  },
  {
    name: 'inreview',
    variant: '',
    icon: <MessageSquareCode />
  },
  {
    name: 'inspection',
    variant: '',
    icon: <Package />
  }
] as const

function Home(): React.JSX.Element {
  const [tasks, setTasks] = useState<TaskOutput[]>([])
  useEffect(() => {
    window.api.readActiveTasks().then(setTasks)
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col gap-3 overflow-hidden p-4 pb-28">
      <div className="flex justify-end">
        <Link
          to="/about"
          className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/80"
        >
          About
        </Link>
      </div>
      <div className="flex flex-1 gap-3 overflow-hidden">
        {STATUSES.map((status) => (
          <StatusLane
            color="primary"
            tasks={tasks}
            key={status.name}
            status={status.name}
            icon={status.icon}
            className="min-w-0 flex-1"
          ></StatusLane>
        ))}
      </div>
    </div>
  )
}

export default Home
