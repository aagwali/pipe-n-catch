import { Output } from "../application/types";
import { SwapiStarship, SwapiPilots } from "../swapi/types";

export type State = {
    randomResult: number
    starship: SwapiStarship
    pilots: SwapiPilots[]
    output: Output
  }