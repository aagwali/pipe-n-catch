import { appConfig, appState } from "./domain/core"
import { logAppSuccess, logAppError } from "./domain/core/behaviors"
import * as Pcm from "./domain/pcm"
import * as Utils from "./domain/utils"

export const startApp = async function (): Promise<void> {
  try {
    await Utils.getRandomNumber(appConfig.randomFloor)
    await Pcm.getProductView(appState.randomResult)
    logAppSuccess()
  } catch (error) {
    logAppError(error)
  }
  process.exit
}
