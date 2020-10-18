import { UtilsErrors } from "../randomNumber/types"
import { ErrorLabels, StateError } from "./types"

export const buildErrorMessage = (error: ErrorLabels, value?: any): string | undefined => {
  switch (error) {
    case UtilsErrors.ExcludedRandomResult:
      return `value "${value}" : ${UtilsErrors.ExcludedRandomResult}`
    default: {
      ;((missingErrorCase: never) => "")(error)
    }
  }
}

export const stateError = (error: Error): never => {
  throw new StateError(error.message)
}

export const formatError = (error: ErrorLabels, value: any): never => {
  throw Error(buildErrorMessage(error, value))
}

export const isStatusCode = (statusCode: number) => (error: any): boolean => {
  return error.statusCode === statusCode
}
