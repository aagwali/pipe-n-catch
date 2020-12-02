import * as Parallel from "async-parallel"
import { any } from "rambda"

import { taskNotEnded } from "../fileExporter/behaviors"
import { FileExporterTask, TaskStatus } from "../fileExporter/types"
import { addRetry, getTransferCb, parseProtocol } from "./behaviors"
import { logError } from "./config"
import {
  AppException,
  AppExit,
  AppExitOptions,
  ExitLabels,
  GetStreamCb,
  TransferCallbacks,
  WriteStreamCb,
} from "./types"

export const exitAs = (code: ExitLabels, options?: AppExitOptions): never => {
  const contextValue = options?.context ? options.context : "optional context"
  throw new AppExit(code, contextValue)
}

export const buildTransferCallbacks = (task: FileExporterTask): TransferCallbacks => {
  const [srcProtocol, dstProtocol] = [parseProtocol(task.sourceURI), parseProtocol(task.destinationURI)]

  const getSourceStream = getTransferCb("getStream", srcProtocol) as GetStreamCb
  const writeStreamToDestination = getTransferCb("writeStream", dstProtocol) as WriteStreamCb

  return { getSourceStream, writeStreamToDestination }
}

const sleep = async (seconds: number) => {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

export const executeCopy = async (task: FileExporterTask): Promise<FileExporterTask> => {
  if (task.status === TaskStatus.Ended) {
    return task
  } else {
    try {
      const { getSourceStream, writeStreamToDestination } = buildTransferCallbacks(task)
      const stream = await addRetry(() => getSourceStream(task.sourceURI))

      await addRetry(() => writeStreamToDestination(stream, task.destinationURI))

      return { ...task, status: TaskStatus.Ended }
    } catch (error) {
      logError(error, "Error ocured during file copy")
      console.log(error)
      await sleep(3)

      return { ...task, status: TaskStatus.Failed }
    }
  }
}

export const processToFileCopy = async (tasks: FileExporterTask[]): Promise<FileExporterTask[]> => {
  // to do replace "Parallel.map" with distribution to worker thread
  const executedTasks = await Parallel.map(tasks, executeCopy, 3)

  return executedTasks
}

export const checkProcessResult = async (allTasksUpdated: FileExporterTask[]): Promise<void> => {
  if (any(taskNotEnded, allTasksUpdated)) {
    exitAs(AppException.SomeCopyFailed, { context: Error("Batch needs retry") })
  }
}
