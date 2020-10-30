import * as AppConfig from "./domains/application/config"
import { logAs } from "./domains/chalkLogs"
import { name } from "../package.json"
import { startApp } from "."

export const initApp = async (): Promise<void> => {
  try {
    logAs("Execution started", `Running ${name}`)
    AppConfig.validateConfig()
    await startApp()
  } catch (error) {
    logAs("Application error", error)
  } finally {
    process.exit(0)
  }
}
