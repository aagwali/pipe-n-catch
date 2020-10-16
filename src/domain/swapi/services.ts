import { IRestResponse, RestClient } from "typed-rest-client"
import { SwapiStarship } from "./types"

export const swapiClient = new RestClient("pcmApi", "https://swapi.dev/api", [], {
  allowRedirectDowngrade: true,
})

export const getStarshipById = (randomResult: number): Promise<IRestResponse<SwapiStarship>> =>
  swapiClient.get<SwapiStarship>(`starships/${randomResult}`)
