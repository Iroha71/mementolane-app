import { getAllTasks } from "@/repositories/task-repository";
import { Task } from "@/schemas/task.schema";

export async function getTaskList(isActivateOnly: boolean): Promise<Task[]> {
  try {
    const tasks = await getAllTasks(isActivateOnly);

    return tasks;
  } catch (err) {
    console.error(err);
    throw new Error("タスクの読み込みに失敗しました。ログを確認してください。");
  }
}
