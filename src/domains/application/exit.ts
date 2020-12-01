import { apmTransaction, logError, logInfo, logWarning } from "./config"
import { AppDoneCallback, AppException, AppExit, ExitLevel } from "./types"

export const setSuccess = (acknowledgeJob: AppDoneCallback) => {
  logInfo(ExitLevel.Success)
  acknowledgeJob()
  apmTransaction.result = ExitLevel.Success
  apmTransaction.end()
}

const exitJob = (level: ExitLevel, message: string, acknowledgeJob: AppDoneCallback, error?: Error): void => {
  if (level === ExitLevel.Warning) {
    apmTransaction.result = ExitLevel.Warning
    logWarning(message)
    acknowledgeJob()
  } else {
    apmTransaction.result = ExitLevel.Error
    logError(error, message)
    acknowledgeJob(error)
  }
  apmTransaction.end()
}

export const handleExceptions = (throwedValue: AppExit | Error, acknowledgeJob: AppDoneCallback): void => {
  const appExit =
    throwedValue instanceof AppExit ? throwedValue : new AppExit(AppException.UnexpectedExit, throwedValue)

  switch (appExit.code) {
    case AppException.UnexpectedExit:
      const error = appExit.context instanceof Error ? appExit.context : null
      const errorMessage = `${appExit.code} ${error?.message}`
      return exitJob(ExitLevel.Error, errorMessage, acknowledgeJob, error)

    default: {
      ;((missingErrorCase: never) => "")(appExit.code)
    }
  }
}
