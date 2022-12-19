import { switchIsExhaustive } from "./application/modules/core/privates"
import { AppExceptions, Exception, ExceptionDetails, Exceptions } from "./application/modules/core/types"
import { ModuleExceptions } from "./application/modules/module/types"
import { logError, logWarning } from "./infra/log"

export const convertToSafeException = (errorOrException: Exception | Error | unknown): Exception => {
  const safeError =
    errorOrException instanceof Error
      ? (errorOrException as Error)
      : Error(`A throw or a Promise rejection occured, but no error was provided. Throwed value : ${errorOrException}`)

  const exception =
    errorOrException instanceof Exception
      ? {
          ...errorOrException,
          exceptionDetails: {
            ...errorOrException.exceptionDetails,
            error: errorOrException.exceptionDetails.isError
              ? errorOrException.exceptionDetails.error ||
                Error("An error should have been provided when raising an exception with isError is set to true")
              : Error("Exception raised is a warning, there is no error to express"),
            data: errorOrException.exceptionDetails.data || "Data should be provided when raising an exception",
          },
        }
      : new Exception(AppExceptions.UnexpectedError, {
          isError: true,
          error: safeError,
          data: "Unexpected errors have no data, details are in error property",
        })

  return exception
}

export const handleExits = (errorOrException: Exception | Error | unknown): void => {
  const {
    code,
    exceptionDetails: { isError, error, data },
  } = convertToSafeException(errorOrException)

  let exitMessage = null

  switch (code) {
    case ModuleExceptions.IsNotSomeData:
      exitMessage = `${code} : ${data}`
      break

    case AppExceptions.NotImplemented:
    case AppExceptions.UnexpectedError:
      exitMessage = `${code} : ${error.message}`
      break

    default:
      switchIsExhaustive(code)
  }

  isError ? logError(error, exitMessage) : logWarning(exitMessage)
}

export const exitAs = (code: Exceptions, exceptionDetails: ExceptionDetails): never => {
  throw new Exception(code, exceptionDetails)
}
