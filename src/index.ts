import { appConfig, logAppStart, logError } from "./domain/core"
import { decodeConfig } from "./domain/core/types"
import { startApp } from "./app"

export const initApp = (): void => {
  try {
    decodeConfig(appConfig)
    logAppStart("App example")
    startApp()
  } catch (error) {
    logError("Initiation error", error)
  }
}
