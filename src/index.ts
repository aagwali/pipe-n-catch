import * as Application from "./domain/application";
import { logAs } from "./domain/chalkLogs"

export const initApp = (): void => {
  try {
    logAs("Application started", `Running swapi example from https://swapi.dev/`)
    Application.validateConfig()
    Application.start()
  } catch (error) {
    logAs("Initiation error", error)
  }
}
