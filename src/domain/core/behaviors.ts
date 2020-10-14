import { appState } from "."
import { PcmErrors } from "../pcm/types"
import { logAs } from "../utils/customConsole"
import { UtilsErrors } from "../utils/types"
import { ErrorLabels, StateError } from "./types"

export const buildErrorMessage = (error: ErrorLabels, value?: any): string => {
  switch (error) {
    case UtilsErrors.BadRandomResult:
      return `value "${value}" : ${UtilsErrors.BadRandomResult}`
    case PcmErrors.NotFound:
      return `value "${value}" : pcm call raised a NotFound error`
    case PcmErrors.Conflict:
      return `value "${value}" : pcm call raised a Conflict error`
    case PcmErrors.InvalidResponse:
      return `value "${value}" : missing key on Pcm call result`
    default:
      ;((missingErrorCase: never) => {})(error)
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
