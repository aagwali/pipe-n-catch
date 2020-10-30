import * as Application from "./domains/application"
import { ExecutionResult } from "./domains/application/types"
import { logger } from "@df/prod-http-server"

export const startApp = async (): Promise<void> => {
  const context = "some execution context value"
  try {
    logger.info(`Starting job execution with ${context}`)

    Application.exitAs(ExecutionResult.ApplicationSuccess, { context })
  } catch (appExit) {
    await Application.saveExecutionResult(context, appExit)
  }
}
