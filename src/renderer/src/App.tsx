import Versions from './components/Versions'
import StatusLane from './components/StatusLane'
import { useEffect, useState } from 'react'
import { TaskOutput } from '@shared/task'

const STATUSES = ['plan', 'thisweek', 'In Progress', 'In Review', 'Done'] as const

function App(): React.JSX.Element {
  const [tasks, setTasks] = useState<TaskOutput[]>([])
  useEffect(() => {
    window.api.readActiveTasks().then(setTasks)
  }, [])

  return (
    <div className="flex h-screen w-screen gap-3 overflow-hidden p-4 pb-28">
      {STATUSES.map((status) => (
        <StatusLane
          tasks={tasks}
          key={status}
          status={status}
          className="min-w-0 flex-1"
        ></StatusLane>
      ))}
      <Versions></Versions>
    </div>
  )
}

export default App
