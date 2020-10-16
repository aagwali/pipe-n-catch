import { always, equals, pipe, prop, when } from "rambda"
import { defaultShip } from "../../_mocks/mock"
import { appConfig, setState } from "../core"
import { getPilotsById, getStarshipById } from "./services"
import { SwapiStarship, swapiStarship, Starship, SwapiPilots, Pilots, swapiPilots } from "./types"
import * as Parallel from "async-parallel"
import { LogTypes } from "../core/types"

export const getStarship = (randomResult: number): Starship<SwapiStarship> =>
  setState({ starship: swapiStarship })(async () => {
    const response = await getStarshipById(randomResult).then(
      when(pipe(prop("statusCode"), equals(404)), always(defaultShip))
    )
    const starship = response.result

    return { starship }
  })

export const getStarshipPilots = (starShip: SwapiStarship): Pilots<SwapiPilots[]> =>
  setState({ pilots: swapiPilots })(async () => {
    const response = await Parallel.map(
      starShip.pilots,
      getPilotsById,
      Number(appConfig.maxConcurrency)
    )
    const pilots = response.map(prop("result"))

    return { pilots }
  })
