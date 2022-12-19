import * as Application from "./application"
import { validateConfig } from "./config"
import { handleExits } from "./exits"
import { logInfo } from "./infra/log"

export const init = async (): Promise<void> => {
  try {
    logInfo("Application initialisation")

    await validateConfig()

    logInfo("Application start")

    const processed = await Application.startProcess("Hello", "world")

    logInfo(`Success of : ${processed}`)
  } catch (error) {
    handleExits(error)
  }
}
