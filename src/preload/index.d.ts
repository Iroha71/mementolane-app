import { ElectronAPI } from '@electron-toolkit/preload'
import { TaskOutput } from '@shared/task'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      readActiveTasks: () => Promise<TaskOutput[]>
    }
  }
}
