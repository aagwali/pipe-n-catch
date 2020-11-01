import { endJobAs } from "./behaviors"
import { AppExit, ExecutionResult, ExitLevel } from "./types"

export const handleExit = (transaction: any, appExit: AppExit): void => {
  let message = ""

  switch (appExit.code) {
    case ExecutionResult.ApplicationSuccess:
      message = `${appExit.code} ${appExit.context}`
      endJobAs(ExitLevel.Success, transaction, message)
      break

    case ExecutionResult.UnexpectedExit:
      message = `${appExit.code} ${appExit.context}`
      endJobAs(ExitLevel.Error, transaction, message)
      break

    default: {
      ;((missingErrorCase: never) => "")(appExit.code)
    }
  }
}
