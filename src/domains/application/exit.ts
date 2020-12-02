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

  let error = null
  let errorMessage = null

  switch (appExit.code) {
    case AppException.AllTasksAreEnded:
      return exitJob(ExitLevel.Warning, appExit.code, acknowledgeJob)

    case AppException.SomeCopyFailed:
      error = appExit.context instanceof Error ? appExit.context : null
      errorMessage = `${appExit.code} ${error?.message}`
      return exitJob(ExitLevel.Error, errorMessage, acknowledgeJob, error)

    case AppException.UrlProtocolUnrecognized:
      const message = `${appExit.code} : ${appExit.context}`
      return exitJob(ExitLevel.Warning, message, acknowledgeJob)

    case AppException.HttpProtocolUploadError:
      return exitJob(ExitLevel.Error, appExit.code, acknowledgeJob)

    case AppException.UnexpectedExit:
      error = appExit.context instanceof Error ? appExit.context : null
      errorMessage = `${appExit.code} ${error?.message}`
      return exitJob(ExitLevel.Error, errorMessage, acknowledgeJob, error)

    default: {
      ;((missingErrorCase: never) => "")(appExit.code)
    }
  }
}
