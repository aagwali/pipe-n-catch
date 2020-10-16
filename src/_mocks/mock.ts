import { IRestResponse } from "typed-rest-client"
import { SwapiStarship } from "../domain/swapi/types"

export const defaultShip: IRestResponse<SwapiStarship> = {
  result: {
    name: "default value when 404 not found",
    model: "default",
    manufacturer: "default",
    hyperdrive_rating: "default",
    starship_class: "default",
    pilots: ["http://swapi.dev/api/people/4/"],
  },
  statusCode: 308,
  headers: {},
}
