import * as Pcm from "./domain/pcm"
import * as Utils from "./domain/utils"
import { appConfig, appState } from "./domain/core"
import { logAppError, logAppSuccess } from "./domain/core/behaviors"

export const startApp = async (): Promise<void> => {
  try {
    await Utils.getRandomNumber(appConfig.randomFloor)
    await Pcm.getProductView(appState.randomResult)
    logAppSuccess()
  } catch (error) {
    logAppError(error)
  }
}
