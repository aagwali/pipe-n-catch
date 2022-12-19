import { ModuleExceptions } from "../module/types"

export enum AppExceptions {
  NotImplemented = "Code reached a function not implemented yet",
  UnexpectedError = "Unexpected Error",
}

export type Exceptions = AppExceptions | ModuleExceptions

export type ExceptionDetails = {
  isError: boolean
  data?: string
  error?: Error
}

export class Exception extends Error {
  exceptionDetails: ExceptionDetails
  code: Exceptions
  constructor(code: Exceptions, exceptionDetails?: ExceptionDetails, message?: string) {
    super(message)
    this.exceptionDetails = exceptionDetails
    this.code = code
  }
}
