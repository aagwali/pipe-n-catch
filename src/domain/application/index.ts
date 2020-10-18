import * as RandomNumber from "../randomNumber"
import * as Swapi from "../swapi"
import { Config, configGuard, Output, outputGuard, StateKeyOutput } from "./types"
import { getStateKey as use, setState, state } from "../state"
import { logAs } from "../chalkLogs"
import { guard } from "decoders"
import { SwapiStarship, SwapiPilots } from "../swapi/types"
import { prop } from "rambda"

export const appConfig: Config = {
  minRandom: process.env.MIN_RANDOM,
  maxRandom: process.env.MAX_RANDOM,
  maxConcurrency: process.env.MAX_CONCURRENCY,
  nodeEnv: process.env.NODE_ENV,
}

export const validateConfig = () => guard(configGuard)(appConfig)

export const setOutput = (starship: SwapiStarship, pilots: SwapiPilots[]): StateKeyOutput<Output> =>
  setState({ output: outputGuard })(async () => {
    const output = {
      starshipInfos: ` ${starship.name} - ${starship.model}`,
      famousPilots: pilots.map(prop("name")),
    }

    return { output }
  })

export const start = async (): Promise<void> => {
  try {
    await RandomNumber.generate(appConfig.maxRandom)
    await Swapi.getStarship(use(state.randomResult))
    await Swapi.getStarshipPilots(use(state.starship))
    await setOutput(use(state.starship), use(state.pilots))

    logAs("Application success", use(state.output))
  } catch (error) {
    logAs("Application error", error)
  }
}
