import { endJobAs } from "./behaviors"
import { jobConfig } from "./config"
import { AppExit, ExecutionResult, ExitLevel } from "./types"

export const handleExit = (appExit: AppExit): void => {
  let message = ""

  switch (appExit.code) {
    case ExecutionResult.ApplicationSuccess:
      message = `${appExit.code} ${appExit.context}`
      endJobAs(ExitLevel.Success, message)
      break

    case ExecutionResult.UnexpectedExit:
      message = `${appExit.code} ${appExit.context}`
      endJobAs(ExitLevel.Error, message)
      break

    default: {
      ;((missingErrorCase: never) => "")(appExit.code)
    }
  }
}
