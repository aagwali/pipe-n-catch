import { IRestResponse, RestClient } from "typed-rest-client"
import { SwapiPilots, SwapiStarship } from "./types"

export const swapiClient = new RestClient("swapiApi", "https://swapi.dev/api", [], {
  allowRedirectDowngrade: true,
})

export const getStarshipById = (randomResult: number): Promise<IRestResponse<SwapiStarship>> =>
  swapiClient.get<SwapiStarship>(`starships/${randomResult}`)

export const getPilotsById = (pilot: string): Promise<IRestResponse<SwapiPilots>> =>
  swapiClient.get<SwapiPilots>(String(pilot))

