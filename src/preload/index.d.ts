import { ElectronAPI } from '@electron-toolkit/preload'
import { CreateTaskResult, TaskOutput } from '@shared/task'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      readActiveTasks: () => Promise<TaskOutput[]>
      createTask: (input: unknown) => Promise<CreateTaskResult>
    }
  }
}
