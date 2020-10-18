import * as Parallel from "async-parallel"
import { always, equals, pipe, prop, when } from "rambda"
import { appConfig } from "../application"
import { defaultShip } from "../../_mocks/mock"
import { getPilotsById, getStarshipById } from "./services"
import {
  StateKeyPilots,
  StateKeyStarship,
  SwapiPilots,
  swapiPilots,
  SwapiStarship,
  swapiStarship,
} from "./types"
import { setState } from "../state"

export const getStarship = (randomResult: number): StateKeyStarship<SwapiStarship> =>
  setState({ starship: swapiStarship })(async () => {
    const response = await getStarshipById(randomResult).then(
      when(pipe(prop("statusCode"), equals(404)), always(defaultShip))
    )
    const starship = response.result

    return { starship }
  })

export const getStarshipPilots = (starShip: SwapiStarship): StateKeyPilots<SwapiPilots[]> =>
  setState({ pilots: swapiPilots })(async () => {
    const response = await Parallel.map(
      starShip.pilots,
      getPilotsById,
      Number(appConfig.maxConcurrency)
    )
    const pilots = response.map(prop("result"))

    return { pilots }
  })
