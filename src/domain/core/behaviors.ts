import { appState } from "."
import { PcmErrors } from "../pcm/types"
import { logAs, logDebug } from "../utils/customConsole"
import { UtilsErrors } from "../utils/types"
import { AppErrors, StateError } from "./types"

export const buildErrorMessage = (error: AppErrors, value?: any): string => {
  switch (error) {
    case PcmErrors.NotFound:
      return `value "${value}" : pcm call raised a NotFound error`
    case UtilsErrors.BadRandomResult:
      return `value "${value}" : ${UtilsErrors.BadRandomResult}`
    case PcmErrors.InvalidResponse:
      return `value "${value}" : missing key on Pcm call result`
    default:
      return "buildErrorMessage : Unknown Error"
  }
}

export const stateError = (error: Error | AppErrors | string, value?: any) => {
  if (error instanceof Error) throw new StateError(error.message)
  throw new StateError(buildErrorMessage(PcmErrors.InvalidResponse, value))
}

export const logAppStart = (appName: string) =>
  logAs("Application started")(`Running ${appName}...`)

export const logInitAppError = (throwedValue: Error) =>
  logAs("Initiation error")(throwedValue.message)

export const logAppSuccess = () => logAs("Application success")(appState)

export const logAppError = (error: StateError) => {
  logAs("Application error")(error.message)
  if (error.debug) logDebug(error.debug)
}
