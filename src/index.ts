import { startApp } from "./app"
import { appConfig } from "./domain/core"
import { logAppStart, logInitAppError } from "./domain/core/behaviors"
import { decodeConfig } from "./domain/core/types"

export const initApp = async (): Promise<void> => {
  try {
    decodeConfig(appConfig)
    logAppStart("App example")
    await startApp()
  } catch (error) {
    logInitAppError(error)
  }
  process.exit()
}
