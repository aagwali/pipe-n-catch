import * as Swapi from "./domain/swapi"
import * as Utils from "./domain/randomNumber"
import { appConfig, appState, getState as get, logError, logAppSuccess } from "./domain/core"

export const startApp = async (): Promise<void> => {
  try {
    await Utils.getRandomNumber(appConfig.maxRandom)
    await Swapi.getStarship(get(appState.randomResult))
    await Swapi.getStarshipPilots(get(appState.starship))
    logAppSuccess()
  } catch (error) {
    logError("Application error", error)
  }
}
