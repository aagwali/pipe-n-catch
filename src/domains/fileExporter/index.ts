import { any } from "rambda"

import { exitAs } from "../application"
import { AppException } from "../application/types"
import { taskNotEnded } from "./behaviors"
import { getTasksByScopelock } from "./services"
import { FileExporterTask } from "./types"

export const getTasksFromBatch = async (scopelock: string): Promise<FileExporterTask[]> => {
  const response = await getTasksByScopelock(scopelock)

  const tasks = response.result

  if (!any(taskNotEnded, tasks)) {
    exitAs(AppException.AllTasksAreEnded)
  }

  return tasks
}

export const updateBatchTasks = async (allTasksUpdated: FileExporterTask[]): Promise<void> => {
  // to do File exporter Api : create a route to update all tasks node by scoplelock
}
