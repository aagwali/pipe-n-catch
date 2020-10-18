import { IRestResponse } from "typed-rest-client"
import { SwapiStarship } from "../domain/swapi/types"

export const defaultShip: IRestResponse<SwapiStarship> = {
  result: {
    name: "when hope seems to be 404 not found",
    model: "you can always count on...",
    manufacturer: "default",
    hyperdrive_rating: "default",
    starship_class: "default",
    pilots: ["http://swapi.dev/api/people/1/"],
  },
  statusCode: 308,
  headers: {},
}
