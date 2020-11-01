import { formatErrorToAppExit } from "./behaviors"
import { handleExit } from "./exit"
import { AppExit, AppExitOptions, ExitLabels, JobData } from "./types"
import Bull from "bull"

export const handleExecutionResult = async (
  acknowledgeJob: Bull.DoneCallback,
  jobExit: AppExit | Error,
): Promise<void> => {
  const appExit = formatErrorToAppExit(jobExit)

  acknowledgeJob()

  handleExit(appExit)
}

export const exitAs = (code: ExitLabels, options?: AppExitOptions): never => {
  const contextValue = options?.context ? options.context : "optional context"
  throw new AppExit(code, contextValue)
}
