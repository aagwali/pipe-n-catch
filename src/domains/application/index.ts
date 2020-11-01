import { formatErrorToAppExit } from "./behaviors"
import { handleExit } from "./exit"
import { AppDoneCallback, AppExit, AppExitOptions, ExitLabels } from "./types"

export const handleExecutionResult = async (
  acknowledgeJob: AppDoneCallback,
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
