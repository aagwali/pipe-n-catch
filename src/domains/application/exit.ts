import { AppExit, ExecutionResult, ExitLevel } from "./types"
import { logAs } from "../chalkLogs"
import { logger } from "@df/prod-http-server"

const logExit = (level: ExitLevel, message: string): void => {
  if (level === ExitLevel.Error) {
    logAs("Execution error", message)
    logger.error(message)
  } else if (level === ExitLevel.Warning) {
    logAs("Application warning", message)
    logger.warning(message)
  } else {
    logAs("Execution success", message)
    logger.info(message)
  }
}

export const handleExit = (appExit: AppExit): void => {
  let message = ""
  switch (appExit.code) {
    case ExecutionResult.ApplicationSuccess:
      message = `${appExit.code} ${appExit.context}`
      return logExit(ExitLevel.Success, message)

    case ExecutionResult.UnexpectedExit:
      message = `${appExit.code} ${appExit.context}`
      return logExit(ExitLevel.Error, message)

    default: {
      ;((missingErrorCase: never) => "")(appExit.code)
    }
  }
}
