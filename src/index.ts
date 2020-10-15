import { appConfig } from "./domain/core"
import { decodeConfig } from "./domain/core/types"
import { logAppStart, logInitAppError } from "./domain/core/behaviors"
import { startApp } from "./app"

export const initApp = (): void => {
  try {
    decodeConfig(appConfig)
    logAppStart("App example")
    startApp()
  } catch (error) {
    logInitAppError(error)
  }
}
