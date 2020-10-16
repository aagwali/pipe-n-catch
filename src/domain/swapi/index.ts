import { always, equals, pipe, prop, when } from "rambda"
import { defaultShip } from "../../_mocks/mock"
import { setState } from "../core"
import { getStarshipById } from "./services"
import { SwapiStarship, swapiStarship, Starship } from "./types"

export const getStarship = (randomResult: number): Starship<SwapiStarship> =>
  setState({ starship: swapiStarship })(async () => {
    const response = await getStarshipById(randomResult).then(
      when(pipe(prop("statusCode"), equals(404)), always(defaultShip))
    )

    return { starship: response.result }
  })
