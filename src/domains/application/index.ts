import { handleExit } from "./exit"
import { AppExit, AppExitOptions, ExecutionResult, ExitLabels } from "./types"

export const saveExecutionResult = async (operationLabel: string, throwedValue: AppExit | Error): Promise<void> => {
  const appExit =
    throwedValue instanceof AppExit ? throwedValue : new AppExit(ExecutionResult.UnexpectedExit, throwedValue)

  handleExit(appExit)
}

export const exitAs = (code: ExitLabels, options?: AppExitOptions): never => {
  const contextValue = options?.context ? options.context : "optional context"
  throw new AppExit(code, contextValue)
}
