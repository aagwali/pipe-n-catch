import { appState } from "."
import { UtilsErrors } from "../randomNumber/types"
import { logAs } from "../logs"
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

export const logAppStart = (appName: string): void =>
  logAs("Application started")(`Running ${appName}...`)

export const logInitAppError = (throwedValue: Error): void =>
  logAs("Initiation error")(throwedValue.message)

export const logAppSuccess = (): void => logAs("Application success")(appState)

export const logAppError = (error: StateError): void => {
  logAs("Application error")(error.message)
}
