import { FileExporterTask, TaskStatus } from "./types"

export const taskNotEnded = (task: FileExporterTask): boolean => task.status !== TaskStatus.Ended
