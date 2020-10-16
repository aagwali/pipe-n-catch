import * as Pcm from "./domain/swapi"
import * as Utils from "./domain/randomNumber"
import { appConfig, appState, getState as get } from "./domain/core"
import { logAppError, logAppSuccess } from "./domain/core/behaviors"

export const startApp = async (): Promise<void> => {
  try {
    await Utils.getRandomNumber(appConfig.maxRandom)
    await Pcm.getStarship(get(appState.randomResult))
    logAppSuccess()
  } catch (error) {
    logAppError(error)
  }
}
