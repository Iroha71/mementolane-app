import Versions from './components/Versions'
import StatusLane from './components/StatusLane'
import TaskCard from './components/TaskCard'

const STATUSES = ['Plan', 'Todo', 'In Progress', 'In Review', 'Done'] as const

function App(): React.JSX.Element {
  return (
    <div className="flex h-screen w-screen gap-3 overflow-hidden p-4 pb-28">
      {STATUSES.map((status) => (
        <StatusLane key={status} status={status} className="min-w-0 flex-1"></StatusLane>
      ))}
      <Versions></Versions>
    </div>
  )
}

export default App
